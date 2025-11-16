import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Booking {
  id: string;
  type: 'cab' | 'driver';
  category: 'local' | 'airport' | 'outstation';
  pickupLocation: string;
  dropLocation: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  vehicleType?: string;
  passengers?: number;
  luggage?: number;
}

interface BookingState {
  bookings: Booking[];
}

const initialState: BookingState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.bookings.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    cancelBooking: (state, action: PayloadAction<string>) => {
      const booking = state.bookings.find(b => b.id === action.payload);
      if (booking) {
        booking.status = 'cancelled';
      }
    },
  },
});

export const { addBooking, updateBooking, cancelBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
