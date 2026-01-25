import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50 w-full shadow-sm">
      <div className="px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">⛪</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Grace Community Church</h1>
              <p className="text-sm text-gray-600">Faith • Hope • Love</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
            <a href="#ministries" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Ministries</a>
            <a href="#sermons" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Sermons</a>
            <a href="#events" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Events</a>
            <a href="#visit" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Visit Us</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <a href="#home" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#ministries" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Ministries</a>
            <a href="#sermons" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Sermons</a>
            <a href="#events" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Events</a>
            <a href="#visit" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Visit Us</a>
          </nav>
        )}
      </div>
    </header>
  );
}
