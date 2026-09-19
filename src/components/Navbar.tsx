import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Search,
  Sparkles,
  Bookmark,
  Layers,
  Scale,
  Sun,
  Moon,
  User,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Grid,
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, onSearchClick }) => {
  const {
    currentUser,
    favoriteIds,
    comparedIds,
    theme,
    toggleTheme,
    setActiveModal,
    logout,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navigate = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 dark:border-stone-800 bg-stone-50/95 dark:bg-[#0e1013]/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="w-8 h-8 rounded-lg bg-[#023331] dark:bg-[#004643] text-white flex items-center justify-center font-display font-extrabold text-lg shadow-sm border border-emerald-900/30 group-hover:bg-[#5e171a] transition-colors">
              Q
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-1">
                Template<span className="text-[#fb3640]">IQ</span>
              </span>
              <span className="text-[10px] text-stone-700 dark:text-stone-300 tracking-wider uppercase font-semibold">
                Discovery & Preview
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-stone-700 dark:text-stone-300">
            <button
              onClick={() => navigate('templates')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                currentView === 'templates'
                  ? 'bg-stone-200/70 dark:bg-stone-800 text-[#023331] dark:text-emerald-400 font-semibold'
                  : 'hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/50'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => navigate('categories')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                currentView === 'categories'
                  ? 'bg-stone-200/70 dark:bg-stone-800 text-[#023331] dark:text-emerald-400 font-semibold'
                  : 'hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/50'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => navigate('collections')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                currentView === 'collections'
                  ? 'bg-stone-200/70 dark:bg-stone-800 text-[#023331] dark:text-emerald-400 font-semibold'
                  : 'hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/50'
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => navigate('about')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                currentView === 'about'
                  ? 'bg-stone-200/70 dark:bg-stone-800 text-[#023331] dark:text-emerald-400 font-semibold'
                  : 'hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/50'
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigate('pricing')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                currentView === 'pricing'
                  ? 'bg-stone-200/70 dark:bg-stone-800 text-[#023331] dark:text-emerald-400 font-semibold'
                  : 'hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/50'
              }`}
            >
              Pricing
            </button>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 text-xs font-medium hover:border-stone-400 dark:hover:border-stone-700 transition-colors shadow-xs"
            title="Search templates (Shortcut)"
            id="nav-search-btn"
          >
            <Search className="w-3.5 h-3.5 text-stone-700 dark:text-stone-300" />
            <span className="hidden sm:inline">Search templates...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-stone-100 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-mono">
              /
            </kbd>
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={() => setActiveModal('aiAssistant')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#023331] text-white text-xs font-semibold hover:bg-[#004643] transition-all shadow-sm hover:shadow"
            id="nav-ai-assistant-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#fb3640] animate-pulse" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>

          {/* Compare Pill (if any items selected) */}
          {comparedIds.length > 0 && (
            <button
              onClick={() => setActiveModal('compare')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/50 text-[#fb3640] border border-[#fb3640]/30 text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
              title="Compare templates"
              id="nav-compare-btn"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{comparedIds.length}/3</span>
            </button>
          )}

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/80 transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            id="nav-theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* User Auth Section */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-stone-300 dark:hover:ring-stone-700 transition-all focus:outline-none"
                id="nav-user-menu-btn"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.fullName}
                  className="w-8 h-8 rounded-full object-cover border border-stone-200 dark:border-stone-700"
                />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-800">
                    <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                      {currentUser.fullName}
                    </p>
                    <p className="text-[11px] text-stone-500 truncate">@{currentUser.username}</p>
                  </div>

                  <button
                    onClick={() => navigate('dashboard')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2"
                  >
                    <Grid className="w-3.5 h-3.5 text-stone-400" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigate('saved')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-stone-400" />
                    Saved Templates ({favoriteIds.length})
                  </button>
                  <button
                    onClick={() => navigate('collections')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2"
                  >
                    <Layers className="w-3.5 h-3.5 text-stone-400" />
                    My Collections
                  </button>
                  <button
                    onClick={() => navigate('profile')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    Profile & Settings
                  </button>

                  {currentUser.isStaff && (
                    <button
                      onClick={() => navigate('admin-dashboard')}
                      className="w-full text-left px-4 py-2 text-xs text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center gap-2 font-medium border-t border-stone-100 dark:border-stone-800 mt-1 pt-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Admin Dashboard
                    </button>
                  )}

                  <div className="border-t border-stone-100 dark:border-stone-800 mt-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveModal('login')}
                className="px-3 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
                id="nav-login-btn"
              >
                Log in
              </button>
              <button
                onClick={() => setActiveModal('register')}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors shadow-xs"
                id="nav-register-btn"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none"
            id="nav-mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#0e1013] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4">
          <button
            onClick={() => navigate('templates')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800"
          >
            Explore Templates
          </button>
          <button
            onClick={() => navigate('categories')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800"
          >
            All Categories
          </button>
          <button
            onClick={() => navigate('collections')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800"
          >
            Curated Collections
          </button>
          <button
            onClick={() => navigate('about')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800"
          >
            About TemplateIQ
          </button>
          <button
            onClick={() => navigate('pricing')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800"
          >
            Pricing & Licensing
          </button>
          <button
            onClick={() => navigate('contact')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800"
          >
            Contact & Support
          </button>
          {currentUser?.isStaff && (
            <button
              onClick={() => navigate('admin-dashboard')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
            >
              Admin Dashboard
            </button>
          )}
        </div>
      )}
    </header>
  );
};
