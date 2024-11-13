import React from 'react';
import ViewYourModels from './ViewYourModels';
import ImageTo3DModel from './ImageTo3DModel';
import ARView from './ARView';
import Model from './Model';
import BackToGridButton from './BackToGridButton';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';

function MainContent({ models, selectedModel, setSelectedModel, activeSection }: { models: string[], selectedModel: string | null, setSelectedModel: React.Dispatch<React.SetStateAction<string | null>>, activeSection: string }) {
  const renderSection = () => {
    switch (activeSection) {
      case 'viewModels':
        return <ViewYourModels models={models} setSelectedModel={setSelectedModel} />;
      case 'imageTo3D':
        return <ImageTo3DModel />;
      case 'arView':
        return <ARView />;
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <main className="flex-1 overflow-auto bg-gray-100">
      {selectedModel ? (
        <div className="relative flex h-full w-full flex-col items-center">
          <BackToGridButton setSelectedModel={setSelectedModel} />
          <Canvas camera={{ position: [0, 0, 5] }} className="h-full w-full">
          <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 10, 5]} intensity={0.5} />
                  {/* <directionalLight position={[-5, -10, -5]} intensity={0.7} />
                  <pointLight position={[10, 10, 10]} intensity={0.8} /> */}
                  <Environment preset="apartment" background  />
            <Model url={selectedModel} />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          </Canvas>
        </div>
      ) : (
        renderSection()
      )}
    </main>
  );
}

export default MainContent;
