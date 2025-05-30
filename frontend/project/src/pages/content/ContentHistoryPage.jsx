import React, { useState, useEffect } from 'react';
import { Search, Calendar, Filter, Clock, Copy, ExternalLink } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Dropdown from '../../components/common/Dropdown';
import { useToast } from '../../context/ToastContext';

// Mock content history data
const mockContentHistory = [
  {
    id: '1',
    title: 'The Future of AI Technology',
    content: 'AI technology is revolutionizing industries across the globe...',
    contentType: { id: 'blog', name: 'Blog Post', category: 'professional', description: '' },
    createdAt: '2025-04-01T10:30:00Z',
    prompt: 'Write about the future of AI technology',
  },
  {
    id: '2',
    title: 'Social Media Marketing Strategy',
    content: 'Effective social media marketing requires a strategic approach...',
    contentType: { id: 'article', name: 'Article', category: 'professional', description: '' },
    createdAt: '2025-03-28T15:45:00Z',
    prompt: 'Create a social media marketing strategy guide',
  },
  {
    id: '3',
    title: 'Product Launch Announcement',
    content: 'We\'re excited to announce the launch of our new product...',
    contentType: { id: 'press', name: 'Press Release', category: 'professional', description: '' },
    createdAt: '2025-03-25T09:15:00Z',
    prompt: 'Write a product launch announcement',
  },
  {
    id: '4',
    title: 'Spring Collection Promotion',
    content: 'Introducing our Spring Collection! Refresh your style with...',
    contentType: { id: 'ad', name: 'Ad Copy', category: 'marketing', description: '' },
    createdAt: '2025-03-20T14:00:00Z',
    prompt: 'Create ad copy for a spring clothing collection',
  },
  {
    id: '5',
    title: 'How to Improve Your Productivity',
    content: 'Boost your productivity with these proven strategies...',
    contentType: { id: 'social', name: 'Social Posts', category: 'social', description: '' },
    createdAt: '2025-03-15T11:30:00Z',
    prompt: 'Tips for improving productivity',
  },
];

// Filter options
const dateFilterOptions = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
];

const typeFilterOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'professional', label: 'Professional' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'social', label: 'Social Media' },
  { value: 'educational', label: 'Educational' },
];

const ContentHistoryPage = () => {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [filteredContent, setFilteredContent] = useState(mockContentHistory);

  useEffect(() => {
    // Apply filters
    let filtered = mockContentHistory;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item => item.title.toLowerCase().includes(query) || 
                item.prompt.toLowerCase().includes(query)
      );
    }
    
    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.createdAt).getTime();
        
        switch (dateFilter) {
          case 'today':
            return itemDate >= today;
          case 'week':
            const weekStart = new Date(today - 7 * 24 * 60 * 60 * 1000).getTime();
            return itemDate >= weekStart;
          case 'month':
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
            return itemDate >= monthStart;
          default:
            return true;
        }
      });
    }
    
    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.contentType.category === typeFilter);
    }
    
    setFilteredContent(filtered);
  }, [searchQuery, dateFilter, typeFilter]);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Handle copy to clipboard
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content).then(() => {
      addToast({
        id: Date.now().toString(),
        message: 'Content copied to clipboard',
        type: 'success',
      });
    });
  };

  // Handle regenerate content
  const handleRegenerate = (prompt, contentTypeId) => {
    // Navigate to generator page with pre-filled values
    console.log(`Regenerating content with prompt: ${prompt} and type: ${contentTypeId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Content History
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage your previously generated content
            </p>
          </div>
          
          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search by title or prompt"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-40">
                  <Dropdown
                    options={dateFilterOptions}
                    value={dateFilter}
                    onChange={setDateFilter}
                    placeholder="Date Range"
                  />
                </div>
                
                <div className="w-full sm:w-40">
                  <Dropdown
                    options={typeFilterOptions}
                    value={typeFilter}
                    onChange={setTypeFilter}
                    placeholder="Content Type"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Content List */}
          {filteredContent.length > 0 ? (
            <div className="space-y-4">
              {filteredContent.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-0">{item.title}</h2>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={16} />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${item.contentType.category === 'professional' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : ''}
                        ${item.contentType.category === 'marketing' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' : ''}
                        ${item.contentType.category === 'social' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300' : ''}
                        ${item.contentType.category === 'educational' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300' : ''}
                      `}>
                        {item.contentType.name}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {item.content.length > 150
                        ? `${item.content.substring(0, 150)}...`
                        : item.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                        <span className="font-medium">Prompt:</span> {item.prompt}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="subtle"
                          size="small"
                          onClick={() => handleCopy(item.content)}
                          leftIcon={<Copy size={14} />}
                        >
                          Copy
                        </Button>
                        <Button
                          variant="subtle"
                          size="small"
                          onClick={() => handleRegenerate(item.prompt, item.contentType.id)}
                          leftIcon={<ExternalLink size={14} />}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No content found matching your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentHistoryPage;
