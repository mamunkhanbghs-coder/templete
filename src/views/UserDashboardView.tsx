import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TemplateCard } from '../components/TemplateCard';
import {
  User,
  Bookmark,
  Layers,
  Star,
  Settings,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Edit3,
  CheckCircle2,
  Save,
} from 'lucide-react';

interface UserDashboardViewProps {
  onExploreTemplates: () => void;
  onOpenCollections: () => void;
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  onExploreTemplates,
  onOpenCollections,
}) => {
  const {
    currentUser,
    updateProfile,
    favoriteIds,
    collections,
    reviews,
    templates,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'saved' | 'collections' | 'reviews' | 'settings'>('overview');

  // Profile form state
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [website, setWebsite] = useState(currentUser?.website || '');
  const [github, setGithub] = useState(currentUser?.github || '');
  const [linkedin, setLinkedin] = useState(currentUser?.linkedin || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      bio,
      website,
      github,
      linkedin,
      avatar,
    });
    showToast('Your creator profile has been updated.', 'success');
  };

  const savedTemplates = templates.filter((t) => favoriteIds.includes(t.id));

  // Collect user's written reviews
  const userWrittenReviews: { template: (typeof templates)[0]; review: string; rating: number; date: string }[] = [];
  if (currentUser) {
    Object.entries(reviews).forEach(([tplId, revList]) => {
      const found = revList.find((r) => r.user.id === currentUser.id);
      if (found) {
        const tpl = templates.find((t) => t.id === tplId);
        if (tpl) {
          userWrittenReviews.push({
            template: tpl,
            review: found.review,
            rating: found.rating,
            date: found.createdAt,
          });
        }
      }
    });
  }

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="font-display font-bold text-2xl text-stone-900 dark:text-stone-100">
          Sign In to Access Dashboard
        </h2>
        <p className="text-xs text-stone-500">
          Please log in to manage your saved templates, organize collections, and customize your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* User Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4 sm:gap-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.fullName}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-stone-200 dark:border-stone-700 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100">
                {currentUser.fullName}
              </h1>
              {currentUser.isStaff && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-800/20">
                  Staff
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 font-mono">@{currentUser.username}</p>
            <p className="text-xs text-stone-600 dark:text-stone-300 max-w-md pt-1">
              {currentUser.bio}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2 text-stone-400">
              {currentUser.website && (
                <a
                  href={currentUser.website}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-stone-900 dark:hover:text-white transition-colors"
                  title="Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {currentUser.github && (
                <a
                  href={currentUser.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-stone-900 dark:hover:text-white transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {currentUser.linkedin && (
                <a
                  href={currentUser.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-stone-900 dark:hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-center">
          <div>
            <span className="font-display font-bold text-xl text-stone-900 dark:text-stone-100 block">
              {favoriteIds.length}
            </span>
            <span className="text-[10px] font-semibold text-stone-400 uppercase">Saved</span>
          </div>
          <div>
            <span className="font-display font-bold text-xl text-stone-900 dark:text-stone-100 block">
              {collections.length}
            </span>
            <span className="text-[10px] font-semibold text-stone-400 uppercase">Collections</span>
          </div>
          <div>
            <span className="font-display font-bold text-xl text-stone-900 dark:text-stone-100 block">
              {userWrittenReviews.length}
            </span>
            <span className="text-[10px] font-semibold text-stone-400 uppercase">Reviews</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-stone-200 dark:border-stone-800 gap-2 sm:gap-4 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'border-[#023331] dark:border-emerald-500 text-[#023331] dark:text-emerald-400 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'saved'
              ? 'border-[#023331] dark:border-emerald-500 text-[#023331] dark:text-emerald-400 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Saved ({favoriteIds.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('collections')}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'collections'
              ? 'border-[#023331] dark:border-emerald-500 text-[#023331] dark:text-emerald-400 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Collections ({collections.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'reviews'
              ? 'border-[#023331] dark:border-emerald-500 text-[#023331] dark:text-emerald-400 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <Star className="w-3.5 h-3.5" />
          <span>My Reviews ({userWrittenReviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'settings'
              ? 'border-[#023331] dark:border-emerald-500 text-[#023331] dark:text-emerald-400 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Profile Settings</span>
        </button>
      </div>

      {/* Tab Content Panes */}
      <div>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">
                  Recent Saved Templates
                </h3>
                <button
                  onClick={() => setActiveTab('saved')}
                  className="text-xs font-semibold text-[#023331] dark:text-emerald-400 hover:underline"
                >
                  View all ({favoriteIds.length})
                </button>
              </div>

              {savedTemplates.length === 0 ? (
                <p className="text-xs text-stone-400 italic">No templates saved yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedTemplates.slice(0, 3).map((tpl) => (
                    <TemplateCard key={tpl.id} template={tpl} />
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4 pt-6 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">
                  Your Collections
                </h3>
                <button
                  onClick={onOpenCollections}
                  className="text-xs font-semibold text-[#023331] dark:text-emerald-400 hover:underline"
                >
                  Manage Collections
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {collections.map((col) => (
                  <div
                    key={col.id}
                    onClick={onOpenCollections}
                    className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#131518] hover:border-stone-400 cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] text-stone-400">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {col.templateIds.length} items
                      </span>
                      <span>{col.isPublic ? 'Public' : 'Private'}</span>
                    </div>
                    <h4 className="font-display font-bold text-sm text-stone-900 dark:text-stone-100 truncate">
                      {col.name}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-1">{col.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Saved Templates Tab */}
        {activeTab === 'saved' && (
          <div className="space-y-6 animate-in fade-in">
            {savedTemplates.length === 0 ? (
              <div className="py-16 text-center text-xs text-stone-500">
                You have not saved any templates yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedTemplates.map((tpl) => (
                  <TemplateCard key={tpl.id} template={tpl} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Collections Tab */}
        {activeTab === 'collections' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex justify-end">
              <button
                onClick={onOpenCollections}
                className="px-4 py-2 rounded-xl bg-[#023331] text-white text-xs font-semibold hover:bg-[#004643] transition-colors"
              >
                Go to Collections View
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {collections.map((col) => (
                <div
                  key={col.id}
                  onClick={onOpenCollections}
                  className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#131518] cursor-pointer hover:border-stone-400 space-y-2"
                >
                  <h4 className="font-display font-bold text-base text-stone-900 dark:text-stone-100">
                    {col.name}
                  </h4>
                  <p className="text-xs text-stone-500">{col.description}</p>
                  <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 pt-2 border-t border-stone-100 dark:border-stone-800">
                    {col.templateIds.length} Templates saved
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4 animate-in fade-in">
            {userWrittenReviews.length === 0 ? (
              <div className="py-16 text-center text-xs text-stone-500">
                You haven&apos;t written any template reviews yet.
              </div>
            ) : (
              <div className="space-y-3 max-w-2xl">
                {userWrittenReviews.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-stone-900 dark:text-stone-100">
                        {item.template.name}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= item.rating ? 'fill-current' : 'text-stone-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      &ldquo;{item.review}&rdquo;
                    </p>
                    <span className="text-[10px] text-stone-400 block">{item.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Settings Tab (Section 16 requirements) */}
        {activeTab === 'settings' && (
          <div className="max-w-xl bg-white dark:bg-[#131518] p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs animate-in fade-in">
            <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">
              Edit Creator Profile
            </h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#023331] hover:bg-[#004643] text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

    </div>
  );
};
