import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight 3D background: a slowly rotating wireframe icosahedron
 * surrounded by a drifting particle field. Sits behind hero content;
 * respects prefers-reduced-motion by pausing rotation.
 */
export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const mint = new THREE.Color("#25FFC4");
    const cream = new THREE.Color("#F8EEE3");

    // Central wireframe geometry
    const geo = new THREE.IcosahedronGeometry(2.2, 1);
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geo),
      new THREE.LineBasicMaterial({ color: mint, transparent: true, opacity: 0.55 }),
    );
    scene.add(wire);

    // Inner glow sphere
    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.3, 0),
      new THREE.MeshBasicMaterial({
        color: mint,
        transparent: true,
        opacity: 0.08,
        wireframe: true,
      }),
    );
    scene.add(inner);

    // Floating orbiting rings
    const rings: THREE.LineLoop[] = [];
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.RingGeometry(3 + i * 0.7, 3.02 + i * 0.7, 128);
      const pts: number[] = [];
      const seg = 128;
      const r = 3 + i * 0.7;
      for (let j = 0; j <= seg; j++) {
        const t = (j / seg) * Math.PI * 2;
        pts.push(Math.cos(t) * r, Math.sin(t) * r, 0);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
      const ring = new THREE.LineLoop(
        g,
        new THREE.LineBasicMaterial({
          color: i % 2 === 0 ? mint : cream,
          transparent: true,
          opacity: 0.18 - i * 0.04,
        }),
      );
      ring.rotation.x = Math.PI / 2 + i * 0.3;
      ring.rotation.y = i * 0.4;
      scene.add(ring);
      rings.push(ring);
      ringGeo.dispose();
    }

    // Particle field
    const particleCount = 400;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: cream,
        size: 0.03,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      }),
    );
    scene.add(particles);

    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMove);

    const clock = new THREE.Clock();
    const render = () => {
      const t = clock.getElapsedTime();
      if (!reduce) {
        wire.rotation.x = t * 0.15;
        wire.rotation.y = t * 0.2;
        inner.rotation.x = -t * 0.1;
        inner.rotation.y = t * 0.25;
        rings.forEach((r, i) => {
          r.rotation.z = t * (0.05 + i * 0.03);
          r.rotation.y = t * (0.03 + i * 0.02);
        });
        particles.rotation.y = t * 0.02;
      }
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.03;
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
      geo.dispose();
      pGeo.dispose();
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
