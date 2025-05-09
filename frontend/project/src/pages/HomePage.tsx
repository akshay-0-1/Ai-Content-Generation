import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import { 
  FileText, 
  MessageSquare, 
  BookOpen, 
  BarChart4,
  Sparkles
} from 'lucide-react';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-[85vh]">
        <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          backgroundPosition: '50%',
        }}>
          <span className="absolute w-full h-full bg-black opacity-60"></span>
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-6/12 px-4 text-center">
              <div className="animate-fadeIn">
                <h1 className="text-5xl font-bold text-white mb-6">
                  Transform Your Ideas into Perfect Content
                </h1>
                <p className="text-xl text-gray-200 mb-8">
                  Generate high-quality, professional content for any purpose with our AI-powered platform.
                  From blog posts to social media, technical documentation to marketing copy.
                </p>
                <div className="flex justify-center gap-4">
                  <Link to={isAuthenticated ? '/generate' : '/register'}>
                    <Button 
                      variant="primary" 
                      size="large"
                      rightIcon={<Sparkles size={18} />}
                    >
                      {isAuthenticated ? 'Create Content' : 'Get Started'}
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="subtle" size="large">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Powerful Content Generation</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our AI platform understands your needs and generates relevant, engaging content in seconds.
            </p>
          </div>
          
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 h-full transition-transform hover:translate-y-[-5px]">
                <div className="text-blue-500 mb-4 flex justify-center">
                  <FileText size={48} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">Professional Documents</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Create polished blog posts, articles, and technical documentation effortlessly.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 h-full transition-transform hover:translate-y-[-5px]">
                <div className="text-purple-500 mb-4 flex justify-center">
                  <MessageSquare size={48} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">Marketing Copy</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Generate compelling ad copy, product descriptions, and SEO content that converts.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 h-full transition-transform hover:translate-y-[-5px]">
                <div className="text-red-500 mb-4 flex justify-center">
                  <BookOpen size={48} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">Educational Content</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Create summaries, tutorials, FAQs, and educational materials with ease.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 h-full transition-transform hover:translate-y-[-5px]">
                <div className="text-emerald-500 mb-4 flex justify-center">
                  <BarChart4 size={48} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">Social Media</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Generate engaging social media posts, captions, and content that drives engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Generate professional content in three simple steps
            </p>
          </div>
          
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-2xl font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Enter Your Topic</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Provide a brief description of what you want to create.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-2xl font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Select Content Type</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose from various content categories and formats.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 md:mx-auto lg:mx-0">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 text-2xl font-bold mb-4">3</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Generate & Use</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get your polished content in seconds, ready to use anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Content?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of professionals creating better content faster with our AI platform.
          </p>
          <Link to={isAuthenticated ? '/generate' : '/register'}>
            <Button 
              variant="secondary" 
              size="large"
            >
              {isAuthenticated ? 'Start Creating' : 'Sign Up Free'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;