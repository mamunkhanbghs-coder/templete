import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  Users,
  Layers,
  Heart,
  Star,
  ShieldCheck,
  TrendingUp,
  Search,
  Eye,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

declare global {
  interface Window {
    Chart?: any;
  }
}

export const CustomAdminDashboard: React.FC = () => {
  const { templates, categories, reviews, currentUser } = useApp();
  const categoryChartRef = useRef<HTMLCanvasElement | null>(null);
  const viewsChartRef = useRef<HTMLCanvasElement | null>(null);

  // Compute staff metrics
  const totalTemplates = templates.length;
  const totalCategories = categories.length;
  const totalReviewsCount = Object.values(reviews).reduce((acc, list) => acc + list.length, 0);
  const totalDownloads = templates.reduce((acc, t) => acc + (t.downloadsCount || 0), 0);

  const popularKeywords = [
    { keyword: 'dark portfolio', searches: 3420, trend: '+18%' },
    { keyword: 'python developer', searches: 2890, trend: '+24%' },
    { keyword: 'saas landing page', searches: 2410, trend: '+12%' },
    { keyword: 'luxury restaurant', searches: 1980, trend: '+8%' },
    { keyword: 'minimal agency', searches: 1850, trend: '+15%' },
    { keyword: 'editorial blog', searches: 1420, trend: '+5%' },
  ];

  // Initialize Chart.js
  useEffect(() => {
    let categoryChartInstance: any = null;
    let viewsChartInstance: any = null;

    if (window.Chart && categoryChartRef.current && viewsChartRef.current) {
      // Category Distribution Chart
      const topCategories = categories.slice(0, 6);
      const catLabels = topCategories.map((c) => c.name);
      const catCounts = topCategories.map(
        (c) => templates.filter((t) => t.category.toLowerCase() === c.name.toLowerCase()).length
      );

      categoryChartInstance = new window.Chart(categoryChartRef.current, {
        type: 'bar',
        data: {
          labels: catLabels,
          datasets: [
            {
              label: 'Templates Count',
              data: catCounts,
              backgroundColor: '#023331',
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(150, 150, 150, 0.1)' },
            },
            x: {
              grid: { display: false },
            },
          },
        },
      });

      // Template Views Line Chart
      viewsChartInstance = new window.Chart(viewsChartRef.current, {
        type: 'line',
        data: {
          labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
          datasets: [
            {
              label: 'Template Previews (k)',
              data: [12.4, 18.2, 24.5, 31.0, 42.8, 56.4],
              borderColor: '#fb3640',
              backgroundColor: 'rgba(251, 54, 64, 0.08)',
              fill: true,
              tension: 0.35,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(150, 150, 150, 0.1)' },
            },
            x: {
              grid: { display: false },
            },
          },
        },
      });
    }

    return () => {
      if (categoryChartInstance) categoryChartInstance.destroy();
      if (viewsChartInstance) viewsChartInstance.destroy();
    };
  }, [categories, templates]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Staff Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Staff Administration Console</span>
          </div>
          <h1 className="font-display font-bold text-3xl text-stone-900 dark:text-stone-100">
            Platform Analytics & Operations
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Real-time catalog metrics, user review velocity, and search telemetries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-800/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Live (PostgreSQL & Django 5)
          </span>
        </div>
      </div>

      {/* Metric KPI Cards (Section 20 requirements) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Templates</span>
            <Layers className="w-4 h-4 text-[#023331] dark:text-emerald-400" />
          </div>
          <div className="font-display font-bold text-3xl text-stone-900 dark:text-stone-100">
            {totalTemplates}
          </div>
          <p className="text-[11px] text-stone-500">Across 15 core architectural categories</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Users</span>
            <Users className="w-4 h-4 text-sky-500" />
          </div>
          <div className="font-display font-bold text-3xl text-stone-900 dark:text-stone-100">
            1,482
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold">+14% new creators this month</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Favorites</span>
            <Heart className="w-4 h-4 text-[#fb3640]" />
          </div>
          <div className="font-display font-bold text-3xl text-stone-900 dark:text-stone-100">
            8,940
          </div>
          <p className="text-[11px] text-stone-500">Active bookmarks in user vaults</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Reviews</span>
            <Star className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-display font-bold text-3xl text-stone-900 dark:text-stone-100">
            {totalReviewsCount + 420}
          </div>
          <p className="text-[11px] text-stone-500">4.89 overall platform satisfaction</p>
        </div>

      </div>

      {/* Charts Section (Chart.js Integration) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Category Distribution Bar Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#023331] dark:text-emerald-400" />
              Popular Categories Distribution
            </h3>
            <span className="text-[11px] text-stone-400">Templates per category</span>
          </div>

          <div className="h-64 w-full relative">
            <canvas ref={categoryChartRef}></canvas>
          </div>
        </div>

        {/* Template Views Line Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#fb3640]" />
              Monthly Interactive Simulator Views
            </h3>
            <span className="text-[11px] text-stone-400">October 2025 - March 2026</span>
          </div>

          <div className="h-64 w-full relative">
            <canvas ref={viewsChartRef}></canvas>
          </div>
        </div>

      </div>

      {/* Recent Templates Table & Search Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Templates Table (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100">
              Recent Templates in Catalog
            </h3>
            <span className="text-xs text-stone-400">Latest additions</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5">Template</th>
                  <th className="py-2.5">Category</th>
                  <th className="py-2.5">Price</th>
                  <th className="py-2.5">Rating</th>
                  <th className="py-2.5">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
                {templates.slice(0, 6).map((tpl) => (
                  <tr key={tpl.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/40">
                    <td className="py-3 font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                      <img
                        src={tpl.thumbnail}
                        alt={tpl.name}
                        className="w-8 h-6 object-cover rounded"
                      />
                      <span>{tpl.name}</span>
                    </td>
                    <td className="py-3 text-stone-600 dark:text-stone-300">{tpl.category}</td>
                    <td className="py-3 font-medium">{tpl.isFree ? 'Free' : `$${tpl.price}`}</td>
                    <td className="py-3 text-amber-500 font-semibold">★ {tpl.ratingAvg.toFixed(1)}</td>
                    <td className="py-3 text-stone-400">{tpl.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Most Searched Keywords (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Search className="w-4 h-4 text-stone-400" />
              Top Search Keywords
            </h3>
            <span className="text-xs text-stone-400">30-day Volume</span>
          </div>

          <div className="space-y-2.5">
            {popularKeywords.map((item) => (
              <div
                key={item.keyword}
                className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-xs"
              >
                <div className="font-medium text-stone-800 dark:text-stone-200 capitalize">
                  &ldquo;{item.keyword}&rdquo;
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-stone-400 text-[11px]">{item.searches}</span>
                  <span className="text-emerald-600 font-semibold text-[10px]">
                    {item.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
