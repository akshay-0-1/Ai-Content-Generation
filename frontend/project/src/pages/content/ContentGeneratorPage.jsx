import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, // Blog
  Book, // Article
  FileCode, // Technical Documentation
  Mail, // Newsletter
  Newspaper, // Press Release
  ShoppingBag, // Product Description
  MessageSquare, // Ad Copy
  Search, // SEO Content
  Code, // Meta Description
  Type, // Headlines
  Image, // Captions
  Share2, // Social Posts
  ThumbsUp, // Engagement Content
  ClipboardList, // Notes
  FileText as Summary, // Summary
  BookOpen, // Tutorial
  HelpCircle, // FAQ
  List, // Outline
  Youtube, // YouTube Tags
  Video, // YouTube Description
  Instagram, // Instagram Tags
  MessageCircle // Instagram Caption
} from 'lucide-react';

// Define content types with icons
const contentTypes = [
  // Blog & Content
  { 
    id: 'blog-title', 
    name: 'Blog Title Generator', 
    category: 'blog-posts',
    description: 'AI-powered tool that generates engaging, SEO-optimized blog titles based on your topic',
    icon: <FileText size={24} />
  },
  { 
    id: 'blog-outline', 
    name: 'Blog Outline Generator', 
    category: 'blog-posts',
    description: 'Create comprehensive, well-structured blog outlines with AI assistance',
    icon: <List size={24} />
  },
  { 
    id: 'content', 
    name: 'Content Generator', 
    category: 'blog-posts',
    description: 'AI tool that generates high-quality, engaging content based on your outline or topic',
    icon: <Book size={24} />
  },
  { 
    id: 'seo-meta', 
    name: 'SEO Meta Description Generator', 
    category: 'seo-content',
    description: 'Create compelling meta descriptions that improve click-through rates',
    icon: <Code size={24} />
  },
  
  // YouTube content
  { 
    id: 'youtube-tags', 
    name: 'YouTube Tags Generator', 
    category: 'youtube',
    description: 'Generate optimized YouTube tags to improve video visibility and reach',
    icon: <Youtube size={24} />
  },
  { 
    id: 'youtube-description', 
    name: 'YouTube Description Generator', 
    category: 'youtube',
    description: 'Create engaging, SEO-friendly YouTube video descriptions',
    icon: <Video size={24} />
  },
  
  // Instagram content
  { 
    id: 'instagram-tags', 
    name: 'Instagram Tags Generator', 
    category: 'instagram',
    description: 'Generate relevant hashtags to maximize your Instagram post reach',
    icon: <Instagram size={24} />
  },
  { 
    id: 'instagram-caption', 
    name: 'Instagram Caption Generator', 
    category: 'instagram',
    description: 'Create engaging Instagram captions that drive engagement',
    icon: <MessageCircle size={24} />
  },
  
  // Additional content types
  { 
    id: 'product', 
    name: 'Product Description', 
    category: 'marketing',
    description: 'Create compelling product descriptions',
    icon: <ShoppingBag size={24} />
  },
  { 
    id: 'ad', 
    name: 'Ad Copy', 
    category: 'marketing',
    description: 'Write high-converting ad copy',
    icon: <MessageSquare size={24} />
  },
  { 
    id: 'newsletter', 
    name: 'Newsletter', 
    category: 'professional',
    description: 'Craft informative newsletters',
    icon: <Mail size={24} />
  },
  { 
    id: 'press', 
    name: 'Press Release', 
    category: 'professional',
    description: 'Write professional press releases',
    icon: <Newspaper size={24} />
  },
];

// Group content types by category
const contentTypesByCategory = contentTypes.reduce((acc, contentType) => {
  const category = contentType.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(contentType);
  return acc;
}, {});

// Category display names
const categoryDisplayNames = {
  'blog-posts': 'Blog Posts',
  'seo-content': 'SEO Content',
  'youtube': 'YouTube',
  'instagram': 'Instagram',
  'marketing': 'Marketing',
  'professional': 'Professional'
};

const ContentGeneratorPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle card click to navigate to content detail page
  const handleCardClick = (contentTypeId) => {
    navigate(`/generate/${contentTypeId}`);
  };
  
  // Filter content types based on search query
  const filteredContentTypes = searchQuery 
    ? contentTypes.filter(type => 
        type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        type.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : contentTypes;
    
  // Group filtered content types by category
  const filteredContentTypesByCategory = filteredContentTypes.reduce((acc, contentType) => {
    const category = contentType.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(contentType);
    return acc;
  }, {});
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main content */}
      <div className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Browse all Templates
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              What Would you Like to create today??
            </p>
            
            {/* Search bar */}
            <div className="mt-6 max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input 
                  type="search" 
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Search templates..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button 
                className={`px-4 py-2 text-sm font-medium ${searchQuery === '' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                onClick={() => setSearchQuery('')}
              >
                Popular
              </button>
              {Object.keys(contentTypesByCategory).map((category) => (
                <button 
                  key={category}
                  className={`px-4 py-2 text-sm font-medium ${searchQuery === category ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                  onClick={() => setSearchQuery(category)}
                >
                  {categoryDisplayNames[category] || category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Content type cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(filteredContentTypesByCategory).map(([category, types]) => (
              <React.Fragment key={category}>
                {types.map((contentType) => (
                  <div 
                    key={contentType.id} 
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    onClick={() => handleCardClick(contentType.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          {contentType.icon}
                        </div>
                        <div className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {contentType.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {contentType.description}
                      </p>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          
          {/* No results message */}
          {filteredContentTypes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No templates found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentGeneratorPage;
