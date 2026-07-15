import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D sky background: layered translucent cloud planes drifting across
 * a gradient sky dome with soft twinkling stars. Sits behind hero
 * content. Respects prefers-reduced-motion by freezing motion.
 */
export function SkyBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200,
    );
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const cream = new THREE.Color("#F8EEE3");
    const mint = new THREE.Color("#25FFC4");
    const obsidian = new THREE.Color("#050807");

    // Sky dome — vertical gradient shader
    const skyGeo = new THREE.SphereGeometry(80, 32, 32);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        topColor: { value: obsidian },
        midColor: { value: new THREE.Color("#0d1a1f") },
        bottomColor: { value: new THREE.Color("#1a2a2a") },
        offset: { value: 20 },
        exponent: { value: 0.7 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPosition = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 midColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          vec3 col = mix(bottomColor, midColor, smoothstep(-0.2, 0.4, h));
          col = mix(col, topColor, smoothstep(0.4, 1.0, h));
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    // Stars
    const starCount = 500;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = Math.abs(r * Math.cos(phi)) * 0.6 + 5;
      starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        color: cream,
        size: 0.15,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
      }),
    );
    scene.add(stars);

    // Cloud planes — soft radial-gradient sprites
    const cloudCanvas = document.createElement("canvas");
    cloudCanvas.width = 256;
    cloudCanvas.height = 256;
    const ctx = cloudCanvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
    grad.addColorStop(0, "rgba(248, 238, 227, 0.55)");
    grad.addColorStop(0.4, "rgba(37, 255, 196, 0.18)");
    grad.addColorStop(1, "rgba(5, 8, 7, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    const cloudTex = new THREE.CanvasTexture(cloudCanvas);

    const clouds: THREE.Sprite[] = [];
    for (let i = 0; i < 14; i++) {
      const mat = new THREE.SpriteMaterial({
        map: cloudTex,
        transparent: true,
        opacity: 0.35 + Math.random() * 0.35,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: i % 3 === 0 ? mint : cream,
      });
      const s = new THREE.Sprite(mat);
      const scale = 6 + Math.random() * 10;
      s.scale.set(scale, scale * 0.7, 1);
      s.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 14,
        -6 - Math.random() * 12,
      );
      scene.add(s);
      clouds.push(s);
    }

    // Distant horizon glow ring
    const glowGeo = new THREE.RingGeometry(18, 22, 128);
    const glowMat = new THREE.MeshBasicMaterial({
      color: mint,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.z = -20;
    scene.add(glow);

    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMove);

    const clock = new THREE.Clock();
    const render = () => {
      const t = clock.getElapsedTime();
      if (!reduce) {
        clouds.forEach((c, i) => {
          c.position.x += 0.006 + (i % 3) * 0.002;
          if (c.position.x > 18) c.position.x = -18;
          c.material.opacity =
            0.3 + Math.sin(t * 0.4 + i) * 0.15 + 0.2;
        });
        stars.rotation.y = t * 0.01;
        glow.rotation.z = t * 0.03;
      }
      camera.position.x += (mouseX - camera.position.x) * 0.02;
      camera.position.y += (-mouseY - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      skyGeo.dispose();
      starGeo.dispose();
      glowGeo.dispose();
      cloudTex.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
