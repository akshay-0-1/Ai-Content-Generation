import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { 
  BrainCircuit, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  Users 
} from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                About Content.AI
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                We're on a mission to help creators, businesses, and professionals produce high-quality content efficiently. 
                Our AI-powered platform transforms your ideas into polished, ready-to-use content in seconds.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/generate">
                  <Button variant="primary" size="large">
                    Try It Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <img 
                src="https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team collaboration" 
                className="rounded-lg shadow-xl w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Technology */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Technology</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powered by cutting-edge AI models and natural language processing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:translate-y-[-5px]">
              <div className="text-blue-500 mb-4">
                <BrainCircuit size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Advanced AI Models</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our platform utilizes state-of-the-art language models trained on diverse high-quality content to ensure excellent results.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:translate-y-[-5px]">
              <div className="text-purple-500 mb-4">
                <Zap size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Generate content in seconds, not hours. Our optimized infrastructure ensures minimum wait times.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:translate-y-[-5px]">
              <div className="text-emerald-500 mb-4">
                <ShieldCheck size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Privacy Focused</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your prompts and generated content are never used to train our models. Your ideas remain yours alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Generation Process */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How AI Content Generation Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Understanding the technology behind our platform
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Natural Language Understanding</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our AI analyzes your prompt to understand the context, tone, and requirements of your content request.
                  </p>
                </div>
                <div className="md:w-12 relative flex justify-center">
                  <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white z-10">1</div>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="md:w-12 relative flex justify-center">
                  <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center text-white z-10">2</div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left mt-6 md:mt-0">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Content Generation</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Based on your chosen content type, our specialized models generate relevant, high-quality content.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quality Enhancement</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Additional filtering ensures the content meets our quality standards for coherence, accuracy, and relevance.
                  </p>
                </div>
                <div className="md:w-12 relative flex justify-center">
                  <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center text-white z-10">3</div>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="md:w-12 relative flex justify-center">
                  <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center text-white z-10">4</div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left mt-6 md:mt-0">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Formatting & Delivery</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The final content is formatted according to best practices for your chosen content type and delivered to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">The Team Behind Content.AI</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A group of AI experts, writers, and engineers dedicated to making content creation easier
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-3xl">
              <div className="flex justify-center mb-6">
                <div className="text-blue-500">
                  <Users size={64} />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-center text-lg italic mb-6">
                "We founded Content.AI with a simple mission: to help people communicate their ideas more effectively. 
                Our team combines expertise in AI, content creation, and user experience to build a platform that makes 
                professional content generation accessible to everyone."
              </p>
              <p className="text-center font-semibold text-gray-900 dark:text-white">
                The Content.AI Team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Content Creation?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of professionals and businesses already using Content.AI to create better content faster.
          </p>
          <Link to="/register">
            <Button 
              variant="secondary" 
              size="large"
              rightIcon={<Sparkles size={18} />}
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;