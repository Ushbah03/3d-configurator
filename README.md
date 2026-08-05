# FE-AA2: Interactive 3D Web Experience

##  Project Overview
An interactive 3D product showcase featuring a customizable smartphone model built using **React Three Fiber (R3F)**, **@react-three/drei**, and **Leva UI controls**.

Users can:
- Rotate, pan, and zoom around the 3D smartphone model via touch and mouse orbit controls.
- Modify surface material properties (color tint, roughness finish) in real-time.
- Toggle wireframe mode to inspect geometry topography.
- Switch lighting environment presets (e.g., City, Sunset, Studio, Dawn).

---

##  Performance Audit (FE-10 Lens)
1. **Asset Size & Optimization:** The smartphone 3D model (`model.glb`) is kept small (< 3 MB) to ensure fast network loading over mobile and slow connections.
2. **Lazy Loading Strategy:** The heavy WebGL Canvas and Three.js dependencies are code-split and dynamically imported using `React.lazy()` and `<Suspense>`, preventing initial DOM rendering delays.
3. **GPU Protection:** Resolution scaling is bounded using `dpr={[1, 2]}` on the Canvas element to avoid unnecessary pixel scaling and GPU thermal throttling on high-DPI mobile screens.
4. **Frame Rate:** Maintains a smooth 60 FPS across desktop and mobile viewports with low memory consumption.

---

##  Future Enhancements
- Implement hotspot annotations anchored to specific coordinates (e.g., highlighting camera specs or battery port).
- Add preset camera animation transitions between front, back, and side views.