import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from '@/hooks/use-toast';

let previousBookings: any[] = [];

export const useBookingNotifications = () => {
  const { bookings } = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    if (previousBookings.length === 0) {
      previousBookings = bookings;
      return;
    }

    // Check for status changes
    bookings.forEach((booking) => {
      const oldBooking = previousBookings.find((b) => b.id === booking.id);
      
      if (oldBooking && oldBooking.status !== booking.status) {
        // Status changed - show notification
        if (booking.status === 'confirmed') {
          toast({
            title: '✅ Booking Confirmed!',
            description: `Your ${booking.type} booking has been approved by admin.`,
            duration: 5000,
          });
        } else if (booking.status === 'cancelled') {
          toast({
            title: '❌ Booking Cancelled',
            description: `Your ${booking.type} booking has been cancelled.`,
            variant: 'destructive',
            duration: 5000,
          });
        }
      }
    });

    previousBookings = bookings;
  }, [bookings]);
};
