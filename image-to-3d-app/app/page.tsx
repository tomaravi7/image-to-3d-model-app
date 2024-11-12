// 'use client';
// import React, { useState, useEffect } from 'react';
// import Sidebar from './components/Sidebar';
// import MainContent from './components/MainContent';

// function Home() {
//   const [models, setModels] = useState<string[]>([]);
//   const [selectedModel, setSelectedModel] = useState<string | null>(null);
//   const [activeSection, setActiveSection] = useState<string>('viewModels');

//   useEffect(() => {
//     const fetchModels = async () => {
//       const response = await fetch('/api/getmodels');
//       const data = await response.json();
//       setModels(data.map((file: string) => `/models/${file}`));
//     };

//     fetchModels();
//   }, []);

//   const handleSectionChange = (section: string) => {
//     setSelectedModel(null);
//     setActiveSection(section);
//   };

//   return (
//     <div className="flex h-screen w-screen">
//       <Sidebar activeSection={activeSection} handleSectionChange={handleSectionChange} />
//       <MainContent models={models} selectedModel={selectedModel} setSelectedModel={setSelectedModel} activeSection={activeSection} />
//     </div>
//   );
// }

// export default Home;


'use client';

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MobileSidebar from './components/MobileSideBar';
import MainContent from './components/MainContent';

export default function Home() {
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('viewModels');

  useEffect(() => {
    const fetchModels = async () => {
      const response = await fetch('/api/getmodels');
      const data = await response.json();
      setModels(data.map((file: string) => `/models/${file}`));
    };

    fetchModels();
  }, []);

  const handleSectionChange = (section: string) => {
    setSelectedModel(null);
    setActiveSection(section);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar activeSection={activeSection} handleSectionChange={handleSectionChange} />
      <div className="flex flex-1 flex-col">
        <header className="border-b">
            <MobileSidebar activeSection={activeSection} handleSectionChange={handleSectionChange} />
        </header>
        <MainContent models={models} selectedModel={selectedModel} setSelectedModel={setSelectedModel} activeSection={activeSection} />
      </div>
    </div>
  );
}
