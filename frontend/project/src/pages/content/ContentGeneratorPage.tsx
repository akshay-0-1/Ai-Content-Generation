import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Copy, Download, Share2, Sparkles, CircleSlash } from 'lucide-react';
import Button from '../../components/common/Button';
import TextArea from '../../components/common/TextArea';
import Dropdown from '../../components/common/Dropdown';
import { useToast } from '../../context/ToastContext';
import { ContentType } from '../../types';

// Form validation schema
const generatorSchema = z.object({
  prompt: z.string().min(10, 'Please enter at least 10 characters'),
  contentType: z.string().min(1, 'Please select a content type'),
});

type GeneratorFormValues = z.infer<typeof generatorSchema>;

// Content type options
const contentTypes: ContentType[] = [
  // Professional
  { id: 'blog', name: 'Blog Post', category: 'professional', description: 'Create engaging blog content' },
  { id: 'article', name: 'Article', category: 'professional', description: 'Write in-depth articles' },
  { id: 'technical', name: 'Technical Documentation', category: 'professional', description: 'Create detailed documentation' },
  { id: 'newsletter', name: 'Newsletter', category: 'professional', description: 'Craft informative newsletters' },
  { id: 'press', name: 'Press Release', category: 'professional', description: 'Write professional press releases' },
  
  // Marketing
  { id: 'product', name: 'Product Description', category: 'marketing', description: 'Create compelling product descriptions' },
  { id: 'ad', name: 'Ad Copy', category: 'marketing', description: 'Write high-converting ad copy' },
  { id: 'seo', name: 'SEO Content', category: 'marketing', description: 'Generate SEO-optimized content' },
  { id: 'meta', name: 'Meta Description', category: 'marketing', description: 'Create effective meta descriptions' },
  { id: 'headline', name: 'Headlines', category: 'marketing', description: 'Craft attention-grabbing headlines' },
  
  // Social Media
  { id: 'caption', name: 'Captions', category: 'social', description: 'Write engaging social media captions' },
  { id: 'social', name: 'Social Posts', category: 'social', description: 'Create shareable social media posts' },
  { id: 'engagement', name: 'Engagement Content', category: 'social', description: 'Generate content that drives engagement' },
  
  // Educational
  { id: 'notes', name: 'Notes', category: 'educational', description: 'Create structured, concise notes' },
  { id: 'summary', name: 'Summary', category: 'educational', description: 'Generate clear, concise summaries' },
  { id: 'tutorial', name: 'Tutorial', category: 'educational', description: 'Write step-by-step tutorials' },
  { id: 'faq', name: 'FAQ', category: 'educational', description: 'Create helpful FAQ content' },
  { id: 'outline', name: 'Outline', category: 'educational', description: 'Generate structured content outlines' },
];

// Group content types by category
const contentTypesByCategory = contentTypes.reduce((acc, contentType) => {
  const category = contentType.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(contentType);
  return acc;
}, {} as Record<string, ContentType[]>);

// Format category names for display
const formatCategory = (category: string): string => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

const ContentGeneratorPage: React.FC = () => {
  const { addToast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  const { control, register, handleSubmit, formState: { errors }, watch } = useForm<GeneratorFormValues>({
    resolver: zodResolver(generatorSchema),
    defaultValues: {
      prompt: '',
      contentType: '',
    },
  });

  const selectedContentType = watch('contentType');
  const contentTypeDetails = contentTypes.find(ct => ct.id === selectedContentType);

  // Mock function to generate content based on prompt and content type
  const generateContent = async (prompt: string, contentTypeId: string): Promise<string> => {
    // Simulate API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const contentType = contentTypes.find(ct => ct.id === contentTypeId);
        
        if (!contentType) {
          return resolve('Content type not found');
        }
        
        let result = '';
        
        // Generate different mock content based on content type
        switch (contentType.category) {
          case 'professional':
            result = `# ${prompt}\n\n## Introduction\nWelcome to this professional content about ${prompt}. This comprehensive piece aims to provide valuable insights and actionable information.\n\n## Key Points\n- The importance of understanding ${prompt}\n- How ${prompt} impacts your industry\n- Strategies for implementing ${prompt} effectively\n\n## Conclusion\nIn conclusion, ${prompt} represents a significant opportunity for growth and innovation in your field. By implementing the strategies outlined in this article, you can leverage the power of ${prompt} to achieve your goals.`;
            break;
            
          case 'marketing':
            result = `# ${prompt} - The Ultimate Solution\n\nDiscover the revolutionary approach to ${prompt} that's changing the industry!\n\n✅ Increases efficiency by 300%\n✅ Reduces costs by up to 50%\n✅ Implement in just 3 easy steps\n\nDon't miss out on the opportunity to transform your business with ${prompt}. Act now and see the results immediately!`;
            break;
            
          case 'social':
            result = `📣 Just discovered the most amazing thing about ${prompt}! 🤩\n\nHave you ever wondered how to make the most of ${prompt}? Here's what I learned today:\n\n1️⃣ It's more versatile than you think\n2️⃣ You can use it to improve your daily routine\n3️⃣ The results are immediate and impressive\n\n#${prompt.replace(/\s+/g, '')} #Amazing #MustTry`;
            break;
            
          case 'educational':
            result = `# Learning Guide: ${prompt}\n\n## Overview\nThis educational content aims to provide a clear understanding of ${prompt}, its key concepts, and practical applications.\n\n## Key Concepts\n1. Definition of ${prompt}\n2. Historical context and development\n3. Current applications and uses\n\n## Step-by-Step Tutorial\n1. Begin by understanding the basics of ${prompt}\n2. Practice with simple examples\n3. Apply to real-world scenarios\n4. Reflect on your learning\n\n## Quiz\n1. What is the primary purpose of ${prompt}?\n2. How has ${prompt} evolved over time?\n3. What are three practical applications of ${prompt}?`;
            break;
            
          default:
            result = `Generated content about ${prompt}`;
        }
        
        resolve(result);
      }, 2000); // Simulate a 2-second delay
    });
  };

  const onSubmit = async (data: GeneratorFormValues) => {
    setIsGenerating(true);
    
    try {
      const content = await generateContent(data.prompt, data.contentType);
      setGeneratedContent(content);
      addToast('Content generated successfully!', 'success');
    } catch (error) {
      console.error('Error generating content:', error);
      addToast('Failed to generate content', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent)
        .then(() => {
          setIsCopied(true);
          addToast('Content copied to clipboard!', 'success');
          
          // Reset the copied state after 2 seconds
          setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy content:', err);
          addToast('Failed to copy content', 'error');
        });
    }
  };

  const handleDownload = () => {
    if (generatedContent) {
      const blob = new Blob([generatedContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated-content.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      addToast('Content downloaded successfully!', 'success');
    }
  };

  const handleShare = () => {
    addToast('Sharing functionality coming soon!', 'info');
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">AI Content Generator</h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <TextArea
                label="What do you want to create?"
                placeholder="Enter your topic or idea here..."
                rows={5}
                error={errors.prompt?.message}
                className="w-full resize-y"
                {...register('prompt')}
              />
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Content Type
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(contentTypesByCategory).map(([category, types]) => (
                    <div key={category} className="space-y-2">
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        {formatCategory(category)}
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                        <Controller
                          control={control}
                          name="contentType"
                          render={({ field }) => (
                            <div className="space-y-2">
                              {types.map((type) => (
                                <div key={type.id} className="flex items-center">
                                  <input
                                    type="radio"
                                    id={type.id}
                                    value={type.id}
                                    checked={field.value === type.id}
                                    onChange={() => field.onChange(type.id)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                                  />
                                  <label
                                    htmlFor={type.id}
                                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                  >
                                    {type.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {errors.contentType && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.contentType.message}</p>
                )}
                
                {contentTypeDetails && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {contentTypeDetails.description}
                  </p>
                )}
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="large"
                isLoading={isGenerating}
                leftIcon={<Sparkles size={18} />}
              >
                {isGenerating ? 'Generating...' : 'Generate Content'}
              </Button>
            </form>
          </div>
          
          {generatedContent && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Generated Content</h2>
                <div className="flex gap-2">
                  <Button
                    variant="subtle"
                    size="small"
                    onClick={handleCopy}
                    leftIcon={<Copy size={16} />}
                  >
                    {isCopied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    variant="subtle"
                    size="small"
                    onClick={handleDownload}
                    leftIcon={<Download size={16} />}
                  >
                    Download
                  </Button>
                  <Button
                    variant="subtle"
                    size="small"
                    onClick={handleShare}
                    leftIcon={<Share2 size={16} />}
                  >
                    Share
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-700 whitespace-pre-wrap font-mono text-sm overflow-auto max-h-96">
                {generatedContent}
              </div>
              
              <div className="flex justify-end">
                <Button
                  variant="subtle"
                  size="small"
                  onClick={() => setGeneratedContent(null)}
                  leftIcon={<CircleSlash size={16} />}
                >
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentGeneratorPage;