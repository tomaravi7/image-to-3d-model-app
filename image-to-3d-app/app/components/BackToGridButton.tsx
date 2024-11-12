import React from 'react';

function BackToGridButton({ setSelectedModel }: { setSelectedModel: React.Dispatch<React.SetStateAction<string | null>> }) {
  return (
    <button
      onClick={() => setSelectedModel(null)}
      className="absolute top-4 left-4 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-lg transition-colors duration-200 hover:bg-blue-600 z-10"
    >
      Back to grid
    </button>
  );
}

export default BackToGridButton;
