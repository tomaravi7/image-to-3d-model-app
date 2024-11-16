'use client';

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MobileSidebar from './components/MobileSideBar';
import MainContent from './components/MainContent';

export default function Home() {
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('viewModels');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

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

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar activeSection={activeSection} handleSectionChange={handleSectionChange} />
      <button
        className="lg:hidden p-4 absolute top-4 right-4 z-50"
        onClick={toggleMobileSidebar}
      >
        {/*  */}
        <span className="block w-6 h-1 bg-black mb-1"></span>
        <span className="block w-6 h-1 bg-black mb-1"></span>
        <span className="block w-6 h-1 bg-black mb-1"></span>
      </button>

      <div className="flex flex-1 flex-col">
        <header className="border-b">
          <MobileSidebar
            activeSection={activeSection}
            handleSectionChange={handleSectionChange}
            isOpen={mobileSidebarOpen}
            closeSidebar={() => setMobileSidebarOpen(false)}
          />
        </header>
        <MainContent models={models} selectedModel={selectedModel} setSelectedModel={setSelectedModel} activeSection={activeSection} />
      </div>
    </div>
  );
}
