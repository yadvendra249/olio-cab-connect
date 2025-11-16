import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

interface CabBookingProps {
  bookingTime: 'immediate' | 'later';
}

const CabBooking = ({ bookingTime }: CabBookingProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();

  const localSchema = Yup.object({
    bookingForSelf: Yup.boolean(),
    name: Yup.string().when('bookingForSelf', {
      is: false,
      then: (schema) => schema.required('Name is required'),
      otherwise: (schema) => schema,
    }),
    mobile: Yup.string().when('bookingForSelf', {
      is: false,
      then: (schema) => schema.matches(/^[0-9]{10}$/, 'Mobile must be 10 digits').required('Mobile is required'),
      otherwise: (schema) => schema,
    }),
    pickupLocation: Yup.string().required('Pickup location is required'),
    dropLocation: Yup.string().required('Drop location is required'),
    vehicleType: Yup.string().required('Vehicle type is required'),
    passengers: Yup.number().min(1).max(8).required('Number of passengers is required'),
    luggage: Yup.number().min(0).max(8).required('Number of luggage is required'),
    bookingDate: bookingTime === 'later' ? Yup.string().required('Booking date is required') : Yup.string(),
  });

  const airportSchema = localSchema.shape({
    terminal: Yup.string().required('Terminal is required'),
  });

  const outstationSchema = localSchema.shape({
    bookingDate: Yup.string().required('Booking date is required'),
  });

  const getSchema = (type: string) => {
    if (type === 'airport') return airportSchema;
    if (type === 'outstation') return outstationSchema;
    return localSchema;
  };

  const LocalForm = ({ type }: { type: 'local' | 'airport' | 'outstation' }) => {
    const formik = useFormik({
      initialValues: {
        bookingForSelf: isAuthenticated,
        name: '',
        mobile: '',
        pickupLocation: '',
        dropLocation: '',
        vehicleType: '',
        passengers: 1,
        luggage: 0,
        terminal: '',
        bookingDate: '',
      },
      validationSchema: getSchema(type),
      onSubmit: async (values) => {
        toast({
          title: 'Booking Submitted',
          description: 'Your cab booking has been submitted successfully!',
        });
        formik.resetForm();
      },
    });

    return (
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {isAuthenticated && (
          <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
            <Checkbox
              id="bookingForSelf"
              checked={formik.values.bookingForSelf}
              onCheckedChange={(checked) => formik.setFieldValue('bookingForSelf', checked)}
            />
            <label htmlFor="bookingForSelf" className="text-sm font-medium">
              Booking for myself
            </label>
          </div>
        )}

        {!formik.values.bookingForSelf && (
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
        )}

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

        {type === 'airport' && (
          <div>
            <Label htmlFor="terminal">Terminal *</Label>
            <Input
              id="terminal"
              {...formik.getFieldProps('terminal')}
              className={formik.touched.terminal && formik.errors.terminal ? 'border-destructive' : ''}
            />
            {formik.touched.terminal && formik.errors.terminal && (
              <p className="text-sm text-destructive mt-1">{formik.errors.terminal}</p>
            )}
          </div>
        )}

        <div>
          <Label htmlFor="vehicleType">Vehicle Type *</Label>
          <Select
            value={formik.values.vehicleType}
            onValueChange={(value) => formik.setFieldValue('vehicleType', value)}
          >
            <SelectTrigger className={formik.touched.vehicleType && formik.errors.vehicleType ? 'border-destructive' : ''}>
              <SelectValue placeholder="Select vehicle type" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
              <SelectItem value="tempo">Tempo Traveller</SelectItem>
            </SelectContent>
          </Select>
          {formik.touched.vehicleType && formik.errors.vehicleType && (
            <p className="text-sm text-destructive mt-1">{formik.errors.vehicleType}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="passengers">Number of Passengers *</Label>
            <Input
              id="passengers"
              type="number"
              min="1"
              max="8"
              {...formik.getFieldProps('passengers')}
              className={formik.touched.passengers && formik.errors.passengers ? 'border-destructive' : ''}
            />
            {formik.touched.passengers && formik.errors.passengers && (
              <p className="text-sm text-destructive mt-1">{formik.errors.passengers}</p>
            )}
          </div>

          <div>
            <Label htmlFor="luggage">Number of Luggage *</Label>
            <Input
              id="luggage"
              type="number"
              min="0"
              max="8"
              {...formik.getFieldProps('luggage')}
              className={formik.touched.luggage && formik.errors.luggage ? 'border-destructive' : ''}
            />
            {formik.touched.luggage && formik.errors.luggage && (
              <p className="text-sm text-destructive mt-1">{formik.errors.luggage}</p>
            )}
          </div>
        </div>

        {(type === 'outstation' || bookingTime === 'later') && (
          <div>
            <Label htmlFor="bookingDate">Booking Date & Time *</Label>
            <Input
              id="bookingDate"
              type="datetime-local"
              {...formik.getFieldProps('bookingDate')}
              className={formik.touched.bookingDate && formik.errors.bookingDate ? 'border-destructive' : ''}
            />
            {formik.touched.bookingDate && formik.errors.bookingDate && (
              <p className="text-sm text-destructive mt-1">{formik.errors.bookingDate}</p>
            )}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Submit Booking'}
        </Button>
      </form>
    );
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-foreground mb-6">Cab Booking</h2>
      
      <Tabs defaultValue="local">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="local">Local</TabsTrigger>
          <TabsTrigger value="airport">Airport</TabsTrigger>
          <TabsTrigger value="outstation">Outstation</TabsTrigger>
        </TabsList>

        <TabsContent value="local">
          <LocalForm type="local" />
        </TabsContent>

        <TabsContent value="airport">
          <LocalForm type="airport" />
        </TabsContent>

        <TabsContent value="outstation">
          <LocalForm type="outstation" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CabBooking;
