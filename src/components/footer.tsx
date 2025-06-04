import Link from "next/link";
import { Calendar, Mail, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Browse Events" },
    { href: "/about", label: "About Us" },
  ];

  const legalLinks = [
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", label: "Facebook", icon: Facebook },
    { href: "https://twitter.com", label: "Twitter", icon: Twitter },
    { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-6 sm:py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-3">
                <Calendar className="h-6 w-6 text-indigo-400" />
                <span className="ml-2 text-lg font-bold">Eventin</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Discover and organize amazing events in your community.
              </p>

              <div className="flex items-center text-sm text-gray-400 mb-4">
                <Mail className="h-4 w-4 mr-2" />
                <span>hello@eventhub.com</span>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent className="h-4 w-4" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-1">
              <h3 className="text-base font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-1">
              <h3 className="text-base font-semibold mb-3">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-3">
                Get notified about new events and features.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Eventin. All rights reserved.
            </p>

            <div className="flex space-x-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
