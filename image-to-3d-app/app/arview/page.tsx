'use client'
// pages/ar-view.js
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Import AR Scene component with no SSR
const ARScene = dynamic(() => import('../components/ARScene'), {
  ssr: false
});

export default function ARView() {
  return (
    <>
      <Head>
        <style>{`
          body { 
            margin: 0; 
            overflow: hidden;
          }
        `}</style>
      </Head>

      <ARScene />
    </>
  );
}