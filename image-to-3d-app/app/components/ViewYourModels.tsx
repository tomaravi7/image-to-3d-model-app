import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Model from './Model';

function ViewYourModels({
  models,
  setSelectedModel
}: {
  models: string[]
  setSelectedModel: React.Dispatch<React.SetStateAction<string | null>>
}) {
  return (
    <div>
      <div className="flex flex-1 flex-col">
        <header className="border-b">
          <div className="flex h-16 items-center gap-4 px-6">
            Your Models
          </div>
        </header>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-6">
        {models.map((model, index) => (
          <Card
            key={index}
            onClick={() => setSelectedModel(model)}
            className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 "
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Model {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square w-full rounded-md bg-muted/50">
                <Canvas camera={{ position: [0, 0, 2], fov: 40 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <Model url={model} />
                </Canvas>
              </div>
            </CardContent>
            <CardFooter>
              <CardDescription className="w-full text-center text-xs">
                Click to view details
              </CardDescription>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


export default ViewYourModels;
