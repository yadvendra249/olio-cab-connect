import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash, FaCar } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const emailSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const otpSchema = Yup.object({
  otp: Yup.string()
    .matches(/^[0-9]{6}$/, 'OTP must be 6 digits')
    .required('OTP is required'),
});

const passwordSchema = Yup.object({
  newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

const ResetPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const emailFormik = useFormik({
    initialValues: { email: '' },
    validationSchema: emailSchema,
    onSubmit: async (values) => {
      try {
        // Simulate API call to send OTP
        setEmail(values.email);
        toast({
          title: 'OTP Sent',
          description: 'Please check your email for the OTP.',
        });
        setStep(2);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to send OTP. Please try again.',
          variant: 'destructive',
        });
      }
    },
  });

  const otpFormik = useFormik({
    initialValues: { otp: '' },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        // Simulate API call to verify OTP
        toast({
          title: 'OTP Verified',
          description: 'Please enter your new password.',
        });
        setStep(3);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Invalid OTP. Please try again.',
          variant: 'destructive',
        });
      }
    },
  });

  const passwordFormik = useFormik({
    initialValues: { newPassword: '', confirmPassword: '' },
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      try {
        // Simulate API call to reset password
        toast({
          title: 'Success',
          description: 'Password reset successfully! Please login.',
        });
        navigate('/login');
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to reset password. Please try again.',
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

          <h2 className="text-2xl font-bold text-center text-foreground mb-2">Reset Password</h2>
          <p className="text-center text-muted-foreground mb-6">
            {step === 1 && 'Enter your email to receive OTP'}
            {step === 2 && 'Enter the OTP sent to your email'}
            {step === 3 && 'Enter your new password'}
          </p>

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={emailFormik.handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...emailFormik.getFieldProps('email')}
                  className={emailFormik.touched.email && emailFormik.errors.email ? 'border-destructive' : ''}
                />
                {emailFormik.touched.email && emailFormik.errors.email && (
                  <p className="text-sm text-destructive mt-1">{emailFormik.errors.email}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={emailFormik.isSubmitting}>
                {emailFormik.isSubmitting ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <form onSubmit={otpFormik.handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  maxLength={6}
                  {...otpFormik.getFieldProps('otp')}
                  className={otpFormik.touched.otp && otpFormik.errors.otp ? 'border-destructive' : ''}
                />
                {otpFormik.touched.otp && otpFormik.errors.otp && (
                  <p className="text-sm text-destructive mt-1">{otpFormik.errors.otp}</p>
                )}
                <p className="text-sm text-muted-foreground mt-2">OTP sent to {email}</p>
              </div>

              <Button type="submit" className="w-full" disabled={otpFormik.isSubmitting}>
                {otpFormik.isSubmitting ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={passwordFormik.handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    {...passwordFormik.getFieldProps('newPassword')}
                    className={passwordFormik.touched.newPassword && passwordFormik.errors.newPassword ? 'border-destructive' : ''}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword && (
                  <p className="text-sm text-destructive mt-1">{passwordFormik.errors.newPassword}</p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...passwordFormik.getFieldProps('confirmPassword')}
                    className={passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword ? 'border-destructive' : ''}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">{passwordFormik.errors.confirmPassword}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={passwordFormik.isSubmitting}>
                {passwordFormik.isSubmitting ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          )}

          {/* Back to Login */}
          <p className="text-center text-muted-foreground mt-6">
            Remember your password?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
