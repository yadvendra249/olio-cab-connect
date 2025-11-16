import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from '@/hooks/use-toast';

const carSchema = Yup.object().shape({
  vehicleName: Yup.string().required('Vehicle name is required'),
  vehicleType: Yup.string().required('Vehicle type is required'),
  registrationNumber: Yup.string()
    .required('Registration number is required')
    .matches(/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/, 'Invalid registration number format'),
  model: Yup.string().required('Model is required'),
  year: Yup.number()
    .required('Year is required')
    .min(2000, 'Year must be after 2000')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  seats: Yup.number().required('Number of seats is required').min(2).max(17),
  fuelType: Yup.string().required('Fuel type is required'),
  pricePerKm: Yup.number().required('Price per km is required').min(1),
});

const AddCar = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    console.log('Car added:', values);
    toast({
      title: 'Success',
      description: 'Car added successfully!',
    });
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-secondary/10 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Button
          variant="outline"
          onClick={() => navigate('/admin')}
          className="mb-6 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Admin Panel
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Add New Car</CardTitle>
            <p className="text-muted-foreground">Fill in the details to add a new vehicle to the fleet</p>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                vehicleName: '',
                vehicleType: '',
                registrationNumber: '',
                model: '',
                year: '',
                seats: '',
                fuelType: '',
                pricePerKm: '',
              }}
              validationSchema={carSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values, errors, touched }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleName">Vehicle Name *</Label>
                      <Field
                        name="vehicleName"
                        as={Input}
                        placeholder="e.g., Toyota Innova"
                      />
                      <ErrorMessage name="vehicleName" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicleType">Vehicle Type *</Label>
                      <Select
                        onValueChange={(value) => setFieldValue('vehicleType', value)}
                        value={values.vehicleType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                          <SelectItem value="tempo">Tempo Traveller</SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage name="vehicleType" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registrationNumber">Registration Number *</Label>
                      <Field
                        name="registrationNumber"
                        as={Input}
                        placeholder="e.g., KA01AB1234"
                        className="uppercase"
                      />
                      <ErrorMessage name="registrationNumber" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="model">Model *</Label>
                      <Field
                        name="model"
                        as={Input}
                        placeholder="e.g., Crysta"
                      />
                      <ErrorMessage name="model" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year">Manufacturing Year *</Label>
                      <Field
                        name="year"
                        type="number"
                        as={Input}
                        placeholder="e.g., 2023"
                      />
                      <ErrorMessage name="year" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seats">Number of Seats *</Label>
                      <Field
                        name="seats"
                        type="number"
                        as={Input}
                        placeholder="e.g., 7"
                      />
                      <ErrorMessage name="seats" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fuelType">Fuel Type *</Label>
                      <Select
                        onValueChange={(value) => setFieldValue('fuelType', value)}
                        value={values.fuelType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="cng">CNG</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage name="fuelType" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pricePerKm">Price per KM (₹) *</Label>
                      <Field
                        name="pricePerKm"
                        type="number"
                        as={Input}
                        placeholder="e.g., 12"
                      />
                      <ErrorMessage name="pricePerKm" component="p" className="text-sm text-red-500" />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">
                      Add Car
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/admin')}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddCar;