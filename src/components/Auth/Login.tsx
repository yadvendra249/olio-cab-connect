import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '@/store/slices/authSlice';
import { FaEye, FaEyeSlash, FaCar } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Simulate API call
        const mockUser = {
          id: '1',
          name: 'John Doe',
          email: values.email,
          mobile: '1234567890',
        };
        const mockToken = 'mock-jwt-token';

        dispatch(setUser(mockUser));
        dispatch(setToken(mockToken));
        localStorage.setItem('token', mockToken);

        toast({
          title: 'Success',
          description: 'Logged in successfully!',
        });

        navigate('/');
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Invalid credentials. Please try again.',
          variant: 'destructive',
        });
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-card rounded-lg shadow-lg p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <FaCar className="h-10 w-10 text-primary" />
              <span className="text-3xl font-bold text-primary">OlioCar</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-foreground mb-6">Welcome Back</h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...formik.getFieldProps('email')}
                className={formik.touched.email && formik.errors.email ? 'border-destructive' : ''}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-destructive mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  className={formik.touched.password && formik.errors.password ? 'border-destructive' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-destructive mt-1">{formik.errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/reset-password" className="text-sm text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
