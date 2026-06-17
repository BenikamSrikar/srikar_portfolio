'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BlackHoleSimulation() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;

    // ─── Scene Setup ───
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // ─── Full-screen Quad with Custom Shader ───
    const geometry = new THREE.PlaneGeometry(2, 2);

    const vertexShader = /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = /* glsl */ `
      precision highp float;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uMouseX;
      uniform float uMouseY;

      varying vec2 vUv;

      #define PI 3.14159265359
      #define MAX_STEPS 150
      #define STEP_SIZE 0.1

      // ─── Black Hole Parameters ───
      #define RS 1.0
      #define DISK_INNER 2.6
      #define DISK_OUTER 12.0

      // ─── Hash for procedural stars ───
      float hash(vec3 p) {
        p = fract(p * vec3(443.897, 441.423, 437.195));
        p += dot(p, p.yzx + 19.19);
        return fract((p.x + p.y) * p.z);
      }

      float hash2(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      // ─── Noise for disk detail ───
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash2(i);
        float b = hash2(i + vec2(1.0, 0.0));
        float c = hash2(i + vec2(0.0, 1.0));
        float d = hash2(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      // ─── Star background ───
      vec3 stars(vec3 dir) {
        vec3 p = dir * 200.0;
        vec3 id = floor(p);
        float h = hash(id);
        vec3 c = vec3(0.0);
        if (h > 0.992) {
          float brightness = smoothstep(0.992, 1.0, h) * 3.0;
          // Twinkle
          brightness *= 0.7 + 0.3 * sin(uTime * 2.0 + h * 100.0);
          // Color temperature variation
          vec3 starColor = mix(
            vec3(0.6, 0.8, 1.0),    // Blue-white
            vec3(1.0, 0.9, 0.7),     // Warm white
            hash(id + 42.0)
          );
          c = starColor * brightness;
        }
        // Dimmer star layer
        vec3 p2 = dir * 500.0;
        vec3 id2 = floor(p2);
        float h2 = hash(id2);
        if (h2 > 0.997) {
          c += vec3(0.4, 0.5, 0.7) * smoothstep(0.997, 1.0, h2) * 1.5;
        }
        return c;
      }

      // ─── Accretion Disk Color ───
      vec3 diskColor(float r, float angle, float crossY) {
        // Normalize radius
        float t = (r - DISK_INNER) / (DISK_OUTER - DISK_INNER);
        t = clamp(t, 0.0, 1.0);

        // Temperature: hotter closer to black hole
        float temp = pow(1.0 - t, 1.5);

        // Color gradient based on temperature (black body approximation)
        vec3 hotCore   = vec3(1.0, 1.0, 1.0);       // White-hot
        vec3 midWarm   = vec3(1.0, 0.75, 0.3);       // Bright orange
        vec3 outerCool = vec3(0.8, 0.25, 0.05);      // Deep red-orange
        vec3 edgeDim   = vec3(0.3, 0.08, 0.02);      // Dim red

        vec3 col;
        if (temp > 0.8) {
          col = mix(midWarm, hotCore, (temp - 0.8) / 0.2);
        } else if (temp > 0.5) {
          col = mix(outerCool, midWarm, (temp - 0.5) / 0.3);
        } else if (temp > 0.2) {
          col = mix(edgeDim, outerCool, (temp - 0.2) / 0.3);
        } else {
          col = edgeDim * (temp / 0.2);
        }

        // Turbulent noise for structure
        float turbulence = fbm(vec2(angle * 2.0 + uTime * 0.05, log(r) * 3.0));
        col *= 0.6 + 0.5 * turbulence;

        // Spiral arms
        float spiral = sin(angle * 4.0 - log(r) * 6.0 + uTime * 0.15) * 0.3 + 0.7;
        col *= spiral;

        // Brightness falloff with radius
        float brightness = pow(DISK_INNER / r, 1.2) * 3.0;
        col *= brightness;

        // Inner edge glow
        float innerGlow = exp(-pow((r - DISK_INNER) / 0.5, 2.0)) * 2.0;
        col += vec3(0.5, 0.7, 1.0) * innerGlow * 0.3;

        return col;
      }

      // ─── Photon Ring ───
      vec3 photonRing(float impactParam) {
        // The photon sphere is at r = 1.5 * RS
        // Critical impact parameter b_c = 3*sqrt(3)/2 * RS ≈ 2.598 * RS
        float b_c = 2.598 * RS;
        float dist = abs(impactParam - b_c);
        float ring = exp(-dist * dist * 50.0) * 3.0;
        return vec3(1.0, 0.85, 0.6) * ring;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

        // ─── Camera Setup ───
        float camDist = 30.0;
        // Classic Interstellar view angle (slightly above equatorial plane)
        float inclination = 1.2; // radians from pole (close to edge-on)

        // Gentle camera sway
        float swayX = sin(uTime * 0.08) * 0.02;
        float swayY = cos(uTime * 0.06) * 0.01;

        vec3 camPos = vec3(
          camDist * sin(inclination) * cos(swayX),
          camDist * cos(inclination) + swayY * camDist,
          camDist * sin(inclination) * sin(swayX)
        );

        vec3 camTarget = vec3(0.0, 0.0, 0.0);

        // Camera basis vectors
        vec3 forward = normalize(camTarget - camPos);
        vec3 worldUp = vec3(0.0, 1.0, 0.0);
        vec3 right = normalize(cross(forward, worldUp));
        vec3 up = normalize(cross(right, forward));

        // Ray direction
        float fov = 2.2;
        vec3 rd = normalize(forward * fov + right * uv.x + up * uv.y);
        vec3 ro = camPos;

        // ─── Ray Integration through Curved Spacetime ───
        vec3 pos = ro;
        vec3 vel = rd * 1.0;

        vec3 color = vec3(0.0);
        float diskAlpha = 0.0;
        float prevY = pos.y;
        bool escaped = false;

        for (int i = 0; i < MAX_STEPS; i++) {
          float r = length(pos);

          // Fell into event horizon
          if (r < RS * 0.5) {
            color = mix(color, vec3(0.0), 1.0 - diskAlpha);
            escaped = true;
            break;
          }

          // ─── Gravitational Acceleration ───
          // GR correction: includes the relativistic term
          // a = -M/r³ * pos * (1 + 3*h²/r²)
          // where h = |pos × vel| (specific angular momentum)
          vec3 crossPV = cross(pos, vel);
          float h2 = dot(crossPV, crossPV);
          float r2 = r * r;
          float r3 = r2 * r;
          vec3 accel = -pos / r3 * (1.0 + 3.0 * h2 / r2);

          // Adaptive step size based on distance
          float stepSize = STEP_SIZE * (0.5 + 0.5 * smoothstep(3.0, 20.0, r));

          vel += accel * stepSize;
          pos += vel * stepSize;

          float newR = length(pos);

          // ─── Check Disk Crossing (y = 0 plane) ───
          if (pos.y * prevY < 0.0) {
            // Interpolate to find crossing point
            float t_cross = abs(prevY) / (abs(prevY) + abs(pos.y));
            vec3 crossPos = pos - vel * stepSize * (1.0 - t_cross);
            float crossR = length(vec2(crossPos.x, crossPos.z));

            if (crossR > DISK_INNER && crossR < DISK_OUTER) {
              float angle = atan(crossPos.z, crossPos.x) + uTime * 0.1;
              vec3 dCol = diskColor(crossR, angle, crossPos.y);

              // ─── Doppler Beaming ───
              vec3 orbitalDir = normalize(cross(vec3(0.0, 1.0, 0.0), normalize(vec3(crossPos.x, 0.0, crossPos.z))));
              float orbitalSpeed = sqrt(0.5 / crossR); // Keplerian velocity
              float doppler = 1.0 / (1.0 - dot(normalize(vel), orbitalDir) * orbitalSpeed * 0.8);
              doppler = clamp(doppler, 0.3, 3.0);
              dCol *= doppler * doppler;

              // Accumulate with alpha blending
              float alpha = 0.85;
              color += dCol * alpha * (1.0 - diskAlpha);
              diskAlpha += (1.0 - diskAlpha) * alpha;

              if (diskAlpha > 0.97) {
                escaped = true;
                break;
              }
            }
          }

          prevY = pos.y;

          // Escaped far enough — render background
          if (r > 60.0) {
            color += stars(normalize(vel)) * (1.0 - diskAlpha);
            escaped = true;
            break;
          }
        }

        // If we ran out of steps but didn't escape, add stars
        if (!escaped) {
          float r = length(pos);
          if (r > RS) {
            color += stars(normalize(vel)) * (1.0 - diskAlpha) * 0.5;
          }
        }

        // ─── Add subtle blue ambient glow near the center ───
        float centerDist = length(uv);
        float ambientGlow = exp(-centerDist * centerDist * 8.0) * 0.08;
        color += vec3(0.1, 0.2, 0.5) * ambientGlow;

        // ─── Event horizon silhouette edge glow ───
        float shadowRadius = 2.598 * RS / 30.0 * 2.2; // Apparent shadow size
        float edgeDist = abs(centerDist - shadowRadius * 0.95);
        float edgeGlow = exp(-edgeDist * edgeDist * 800.0) * 0.5;
        color += vec3(0.4, 0.6, 1.0) * edgeGlow * (1.0 - diskAlpha * 0.5);

        // ─── Post-processing ───
        // Tone mapping (ACES approximation)
        color = color * (2.51 * color + 0.03) / (color * (2.43 * color + 0.59) + 0.14);

        // Very subtle vignette
        float vig = 1.0 - 0.3 * pow(centerDist * 0.8, 2.5);
        color *= vig;

        // Gamma correction
        color = pow(clamp(color, 0.0, 1.0), vec3(0.9));

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(
            container.clientWidth * renderer.getPixelRatio(),
            container.clientHeight * renderer.getPixelRatio()
          ),
        },
        uMouseX: { value: 0.5 },
        uMouseY: { value: 0.5 },
      },
    });

    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    // ─── Animation Loop ───
    const clock = new THREE.Clock();
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    frameId = requestAnimationFrame(animate);

    // ─── Resize Handler ───
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(
        w * renderer.getPixelRatio(),
        h * renderer.getPixelRatio()
      );
    };

    window.addEventListener('resize', handleResize);

    // ─── Mouse Interactivity ───
    const handleMouseMove = (e) => {
      material.uniforms.uMouseX.value = e.clientX / window.innerWidth;
      material.uniforms.uMouseY.value = e.clientY / window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
