"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SearchBar from "./search-bar";
import Logout from "./logout";
import { Calendar } from "lucide-react";

interface NavigationItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navigationItems: NavigationItem[];
  user?: {
    email: string;
  };
}

export default function MobileMenu({ navigationItems, user }: MobileMenuProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col space-y-6 mt-6">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              <span className="ml-2 text-lg sm:text-xl font-bold text-indigo-900">
                Eventin
              </span>
            </Link>
          </div>

          {/* Mobile Search Bar */}
          <SearchBar />

          {/* Mobile Navigation */}
          <nav className="flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 text-lg transition-colors ${
                  isActive(item.href)
                    ? "text-orange-600 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Auth Section */}
          <div className="flex flex-col space-y-3 pt-6 border-t">
            {user ? (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {user.email}
                  </span>
                  <Logout />
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-indigo-700 hover:bg-indigo-800">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
