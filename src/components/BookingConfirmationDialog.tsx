import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FaCheckCircle, FaCar, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { format } from 'date-fns';

interface BookingConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  bookingDetails: {
    bookingId: string;
    type: 'cab' | 'driver';
    pickupLocation: string;
    dropLocation: string;
    date: string;
    vehicleType?: string;
  };
}

const BookingConfirmationDialog = ({ open, onClose, bookingDetails }: BookingConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-4">
              <FaCheckCircle className="h-12 w-12 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Booking Confirmed!</DialogTitle>
          <DialogDescription className="text-center">
            Your booking has been successfully confirmed
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Booking ID</span>
              <span className="font-mono font-semibold">{bookingDetails.bookingId}</span>
            </div>
            
            {bookingDetails.vehicleType && (
              <div className="flex items-center gap-2">
                <FaCar className="text-primary" />
                <span className="text-sm text-muted-foreground">Vehicle:</span>
                <span className="font-medium">{bookingDetails.vehicleType}</span>
              </div>
            )}
            
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-primary mt-1" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Pickup</p>
                <p className="font-medium">{bookingDetails.pickupLocation}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-destructive mt-1" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Drop</p>
                <p className="font-medium">{bookingDetails.dropLocation}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-primary" />
              <span className="text-sm text-muted-foreground">Date & Time:</span>
              <span className="font-medium">
                {format(new Date(bookingDetails.date), 'PPP p')}
              </span>
            </div>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <p className="text-sm text-center text-muted-foreground">
              You will receive a confirmation message shortly
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            View Bookings
          </Button>
          <Button onClick={onClose} className="flex-1">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmationDialog;
