'use client';

import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Html } from '@react-three/drei';
import { useControls } from 'leva';

// Sub-component: Loads your smartphone GLB file and dynamically updates its materials
function Model({ color, wireframe, roughness }) {
  const { scene, materials } = useGLTF('/model.glb');

  useEffect(() => {
    // Apply Leva control updates directly to all materials in the smartphone model
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

// Preload the model so there's zero delay when rendering
useGLTF.preload('/model.glb');

// Sub-component: Clean Loading indicator rendered inside WebGL Canvas
function CanvasLoader() {
  return (
    <Html center>
      <div style={{ color: '#ffffff', fontFamily: 'sans-serif', fontSize: '14px', whiteSpace: 'nowrap' }}>
        Loading Smartphone Model...
      </div>
    </Html>
  );
}

// Main Viewer Export
export default function ModelViewer() {
  // Configurator controls via Leva Floating UI Panel
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
    <div style={{ width: '100%', height: '500px', borderRadius: '12px', overflow: 'hidden', background: '#090d16' }}>
      {/* Performance cap for high-DPI mobile screens: dpr={[1, 2]} */}
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={<CanvasLoader />}>
          <Stage environment={environment} intensity={0.6}>
            <Model color={color} wireframe={wireframe} roughness={roughness} />
          </Stage>
        </Suspense>
        {/* Enable Touch and Mouse Orbiting */}
        <OrbitControls enableZoom={true} autoRotate={false} makeDefault />
      </Canvas>
    </div>
  );
}