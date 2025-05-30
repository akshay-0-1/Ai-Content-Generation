import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  User, 
  Bell, 
  Shield, 
  Key, 
  Camera, 
  LogOut, 
  CreditCard,
  BarChart2
} from 'lucide-react';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

// Account settings form validation schema
const accountSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  jobTitle: z.string().optional(),
  bio: z.string().max(250, 'Bio must be less than 250 characters').optional(),
});

// Password change form validation schema
const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string().min(1, 'Confirm password is required'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const ProfilePage = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('account');
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileImage, setProfileImage] = useState('/default-avatar.png');

  // Account Settings Form
  const { register: registerAccount, handleSubmit: handleSubmitAccount, formState: { errors: accountErrors } } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      fullName: user?.fullName || '',
      jobTitle: user?.jobTitle || '',
      bio: user?.bio || '',
    },
  });
  
  // Password Change Form
  const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: { errors: passwordErrors }, reset: resetPassword } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleUpdateAccount = async (data) => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      addToast({
        id: Date.now().toString(),
        message: 'Account information updated successfully',
        type: 'success'
      });
    }, 1000);
  };

  const handleChangePassword = async (data) => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      resetPassword();
      addToast({
        id: Date.now().toString(),
        message: 'Password changed successfully',
        type: 'success'
      });
    }, 1000);
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        addToast({
          id: Date.now().toString(),
          message: 'Profile picture updated',
          type: 'success'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    // Implement logout logic
    addToast({
      id: Date.now().toString(),
      message: 'You have been logged out',
      type: 'info'
    });
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-20">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400"
                    />
                    <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                      <Camera size={16} />
                      <input 
                        type="file" 
                        id="profile-image" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <h2 className="text-xl font-bold mt-4 text-gray-900 dark:text-white text-center">{user?.fullName || user?.username}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-center">{user?.jobTitle || 'Content Creator'}</p>
                </div>
                
                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveTab('account')} 
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === 'account' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <User size={18} className="mr-3" />
                    <span>Account</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('password')} 
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === 'password' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <Key size={18} className="mr-3" />
                    <span>Password</span>
                  </button>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <LogOut size={18} className="mr-3" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="w-full md:w-3/4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {/* Content Header */}
                <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activeTab === 'account' && 'Account Settings'}
                    {activeTab === 'password' && 'Password & Security'}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {activeTab === 'account' && 'Manage your personal information and preferences'}
                    {activeTab === 'password' && 'Update your password and security settings'}
                  </p>
                </div>
                
                {/* Tab Content */}
                <div className="p-6">
                  {/* Account Tab */}
                  {activeTab === 'account' && (
                    <form onSubmit={handleSubmitAccount(handleUpdateAccount)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          label="Username"
                          error={accountErrors.username?.message}
                          {...registerAccount('username')}
                        />
                        
                        <Input
                          label="Email"
                          type="email"
                          error={accountErrors.email?.message}
                          {...registerAccount('email')}
                        />
                        
                        <Input
                          label="Full Name"
                          error={accountErrors.fullName?.message}
                          {...registerAccount('fullName')}
                        />
                        
                        <Input
                          label="Job Title"
                          error={accountErrors.jobTitle?.message}
                          {...registerAccount('jobTitle')}
                        />
                      </div>
                      
                      <TextArea
                        label="Bio"
                        error={accountErrors.bio?.message}
                        helper="Brief description about yourself"
                        {...registerAccount('bio')}
                      />
                      
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          variant="primary"
                          isLoading={isUpdating}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  )}
                  
                  {/* Password Tab */}
                  {activeTab === 'password' && (
                    <form onSubmit={handleSubmitPassword(handleChangePassword)} className="space-y-6">
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
                        helper="Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
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
                    </form>
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

export default ProfilePage;