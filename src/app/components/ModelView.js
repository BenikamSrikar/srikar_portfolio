"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

export default function ModelView() {
  const mountRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (!mountRef.current) return

    const container = mountRef.current
    const scene = new THREE.Scene()
    scene.background = null

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    
    // Fit calculation - zoomed out to show full model
    const getFitZ = (w, h) => {
      const aspect = w / h;
      if (aspect < 1) {
        // Portrait / Mobile: Adjust Z based on aspect ratio to fit width
        return Math.max(60, Math.min(90, 65 / aspect));
      }
      // Landscape / Desktop: Standard distance - zoomed out further
      return 85;
    }

    camera.position.set(0, 0, getFitZ(container.clientWidth, container.clientHeight))

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
      precision: "mediump",
    })
    renderer.setClearColor(0xffffff, 0)
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NoToneMapping
    renderer.toneMappingExposure = 1.0

    container.appendChild(renderer.domElement)

    // ---------------- LIGHTING ----------------
    // White lighting for white background - soft and even
    
    // Optimized lighting - reduced for performance
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0)
    keyLight.position.set(15, 20, 15)
    keyLight.castShadow = false
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8)
    fillLight.position.set(-12, 8, 10)
    fillLight.castShadow = false
    scene.add(fillLight)

    // ---------------- CONTROLS ----------------
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enableZoom = false
    controls.enabled = false
    controls.target.set(0, 2, 0)

    // ---------------- VIDEO ----------------
    const video = document.createElement("video")
    video.src = "/videos/Animater.mp4"
    video.loop = false // Play once only, not in loop
    video.muted = true
    video.playsInline = true
    video.autoplay = true
    video.crossOrigin = "anonymous"

    const videoTexture = new THREE.VideoTexture(video)
    videoTexture.colorSpace = THREE.SRGBColorSpace
    videoTexture.flipY = true // Fix inverted video by flipping Y axis
    videoTexture.wrapS = THREE.ClampToEdgeWrapping
    videoTexture.wrapT = THREE.ClampToEdgeWrapping

    // Better video play handling - delay video start to sync with model animation
    const playVideo = async () => {
      try {
        // Delay video start by 1 second after animation begins
        setTimeout(async () => {
          await video.play()
          console.log('Video started playing after 1 second delay (will play once)')
          
          // Stop video when it ends to prevent looping
          video.addEventListener('ended', () => {
            console.log('Video finished playing')
            video.pause() // Ensure it stays paused at the end
          })
        }, 1000) // 1 second delay (reduced from 3 seconds)
        
      } catch (error) {
        console.warn('Video autoplay blocked:', error)
        // Try to play on user interaction with delay
        const playOnInteraction = () => {
          setTimeout(() => {
            video.play().then(() => {
              console.log('Video started playing after user interaction + 1 second delay (will play once)')
              video.addEventListener('ended', () => {
                console.log('Video finished playing')
                video.pause()
              })
              document.removeEventListener('click', playOnInteraction)
              document.removeEventListener('touchstart', playOnInteraction)
            })
          }, 1000) // 1 second delay even for user interaction
        }
        document.addEventListener('click', playOnInteraction)
        document.addEventListener('touchstart', playOnInteraction)
      }
    }

    // Don't start video immediately - it will start with delay after model animation begins
    console.log('Video prepared - will start 1 second after model animation begins')

    // ---------------- MODEL ----------------
    let mixer = null
    const clock = new THREE.Clock()
    const loader = new GLTFLoader()

    loader.load("/models/animator.glb", 
      (gltf) => {
        console.log('Model loaded successfully:', gltf)
        console.log('Available animations:', gltf.animations)
        
        const model = gltf.scene
        scene.add(model)

        model.position.set(-0, -9, 0)
        model.scale.set(1.1, 1.1, 1.1)

        const screen = model.getObjectByName("Object_123")
        if (screen && screen.isMesh) {
          screen.material = new THREE.MeshStandardMaterial({
            map: videoTexture,
            emissive: new THREE.Color(0xffffff),
            emissiveMap: videoTexture,
            emissiveIntensity: 0.5,
            toneMapped: false,
          })
          console.log('Screen material applied successfully')
        } else {
          console.warn('Screen object not found or not a mesh')
        }

        if (gltf.animations && gltf.animations.length > 0) {
          console.log(`Found ${gltf.animations.length} animations:`, gltf.animations.map(a => a.name))
          
          mixer = new THREE.AnimationMixer(gltf.scene)
          
          // Configure mixer properties
          mixer.timeScale = 1.0
          
          // Store actions for debugging
          const actions = []
          
          gltf.animations.forEach((clip, index) => {
            console.log(`Setting up animation ${index}: ${clip.name}, duration: ${clip.duration}s, tracks: ${clip.tracks.length}`)
            
            const action = mixer.clipAction(clip)
            
            // Configure animation properties step by step
            action.enabled = true
            action.setLoop(THREE.LoopOnce) // Play animation once only
            action.clampWhenFinished = true // Hold at the last frame
            action.zeroSlopeAtStart = false
            action.zeroSlopeAtEnd = false
            
            // Set time scale and weight
            action.setEffectiveTimeScale(1.0)
            action.setEffectiveWeight(1.0)
            
            // Reset to initial state
            action.reset()
            
            // Start the action
            action.play()
            
            actions.push(action)
            
            console.log(`Animation ${index} configured to play once:`, {
              enabled: action.enabled,
              isRunning: action.isRunning(),
              paused: action.paused,
              loop: action.loop,
              clampWhenFinished: action.clampWhenFinished,
              timeScale: action.getEffectiveTimeScale(),
              weight: action.getEffectiveWeight(),
              duration: clip.duration
            })
          })
          
          // Force an initial mixer update
          mixer.update(0.0001) // Small non-zero delta to initialize
          
          console.log('Mixer initialized with timeScale:', mixer.timeScale)
          console.log('Total actions created:', actions.length)
          
          // Start video playback process (with 3 second delay) as soon as animations start
          playVideo()
          
          // Don't restart actions - let them play once and finish
          setTimeout(() => {
            actions.forEach((action, i) => {
              if (!action.isRunning() && action.time === 0) {
                console.warn(`Action ${i} not running from start, force starting...`)
                action.reset() 
                action.play()
              }
            })
          }, 100)

          // Enable controls after animation completes
          const longestAnimation = Math.max(...gltf.animations.map(clip => clip.duration))
          setTimeout(() => { 
            controls.enabled = true 
            console.log('Controls enabled after animation completed:', longestAnimation, 'seconds')
            console.log('Final animation status:')
            actions.forEach((action, i) => {
              console.log(`Action ${i}:`, {
                running: action.isRunning(),
                time: action.time,
                finished: action.time >= gltf.animations[i].duration,
                timeScale: action.getEffectiveTimeScale(),
                weight: action.getEffectiveWeight()
              })
            })
          }, (longestAnimation * 1000) + 500) // Animation duration + 500ms buffer
        } else {
          console.log('No animations found in the model')
          controls.enabled = true
        }
        
        setIsFocused(true)
        console.log('Model setup complete')
        
        // Check animation state but don't force restart completed animations
        if (mixer) {
          setTimeout(() => {
            console.log('Checking final animation state...')
            mixer._actions.forEach((action, i) => {
              if (!action.isRunning() && action.time === 0) {
                console.log(`Action ${i} never started, attempting initial start...`)
                action.reset()
                action.play()
              } else if (!action.isRunning() && action.time > 0) {
                console.log(`Action ${i} finished and holding at last frame (time: ${action.time.toFixed(2)}s)`)
              } else {
                console.log(`Action ${i} still running (time: ${action.time.toFixed(2)}s)`)
              }
            })
          }, 2000)
        }
      },
      (progress) => {
        console.log('Model loading progress:', (progress.loaded / progress.total * 100) + '%')
      },
      (error) => {
        console.error('Error loading model:', error)
      }
    )

    // --- Animation loop with robust time handling ---
    let frameId;
    let startTime = performance.now();
    
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      
      // Get current time
      const currentTime = performance.now()
      const elapsedTime = (currentTime - startTime) / 1000
      
      // Get delta time from clock
      let delta = clock.getDelta()
      
      // Fallback delta calculation if clock fails
      if (delta <= 0 || delta > 0.1) {
        delta = Math.min(1/60, 0.016) // Default to 60fps
      }
      
      // Update animation mixer if it exists
      if (mixer && delta > 0) {
        try {
          mixer.update(delta)
          
          // Debug every 2 seconds
          if (Math.floor(elapsedTime) % 2 === 0 && Math.floor(elapsedTime) !== Math.floor((currentTime - 16.67) / 1000)) {
            const activeActions = mixer._actions.filter(action => action.isRunning())
            const finishedActions = mixer._actions.filter(action => !action.isRunning() && action.time > 0)
            console.log(`Animation debug - Active: ${activeActions.length}, Finished: ${finishedActions.length}, Total: ${mixer._actions.length}, Delta: ${delta.toFixed(4)}, Time: ${elapsedTime.toFixed(1)}s`)
            
            // Don't restart finished animations - they should stay at last frame
            finishedActions.forEach((action, i) => {
              console.log(`Action ${i} finished and holding at last frame (time: ${action.time.toFixed(2)}s)`)
            })
          }
        } catch (error) {
          console.error('Mixer update error:', error)
        }
      }
      
      // Update controls
      if (controls) {
        controls.update()
      }
      
      // Render the scene
      if (renderer && scene && camera) {
        renderer.render(scene, camera)
      }
    }
    
    // Start the animation loop
    console.log('Starting animation loop with robust time handling')
    animate()

    const handleResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.position.z = getFitZ(width, height)
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      // Clean up animation frame
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
      
      // Clean up event listeners
      window.removeEventListener("resize", handleResize)
      
      // Clean up video
      if (video) {
        video.pause()
        video.currentTime = 0
      }
      
      // Clean up textures
      if (videoTexture) {
        videoTexture.dispose()
      }
      
      // Clean up animation mixer
      if (mixer) {
        mixer.stopAllAction()
        mixer.uncacheRoot(mixer.getRoot())
      }
      
      // Clean up Three.js resources
      if (renderer) {
        renderer.dispose()
      }
      
      // Clean up the DOM element
      if (container && renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      
      console.log('ModelView cleanup completed')
    }
  }, [])

  return (
    <div className="w-full h-full relative">
      <div
        ref={mountRef}
        style={{
          filter: isFocused ? "blur(0px)" : "blur(12px)",
          opacity: isFocused ? 1 : 0,
          transition: "filter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-out",
          backgroundColor: "transparent",
          backgroundImage: "none"
        }}
        className="w-full h-full bg-transparent pointer-events-none lg:pointer-events-auto"
      />
      
      {/* XYZ Axis Control - Hidden */}
      <div className="absolute bottom-6 left-6 w-32 h-32 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 pointer-events-auto hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* X Axis - Red */}
          <line x1="50" y1="50" x2="90" y2="50" stroke="#ff0000" strokeWidth="2" />
          <text x="92" y="52" fontSize="12" fill="#ff0000" fontWeight="bold">X</text>
          
          {/* Y Axis - Green */}
          <line x1="50" y1="50" x2="50" y2="10" stroke="#00ff00" strokeWidth="2" />
          <text x="48" y="8" fontSize="12" fill="#00ff00" fontWeight="bold">Y</text>
          
          {/* Z Axis - Blue */}
          <line x1="50" y1="50" x2="75" y2="70" stroke="#0099ff" strokeWidth="2" />
          <text x="77" y="72" fontSize="12" fill="#0099ff" fontWeight="bold">Z</text>
          
          {/* Center point */}
          <circle cx="50" cy="50" r="3" fill="#ffffff" />
        </svg>
        <p className="text-xs text-white/70 text-center mt-2 font-mono">Rotation</p>
      </div>
    </div>
  )
}