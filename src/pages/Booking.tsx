import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CabBooking from '@/components/Booking/CabBookingUpdated';
import DriverBooking from '@/components/Booking/DriverBookingUpdated';
import { FaCar, FaUserTie } from 'react-icons/fa';

const Booking = () => {
  const [bookingTime, setBookingTime] = useState<'immediate' | 'later'>('immediate');

  return (
    <div className="min-h-screen bg-secondary/10 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Book Your Ride</h1>
          <p className="text-muted-foreground text-lg">Choose your preferred booking type</p>
        </div>

        {/* Booking Time Selection */}
        <div className="bg-card rounded-lg p-6 mb-6 shadow-md">
          <h2 className="text-xl font-semibold text-foreground mb-4">When do you need the ride?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setBookingTime('immediate')}
              className={`p-4 rounded-lg border-2 transition-all ${
                bookingTime === 'immediate'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <h3 className="font-semibold text-foreground mb-2">Book Immediately</h3>
              <p className="text-sm text-muted-foreground">Get a ride right now</p>
            </button>
            <button
              onClick={() => setBookingTime('later')}
              className={`p-4 rounded-lg border-2 transition-all ${
                bookingTime === 'later'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <h3 className="font-semibold text-foreground mb-2">Schedule Later</h3>
              <p className="text-sm text-muted-foreground">Book for a future date and time</p>
            </button>
          </div>
        </div>

        {/* Booking Tabs */}
        <Tabs defaultValue="cab" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="cab" className="flex items-center gap-2">
              <FaCar className="h-4 w-4" />
              Cab Booking
            </TabsTrigger>
            <TabsTrigger value="driver" className="flex items-center gap-2">
              <FaUserTie className="h-4 w-4" />
              Driver Booking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cab">
            <CabBooking bookingTime={bookingTime} />
          </TabsContent>

          <TabsContent value="driver">
            <DriverBooking bookingTime={bookingTime} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Booking;
