import React from 'react';
import {  Square, Image as ImageIcon, Glasses } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
function Sidebar({ activeSection, handleSectionChange }: { activeSection: string, handleSectionChange: (section: string) => void }) {
  const menuItems = [
    { id: 'viewModels', label: 'View Your Models', icon: Square},
    { id: 'imageTo3D', label: 'Image to 3D Model', icon: ImageIcon },
    { id: 'arView', label: 'AR View', icon: Glasses },
  ]

  return (
    <div className="hidden border-r bg-muted/40 lg:block lg:w-72">
      <div className="flex h-full flex-col">
        <div className="p-6">
          <h2 className="text-lg font-semibold tracking-tight">Menu</h2>
        </div>
        <div className="flex-1 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    activeSection === item.id && "bg-secondary"
                  )}
                  onClick={() => handleSectionChange(item.id)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}



export default Sidebar;
