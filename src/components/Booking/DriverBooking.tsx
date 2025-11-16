import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface DriverBookingProps {
  bookingTime: 'immediate' | 'later';
}

const DriverBooking = ({ bookingTime }: DriverBookingProps) => {
  const { toast } = useToast();

  const localSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile must be 10 digits').required('Mobile is required'),
    pickupLocation: Yup.string().required('Pickup location is required'),
    dropLocation: Yup.string().required('Drop location is required'),
    startDateTime: bookingTime === 'later' ? Yup.string().required('Start date/time is required') : Yup.string(),
  });

  const outstationSchema = localSchema.shape({
    startDateTime: Yup.string().required('Start date/time is required'),
    endDateTime: Yup.string().required('End date/time is required'),
  });

  const DriverForm = ({ type }: { type: 'local' | 'airport' | 'outstation' }) => {
    const formik = useFormik({
      initialValues: {
        name: '',
        mobile: '',
        pickupLocation: '',
        dropLocation: '',
        startDateTime: '',
        endDateTime: '',
      },
      validationSchema: type === 'outstation' ? outstationSchema : localSchema,
      onSubmit: async (values) => {
        toast({
          title: 'Booking Submitted',
          description: 'Your driver booking has been submitted successfully!',
        });
        formik.resetForm();
      },
    });

    return (
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
          <div>
            <Label htmlFor="pickupLocation">Pickup Location *</Label>
            <Input
              id="pickupLocation"
              {...formik.getFieldProps('pickupLocation')}
              className={formik.touched.pickupLocation && formik.errors.pickupLocation ? 'border-destructive' : ''}
            />
            {formik.touched.pickupLocation && formik.errors.pickupLocation && (
              <p className="text-sm text-destructive mt-1">{formik.errors.pickupLocation}</p>
            )}
          </div>

          <div>
            <Label htmlFor="dropLocation">Drop Location *</Label>
            <Input
              id="dropLocation"
              {...formik.getFieldProps('dropLocation')}
              className={formik.touched.dropLocation && formik.errors.dropLocation ? 'border-destructive' : ''}
            />
            {formik.touched.dropLocation && formik.errors.dropLocation && (
              <p className="text-sm text-destructive mt-1">{formik.errors.dropLocation}</p>
            )}
          </div>
        </div>

        {type === 'outstation' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDateTime">Start Date & Time *</Label>
              <Input
                id="startDateTime"
                type="datetime-local"
                {...formik.getFieldProps('startDateTime')}
                className={formik.touched.startDateTime && formik.errors.startDateTime ? 'border-destructive' : ''}
              />
              {formik.touched.startDateTime && formik.errors.startDateTime && (
                <p className="text-sm text-destructive mt-1">{formik.errors.startDateTime}</p>
              )}
            </div>

            <div>
              <Label htmlFor="endDateTime">End Date & Time *</Label>
              <Input
                id="endDateTime"
                type="datetime-local"
                {...formik.getFieldProps('endDateTime')}
                className={formik.touched.endDateTime && formik.errors.endDateTime ? 'border-destructive' : ''}
              />
              {formik.touched.endDateTime && formik.errors.endDateTime && (
                <p className="text-sm text-destructive mt-1">{formik.errors.endDateTime}</p>
              )}
            </div>
          </div>
        ) : (
          bookingTime === 'later' && (
            <div>
              <Label htmlFor="startDateTime">Start Date & Time *</Label>
              <Input
                id="startDateTime"
                type="datetime-local"
                {...formik.getFieldProps('startDateTime')}
                className={formik.touched.startDateTime && formik.errors.startDateTime ? 'border-destructive' : ''}
              />
              {formik.touched.startDateTime && formik.errors.startDateTime && (
                <p className="text-sm text-destructive mt-1">{formik.errors.startDateTime}</p>
              )}
            </div>
          )
        )}

        <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Submit Booking'}
        </Button>
      </form>
    );
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-foreground mb-6">Driver Booking</h2>
      
      <Tabs defaultValue="local">
        <TabsList className="grid w-full grid-cols-3 mb-6">
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
