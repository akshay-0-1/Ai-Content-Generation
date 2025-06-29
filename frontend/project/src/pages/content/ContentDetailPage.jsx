import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  ArrowLeft, 
  Copy, 
  Download, 
  Share2, 
  Sparkles,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  CheckSquare,
  Table,
  Link,
  Code,
  Square
} from 'lucide-react';

import Button from '../../components/common/Button';
import TextArea from '../../components/common/TextArea';
import Input from '../../components/common/Input';
import { useToast } from '../../context/ToastContext';

// Content type definitions
const contentTypes = {
  'blog-title': {
    name: 'Blog Title Generator',
    description: 'AI-powered tool that generates engaging, SEO-optimized blog titles based on your topic',
    formFields: [
      { name: 'blogNiche', label: 'Enter your blog niche *', type: 'text', placeholder: 'e.g., fitness, technology, cooking', required: true },
      { name: 'keywords', label: 'Enter keywords (optional)', type: 'text', placeholder: 'e.g., beginner, guide, tips' },
      { name: 'outlines', label: 'Enter blog outlines (optional)', type: 'textarea', placeholder: 'Enter a brief outline of what your blog post will cover...' }
    ]
  },
  'blog-outline': {
    name: 'Blog Outline Generator',
    description: 'Create comprehensive, well-structured blog outlines with AI assistance',
    formFields: [
      { name: 'blogTitle', label: 'Enter your blog title *', type: 'text', placeholder: 'e.g., How to Start a Home Garden', required: true },
      { name: 'targetAudience', label: 'Target audience (optional)', type: 'text', placeholder: 'e.g., beginners, professionals, parents' },
      { name: 'keyPoints', label: 'Key points to include (optional)', type: 'textarea', placeholder: 'Enter any specific points you want to include...' }
    ]
  },
  'content': {
    name: 'Content Generator',
    description: 'AI tool that generates high-quality, engaging content based on your outline or topic',
    formFields: [
      { name: 'contentTopic', label: 'Enter your content topic *', type: 'text', placeholder: 'e.g., Benefits of Meditation', required: true },
      { name: 'tone', label: 'Tone of voice (optional)', type: 'text', placeholder: 'e.g., professional, casual, enthusiastic' },
      { name: 'contentOutline', label: 'Content outline (optional)', type: 'textarea', placeholder: 'Enter a brief outline of what you want to cover...' }
    ]
  },
  'seo-meta': {
    name: 'SEO Meta Description Generator',
    description: 'Create compelling meta descriptions that improve click-through rates',
    formFields: [
      { name: 'pageTitle', label: 'Enter your page title *', type: 'text', placeholder: 'e.g., 10 Ways to Improve Your SEO', required: true },
      { name: 'keywords', label: 'Target keywords (optional)', type: 'text', placeholder: 'e.g., SEO, search engine optimization, rankings' },
      { name: 'pageContent', label: 'Brief page content summary (optional)', type: 'textarea', placeholder: 'Enter a brief summary of your page content...' }
    ]
  },
  'youtube-tags': {
    name: 'YouTube Tags Generator',
    description: 'Generate optimized YouTube tags to improve video visibility and reach',
    formFields: [
      { name: 'videoTitle', label: 'Enter your video title *', type: 'text', placeholder: 'e.g., How to Make Sourdough Bread at Home', required: true },
      { name: 'videoCategory', label: 'Video category (optional)', type: 'text', placeholder: 'e.g., Cooking, Gaming, Education' },
      { name: 'videoDescription', label: 'Brief video description (optional)', type: 'textarea', placeholder: 'Enter a brief description of your video...' }
    ]
  },
  'youtube-description': {
    name: 'YouTube Description Generator',
    description: 'Create engaging, SEO-friendly YouTube video descriptions',
    formFields: [
      { name: 'videoTitle', label: 'Enter your video title *', type: 'text', placeholder: 'e.g., 10 Minute Morning Yoga Routine', required: true },
      { name: 'videoKeyPoints', label: 'Key points in video (optional)', type: 'textarea', placeholder: 'Enter the main points covered in your video...' },
      { name: 'callToAction', label: 'Call to action (optional)', type: 'text', placeholder: 'e.g., Subscribe, Visit website, Join membership' }
    ]
  },
  'instagram-tags': {
    name: 'Instagram Tags Generator',
    description: 'Generate relevant hashtags to maximize your Instagram post reach',
    formFields: [
      { name: 'postTopic', label: 'Enter your post topic *', type: 'text', placeholder: 'e.g., fashion, travel, fitness', required: true },
      { name: 'location', label: 'Location (optional)', type: 'text', placeholder: 'e.g., New York, Bali, home' },
      { name: 'brandTags', label: 'Brand tags (optional)', type: 'text', placeholder: 'e.g., Nike, Canon, homemade' }
    ]
  },
  'instagram-caption': {
    name: 'Instagram Caption Generator',
    description: 'Create engaging Instagram captions that drive engagement',
    formFields: [
      { name: 'postTopic', label: 'Enter your post topic *', type: 'text', placeholder: 'e.g., beach vacation, new product launch', required: true },
      { name: 'mood', label: 'Mood/tone (optional)', type: 'text', placeholder: 'e.g., inspirational, funny, thoughtful' },
      { name: 'captionLength', label: 'Caption length (optional)', type: 'text', placeholder: 'e.g., short, medium, long' }
    ]
  }
};

// Form validation schema
const createGeneratorSchema = (contentTypeId) => {
  const fields = {};
  const contentType = contentTypes[contentTypeId];
  
  if (contentType) {
    contentType.formFields.forEach(field => {
      if (field.required) {
        fields[field.name] = z.string().min(1, `${field.label.replace(' *', '')} is required`);
      } else {
        fields[field.name] = z.string().optional();
      }
    });
  }
  
  return z.object(fields);
};

const ContentDetailPage = () => {
  const { contentTypeId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  
  const contentType = contentTypes[contentTypeId];
  
  // Redirect if content type doesn't exist
  useEffect(() => {
    if (!contentType) {
      navigate('/generate');
      addToast({
        id: Date.now().toString(),
        message: 'Content type not found',
        type: 'error'
      });
    }
  }, [contentType, navigate, addToast]);
  
  const schema = createGeneratorSchema(contentTypeId);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });
  
  // Mock function to generate content
  const STORAGE_KEY = 'contentHistory';

const generateContent = async (data) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock content based on content type
    let mockContent = '';
    
    if (contentTypeId === 'blog-title') {
      mockContent = `<h1>How to Fuel Your Next Adventure: The Ultimate Red Bull Guide</h1>
<h2>10 Unexpected Ways to Use Red Bull (Beyond Just a Pick-Me-Up)</h2>
<h2>Red Bull vs. Other Energy Drinks: Which One Reigns Supreme?</h2>
<h2>Is Red Bull Actually Bad for You? Debunking the Myths</h2>
<h2>Red Bull Recipes: 5 Creative Cocktails and Mocktails</h2>
<h2>Top 5 Red Bull Flavors You Need to Try (and Where to Find Them!)</h2>
<h2>How Red Bull Became a Global Phenomenon: A Brand Story</h2>
<h2>Red Bull's Extreme Sports Sponsorship: A Marketing Masterclass</h2>
<h2>Does Red Bull Really Give You Wings? The Science Behind the Hype</h2>
<h2>7 Genius Ways to Incorporate Red Bull Into Your Workout Routine</h2>`;
    } else if (contentTypeId === 'blog-outline') {
      mockContent = `# How to Start a Successful Blog in 2025

## Introduction
- The importance of blogging in today's digital landscape
- Brief overview of what the post will cover
- Who this guide is for (beginners and intermediate bloggers)

## I. Finding Your Niche
- Why having a specific niche matters
- How to identify profitable niches
- Balancing passion and marketability
- Researching competition in your chosen niche

## II. Setting Up Your Blog
- Choosing the right blogging platform
- Selecting a domain name and hosting
- Essential plugins and tools
- Mobile optimization considerations

## III. Content Strategy Development
- Creating a content calendar
- Keyword research fundamentals
- Different types of blog posts to create
- How to write compelling headlines

## IV. Writing Engaging Content
- Crafting attention-grabbing introductions
- Structuring your posts for readability
- Using visuals effectively
- Voice and tone considerations

## V. SEO Fundamentals
- On-page SEO best practices
- Internal linking strategies
- Meta descriptions and title tags
- Image optimization

## VI. Building an Audience
- Email list building strategies
- Social media promotion tactics
- Guest posting opportunities
- Networking with other bloggers

## VII. Monetization Strategies
- Affiliate marketing approaches
- Sponsored content opportunities
- Digital products and courses
- Membership and subscription models

## VIII. Analytics and Growth
- Essential metrics to track
- Using data to inform content decisions
- A/B testing strategies
- Scaling your blog operations

## Conclusion
- Recap of key points
- Encouragement and next steps
- Additional resources`;
    } else if (contentTypeId === 'content') {
      mockContent = `# The Benefits of Regular Meditation

In today's fast-paced world, finding moments of calm can seem nearly impossible. Yet, the ancient practice of meditation offers a powerful antidote to our modern stresses. Regular meditation isn't just a spiritual practice—it's a scientifically-backed approach to improving both mental and physical wellbeing.

## What Happens to Your Brain When You Meditate

When you meditate, your brain undergoes remarkable changes. Neuroimaging studies have shown that regular meditation practice can:

- Increase gray matter density in areas associated with learning, memory, and emotional regulation
- Reduce activity in the default mode network (DMN), which is responsible for mind-wandering and self-referential thoughts
- Strengthen connections between brain regions that help with attention control
- Enhance production of feel-good neurotransmitters like serotonin and dopamine

These changes don't require years of dedicated practice. Research suggests that measurable benefits can appear in as little as eight weeks of regular meditation.

## Physical Health Benefits

The mind-body connection means that meditation's benefits extend beyond mental wellbeing:

1. **Reduced inflammation**: Studies have shown that mindfulness practices can reduce inflammatory markers in the blood.
2. **Lower blood pressure**: Regular meditation can help reduce high blood pressure, decreasing strain on the heart.
3. **Improved immune function**: Meditation appears to boost immune cell activity, potentially helping fight off illness.
4. **Better sleep**: By calming the mind and reducing stress, meditation can help address insomnia and improve sleep quality.

## Mental and Emotional Benefits

Perhaps the most well-known benefits of meditation are psychological:

- **Stress reduction**: Meditation lowers cortisol levels, helping you respond to stressors more effectively.
- **Anxiety management**: Regular practice can reduce symptoms of both situational and clinical anxiety.
- **Depression relief**: Mindfulness-based cognitive therapy has been shown to be as effective as medication for preventing depression relapse.
- **Improved focus**: Meditation trains attention, helping you stay on task and resist distractions.
- **Emotional regulation**: Regular meditators often report greater emotional stability and resilience.

## Getting Started with Meditation

Beginning a meditation practice doesn't require special equipment or extensive training:

1. Start with just 5 minutes daily and gradually increase your time
2. Find a quiet space where you won't be disturbed
3. Sit comfortably with good posture (a chair is fine)
4. Focus on your breath—the sensation of air moving in and out
5. When your mind wanders (and it will), gently bring attention back to your breath
6. Try using a guided meditation app if you find it difficult to practice alone

Remember that meditation is called a "practice" for a reason—it takes consistency to see results. The goal isn't to stop thinking but to change your relationship with your thoughts.

## Conclusion

In a world that constantly demands our attention, meditation offers a valuable opportunity to reconnect with ourselves. Whether you're seeking stress relief, emotional balance, or physical health benefits, a regular meditation practice can be transformative. The best part? It's accessible to everyone, requires no special equipment, and can be practiced anywhere. Why not start today with just five minutes of mindful breathing?`;
    } else if (contentTypeId === 'seo-meta') {
      mockContent = `1. "Discover 10 proven SEO strategies that will boost your website traffic by 200% in just 30 days. Our expert guide covers everything from keyword optimization to backlink building."

2. "Looking to improve your website's search rankings? Our comprehensive SEO guide reveals insider techniques used by top-performing sites to dominate Google's first page."

3. "Stop wasting time on ineffective SEO tactics! Our data-driven approach focuses on what actually works in 2025, helping you achieve measurable results without the guesswork."

4. "Learn how small businesses can compete with industry giants using our specialized SEO techniques. This guide breaks down complex strategies into simple, actionable steps."

5. "Struggling with recent algorithm changes? Our SEO experts analyze Google's latest updates and provide actionable solutions to recover lost rankings and future-proof your site."`;
    } else if (contentTypeId === 'youtube-tags') {
      mockContent = `redbull, energy drink, caffeine, taurine, red bull review, energy drinks, red bull flavors, red bull benefits, red bull side effects, red bull vs monster, extreme sports, red bull sports, red bull wings, red bull ingredients, sugar free red bull, red bull sugar free, red bull zero, red bull organic, red bull editions, red bull summer edition, red bull winter edition, red bull tropical, red bull watermelon, red bull coconut, red bull peach, red bull dragon fruit, red bull acai, red bull blueberry`;
    } else if (contentTypeId === 'youtube-description') {
      mockContent = `🔋 ULTIMATE RED BULL GUIDE 🔋

In this video, I'm diving deep into everything Red Bull - from the original flavor to all the special editions, plus some surprising ways to use this iconic energy drink beyond just drinking it straight!

⏱️ TIMESTAMPS:
00:00 - Introduction
01:23 - The History of Red Bull
03:45 - Nutritional Breakdown
05:12 - Red Bull vs. Competitors
08:37 - My Top 5 Red Bull Flavors
12:04 - Creative Red Bull Recipes
15:30 - Workout Performance Benefits
18:45 - Potential Side Effects
21:18 - Conclusion & Recommendations

🔥 SPECIAL LINKS & OFFERS:
Get 10% off Red Bull products with code ENERGYGUIDE10: https://example.com/redbull
Download my free Energy Drink Comparison Guide: https://example.com/guide

👕 MERCH:
Check out my new Energy Enthusiast merch line: https://example.com/merch

📱 FOLLOW ME:
Instagram: https://instagram.com/energyenthusiast
Twitter: https://twitter.com/energyenthusiast
TikTok: https://tiktok.com/@energyenthusiast

📧 BUSINESS INQUIRIES:
business@energyenthusiast.com

#RedBull #EnergyDrinks #RedBullReview #EnergyEnthusiast #RedBullFlavors`;
    } else if (contentTypeId === 'instagram-tags') {
      mockContent = `#redbull #energydrink #givesyouwings #redbullenergy #redbulledition #redbullracing #redbullathlete #caffeine #energyboost #morningenergy #preworkout #studysession #latenight #productivity #focus #mentalclarity #extremesports #adventure #lifestyle #fitness #workout #gym #training #athlete #performance #summer #refreshing #colddrink #dailyboost #energyfix`;
    } else if (contentTypeId === 'instagram-caption') {
      mockContent = `Fueling today's adventure with my trusty Red Bull! ⚡️ Nothing beats that instant energy boost when you need to power through a busy day.

Whether I'm hitting the gym, tackling a major project, or just need that extra push to get through the afternoon slump, this little can of magic never disappoints. 

What's your go-to energy boost? Are you team Red Bull or do you have another secret weapon? Drop it in the comments! 👇

#RedBullGivesYouWings #EnergyBoost #MondayMotivation #PowerThrough`;
    }
    
    setGeneratedContent(mockContent);
    // Persist to history
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const history = raw ? JSON.parse(raw) : [];
      const firstLine = mockContent.split(/\n|\r/).find(l=>l.trim().length>0) || '';
      history.unshift({
        id: Date.now().toString(),
        title: data.title || contentType?.name || 'Untitled',
        content: firstLine + (firstLine.length < mockContent.length ? '...' : ''),
        fullContent: mockContent,
        contentType: { id: contentTypeId, name: contentType?.name || '', category: contentType?.category || '', description: '' },
        createdAt: new Date().toISOString(),
        prompt: JSON.stringify(data)
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch(e){
      console.error('Failed saving history', e);
    }
    setIsGenerating(false);
  };
  
  const onSubmit = (data) => {
    generateContent(data);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent).then(() => {
      setIsCopied(true);
      addToast({
        id: Date.now().toString(),
        message: 'Content copied to clipboard',
        type: 'success'
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  
  const handleDownload = () => {
    // Create a blob with the content
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contentType?.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addToast({
      id: Date.now().toString(),
      message: 'Content downloaded successfully',
      type: 'success'
    });
  };
  
  const handleShare = () => {
    // Mock share functionality
    addToast({
      id: Date.now().toString(),
      message: 'Sharing functionality coming soon',
      type: 'info'
    });
  };
  
  if (!contentType) return null;
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Button 
              variant="subtle" 
              size="small" 
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => navigate('/generate')}
            >
              Back
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Input Form */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {contentType.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {contentType.description}
                </p>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {contentType.formFields.map((field) => (
                    <div key={field.name}>
                      {field.type === 'textarea' ? (
                        <TextArea
                          label={field.label}
                          placeholder={field.placeholder}
                          error={errors[field.name]?.message}
                          {...register(field.name, { required: field.required })}
                          rows={6}
                        />
                      ) : (
                        <Input
                          label={field.label}
                          type={field.type}
                          placeholder={field.placeholder}
                          error={errors[field.name]?.message}
                          {...register(field.name, { required: field.required })}
                        />
                      )}
                    </div>
                  ))}
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    fullWidth
                    isLoading={isGenerating}
                    leftIcon={<Sparkles size={18} />}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Content'}
                  </Button>
                </form>
              </div>
            </div>
            
            {/* Right Column - Generated Content */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Generated Content
                  </h2>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="subtle"
                      size="small"
                      leftIcon={<Share2 size={16} />}
                      onClick={handleShare}
                    >
                      Share
                    </Button>
                    
                    <Button
                      variant="subtle"
                      size="small"
                      leftIcon={<Download size={16} />}
                      onClick={handleDownload}
                      disabled={!generatedContent}
                    >
                      Download
                    </Button>
                    
                    <Button
                      variant="primary"
                      size="small"
                      leftIcon={<Copy size={16} />}
                      onClick={handleCopy}
                      disabled={!generatedContent}
                    >
                      {isCopied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
                
                {/* Formatting toolbar */}
                {generatedContent && (
                  <div className="flex flex-wrap items-center gap-1 mb-4 p-2 border border-gray-200 dark:border-gray-700 rounded-md">
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <Bold size={16} />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <Italic size={16} />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <Underline size={16} />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <Strikethrough size={16} />
                    </button>
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <List size={16} />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <ListOrdered size={16} />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <CheckSquare size={16} />
                    </button>
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <Table size={16} />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <Link size={16} />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <Code size={16} />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <Square size={16} />
                    </button>
                  </div>
                )}
                
                <div className="flex-grow overflow-auto">
                  {generatedContent ? (
                    <div 
                      className="prose prose-sm dark:prose-invert max-w-none h-full"
                      dangerouslySetInnerHTML={{ __html: generatedContent }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-center">
                      <p>Your AI-generated content appears here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetailPage;
