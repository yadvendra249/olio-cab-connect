import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '@/store/slices/authSlice';
import { FaEye, FaEyeSlash, FaCar, FaMobileAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { authAPI } from '@/lib/api';

const passwordValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const otpValidationSchema = Yup.object({
  mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile must be 10 digits').required('Mobile is required'),
  otp: Yup.string().matches(/^[0-9]{6}$/, 'OTP must be 6 digits'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await authAPI.login(values.email, values.password);
        
        dispatch(setUser(response.user));
        dispatch(setToken(response.token));
        localStorage.setItem('token', response.token);

        toast({
          title: 'Success',
          description: `Welcome ${response.user.role === 'admin' ? 'Admin' : 'back'}!`,
        });

        navigate(response.user.role === 'admin' ? '/admin' : '/');
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Invalid credentials. Please try again.',
          variant: 'destructive',
        });
      }
    },
  });

  const otpFormik = useFormik({
    initialValues: {
      mobile: '',
      otp: '',
    },
    validationSchema: otpValidationSchema,
    onSubmit: async (values) => {
      if (!otpSent) {
        try {
          await authAPI.sendOTP(values.mobile);
          setOtpSent(true);
          toast({
            title: 'OTP Sent',
            description: `OTP sent to ${values.mobile}. Use 123456 for testing.`,
          });
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to send OTP. Please try again.',
            variant: 'destructive',
          });
        }
      } else {
        try {
          const response = await authAPI.verifyOTP(values.mobile, values.otp);
          
          dispatch(setUser(response.user));
          dispatch(setToken(response.token));
          localStorage.setItem('token', response.token);

          toast({
            title: 'Success',
            description: 'Login successful!',
          });

          navigate('/');
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Invalid OTP. Please try again.',
            variant: 'destructive',
          });
        }
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <FaCar className="h-10 w-10 text-primary" />
              <span className="text-3xl font-bold text-primary">OlioCar</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-foreground mb-6">Welcome Back</h2>

          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="otp">
                <FaMobileAlt className="mr-2" />
                OTP
              </TabsTrigger>
            </TabsList>

            <TabsContent value="password">
              <form onSubmit={passwordFormik.handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...passwordFormik.getFieldProps('email')}
                    className={passwordFormik.touched.email && passwordFormik.errors.email ? 'border-destructive' : ''}
                  />
                  {passwordFormik.touched.email && passwordFormik.errors.email && (
                    <p className="text-sm text-destructive mt-1">{passwordFormik.errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      {...passwordFormik.getFieldProps('password')}
                      className={passwordFormik.touched.password && passwordFormik.errors.password ? 'border-destructive' : ''}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {passwordFormik.touched.password && passwordFormik.errors.password && (
                    <p className="text-sm text-destructive mt-1">{passwordFormik.errors.password}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Link to="/reset-password" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={passwordFormik.isSubmitting}>
                  {passwordFormik.isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="otp">
              <form onSubmit={otpFormik.handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter 10 digit mobile"
                    {...otpFormik.getFieldProps('mobile')}
                    disabled={otpSent}
                    className={otpFormik.touched.mobile && otpFormik.errors.mobile ? 'border-destructive' : ''}
                  />
                  {otpFormik.touched.mobile && otpFormik.errors.mobile && (
                    <p className="text-sm text-destructive mt-1">{otpFormik.errors.mobile}</p>
                  )}
                </div>

                {otpSent && (
                  <div>
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6 digit OTP"
                      maxLength={6}
                      {...otpFormik.getFieldProps('otp')}
                      className={otpFormik.touched.otp && otpFormik.errors.otp ? 'border-destructive' : ''}
                    />
                    {otpFormik.touched.otp && otpFormik.errors.otp && (
                      <p className="text-sm text-destructive mt-1">{otpFormik.errors.otp}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Test OTP: 123456
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={otpFormik.isSubmitting}>
                  {otpFormik.isSubmitting ? 'Processing...' : otpSent ? 'Verify OTP' : 'Send OTP'}
                </Button>

                {otpSent && (
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      otpFormik.resetForm();
                    }}
                    className="text-sm text-primary hover:underline w-full"
                  >
                    Change Mobile Number
                  </button>
                )}
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign Up
            </Link>
          </p>

          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              Admin: admin@oliocar.com | Test OTP: 123456
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
