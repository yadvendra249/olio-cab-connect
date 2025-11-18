import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import LocationPicker from '../LocationPicker';
import BookingConfirmationDialog from '../BookingConfirmationDialog';
import { bookingAPI } from '@/lib/api';
import { format, isToday, isTomorrow, startOfDay } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface DriverBookingProps {
  bookingTime: 'immediate' | 'later';
}

const DriverBooking = ({ bookingTime }: DriverBookingProps) => {
  const { toast } = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const isValidBookingDate = (date: Date) => {
    const today = startOfDay(new Date());
    return date >= today;
  };

  const localSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile must be 10 digits').required('Mobile is required'),
    pickupLocation: Yup.string().required('Pickup location is required'),
    dropLocation: Yup.string().required('Drop location is required'),
    startDateTime: bookingTime === 'later' ? Yup.date().required('Start date/time is required') : Yup.date().nullable(),
  });

  const outstationSchema = localSchema.shape({
    startDateTime: Yup.date().required('Start date/time is required'),
    endDateTime: Yup.date().required('End date/time is required'),
  });

  const DriverForm = ({ type }: { type: 'local' | 'airport' | 'outstation' }) => {
    const [pickupValid, setPickupValid] = useState(false);
    const [dropValid, setDropValid] = useState(false);

    const formik = useFormik({
      initialValues: {
        name: '',
        mobile: '',
        pickupLocation: '',
        dropLocation: '',
        startDateTime: bookingTime === 'later' || type === 'outstation' ? new Date() : null,
        endDateTime: type === 'outstation' ? new Date() : null,
      },
      validationSchema: type === 'outstation' ? outstationSchema : localSchema,
      onSubmit: async (values) => {
        if (!pickupValid) {
          toast({
            title: 'Invalid Location',
            description: 'Please select a valid Indian pickup location from suggestions.',
            variant: 'destructive',
          });
          return;
        }
        if (!dropValid) {
          toast({
            title: 'Invalid Location',
            description: 'Please select a valid Indian drop location from suggestions.',
            variant: 'destructive',
          });
          return;
        }

        try {
          const booking = await bookingAPI.createBooking({
            ...values,
            type: 'driver',
            category: type,
            date: values.startDateTime ? values.startDateTime.toISOString() : new Date().toISOString(),
          });

          setBookingDetails(booking);
          setShowConfirmation(true);
          formik.resetForm();
          setPickupValid(false);
          setDropValid(false);
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to create booking. Please try again.',
            variant: 'destructive',
          });
        }
      },
    });

    return (
      <>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                {...formik.getFieldProps('name')}
                className={formik.touched.name && formik.errors.name ? 'border-destructive' : ''}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-destructive mt-1">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input
                id="mobile"
                type="tel"
                {...formik.getFieldProps('mobile')}
                className={formik.touched.mobile && formik.errors.mobile ? 'border-destructive' : ''}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-sm text-destructive mt-1">{formik.errors.mobile}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LocationPicker
              label="Pickup Location"
              value={formik.values.pickupLocation}
              onChange={(location, isValid) => {
                formik.setFieldValue('pickupLocation', location);
                setPickupValid(isValid);
              }}
              error={formik.errors.pickupLocation}
              touched={formik.touched.pickupLocation}
            />

            <LocationPicker
              label="Drop Location"
              value={formik.values.dropLocation}
              onChange={(location, isValid) => {
                formik.setFieldValue('dropLocation', location);
                setDropValid(isValid);
              }}
              error={formik.errors.dropLocation}
              touched={formik.touched.dropLocation}
            />
          </div>

          {(type === 'outstation' || bookingTime === 'later') && (
            <div>
              <Label>Start Date & Time *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !formik.values.startDateTime && 'text-muted-foreground',
                      formik.touched.startDateTime && formik.errors.startDateTime && 'border-destructive'
                    )}
                  >
                    <FaCalendarAlt className="mr-2" />
                    {formik.values.startDateTime ? format(formik.values.startDateTime, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formik.values.startDateTime || undefined}
                    onSelect={(date) => formik.setFieldValue('startDateTime', date)}
                    disabled={(date) => !isValidBookingDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {formik.touched.startDateTime && formik.errors.startDateTime && (
                <p className="text-sm text-destructive mt-1">{formik.errors.startDateTime as string}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Select current or future dates only
              </p>
            </div>
          )}

          {type === 'outstation' && (
            <div>
              <Label>End Date & Time *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !formik.values.endDateTime && 'text-muted-foreground',
                      formik.touched.endDateTime && formik.errors.endDateTime && 'border-destructive'
                    )}
                  >
                    <FaCalendarAlt className="mr-2" />
                    {formik.values.endDateTime ? format(formik.values.endDateTime, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formik.values.endDateTime || undefined}
                    onSelect={(date) => formik.setFieldValue('endDateTime', date)}
                    disabled={(date) => !isValidBookingDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {formik.touched.endDateTime && formik.errors.endDateTime && (
                <p className="text-sm text-destructive mt-1">{formik.errors.endDateTime as string}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Select current or future dates only
              </p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Submitting...' : 'Submit Booking'}
          </Button>
        </form>

        {bookingDetails && (
          <BookingConfirmationDialog
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            bookingDetails={bookingDetails}
          />
        )}
      </>
    );
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Book a Driver</h2>
      <Tabs defaultValue="local" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="local">Local</TabsTrigger>
          <TabsTrigger value="airport">Airport</TabsTrigger>
          <TabsTrigger value="outstation">Outstation</TabsTrigger>
        </TabsList>

        <TabsContent value="local">
          <DriverForm type="local" />
        </TabsContent>

        <TabsContent value="airport">
          <DriverForm type="airport" />
        </TabsContent>

        <TabsContent value="outstation">
          <DriverForm type="outstation" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DriverBooking;
