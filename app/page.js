'use client';

import React, { lazy, Suspense } from 'react';

// Path pointing to ModelViewer.js in your project root
const ModelViewer = lazy(() => import('../ModelViewer'));

export default function Home() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Interactive 3D Smartphone Showcase</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        Rotate, zoom, adjust phone material finishes, and switch staging lights using the controls on the top-right.
      </p>

      {/* Fallback while JavaScript bundle and 3D engine initialize */}
      <Suspense fallback={<div style={{ height: '500px', background: '#090d16', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Loading 3D Engine...</div>}>
        <ModelViewer />
      </Suspense>
    </main>
  );
}