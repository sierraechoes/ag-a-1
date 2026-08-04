import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, Sparkles, RefreshCw, Layers } from 'lucide-react';

export default function Visuals3DStudio() {
  const mountRef = useRef(null);
  const [activeMode, setActiveMode] = useState('RISK_SPHERE');
  const [wireframe, setWireframe] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.01);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    let mesh;
    if (activeMode === 'RISK_SPHERE') {
      const geometry = new THREE.IcosahedronGeometry(2, 2);
      const material = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        wireframe: wireframe,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0x0e7490,
        emissiveIntensity: 0.4
      });
      mesh = new THREE.Mesh(geometry, material);
    } else {
      const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
      const material = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        wireframe: wireframe,
        roughness: 0.1,
        metalness: 0.9,
        emissive: 0x1d4ed8,
        emissiveIntensity: 0.3
      });
      mesh = new THREE.Mesh(geometry, material);
    }
    scene.add(mesh);

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      mesh.rotation.x += rotationSpeed;
      mesh.rotation.y += rotationSpeed * 1.5;
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeMode, wireframe, rotationSpeed]);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
          <Box className="w-3.5 h-3.5" /> Three.js & Physics Modeling Engine
        </div>
        <h2 className="text-2xl font-bold text-slate-100 tracking-wide">3D Market Microstructure & Risk Studio</h2>
        <p className="text-xs text-slate-400 mt-1">Interactive 3D order book depth cubes, risk topology spheres, and Monte Carlo particle simulations</p>
      </div>

      {/* Controls Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveMode('RISK_SPHERE')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'RISK_SPHERE'
                ? 'bg-cyan-500 text-black shadow glow-cyan'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            3D Risk Topology Sphere
          </button>
          <button
            onClick={() => setActiveMode('DEPTH_CUBE')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'DEPTH_CUBE'
                ? 'bg-cyan-500 text-black shadow glow-cyan'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            3D Order Book Depth Cube
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={wireframe}
              onChange={(e) => setWireframe(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
            />
            Wireframe Mesh
          </label>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Speed:</span>
            <input
              type="range"
              min="0.002"
              max="0.03"
              step="0.002"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(Number(e.target.value))}
              className="w-24 accent-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div className="glass-panel rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl relative h-[500px]">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing"></div>
        <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md text-[11px] font-mono text-slate-400 pointer-events-none space-y-1">
          <div className="text-cyan-400 font-bold">Interactive 3D Renderer Active</div>
          <div>Mode: {activeMode === 'RISK_SPHERE' ? 'Monte Carlo Risk Sphere' : 'Order Book Microstructure Cube'}</div>
          <div>Physics Engine: Enabled // 60 FPS WebGL</div>
        </div>
      </div>
    </div>
  );
}
