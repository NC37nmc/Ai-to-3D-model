import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url, true, true, (loader) => {
    loader.setRequestHeader({ 'ngrok-skip-browser-warning': 'true' });
  });
  return <primitive object={scene} />;
}

export default function ModelViewer({ modelUrl, loading }) {
  if (loading) {
    return (
      <div className="viewer-placeholder">
        <span className="spinner" />
        <p>Generating your 3D model…</p>
      </div>
    );
  }

  if (!modelUrl) {
    return <div className="viewer-placeholder">Your generated model will appear here</div>;
  }

  return (
    <Canvas
      camera={{ position: [3, 3, 3], fov: 50 }}
      style={{ height: '400px', borderRadius: '10px', display: 'block' }}
    >
      <color attach="background" args={['#ffffff']} />
      <Suspense fallback={null}>
        <Stage environment="studio" intensity={0.8} adjustCamera={1.2}>
          <Model url={modelUrl} />
        </Stage>
      </Suspense>
      <OrbitControls autoRotate />
    </Canvas>
  );
}