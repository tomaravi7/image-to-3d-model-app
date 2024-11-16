import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Environment } from '@react-three/drei';
import Model from './Model';

function ViewYourModels({
  models,
  setSelectedModel
}: {
  models: string[];
  setSelectedModel: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  // Function to handle downloading the model
  const downloadModel = async (modelUrl: string) => {
    try {
      const response = await fetch(modelUrl);
      if (!response.ok) {
        throw new Error('Failed to download the model');
      }
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = modelUrl.split('/').pop() || 'model.glb';
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading the model:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-1 flex-col">
        <header className="border-b">
          <div className="flex h-16 items-center gap-4 px-6">
            <h1 className="text-xl text-foreground">Your Models</h1>
          </div>
        </header>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-6">
        {models.map((model, index) => (
          <Card
            key={index}
            onClick={() => setSelectedModel(model)}
            className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="flex flex-col items-start">
                  <span>Model {index + 1}</span>
                  <span className="text-xs text-muted-foreground">{model.replace('/models/', '')}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square w-full rounded-md bg-muted/50">
                <Canvas camera={{ position: [0, 0, 2], fov: 40 }}>
                  {/* Lighting setup */}
                  <ambientLight intensity={0.2} />
                  <directionalLight position={[5, 10, 5]} intensity={1.5} />
                  <directionalLight position={[-5, -10, -5]} intensity={0.7} />
                  <pointLight position={[10, 10, 10]} intensity={0.8} />
                  <Environment preset="studio" />
                  <Model url={model} />
                </Canvas>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <CardDescription className="w-full text-center text-xs">
                Click to view details
              </CardDescription>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering card's onClick
                  downloadModel(model);
                }}
                className="w-full rounded-md bg-primary text-white py-2 text-xs hover:bg-primary-dark"
              >
                Download Model
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ViewYourModels;
