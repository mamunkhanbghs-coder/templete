import { Template, AIRecommendation, StyleType } from '../types';

interface QueryIntent {
  category?: string;
  style?: StyleType;
  industry?: string;
  keywords: string[];
  features?: string[];
  explanation: string;
}

/**
 * Intelligent semantic analyzer that parses user natural language queries into structured search criteria.
 * Maps intent to real database templates safely without arbitrary SQL or queries.
 */
export function analyzeQueryIntent(query: string): QueryIntent {
  const lower = query.toLowerCase();
  const keywords: string[] = [];
  let category: string | undefined;
  let style: StyleType | undefined;
  let industry: string | undefined;
  const features: string[] = [];

  // Detect category
  if (lower.includes('portfolio') || lower.includes('resume') || lower.includes('cv') || lower.includes('personal site')) {
    category = 'Portfolio';
  } else if (lower.includes('restaurant') || lower.includes('cafe') || lower.includes('dining') || lower.includes('bistro') || lower.includes('omakase')) {
    category = 'Restaurant';
  } else if (lower.includes('saas') || lower.includes('software') || lower.includes('b2b') || lower.includes('subscription')) {
    category = 'SaaS';
  } else if (lower.includes('ecommerce') || lower.includes('store') || lower.includes('shop') || lower.includes('boutique') || lower.includes('product')) {
    category = 'E-commerce';
  } else if (lower.includes('agency') || lower.includes('studio') || lower.includes('creative firm')) {
    category = 'Agency';
  } else if (lower.includes('blog') || lower.includes('magazine') || lower.includes('journal') || lower.includes('writer') || lower.includes('newsletter')) {
    category = 'Blog';
  } else if (lower.includes('photo') || lower.includes('photographer') || lower.includes('camera') || lower.includes('cinematography')) {
    category = 'Photography';
  } else if (lower.includes('finance') || lower.includes('fintech') || lower.includes('invest') || lower.includes('bank') || lower.includes('crypto')) {
    category = 'Finance';
  } else if (lower.includes('health') || lower.includes('medical') || lower.includes('clinic') || lower.includes('doctor') || lower.includes('wellness')) {
    category = 'Health';
  } else if (lower.includes('education') || lower.includes('course') || lower.includes('academy') || lower.includes('school') || lower.includes('learn')) {
    category = 'Education';
  } else if (lower.includes('event') || lower.includes('conference') || lower.includes('summit') || lower.includes('festival')) {
    category = 'Events';
  } else if (lower.includes('nonprofit') || lower.includes('charity') || lower.includes('foundation') || lower.includes('cause')) {
    category = 'Nonprofit';
  } else if (lower.includes('tech') || lower.includes('developer') || lower.includes('ai') || lower.includes('machine learning') || lower.includes('api')) {
    category = 'Technology';
  }

  // Detect style
  if (lower.includes('dark') || lower.includes('night') || lower.includes('black')) {
    style = 'Dark';
    keywords.push('dark');
  } else if (lower.includes('minimal') || lower.includes('clean') || lower.includes('simple')) {
    style = 'Minimal';
    keywords.push('minimal');
  } else if (lower.includes('luxury') || lower.includes('elegant') || lower.includes('premium') || lower.includes('haute')) {
    style = 'Luxury';
    keywords.push('luxury');
  } else if (lower.includes('editorial') || lower.includes('magazine-style') || lower.includes('typography')) {
    style = 'Editorial';
    keywords.push('editorial');
  } else if (lower.includes('modern') || lower.includes('sleek')) {
    style = 'Modern';
    keywords.push('modern');
  } else if (lower.includes('corporate') || lower.includes('business')) {
    style = 'Corporate';
    keywords.push('corporate');
  } else if (lower.includes('bold') || lower.includes('vibrant')) {
    style = 'Bold';
    keywords.push('bold');
  }

  // Keywords extraction
  const triggerWords = ['python', 'developer', 'engineer', 'architect', 'fashion', 'ceramics', 'coffee', 'legal', 'law', 'booking', 'e-commerce', 'art', 'ai', 'cloud'];
  for (const word of triggerWords) {
    if (lower.includes(word) && !keywords.includes(word)) {
      keywords.push(word);
    }
  }

  // Features extraction
  if (lower.includes('booking') || lower.includes('reservation') || lower.includes('appointment')) features.push('Booking');
  if (lower.includes('dark mode') || lower.includes('dark theme')) features.push('Dark Mode');
  if (lower.includes('store') || lower.includes('cart') || lower.includes('e-commerce') || lower.includes('ecommerce')) features.push('E-commerce');
  if (lower.includes('blog') || lower.includes('articles')) features.push('Blog');
  if (lower.includes('contact') || lower.includes('form')) features.push('Contact Form');
  if (lower.includes('newsletter')) features.push('Newsletter');
  if (lower.includes('gallery') || lower.includes('photos')) features.push('Gallery');

  const explanation = category && style
    ? `Identified intent for a ${style} ${category} template with emphasis on ${keywords.join(', ') || 'modern craftsmanship'}.`
    : `Parsed search intent matching ${keywords.join(', ') || 'curated modern designs'} across our catalog.`;

  return { category, style, industry, keywords, features, explanation };
}

/**
 * Matches templates based on extracted intent and assigns relevance scores.
 */
export function recommendTemplates(query: string, allTemplates: Template[]): AIRecommendation {
  const intent = analyzeQueryIntent(query);
  const scored = allTemplates.map((tpl) => {
    let score = 0;
    const lowerQ = query.toLowerCase();

    // Category match (+5)
    if (intent.category && tpl.category.toLowerCase() === intent.category.toLowerCase()) {
      score += 5;
    }

    // Style match (+4)
    if (intent.style && tpl.style === intent.style) {
      score += 4;
    }

    // Direct text search matches
    if (tpl.name.toLowerCase().includes(lowerQ)) score += 8;
    if (tpl.description.toLowerCase().includes(lowerQ)) score += 3;
    if (tpl.industry.toLowerCase().includes(lowerQ)) score += 4;

    // Keywords matches (+3 each)
    for (const kw of intent.keywords) {
      if (tpl.tags.some(t => t.toLowerCase().includes(kw))) score += 3;
      if (tpl.description.toLowerCase().includes(kw)) score += 2;
      if (tpl.name.toLowerCase().includes(kw)) score += 3;
    }

    // Features matches (+2 each)
    if (intent.features) {
      for (const feat of intent.features) {
        if (tpl.features.includes(feat)) score += 2;
      }
    }

    // Featured or high rating slight booster
    if (tpl.isFeatured) score += 0.5;
    score += tpl.ratingAvg * 0.2;

    return { template: tpl, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topMatches = scored.slice(0, 6).map(s => s.template.id);

  return {
    query,
    category: intent.category,
    style: intent.style,
    industry: intent.industry,
    keywords: intent.keywords,
    features: intent.features,
    explanation: intent.explanation,
    matchedTemplateIds: topMatches,
  };
}
