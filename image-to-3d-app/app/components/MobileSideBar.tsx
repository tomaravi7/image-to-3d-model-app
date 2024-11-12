import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Sidebar from './Sidebar';

interface SidebarProps {
  activeSection: string;
  handleSectionChange: (section: string) => void;
}

export default function MobileSidebar({ activeSection, handleSectionChange }: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <Sidebar activeSection={activeSection} handleSectionChange={handleSectionChange} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
