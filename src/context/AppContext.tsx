import React, { createContext, useContext, useState, useEffect } from 'react';
import { Template, Category, Collection, TemplateReview, UserProfile } from '../types';
import { SEED_TEMPLATES } from '../data/seedTemplates';
import { CATEGORIES } from '../data/categories';

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  templates: Template[];
  categories: Category[];
  currentUser: UserProfile | null;
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  collections: Collection[];
  createCollection: (name: string, description: string) => Collection;
  renameCollection: (id: string, newName: string, newDescription: string) => void;
  deleteCollection: (id: string) => void;
  addTemplateToCollection: (collectionId: string, templateId: string) => void;
  removeTemplateFromCollection: (collectionId: string, templateId: string) => void;
  comparedIds: string[];
  addToCompare: (id: string) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  reviews: Record<string, TemplateReview[]>;
  addReview: (templateId: string, rating: number, reviewText: string) => boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  selectedPreviewTemplate: Template | null;
  openPreview: (template: Template) => void;
  closePreview: () => void;
  selectedDetailsTemplate: Template | null;
  openDetails: (template: Template) => void;
  closeDetails: () => void;
  login: (emailOrUsername: string, pass: string) => boolean;
  register: (fullName: string, username: string, email: string, pass: string) => boolean;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-default',
  username: 'alexdesigner',
  fullName: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  bio: 'Lead product designer & creative technologist exploring modern digital platforms and editorial typography.',
  website: 'https://alexrivera.design',
  github: 'https://github.com/alexrivera',
  linkedin: 'https://linkedin.com/in/alexrivera',
  isStaff: true, // Grants access to Custom Admin Dashboard
  createdAt: '2025-01-10',
};

const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-1',
    name: 'My Portfolio Ideas',
    description: 'Curated dark minimalist portfolios for client rebrand pitches.',
    userId: 'usr-default',
    templateIds: ['tpl-nova-studio', 'tpl-monolith-dev', 'tpl-solitary-folio'],
    createdAt: '2026-01-15',
    updatedAt: '2026-02-20',
    isPublic: true,
  },
  {
    id: 'col-2',
    name: 'Startup & SaaS Inspiration',
    description: 'High-conversion SaaS landing pages and component tokens.',
    userId: 'usr-default',
    templateIds: ['tpl-strata-cloud', 'tpl-synthetix-ai', 'tpl-horizon-saas'],
    createdAt: '2026-02-01',
    updatedAt: '2026-03-05',
    isPublic: true,
  },
  {
    id: 'col-3',
    name: 'Boutique Hospitality',
    description: 'Atmospheric culinary and wellness concepts with booking widgets.',
    userId: 'usr-default',
    templateIds: ['tpl-osteri-botanica', 'tpl-nexus-restaurant', 'tpl-aura-resort'],
    createdAt: '2026-02-18',
    updatedAt: '2026-03-12',
    isPublic: false,
  },
];

const INITIAL_REVIEWS: Record<string, TemplateReview[]> = {
  'tpl-nova-studio': [
    {
      id: 'rev-1',
      user: {
        id: 'usr-2',
        username: 'marcus_v',
        fullName: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      },
      rating: 5,
      review: 'The baseline typography and animation timing on Nova Studio are extraordinary. Cleanest agency layout I have deployed this year.',
      createdAt: '2026-02-04',
      updatedAt: '2026-02-04',
    },
    {
      id: 'rev-2',
      user: {
        id: 'usr-3',
        username: 'sarah_chen',
        fullName: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      },
      rating: 5,
      review: 'Incredible attention to negative space and responsive viewports. Mobile view looks just as high-end as desktop.',
      createdAt: '2026-02-19',
      updatedAt: '2026-02-19',
    },
  ],
  'tpl-monolith-dev': [
    {
      id: 'rev-3',
      user: {
        id: 'usr-default',
        username: 'alexdesigner',
        fullName: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      },
      rating: 5,
      review: 'The interactive terminal simulator and typography contrast are brilliant. Exactly what a senior software engineer needs.',
      createdAt: '2026-02-28',
      updatedAt: '2026-02-28',
    },
  ],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [templates, setTemplates] = useState<Template[]>(SEED_TEMPLATES);
  const [categories] = useState<Category[]>(CATEGORIES);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEFAULT_USER);

  // Favorites with localStorage
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('templateiq_favorites');
      return saved ? JSON.parse(saved) : ['tpl-nova-studio', 'tpl-monolith-dev', 'tpl-strata-cloud'];
    } catch {
      return ['tpl-nova-studio', 'tpl-monolith-dev'];
    }
  });

  // Collections with localStorage
  const [collections, setCollections] = useState<Collection[]>(() => {
    try {
      const saved = localStorage.getItem('templateiq_collections');
      return saved ? JSON.parse(saved) : INITIAL_COLLECTIONS;
    } catch {
      return INITIAL_COLLECTIONS;
    }
  });

  // Comparisons (up to 3)
  const [comparedIds, setComparedIds] = useState<string[]>([]);

  // Reviews
  const [reviews, setReviews] = useState<Record<string, TemplateReview[]>>(INITIAL_REVIEWS);

  // Theme with localStorage
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('templateiq_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Modals
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedPreviewTemplate, setSelectedPreviewTemplate] = useState<Template | null>(null);
  const [selectedDetailsTemplate, setSelectedDetailsTemplate] = useState<Template | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync theme to document class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('templateiq_theme', theme);
  }, [theme]);

  // Sync favorites
  useEffect(() => {
    localStorage.setItem('templateiq_favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // Sync collections
  useEffect(() => {
    localStorage.setItem('templateiq_collections', JSON.stringify(collections));
  }, [collections]);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  const toggleFavorite = (id: string) => {
    if (!currentUser) {
      setActiveModal('login');
      showToast('Please log in to save templates to your favorites.', 'info');
      return;
    }
    setFavoriteIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Template removed from saved templates.', 'info');
        return prev.filter(x => x !== id);
      } else {
        showToast('Template saved to your favorites!', 'success');
        return [...prev, id];
      }
    });
  };

  const createCollection = (name: string, description: string): Collection => {
    const newCol: Collection = {
      id: `col-${Date.now()}`,
      name,
      description,
      userId: currentUser ? currentUser.id : 'usr-default',
      templateIds: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      isPublic: true,
    };
    setCollections(prev => [newCol, ...prev]);
    showToast(`Collection "${name}" created!`, 'success');
    return newCol;
  };

  const renameCollection = (id: string, newName: string, newDescription: string) => {
    setCollections(prev =>
      prev.map(c => (c.id === id ? { ...c, name: newName, description: newDescription, updatedAt: new Date().toISOString().split('T')[0] } : c))
    );
    showToast('Collection updated.', 'success');
  };

  const deleteCollection = (id: string) => {
    setCollections(prev => prev.filter(c => c.id !== id));
    showToast('Collection deleted.', 'info');
  };

  const addTemplateToCollection = (collectionId: string, templateId: string) => {
    setCollections(prev =>
      prev.map(c => {
        if (c.id === collectionId) {
          if (c.templateIds.includes(templateId)) {
            showToast('Template is already in this collection.', 'warning');
            return c;
          }
          showToast(`Added to "${c.name}"`, 'success');
          return { ...c, templateIds: [...c.templateIds, templateId], updatedAt: new Date().toISOString().split('T')[0] };
        }
        return c;
      })
    );
  };

  const removeTemplateFromCollection = (collectionId: string, templateId: string) => {
    setCollections(prev =>
      prev.map(c => {
        if (c.id === collectionId) {
          showToast(`Removed from "${c.name}"`, 'info');
          return { ...c, templateIds: c.templateIds.filter(t => t !== templateId) };
        }
        return c;
      })
    );
  };

  const addToCompare = (id: string): boolean => {
    if (comparedIds.includes(id)) {
      showToast('Template already in comparison list.', 'info');
      return true;
    }
    if (comparedIds.length >= 3) {
      showToast('You can compare a maximum of 3 templates at once.', 'warning');
      return false;
    }
    setComparedIds(prev => [...prev, id]);
    showToast('Added to comparison matrix.', 'success');
    return true;
  };

  const removeFromCompare = (id: string) => {
    setComparedIds(prev => prev.filter(x => x !== id));
    showToast('Removed from comparison.', 'info');
  };

  const clearCompare = () => {
    setComparedIds([]);
  };

  const addReview = (templateId: string, rating: number, reviewText: string): boolean => {
    if (!currentUser) {
      setActiveModal('login');
      showToast('Please log in to submit a review.', 'info');
      return false;
    }

    const newReview: TemplateReview = {
      id: `rev-${Date.now()}`,
      user: {
        id: currentUser.id,
        username: currentUser.username,
        fullName: currentUser.fullName,
        avatar: currentUser.avatar,
      },
      rating,
      review: reviewText,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setReviews(prev => {
      const existing = prev[templateId] || [];
      // Prevent duplicate review from same user
      if (existing.some(r => r.user.id === currentUser.id)) {
        showToast('You have already reviewed this template.', 'warning');
        return prev;
      }
      const updated = [newReview, ...existing];
      // Recalculate average rating on template
      const total = updated.reduce((acc, r) => acc + r.rating, 0);
      const avg = parseFloat((total / updated.length).toFixed(2));
      setTemplates(tpls =>
        tpls.map(t => (t.id === templateId ? { ...t, ratingAvg: avg, reviewsCount: updated.length } : t))
      );
      showToast('Thank you! Your review has been published.', 'success');
      return { ...prev, [templateId]: updated };
    });
    return true;
  };

  const openPreview = (template: Template) => {
    setSelectedPreviewTemplate(template);
    setActiveModal('preview');
  };

  const closePreview = () => {
    setSelectedPreviewTemplate(null);
    if (activeModal === 'preview') setActiveModal(null);
  };

  const openDetails = (template: Template) => {
    setSelectedDetailsTemplate(template);
    setActiveModal('details');
  };

  const closeDetails = () => {
    setSelectedDetailsTemplate(null);
    if (activeModal === 'details') setActiveModal(null);
  };

  const login = (emailOrUsername: string, pass: string): boolean => {
    if (!emailOrUsername || !pass) {
      showToast('Please enter your credentials.', 'error');
      return false;
    }
    setCurrentUser(DEFAULT_USER);
    setActiveModal(null);
    showToast(`Welcome back, ${DEFAULT_USER.fullName}!`, 'success');
    return true;
  };

  const register = (fullName: string, username: string, email: string, pass: string): boolean => {
    if (!fullName || !username || !email || !pass) {
      showToast('Please fill out all registration fields.', 'error');
      return false;
    }
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      username: username.toLowerCase().replace(/\s+/g, '_'),
      fullName,
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'New explorer on TemplateIQ searching for the best digital architecture.',
      website: '',
      github: '',
      linkedin: '',
      isStaff: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCurrentUser(newUser);
    setActiveModal(null);
    showToast(`Account created! Welcome to TemplateIQ, ${fullName}.`, 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out.', 'info');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...updated });
    showToast('Profile updated successfully.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        templates,
        categories,
        currentUser,
        favoriteIds,
        isFavorite,
        toggleFavorite,
        collections,
        createCollection,
        renameCollection,
        deleteCollection,
        addTemplateToCollection,
        removeTemplateFromCollection,
        comparedIds,
        addToCompare,
        removeFromCompare,
        clearCompare,
        reviews,
        addReview,
        theme,
        toggleTheme,
        activeModal,
        setActiveModal,
        selectedPreviewTemplate,
        openPreview,
        closePreview,
        selectedDetailsTemplate,
        openDetails,
        closeDetails,
        login,
        register,
        logout,
        updateProfile,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
