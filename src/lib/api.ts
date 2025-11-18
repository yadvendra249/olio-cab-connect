import api from './axios';

// Dummy API endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isAdmin = email === 'admin@oliocar.com';
    return {
      user: {
        id: '1',
        name: isAdmin ? 'Admin User' : 'John Doe',
        email,
        mobile: '1234567890',
        role: (isAdmin ? 'admin' : 'user') as 'admin' | 'user',
      },
      token: 'mock-jwt-token-' + Date.now(),
    };
  },

  sendOTP: async (mobile: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, otp: '123456' }; // In real app, OTP is sent via SMS
  },

  verifyOTP: async (mobile: string, otp: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (otp === '123456') {
      return {
        user: {
          id: '2',
          name: 'Mobile User',
          email: `${mobile}@temp.com`,
          mobile,
          role: 'user' as 'user',
        },
        token: 'mock-jwt-token-' + Date.now(),
      };
    }
    throw new Error('Invalid OTP');
  },

  signup: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      user: {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        role: 'user',
      },
      token: 'mock-jwt-token-' + Date.now(),
    };
  },

  sendPasswordResetOTP: async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, otp: '123456' };
  },

  verifyPasswordResetOTP: async (email: string, otp: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (otp === '123456') {
      return { success: true };
    }
    throw new Error('Invalid OTP');
  },

  resetPassword: async (email: string, newPassword: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  },
};

export const bookingAPI = {
  createBooking: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      bookingId: 'BK' + Date.now(),
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
  },

  getBookings: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },
};
