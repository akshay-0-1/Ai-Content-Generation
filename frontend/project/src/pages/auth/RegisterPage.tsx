import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

// Schema for form validation
const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms of service',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const password = watch('password');

  // Calculate password strength
  const getPasswordStrength = (password: string): { strength: number, label: string, color: string } => {
    if (!password) return { strength: 0, label: 'None', color: 'bg-gray-200 dark:bg-gray-600' };
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Contains number
    if (/[0-9]/.test(password)) strength += 1;
    
    // Contains special char
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    const strengthMap = [
      { label: 'Weak', color: 'bg-red-500' },
      { label: 'Fair', color: 'bg-orange-500' },
      { label: 'Good', color: 'bg-yellow-500' },
      { label: 'Strong', color: 'bg-green-500' },
      { label: 'Very Strong', color: 'bg-emerald-500' },
    ];
    
    const result = strengthMap[Math.min(strength - 1, 4)] || { label: 'Weak', color: 'bg-red-500' };
    
    return {
      strength: strength,
      label: result.label,
      color: result.color,
    };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    
    try {
      await registerUser(data.username, data.email, data.password);
      addToast('Registration successful!', 'success');
      navigate('/generate');
    } catch (error) {
      addToast('Registration failed', 'error');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create an account</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Sign up to start generating content
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Username"
              type="text"
              placeholder="johndoe"
              error={errors.username?.message}
              {...register('username')}
            />
            
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email')}
            />
            
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
              />
              
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Password strength</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{passwordStrength.label}</span>
                  </div>
                  <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrength.color} transition-all duration-300`} 
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="accept-terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  {...register('acceptTerms')}
                />
              </div>
              <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                I accept the <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">Privacy Policy</a>
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.acceptTerms.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Create Account
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;