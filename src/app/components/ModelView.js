"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function ModelView({ startAnimation }) {
  const mountRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  
  const mixerRef = useRef(null);
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const modelLoadedRef = useRef(false);
  const actionsRef = useRef([]);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      40, 
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    
    camera.position.set(0, 10, 65);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2; // Boosted exposure slightly for higher dynamic contrast
    container.appendChild(renderer.domElement);

    // ---------------- CINEMATIC SPLIT LIGHTING MATRIX ----------------
    // Ambient Light: Very subtle dark blue base fill to keep absolute shadows clean
    const ambientLight = new THREE.AmbientLight(0x0a1128, 0.1); 
    scene.add(ambientLight);

    // FRONT LIGHTING (Vibrant Blue Profile)
    // Primary front-right key light throwing deep blue over the keyboard and inner bezel
    const frontBlueKey = new THREE.DirectionalLight(0xffffff, 0.5);
    frontBlueKey.position.set(15, 10, 20);
    scene.add(frontBlueKey);

    // Dedicated point light hovering directly above the keyboard to enhance the glow effect on keys
    const keyboardBlueGlow = new THREE.PointLight(0x00d2ff, 18, 90);
    keyboardBlueGlow.position.set(0, 2, 12);
    scene.add(keyboardBlueGlow);

    // BACK LIGHTING (Crisp White Backlight Profile)
    // Strong rim light behind the model to illuminate the Apple logo and lid edges when closed/opening
    const backWhiteRim = new THREE.DirectionalLight(0xFFD700, 0.5);
    backWhiteRim.position.set(-15, 15, -25);
    scene.add(backWhiteRim);

    // Secondary soft fill from the upper left back to catch the curvature of the outer shell
    const backLeftFill = new THREE.DirectionalLight(0x0077ff, 1);
    backLeftFill.position.set(-25, 20, -10);
    scene.add(backLeftFill);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enabled = false;
    
    controls.target.set(0, 0, 0); 
    controlsRef.current = controls;

    // Video texture implementation
    const video = document.createElement("video");
    video.src = "/videos/Animater.mp4";
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    video.loop = false; 
    
    video.addEventListener("ended", () => {
      video.pause();
      video.currentTime = video.duration - 0.05; 
    });
    
    videoRef.current = video;

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.flipY = true;

    const clock = new THREE.Clock();
    const loader = new GLTFLoader();

    loader.load("/models/animator.glb", 
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        
        model.position.set(0, -9, 0);
        model.scale.set(1, 1, 1);

        model.traverse((child) => {
          if (child.isMesh && child.material) {
            // Lowered roughness slightly to let the surfaces capture the rim lights nicely
            child.material.roughness = 0.35;
            child.material.metalness = 0.5;
          }
        });

        const screen = model.getObjectByName("Object_123");
        if (screen && screen.isMesh) {
          screen.material = new THREE.MeshStandardMaterial({
            map: videoTexture,
            roughness: 0.1, 
            metalness: 0.1,
            emissive: new THREE.Color(0xffffff),
            emissiveMap: videoTexture,
            emissiveIntensity: 1.1, 
            toneMapped: true, 
          });
        }

        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;
          
          actionsRef.current = gltf.animations.map(clip => {
            const action = mixer.clipAction(clip);
            action.setLoop(THREE.LoopOnce);
            action.clampWhenFinished = true;
            return action;
          });
        }
        
        modelLoadedRef.current = true;
        setIsFocused(true);
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      let delta = clock.getDelta();
      if (delta <= 0 || delta > 0.1) delta = 0.016;
      
      if (mixerRef.current) mixerRef.current.update(delta);
      if (controls) controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      if (video) video.pause();
      videoTexture.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (startAnimation && modelLoadedRef.current) {
      actionsRef.current.forEach(action => action.play());

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(e => console.log("Video setup delay block:", e));
        }
      }, 700);

      setTimeout(() => {
        if (controlsRef.current) controlsRef.current.enabled = true;
      }, 2500);
    }
  }, [startAnimation]);

  return (
    <div className="w-full h-full relative bg-transparent">
      <div
        ref={mountRef}
        style={{
          filter: isFocused ? "blur(0px)" : "blur(10px)",
          opacity: isFocused ? 1 : 0,
          transition: "filter 0.5s ease-out, opacity 0.5s ease-out"
        }}
        className="w-full h-full bg-transparent"
      />
    </div>
  );
}