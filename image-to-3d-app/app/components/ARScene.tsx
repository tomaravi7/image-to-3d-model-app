// components/ARScene.js
import { useEffect, useState } from 'react';

export default function ARScene() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if scripts are already loaded
    if (window.AFRAME) {
      setIsLoaded(true);
      return;
    }

    // Load scripts only once
    const loadScripts = async () => {
      try {
        // Load AFRAME first
        if (!window.AFRAME) {
          await new Promise((resolve, reject) => {
            const aframeScript = document.createElement('script');
            aframeScript.src = 'https://aframe.io/releases/1.3.0/aframe.min.js';
            aframeScript.async = true;
            aframeScript.onload = () => {
              console.log('A-Frame loaded');
              resolve();
            };
            aframeScript.onerror = reject;
            document.head.appendChild(aframeScript);
          });
        }

        // Wait a bit to ensure A-Frame is fully initialized
        await new Promise(resolve => setTimeout(resolve, 100));

        // Load AR.js only if not already loaded
        if (!window.THREEx) {
          await new Promise((resolve, reject) => {
            const arjsScript = document.createElement('script');
            arjsScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
            arjsScript.async = true;
            arjsScript.onload = () => {
              console.log('AR.js loaded');
              resolve();
            };
            arjsScript.onerror = reject;
            document.head.appendChild(arjsScript);
          });
        }

        // Wait for everything to be ready
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsLoaded(true);
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    loadScripts();

    return () => {
      // Cleanup if needed
    };
  }, []);

  if (!isLoaded) {
    return <div className="w-screen h-screen flex items-center justify-center">Loading AR Scene...</div>;
  }

  // Only render the scene when scripts are loaded
  return (
    <div style={{ width: '70vw', height: '70vh' }}>
      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        <a-assets>
          <a-asset-item 
            id="model" 
            response-type="arraybuffer" 
            src="/untitled.gltf"
          />
        </a-assets>
        
        <a-marker type="pattern" url="/aat.patt">
          <a-entity
            gltf-model="#model"
            position="0 0 0"
            scale="0.5 0.5 0.5"
          />
        </a-marker>
        
        <a-entity camera />
      </a-scene>
    </div>
  );
}