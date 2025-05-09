import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Settings, Bell, Shield, Key } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface TabProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const Tab: React.FC<TabProps> = ({ children, isActive, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm focus:outline-none transition-colors
        ${isActive
          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
        }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

// Account settings form validation schema
const accountSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
});

// Password change form validation schema
const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type AccountFormValues = z.infer<typeof accountSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('account');
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Account Settings Form
  const { register: registerAccount, handleSubmit: handleSubmitAccount, formState: { errors: accountErrors } } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
    },
  });
  
  // Password Change Form
  const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: { errors: passwordErrors }, reset: resetPassword } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleUpdateAccount = async (data: AccountFormValues) => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      addToast('Account information updated successfully', 'success');
    }, 1000);
  };

  const handleChangePassword = async (data: PasswordFormValues) => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      resetPassword();
      addToast('Password changed successfully', 'success');
    }, 1000);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Profile</h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex overflow-x-auto">
                <Tab
                  isActive={activeTab === 'account'}
                  onClick={() => setActiveTab('account')}
                  icon={<User size={18} />}
                  label="Account"
                />
                <Tab
                  isActive={activeTab === 'security'}
                  onClick={() => setActiveTab('security')}
                  icon={<Shield size={18} />}
                  label="Security"
                />
                <Tab
                  isActive={activeTab === 'preferences'}
                  onClick={() => setActiveTab('preferences')}
                  icon={<Settings size={18} />}
                  label="Preferences"
                />
                <Tab
                  isActive={activeTab === 'notifications'}
                  onClick={() => setActiveTab('notifications')}
                  icon={<Bell size={18} />}
                  label="Notifications"
                />
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {/* Account Tab */}
              {activeTab === 'account' && (
                <form onSubmit={handleSubmitAccount(handleUpdateAccount)} className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Account Information</h2>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <Input
                      label="Username"
                      type="text"
                      error={accountErrors.username?.message}
                      {...registerAccount('username')}
                    />
                    
                    <Input
                      label="Email Address"
                      type="email"
                      error={accountErrors.email?.message}
                      {...registerAccount('email')}
                    />
                    
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        variant="primary"
                        isLoading={isUpdating}
                      >
                        Update Account
                      </Button>
                    </div>
                  </div>
                </form>
              )}
              
              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-8">
                  <form onSubmit={handleSubmitPassword(handleChangePassword)} className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Change Password</h2>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <Input
                        label="Current Password"
                        type="password"
                        error={passwordErrors.currentPassword?.message}
                        {...registerPassword('currentPassword')}
                      />
                      
                      <Input
                        label="New Password"
                        type="password"
                        error={passwordErrors.newPassword?.message}
                        {...registerPassword('newPassword')}
                      />
                      
                      <Input
                        label="Confirm New Password"
                        type="password"
                        error={passwordErrors.confirmPassword?.message}
                        {...registerPassword('confirmPassword')}
                      />
                      
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          variant="primary"
                          isLoading={isUpdating}
                        >
                          Change Password
                        </Button>
                      </div>
                    </div>
                  </form>
                  
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <Button variant="secondary" leftIcon={<Key size={18} />}>
                      Enable 2FA
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Default Content Type</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Set your preferred default content type for new generations.
                        </p>
                      </div>
                      <select className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option>Blog Post</option>
                        <option>Article</option>
                        <option>Social Media Post</option>
                        <option>Ad Copy</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Language</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Select your preferred language for generated content.
                        </p>
                      </div>
                      <select className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Content Format</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Choose your preferred format for downloaded content.
                        </p>
                      </div>
                      <select className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option>Markdown</option>
                        <option>Plain Text</option>
                        <option>HTML</option>
                        <option>Word Document</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button variant="primary">
                      Save Preferences
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Notification Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex h-5 items-center">
                        <input
                          id="email-notifications"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                          defaultChecked
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="email-notifications" className="font-medium text-gray-700 dark:text-gray-300">Email Notifications</label>
                        <p className="text-gray-500 dark:text-gray-400">Receive updates about your account and content via email.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex h-5 items-center">
                        <input
                          id="browser-notifications"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                          defaultChecked
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="browser-notifications" className="font-medium text-gray-700 dark:text-gray-300">Browser Notifications</label>
                        <p className="text-gray-500 dark:text-gray-400">Receive notifications about completed content generations in browser.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex h-5 items-center">
                        <input
                          id="marketing-emails"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="marketing-emails" className="font-medium text-gray-700 dark:text-gray-300">Marketing Emails</label>
                        <p className="text-gray-500 dark:text-gray-400">Receive updates about new features, tips, and promotions.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button variant="primary">
                      Save Notification Settings
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;