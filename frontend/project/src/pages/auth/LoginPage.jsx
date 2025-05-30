import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

// Schema for form validation
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get returnUrl from location state if available
  const returnUrl = location.state?.returnUrl || '/generate';
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      await login(data.email, data.password);
      addToast({
        id: Date.now().toString(),
        message: 'Successfully logged in!',
        type: 'success'
      });
      // Navigate to returnUrl if available, otherwise to generate page
      navigate(returnUrl);
    } catch (error) {
      addToast({
        id: Date.now().toString(),
        message: 'Invalid email or password',
        type: 'error'
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes - easy login
  const handleDemoLogin = async () => {
    setIsLoading(true);
    
    try {
      await login('user@example.com', 'password');
      addToast({
        id: Date.now().toString(),
        message: 'Logged in as demo user!',
        type: 'success'
      });
      // Navigate to returnUrl if available, otherwise to generate page
      navigate(returnUrl);
    } catch (error) {
      addToast({
        id: Date.now().toString(),
        message: 'Failed to login as demo user',
        type: 'error'
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Log in to your account to continue
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email')}
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  {...register('rememberMe')}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Forgot password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Sign in
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Sign up now
              </Link>
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                Or
              </span>
            </div>
          </div>
          
          <Button
            type="button"
            variant="subtle"
            fullWidth
            onClick={handleDemoLogin}
          >
            Demo Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
