import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { TemplateDetailsModal } from './components/TemplateDetailsModal';
import { TemplatePreviewModal } from './components/TemplatePreviewModal';
import { ComparisonModal } from './components/ComparisonModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { AuthModal } from './components/AuthModal';

import { HomeView } from './views/HomeView';
import { TemplatesView } from './views/TemplatesView';
import { CategoriesView } from './views/CategoriesView';
import { CollectionsView } from './views/CollectionsView';
import { SavedTemplatesView } from './views/SavedTemplatesView';
import { CustomAdminDashboard } from './views/CustomAdminDashboard';
import { UserDashboardView } from './views/UserDashboardView';
import { AboutView, PricingView, ContactView, TermsPrivacyView } from './views/PublicPages';

const MainAppContent: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    selectedPreviewTemplate,
    closePreview,
    openPreview,
    selectedDetailsTemplate,
    closeDetails,
    openDetails,
  } = useApp();

  const [currentView, setCurrentView] = useState<string>('home');
  const [targetCategoryFilter, setTargetCategoryFilter] = useState<string>('');
  const [targetSearchFilter, setTargetSearchFilter] = useState<string>('');

  // Keyboard shortcut listener (/ for search, Esc for close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setCurrentView('templates');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === 'Escape') {
        if (selectedPreviewTemplate) closePreview();
        else if (selectedDetailsTemplate) closeDetails();
        else if (activeModal) setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPreviewTemplate, selectedDetailsTemplate, activeModal, closePreview, closeDetails, setActiveModal]);

  const handleCategoryNavigate = (catName: string) => {
    setTargetCategoryFilter(catName);
    setCurrentView('templates');
  };

  const handleSearchNavigate = (searchTerm: string) => {
    setTargetSearchFilter(searchTerm);
    setCurrentView('templates');
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-[#0c0e11] text-stone-900 dark:text-stone-100 selection:bg-[#023331] selection:text-white transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onSearchClick={() => {
          setCurrentView('templates');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={setCurrentView}
            onFilterCategory={handleCategoryNavigate}
            onSearch={handleSearchNavigate}
          />
        )}

        {currentView === 'templates' && (
          <TemplatesView
            initialCategory={targetCategoryFilter}
            initialSearch={targetSearchFilter}
          />
        )}

        {currentView === 'categories' && (
          <CategoriesView
            onSelectCategoryFilter={handleCategoryNavigate}
          />
        )}

        {currentView === 'collections' && (
          <CollectionsView
            onExploreTemplates={() => setCurrentView('templates')}
          />
        )}

        {currentView === 'saved' && (
          <SavedTemplatesView
            onExploreTemplates={() => setCurrentView('templates')}
          />
        )}

        {(currentView === 'dashboard' || currentView === 'profile') && (
          <UserDashboardView
            onExploreTemplates={() => setCurrentView('templates')}
            onOpenCollections={() => setCurrentView('collections')}
          />
        )}

        {currentView === 'admin-dashboard' && (
          <CustomAdminDashboard />
        )}

        {currentView === 'about' && <AboutView />}
        {currentView === 'pricing' && <PricingView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'terms' && <TermsPrivacyView type="terms" />}
        {currentView === 'privacy' && <TermsPrivacyView type="privacy" />}
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentView} />

      {/* Floating Viewport Live Preview Modal */}
      {selectedPreviewTemplate && (
        <TemplatePreviewModal
          template={selectedPreviewTemplate}
          onClose={closePreview}
        />
      )}

      {/* Rich Template Details Modal */}
      {selectedDetailsTemplate && (
        <TemplateDetailsModal
          template={selectedDetailsTemplate}
          onClose={closeDetails}
          onSelectTemplate={(tpl) => openDetails(tpl)}
        />
      )}

      {/* 3-Way Comparison Modal */}
      {activeModal === 'compare' && (
        <ComparisonModal
          onClose={() => setActiveModal(null)}
          onExploreTemplates={() => {
            setActiveModal(null);
            setCurrentView('templates');
          }}
        />
      )}

      {/* AI Assistant Modal */}
      {activeModal === 'aiAssistant' && (
        <AIAssistantModal
          onClose={() => setActiveModal(null)}
          onOpenDetails={(tpl) => openDetails(tpl)}
          onOpenPreview={(tpl) => openPreview(tpl)}
        />
      )}

      {/* Authentication Modal */}
      {(activeModal === 'login' || activeModal === 'register') && (
        <AuthModal
          initialMode={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* System Toast Alerts */}
      <ToastContainer />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
