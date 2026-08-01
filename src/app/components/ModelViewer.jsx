"use client";
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */
import { Suspense, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree, invalidate } from '@react-three/fiber';
import { OrbitControls, useGLTF, useFBX, useProgress, Html } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
const deg2rad = d => (d * Math.PI) / 180;
const DECIDE = 8;
const ROTATE_SPEED = 0.005;
const INERTIA = 0.925;

// Preload the default GLTF model for fast loading
useGLTF.preload('/models/animator.glb');

const Loader = ({ placeholderSrc }) => {
  const { progress, active } = useProgress();
  if (!active && placeholderSrc) return null;
  return (
    <Html center>
      {placeholderSrc ? (
        <img src={placeholderSrc} width={128} height={128} style={{ filter: 'blur(8px)', borderRadius: 8 }} alt="Loading..." />
      ) : (
        <div style={{
          color: '#ea580c',
          fontWeight: 'bold',
          fontSize: '14px',
          fontFamily: 'sans-serif',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '8px 16px',
          borderRadius: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          Loading 3D Model... {Math.round(progress)}%
        </div>
      )}
    </Html>
  );
};

const DesktopControls = ({ pivot, min, max, zoomEnabled, initYaw, initPitch }) => {
  const ref = useRef(null);
  const isInteracting = useRef(false);
  const returnTimeout = useRef(null);
  const shouldReturn = useRef(false);
  
  useFrame(() => {
    if (ref.current) {
      ref.current.target.copy(pivot);
      
      // Handle return to original position after interaction stops
      if (shouldReturn.current && !isInteracting.current) {
        const currentAzimuth = ref.current.getAzimuthalAngle();
        const currentPolar = ref.current.getPolarAngle();
        const targetAzimuth = initYaw;
        const targetPolar = initPitch + Math.PI / 2; // OrbitControls polar angle offset
        
        // Check if we're close enough to target
        const azimuthDiff = Math.abs(currentAzimuth - targetAzimuth);
        const polarDiff = Math.abs(currentPolar - targetPolar);
        
        if (azimuthDiff < 0.01 && polarDiff < 0.01) {
          shouldReturn.current = false;
        } else {
          // Smoothly interpolate back to original position
          const lerpFactor = 0.08;
          const newAzimuth = THREE.MathUtils.lerp(currentAzimuth, targetAzimuth, lerpFactor);
          const newPolar = THREE.MathUtils.lerp(currentPolar, targetPolar, lerpFactor);
          
          ref.current.setAzimuthalAngle(newAzimuth);
          ref.current.setPolarAngle(newPolar);
        }
      }
    }
  });

  useEffect(() => {
    if (!ref.current) return;
    
    const onStart = () => {
      isInteracting.current = true;
      shouldReturn.current = false;
      if (returnTimeout.current) {
        clearTimeout(returnTimeout.current);
        returnTimeout.current = null;
      }
    };
    
    const onEnd = () => {
      isInteracting.current = false;
      // Start return after 2 seconds of no interaction
      returnTimeout.current = setTimeout(() => {
        shouldReturn.current = true;
      }, 2000);
    };
    
    ref.current.addEventListener('start', onStart);
    ref.current.addEventListener('end', onEnd);
    
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('start', onStart);
        ref.current.removeEventListener('end', onEnd);
      }
      if (returnTimeout.current) {
        clearTimeout(returnTimeout.current);
      }
    };
  }, []);
  
  return (
    <OrbitControls
      ref={ref}
      makeDefault
      enablePan={false}
      enableRotate={true}
      enableZoom={zoomEnabled}
      minDistance={min}
      maxDistance={max}
      target={[0, 0, 0]}
    />
  );
};

const ModelInner = ({
  url,
  videoUrl,
  xOff,
  yOff,
  pivot,
  initYaw,
  initPitch,
  minZoom,
  maxZoom,
  enableMouseParallax,
  enableManualRotation,
  enableHoverRotation,
  enableManualZoom,
  autoFrame,
  fadeIn,
  autoRotate,
  autoRotateSpeed,
  onLoaded
}) => {
  const outer = useRef(null);
  const inner = useRef(null);
  const { camera, gl } = useThree();

  const vel = useRef({ x: 0, y: 0 });

  const ext = useMemo(() => url.split('.').pop().toLowerCase(), [url]);
  
  const gltfResult = useGLTF(url);
  const content = useMemo(() => {
    if (ext === 'glb' || ext === 'gltf') {
      return gltfResult ? gltfResult.scene.clone() : null;
    }
    if (ext === 'fbx') return useFBX(url).clone();
    if (ext === 'obj') return useLoader(OBJLoader, url).clone();
    console.error('Unsupported format:', ext);
    return null;
  }, [url, ext, gltfResult]);

  useLayoutEffect(() => {
    if (!content || !inner.current || !outer.current) return;
    const g = inner.current;
    
    if (autoFrame) {
      g.updateWorldMatrix(true, true);
      const sphere = new THREE.Box3().setFromObject(g).getBoundingSphere(new THREE.Sphere());
      const s = 1 / (sphere.radius * 2);
      g.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);
      g.scale.setScalar(s);
    } else {
      // Perfectly centered MacBook positioning
      g.position.set(0, -9, 0);
      g.scale.set(1, 1, 1);
    }

    // Create video texture for laptop screen (Object_123)
    let videoTexture = null;
    let videoEl = null;

    if (videoUrl) {
      videoEl = document.createElement('video');
      videoEl.src = videoUrl;
      videoEl.muted = true;
      videoEl.playsInline = true;
      videoEl.crossOrigin = 'anonymous';
      videoEl.loop = false;
      videoEl.preload = 'auto';

      const handleEnded = () => {
        videoEl.pause();
        if (videoEl.duration) {
          videoEl.currentTime = Math.max(0, videoEl.duration - 0.05);
        }
      };

      videoEl.addEventListener('ended', handleEnded);
      videoEl.play().catch(() => {});

      videoTexture = new THREE.VideoTexture(videoEl);
      videoTexture.colorSpace = THREE.SRGBColorSpace;
      videoTexture.flipY = true;
    }

    g.traverse(o => {
      if (o.isMesh) {
        if (o.material) {
          o.material.roughness = 0.35;
          o.material.metalness = 0.4;
        }
        o.castShadow = false;
        o.receiveShadow = false;
        if (fadeIn) {
          o.material.transparent = true;
          o.material.opacity = 0;
        }

        // Apply video texture to screen mesh Object_123 or any screen mesh
        if (videoTexture && (o.name === 'Object_123' || o.name.toLowerCase().includes('screen'))) {
          o.material = new THREE.MeshStandardMaterial({
            map: videoTexture,
            roughness: 0.1,
            metalness: 0.1,
            emissive: new THREE.Color(0xffffff),
            emissiveMap: videoTexture,
            emissiveIntensity: 1,
            toneMapped: true
          });
        }
      }
    });

    pivot.set(0, 0, 0);
    // Don't set initial rotation on outer - let OrbitControls handle camera position
    if (isTouch) {
      outer.current.rotation.set(initPitch, initYaw, 0);
    } else {
      outer.current.rotation.set(0, 0, 0);
    }

    if (fadeIn) {
      let t = 0;
      const id = setInterval(() => {
        t += 0.05;
        const v = Math.min(t, 1);
        g.traverse(o => {
          if (o.isMesh) o.material.opacity = v;
        });
        invalidate();
        if (v === 1) {
          clearInterval(id);
          onLoaded?.();
        }
      }, 16);
      return () => {
        clearInterval(id);
        if (videoEl) {
          videoEl.pause();
          videoEl.remove();
        }
        if (videoTexture) videoTexture.dispose();
      };
    } else {
      onLoaded?.();
      return () => {
        if (videoEl) {
          videoEl.pause();
          videoEl.remove();
        }
        if (videoTexture) videoTexture.dispose();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, videoUrl]);

  useEffect(() => {
    // Disable manual rotation on desktop - let OrbitControls handle it
    if (!enableManualRotation || !isTouch) return;
    const el = gl.domElement;
    let drag = false;
    let lx = 0,
      ly = 0;
    const down = e => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      drag = true;
      lx = e.clientX;
      ly = e.clientY;
      window.addEventListener('pointerup', up);
    };
    const move = e => {
      if (!drag) return;
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
      outer.current.rotation.y += dx * ROTATE_SPEED;
      outer.current.rotation.x += dy * ROTATE_SPEED;
      vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
      invalidate();
    };
    const up = () => (drag = false);
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [gl, enableManualRotation]);

  useEffect(() => {
    if (!isTouch) return;
    const el = gl.domElement;
    const pts = new Map();

    let mode = 'idle';
    let sx = 0,
      sy = 0,
      lx = 0,
      ly = 0,
      startDist = 0,
      startZ = 0;

    const down = e => {
      if (e.pointerType !== 'touch') return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 1) {
        mode = 'decide';
        sx = lx = e.clientX;
        sy = ly = e.clientY;
      } else if (pts.size === 2 && enableManualZoom) {
        mode = 'pinch';
        const [p1, p2] = [...pts.values()];
        startDist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        startZ = camera.position.z;
        e.preventDefault();
      }
      invalidate();
    };

    const move = e => {
      const p = pts.get(e.pointerId);
      if (!p) return;
      p.x = e.clientX;
      p.y = e.clientY;

      if (mode === 'decide') {
        const dx = e.clientX - sx;
        const dy = e.clientY - sy;
        if (Math.abs(dx) > DECIDE || Math.abs(dy) > DECIDE) {
          if (enableManualRotation && Math.abs(dx) > Math.abs(dy)) {
            mode = 'rotate';
            el.setPointerCapture(e.pointerId);
          } else {
            mode = 'idle';
            pts.clear();
          }
        }
      }

      if (mode === 'rotate') {
        e.preventDefault();
        const dx = e.clientX - lx;
        const dy = e.clientY - ly;
        lx = e.clientX;
        ly = e.clientY;
        outer.current.rotation.y += dx * ROTATE_SPEED;
        outer.current.rotation.x += dy * ROTATE_SPEED;
        vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
        invalidate();
      } else if (mode === 'pinch' && pts.size === 2 && enableManualZoom) {
        e.preventDefault();
        const [p1, p2] = [...pts.values()];
        const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        const ratio = startDist / d;
        camera.position.z = THREE.MathUtils.clamp(startZ * ratio, minZoom, maxZoom);
        invalidate();
      }
    };

    const up = e => {
      pts.delete(e.pointerId);
      if (mode === 'rotate' && pts.size === 0) mode = 'idle';
      if (mode === 'pinch' && pts.size < 2) mode = 'idle';
    };

    el.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('pointercancel', up, { passive: true });
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, enableManualRotation, enableManualZoom, minZoom, maxZoom]);

  useFrame((_, dt) => {
    if (!outer.current) return;
    let need = false;

    outer.current.position.x = xOff;
    outer.current.position.y = yOff;

    // Only apply auto-rotate if enabled (not during user interaction)
    if (autoRotate && !isTouch) {
      outer.current.rotation.y += autoRotateSpeed * dt;
      need = true;
    }

    // Apply inertia for touch devices only
    if (isTouch) {
      outer.current.rotation.y += vel.current.x;
      outer.current.rotation.x += vel.current.y;
      vel.current.x *= INERTIA;
      vel.current.y *= INERTIA;
      if (Math.abs(vel.current.x) > 1e-4 || Math.abs(vel.current.y) > 1e-4) need = true;
    }

    if (need) invalidate();
  });

  if (!content) return null;
  return (
    <group ref={outer}>
      <group ref={inner}>
        <primitive object={content} />
      </group>
    </group>
  );
};

const ModelViewer = ({
  url = '/models/animator.glb',
  videoUrl = '/videos/Animater.mp4',
  width = '100%',
  height = '100%',
  modelXOffset = 0,
  modelYOffset = 0,
  defaultRotationX = 0,
  defaultRotationY = 0,
  defaultZoom = 76,
  minZoomDistance = 76,
  maxZoomDistance = 76,
  enableMouseParallax = false,
  enableManualRotation = true,
  enableHoverRotation = false,
  enableManualZoom = false,
  ambientIntensity = 0.5,
  keyLightIntensity = 0.8,
  fillLightIntensity = 0.5,
  rimLightIntensity = 0.6,
  autoFrame = false,
  placeholderSrc,
  showScreenshotButton = false,
  fadeIn = false,
  autoRotate = false,
  autoRotateSpeed = 0.35,
  onModelLoaded
}) => {
  const pivot = useRef(new THREE.Vector3(0, 0, 0)).current;
  const contactRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  const initYaw = deg2rad(defaultRotationX);
  const initPitch = deg2rad(defaultRotationY);

  const capture = () => {
    const g = rendererRef.current,
      s = sceneRef.current,
      c = cameraRef.current;
    if (!g || !s || !c) return;
    g.shadowMap.enabled = false;
    const tmp = [];
    s.traverse(o => {
      if (o.isLight && 'castShadow' in o) {
        tmp.push({ l: o, cast: o.castShadow });
        o.castShadow = false;
      }
    });
    if (contactRef.current) contactRef.current.visible = false;
    g.render(s, c);
    const urlPNG = g.domElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.download = 'model.png';
    a.href = urlPNG;
    a.click();
    g.shadowMap.enabled = true;
    tmp.forEach(({ l, cast }) => (l.castShadow = cast));
    if (contactRef.current) contactRef.current.visible = true;
    invalidate();
  };

  return (
    <div
      style={{
        width,
        height,
        touchAction: 'pan-y',
        position: 'relative'
      }}
    >
      {showScreenshotButton && (
        <button
          onClick={capture}
          style={{
            position: 'absolute',
            border: '1px solid #fff',
            right: 16,
            top: 16,
            zIndex: 10,
            cursor: 'pointer',
            padding: '8px 16px',
            borderRadius: 10,
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: '#fff'
          }}
        >
          Take Screenshot
        </button>
      )}

      <Canvas
        shadows
        frameloop="always"
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl, scene, camera }) => {
          rendererRef.current = gl;
          sceneRef.current = scene;
          cameraRef.current = camera;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
        camera={{ fov: 30, position: [0, 1, defaultZoom], near: 0.1, far: 1000 }}
        style={{ touchAction: 'pan-y' }}
      >
        {/* Bright White Lighting Setup */}
        <ambientLight color="#ffffff" intensity={ambientIntensity} />
        <directionalLight color="#ffffff" position={[10, 8, 15]} intensity={keyLightIntensity} castShadow={false} />
        <directionalLight color="#ff6a00" position={[-8, 10, -15]} intensity={rimLightIntensity} castShadow={false} />
        <directionalLight color="#ffffff" position={[-15, 5, -5]} intensity={fillLightIntensity} castShadow={false} />
        <spotLight color="#ffffff" position={[0, 15, 10]} intensity={0.6} angle={0.6} penumbra={0.5} castShadow={false} />

        <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>
          <ModelInner
            url={url}
            videoUrl={videoUrl}
            xOff={modelXOffset}
            yOff={modelYOffset}
            pivot={pivot}
            initYaw={initYaw}
            initPitch={initPitch}
            minZoom={minZoomDistance}
            maxZoom={maxZoomDistance}
            enableMouseParallax={enableMouseParallax}
            enableManualRotation={enableManualRotation}
            enableHoverRotation={enableHoverRotation}
            enableManualZoom={enableManualZoom}
            autoFrame={autoFrame}
            fadeIn={fadeIn}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            onLoaded={onModelLoaded}
          />
        </Suspense>

        {!isTouch && (
          <DesktopControls pivot={pivot} min={minZoomDistance} max={maxZoomDistance} zoomEnabled={enableManualZoom} initYaw={initYaw} initPitch={initPitch} />
        )}
      </Canvas>
    </div>
  );
};

export default ModelViewer;
