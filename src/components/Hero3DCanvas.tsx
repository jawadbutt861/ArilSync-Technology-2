import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Cpu, Server, RotateCcw } from 'lucide-react';

type VisualizationMode = 'core' | 'ai' | 'cloud';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<VisualizationMode>('core');
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D components
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Dynamic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x2563eb, 3.5, 50);
    blueLight.position.set(10, 12, 10);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2.5, 50);
    cyanLight.position.set(-12, -8, 8);
    scene.add(cyanLight);

    const topWhiteLight = new THREE.DirectionalLight(0xffffff, 1.2);
    topWhiteLight.position.set(0, 20, 15);
    scene.add(topWhiteLight);

    // 1. Central Core Geometry (Nested Tech Polyhedron)
    const innerCoreGeo = new THREE.IcosahedronGeometry(3.2, 0);
    const innerCoreMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      roughness: 0.2,
      metalness: 0.85,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    worldGroup.add(innerCoreMesh);

    // Outer Wireframe Cage
    const wireframeGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    worldGroup.add(wireframeMesh);

    // Concentric Orbit Rings
    const ringGeo1 = new THREE.TorusGeometry(5.6, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    worldGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(6.6, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.rotation.z = Math.PI / 6;
    worldGroup.add(ringMesh2);

    // 2. Orbiting Satellite Nodes
    const satelliteGroup = new THREE.Group();
    worldGroup.add(satelliteGroup);

    const satelliteCount = 8;
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.7,
    });

    for (let i = 0; i < satelliteCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / satelliteCount) * Math.PI * 2;
      const radius = 5.8;
      sat.position.set(
        Math.cos(angle) * radius,
        (Math.sin(angle * 2) * 1.5),
        Math.sin(angle) * radius
      );
      satellites.push(sat);
      satelliteGroup.add(sat);
    }

    // 3. Connective Wireframe Beams (Lines from center to satellites)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.2,
    });
    const lineGroup = new THREE.Group();
    worldGroup.add(lineGroup);

    // 4. Ambient Floating Data Points (Particle Cloud)
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 22;
      particlePositions[i + 1] = (Math.random() - 0.5) * 18;
      particlePositions[i + 2] = (Math.random() - 0.5) * 16;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particleSystem);

    // Mouse Interaction Tracking & Physics
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.2;
    let targetRotationY = 0.3;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        mouseX = x;
        mouseY = y;
        targetRotationY = x * 0.45;
        targetRotationX = -y * 0.35;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Continuous subtle idle rotations
      innerCoreMesh.rotation.y = elapsed * 0.25;
      innerCoreMesh.rotation.x = elapsed * 0.15;

      wireframeMesh.rotation.y = -elapsed * 0.2;
      wireframeMesh.rotation.z = elapsed * 0.1;

      ringMesh1.rotation.z = elapsed * 0.3;
      ringMesh2.rotation.x = -elapsed * 0.25;

      satelliteGroup.rotation.y = elapsed * 0.35;
      particleSystem.rotation.y = elapsed * 0.04;

      // Dynamic light tracking
      blueLight.position.x = 10 + Math.sin(elapsed) * 4;
      cyanLight.position.y = -8 + Math.cos(elapsed * 0.8) * 3;

      // Smooth inertia lerp towards target mouse rotation
      worldGroup.rotation.y += (targetRotationY - worldGroup.rotation.y) * 0.06;
      worldGroup.rotation.x += (targetRotationX - worldGroup.rotation.x) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up WebGL resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);

      renderer.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      satGeo.dispose();
      satMat.dispose();
      lineMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeMode]);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-2xl overflow-hidden group select-none">
      
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-500 ${
          isInteracting ? 'opacity-100' : 'opacity-95'
        }`}
      />

      {/* Subtle Grid & Vignette Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid-dark opacity-35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

      {/* Top Left Status Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 px-3 py-1.5 rounded-lg text-white">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
        </span>
        <span className="text-xs font-mono font-medium text-slate-300">
          3D Interactive Engine Active
        </span>
      </div>

      {/* Top Right Drag Hint */}
      <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-xs border border-slate-800 px-2.5 py-1 rounded-md text-[11px] text-slate-400 font-mono">
        <RotateCcw className="w-3 h-3 text-blue-400" />
        <span>Click & drag to rotate 3D mesh</span>
      </div>

      {/* Bottom Mode Switcher HUD */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'core', label: 'Distributed Core', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'ai', label: 'Neural Mesh', icon: <Cpu className="w-3.5 h-3.5" /> },
            { id: 'cloud', label: 'Cloud VPC', icon: <Server className="w-3.5 h-3.5" /> },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id as VisualizationMode)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeMode === mode.id
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {mode.icon}
              <span>{mode.label}</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] text-slate-400 font-mono hidden md:flex items-center gap-2">
          <span className="text-emerald-400">P99: 64ms</span>
          <span>·</span>
          <span>WebSockets Live</span>
          <span>·</span>
          <span className="text-blue-400">WebGL 2.0</span>
        </div>
      </div>

    </div>
  );
};
