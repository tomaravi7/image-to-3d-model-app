import React from 'react';
import { Square, Image as ImageIcon, Glasses } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function MobileSidebar({
  activeSection,
  handleSectionChange,
  isOpen,
  closeSidebar,
}: {
  activeSection: string;
  handleSectionChange: (section: string) => void;
  isOpen: boolean;
  closeSidebar: () => void;
}) {
  const menuItems = [
    { id: 'viewModels', label: 'View Your Models', icon: Square },
    { id: 'imageTo3D', label: 'Image to 3D Model', icon: ImageIcon },
    { id: 'arView', label: 'AR View', icon: Glasses },
  ];

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-muted/60 lg:hidden",
        isOpen ? "block" : "hidden",
        "transition-all duration-300"
      )}
    >
      <div
        className="flex justify-end p-4"
        onClick={closeSidebar}
      >
        <button className="text-xl">&times;</button>
      </div>
      <div className="flex flex-col space-y-2 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={cn("w-full justify-start gap-2", activeSection === item.id && "bg-secondary")}
              onClick={() => {
                handleSectionChange(item.id);
                closeSidebar();
              }}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default MobileSidebar;
