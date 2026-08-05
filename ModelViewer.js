'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Html } from '@react-three/drei';
import { useControls, Leva } from 'leva';

function Model({ color, wireframe, roughness }) {
  const { scene, materials } = useGLTF('/model.glb');

  useEffect(() => {
    Object.values(materials).forEach((mat) => {
      if (mat) {
        if (color && mat.color) mat.color.set(color);
        mat.wireframe = wireframe;
        mat.roughness = roughness;
      }
    });
  }, [materials, color, wireframe, roughness]);

  return <primitive object={scene} scale={1} />;
}

useGLTF.preload('/model.glb');

function CanvasLoader() {
  return (
    <Html center>
      <div style={{ color: '#ffffff', fontFamily: 'sans-serif', fontSize: '14px', whiteSpace: 'nowrap' }}>
        Loading 3D Model...
      </div>
    </Html>
  );
}

export default function ModelViewer() {
  const [mounted, setMounted] = useState(false);

  // Mount Leva after initial render so it doesn't block main thread startup
  useEffect(() => {
    setMounted(true);
  }, []);

  const { color, wireframe, roughness, environment } = useControls('Smartphone Configurator', {
    color: '#1e293b',
    wireframe: false,
    roughness: { value: 0.3, min: 0, max: 1, step: 0.05 },
    environment: {
      options: ['city', 'sunset', 'studio', 'dawn'],
      value: 'city',
    },
  });

  return (
    <>
      {/* Hide Leva until client hydration finishes */}
      <Leva hidden={!mounted} collapsed={false} />
      
      <div
        tabIndex={0}
        role="region"
        aria-label="3D Interactive Canvas"
        style={{ width: '100%', height: '500px', borderRadius: '12px', overflow: 'hidden', background: '#090d16', border: '1px solid #1e293b' }}
      >
        {/* Render Canvas at mobile-optimized resolution scale */}
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]}>
          <Suspense fallback={<CanvasLoader />}>
            <Stage environment={environment} intensity={0.6}>
              <Model color={color} wireframe={wireframe} roughness={roughness} />
            </Stage>
          </Suspense>
          <OrbitControls enableZoom={true} autoRotate={false} makeDefault />
        </Canvas>
      </div>
    </>
  );
}