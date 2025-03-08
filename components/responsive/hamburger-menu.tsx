"use client";

import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface HamburgerMenuProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}

export function HamburgerMenu({ items }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle menu close
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscKey);
      // Prevent body scrolling when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, closeMenu]);

  // Handle resize events
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [closeMenu]);

  // Handle click outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  };

  if (!isMobile) return null;

  return (
    <div className="lg:hidden">
      {/* Hamburger Button - Fixed in top-right corner */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 h-11 w-11 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm",
          "transition-opacity duration-300 ease-in-out",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Navigation Menu */}
      <nav
        id="mobile-menu"
        className={cn(
          // Base styles
          "fixed top-0 right-0 z-40 h-full w-[80%] bg-background",
          "transform transition-all duration-300 ease-in-out",
          // Animation states
          isOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0",
          // Shadow and border
          "shadow-xl border-l border-border"
        )}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {/* Menu Content */}
        <div className="h-full overflow-y-auto overscroll-contain px-6 py-16">
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={cn(
                    // Base styles
                    "block py-3 px-4 text-lg font-medium",
                    // Touch target size
                    "min-h-[44px] flex items-center",
                    // Interactive states
                    "rounded-md transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                  onClick={closeMenu}
                  // Accessibility
                  role="menuitem"
                  tabIndex={0}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}