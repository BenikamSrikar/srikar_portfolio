"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function ModelView({ startAnimation, staticMode = false, useVideoTexture = false, onModelLoad }) {
  const mountRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  
  const mixerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const modelLoadedRef = useRef(false);
  const actionsRef = useRef([]);
  const cameraRef = useRef(null);
  const staticModeRef = useRef(staticMode);
  const animationCompletedRef = useRef(false);
  
  // Update ref when staticMode changes
  useEffect(() => {
    staticModeRef.current = staticMode;
  }, [staticMode]);

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
    
    camera.position.set(0, 1, 65);
    cameraRef.current = camera;

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

    // ---------------- REALISTIC WHITE LIGHTING MATRIX ----------------
    // Ambient Light: Soft white base fill for natural shadows
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); 
    scene.add(ambientLight);

    // FRONT LIGHTING (White Key Light)
    // Primary front-right key light for natural illumination
    const frontWhiteKey = new THREE.DirectionalLight(0xffffff, 0.8);
    frontWhiteKey.position.set(15, 10, 20);
    scene.add(frontWhiteKey);

    // Dedicated point light hovering directly above the keyboard for realistic key illumination
    const keyboardWhiteGlow = new THREE.PointLight(0xffffff, 12, 90);
    keyboardWhiteGlow.position.set(0, 2, 12);
    scene.add(keyboardWhiteGlow);

    // BACK LIGHTING (White Rim Light)
    // Strong rim light behind the model to illuminate the Apple logo and lid edges
    const backWhiteRim = new THREE.DirectionalLight(0x0DFF8C00, 0.6);
    backWhiteRim.position.set(-15, 15, -25);
    scene.add(backWhiteRim);

    // Secondary soft fill from the upper left back to catch the curvature of the outer shell
    const backLeftFill = new THREE.DirectionalLight(0xffffff, 0.5);
    backLeftFill.position.set(-25, 20, -10);
    scene.add(backLeftFill);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enabled = true;
    controls.minDistance = 15;
    controls.maxDistance = 80;
    
    controls.target.set(0, 0, 0); 
    controlsRef.current = controls;

    let screenTexture;
    
    if (useVideoTexture) {
      // Video texture implementation with preload
      const video = document.createElement("video");
      video.src = "/videos/Animater.mp4";
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = "anonymous";
      video.loop = false;
      video.preload = "auto"; // Preload the video
      video.style.position = "absolute";
      video.style.top = "-9999px";
      video.style.left = "-9999px";
      video.style.width = "1px";
      video.style.height = "1px";
      video.style.opacity = "0.01";
      document.body.appendChild(video);
      
      // Start loading immediately
      video.load();
      
      // Aggressive autoplay on any ready state
      const attemptPlay = () => {
        video.play().catch(() => {
          // Silent catch - will retry
        });
      };
      
      video.addEventListener("loadedmetadata", attemptPlay);
      video.addEventListener("canplay", attemptPlay);
      video.addEventListener("canplaythrough", attemptPlay);
      
      video.addEventListener("ended", () => {
        video.pause();
        video.currentTime = video.duration - 0.05;
      });
      
      videoRef.current = video;
      screenTexture = new THREE.VideoTexture(video);
      screenTexture.colorSpace = THREE.SRGBColorSpace;
      screenTexture.flipY = true;
    } else {
      // Canvas texture implementation for Contact page
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 768;
      const ctx = canvas.getContext("2d");
      canvasRef.current = canvas;

      // Draw Contact page design on canvas
      const drawContactPage = () => {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000000";
        ctx.font = "bold 48px Arial";
        ctx.fillText("Thank You", 50, 100);
        ctx.fillStyle = "#374151";
        ctx.font = "bold 40px Arial";
        ctx.fillText("for visiting", 50, 160);
        ctx.fillStyle = "#4b5563";
        ctx.font = "18px Arial";
        const message = "I appreciate you taking the time to explore my portfolio. If you have any questions, opportunities, or just want to connect, feel free to reach out.";
        ctx.fillText(message, 50, 220, 400);
        ctx.fillStyle = "#dbeafe";
        ctx.beginPath();
        ctx.arc(70, 300, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#2563eb";
        ctx.font = "16px Arial";
        ctx.fillText("Email", 110, 290);
        ctx.fillStyle = "#000000";
        ctx.font = "14px Arial";
        ctx.fillText("benikam.srikar@example.com", 110, 310);
        ctx.fillStyle = "#dbeafe";
        ctx.beginPath();
        ctx.arc(70, 360, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#2563eb";
        ctx.font = "16px Arial";
        ctx.fillText("Location", 110, 350);
        ctx.fillStyle = "#000000";
        ctx.font = "14px Arial";
        ctx.fillText("Hyderabad, India", 110, 370);
        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(500, 50);
        ctx.lineTo(500, 700);
        ctx.stroke();
        ctx.fillStyle = "#f3f4f6";
        ctx.fillRect(550, 80, 424, 600);
        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 1;
        ctx.strokeRect(550, 80, 424, 600);
        ctx.fillStyle = "#000000";
        ctx.font = "bold 36px Arial";
        ctx.fillText("Contact Us", 620, 140);
        ctx.fillStyle = "#4b5563";
        ctx.font = "16px Arial";
        ctx.fillText("Send me a message and I'll get back to you", 570, 180, 380);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(570, 220, 384, 40);
        ctx.strokeStyle = "#d1d5db";
        ctx.strokeRect(570, 220, 384, 40);
        ctx.fillStyle = "#6b7280";
        ctx.font = "14px Arial";
        ctx.fillText("Name", 580, 245);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(570, 280, 384, 40);
        ctx.strokeRect(570, 280, 384, 40);
        ctx.fillText("Email", 580, 305);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(570, 340, 384, 120);
        ctx.strokeRect(570, 340, 384, 120);
        ctx.fillText("Message", 580, 365);
        ctx.fillStyle = "#2563eb";
        ctx.fillRect(570, 500, 384, 48);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 16px Arial";
        ctx.fillText("Send Message", 680, 530);
      };

      drawContactPage();
      screenTexture = new THREE.CanvasTexture(canvas);
      screenTexture.colorSpace = THREE.SRGBColorSpace;
      screenTexture.flipY = true;
    }

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
            map: screenTexture,
            roughness: 0.1, 
            metalness: 0.1,
            emissive: new THREE.Color(0xffffff),
            emissiveMap: screenTexture,
            emissiveIntensity: useVideoTexture ? 1.1 : 0.8, 
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
        
        // Notify parent that model is loaded
        if (onModelLoad) {
          onModelLoad();
        }
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      let delta = clock.getDelta();
      if (delta <= 0 || delta > 0.1) delta = 0.016;
      
      if (mixerRef.current) {
        // Only update mixer if animation hasn't completed in static mode
        if (!staticModeRef.current || !animationCompletedRef.current) {
          mixerRef.current.update(delta);
          
          // Check if animation completed in static mode
          if (staticModeRef.current && actionsRef.current.length > 0) {
            const allCompleted = actionsRef.current.every(action => action.time >= action.getClip().duration - 0.05);
            if (allCompleted) {
              // Mark as completed and pause all actions
              animationCompletedRef.current = true;
              actionsRef.current.forEach(action => {
                action.paused = true;
              });
            }
          }
        }
      }
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
      if (screenTexture) screenTexture.dispose();
      if (videoRef.current) {
        videoRef.current.pause();
        if (videoRef.current.parentNode) {
          videoRef.current.parentNode.removeChild(videoRef.current);
        }
      }
      if (renderer) renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (startAnimation && modelLoadedRef.current && !staticMode) {
      actionsRef.current.forEach(action => action.play());

      setTimeout(() => {
        if (controlsRef.current) controlsRef.current.enabled = true;
      }, 2500);
    }
    
    if (staticMode && modelLoadedRef.current) {
      // Enable controls immediately for static mode
      if (controlsRef.current) controlsRef.current.enabled = true;
      
      // Play animation to reach last frame
      actionsRef.current.forEach(action => action.play());
    }
  }, [startAnimation, staticMode, useVideoTexture]);

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