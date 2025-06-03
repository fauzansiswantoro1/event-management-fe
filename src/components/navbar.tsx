import Link from "next/link";
import { auth } from "@/lib/auth";
import Logout from "./logout";
import { Button } from "@/components/ui/button";
import MobileMenu from "./mobile-menu";
import SearchBar from "./search-bar";
import { Calendar } from "lucide-react";

export default async function Navbar() {
  const data = await auth();

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
            <span className="ml-2 text-lg sm:text-xl font-bold text-indigo-900">
              Eventin
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            {data ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  {data.user.email}
                </span>
                <Logout />
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-indigo-700 hover:bg-indigo-800">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <MobileMenu navigationItems={navigationItems} user={data?.user} />
        </div>
      </div>
    </div>
  );
}
