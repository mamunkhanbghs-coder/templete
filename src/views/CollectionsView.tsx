import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Collection, Template } from '../types';
import { TemplateCard } from '../components/TemplateCard';
import {
  Layers,
  Plus,
  Trash2,
  Lock,
  Globe,
  ArrowRight,
  ArrowLeft,
  Share2,
  FolderPlus,
  Edit2,
} from 'lucide-react';

interface CollectionsViewProps {
  onExploreTemplates: () => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({ onExploreTemplates }) => {
  const {
    collections,
    templates,
    createCollection,
    deleteCollection,
    renameCollection,
    currentUser,
    setActiveModal,
    showToast,
  } = useApp();

  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);
  const [isCreatingModal, setIsCreatingModal] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setActiveModal('login');
      showToast('Please log in to create custom collections.', 'info');
      return;
    }
    if (!newColName.trim()) {
      showToast('Please enter a collection name.', 'error');
      return;
    }
    const created = createCollection(newColName.trim(), newColDesc.trim());
    setNewColName('');
    setNewColDesc('');
    setIsCreatingModal(false);
    setActiveCollection(created);
  };

  const handleShareCollection = (col: Collection) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(`Collection "${col.name}" share link copied to clipboard!`, 'success');
    }
  };

  // Get templates for active collection
  const activeCollectionTemplates: Template[] = activeCollection
    ? (activeCollection.templateIds
        .map((id) => templates.find((t) => t.id === id))
        .filter(Boolean) as Template[])
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Detail Mode: Single Collection */}
      {activeCollection ? (
        <div className="space-y-6 animate-in fade-in">
          
          <button
            onClick={() => setActiveCollection(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all collections</span>
          </button>

          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#023331]/10 text-[#023331] dark:text-emerald-400">
                  <Layers className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold text-stone-500">
                  {activeCollection.isPublic ? 'Public Collection' : 'Private Collection'}
                </span>
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
                {activeCollection.name}
              </h1>
              <p className="text-xs text-stone-500 max-w-xl">
                {activeCollection.description || 'No description provided.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleShareCollection(activeCollection)}
                className="px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
              <button
                onClick={() => {
                  deleteCollection(activeCollection.id);
                  setActiveCollection(null);
                }}
                className="p-2 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Delete Collection"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">
                Templates in Collection ({activeCollectionTemplates.length})
              </h2>
              <button
                onClick={onExploreTemplates}
                className="text-xs font-semibold text-[#023331] dark:text-emerald-400 hover:underline"
              >
                + Add more from catalog
              </button>
            </div>

            {activeCollectionTemplates.length === 0 ? (
              <div className="py-16 text-center rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  This collection is empty
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Browse the catalog and click &ldquo;Add to Collection&rdquo; on any template details page.
                </p>
                <button
                  onClick={onExploreTemplates}
                  className="px-4 py-2 rounded-xl bg-[#023331] text-white text-xs font-semibold hover:bg-[#004643] transition-colors"
                >
                  Explore Templates
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCollectionTemplates.map((tpl) => (
                  <TemplateCard key={tpl.id} template={tpl} />
                ))}
              </div>
            )}
          </div>

        </div>
      ) : (
        /* All Collections List */
        <div className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#023331] dark:text-emerald-400 block mb-1">
                Organization
              </span>
              <h1 className="font-display font-bold text-3xl text-stone-900 dark:text-stone-100">
                Template Collections
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                Save, group, and organize templates for client presentations, pitch decks, and personal projects.
              </p>
            </div>

            <button
              onClick={() => {
                if (!currentUser) {
                  setActiveModal('login');
                  showToast('Please log in to create collections.', 'info');
                } else {
                  setIsCreatingModal(true);
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-[#023331] hover:bg-[#004643] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Collection</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((col) => {
              const previewTemplates = col.templateIds
                .map((id) => templates.find((t) => t.id === id))
                .filter(Boolean) as Template[];

              return (
                <div
                  key={col.id}
                  onClick={() => setActiveCollection(col)}
                  className="group rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#131518] hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-xl transition-all p-5 flex flex-col justify-between cursor-pointer"
                >
                  <div className="space-y-4">
                    
                    {/* Thumbnail Stack Preview */}
                    <div className="grid grid-cols-3 gap-1.5 aspect-16/9 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 p-1 border border-stone-200/50 dark:border-stone-800">
                      {previewTemplates.length > 0 ? (
                        previewTemplates.slice(0, 3).map((tpl, i) => (
                          <img
                            key={tpl.id}
                            src={tpl.thumbnail}
                            alt={tpl.name}
                            className={`w-full h-full object-cover rounded-lg ${
                              i === 0 ? 'col-span-2 row-span-2' : ''
                            }`}
                          />
                        ))
                      ) : (
                        <div className="col-span-3 flex items-center justify-center text-stone-400 text-xs italic">
                          Empty collection
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                        <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                          {col.isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                          {col.isPublic ? 'Public' : 'Private'}
                        </span>
                        <span>{col.templateIds.length} items</span>
                      </div>

                      <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-[#023331] dark:group-hover:text-emerald-400 transition-colors">
                        {col.name}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                        {col.description || 'Curated template selection.'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs font-semibold text-[#023331] dark:text-emerald-400">
                    <span>Open Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Create Collection Modal */}
      {isCreatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#131518] rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">
              Create New Collection
            </h3>
            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Collection Name
                </label>
                <input
                  type="text"
                  required
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  placeholder="e.g. Modern Architecture Pitch"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  value={newColDesc}
                  onChange={(e) => setNewColDesc(e.target.value)}
                  placeholder="What is this collection for?"
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#023331] text-white text-xs font-semibold hover:bg-[#004643] transition-colors"
                >
                  Create Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
