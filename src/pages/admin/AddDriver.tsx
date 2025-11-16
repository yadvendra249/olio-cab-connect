import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from '@/hooks/use-toast';

const driverSchema = Yup.object().shape({
  name: Yup.string()
    .required('Driver name is required')
    .min(3, 'Name must be at least 3 characters'),
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  licenseNumber: Yup.string()
    .required('License number is required')
    .min(8, 'License number must be at least 8 characters'),
  experience: Yup.number()
    .required('Years of experience is required')
    .min(1, 'Minimum 1 year experience required')
    .max(50, 'Invalid experience years'),
  address: Yup.string().required('Address is required'),
  emergencyContact: Yup.string()
    .required('Emergency contact is required')
    .matches(/^[6-9]\d{9}$/, 'Invalid emergency contact number'),
  aadharNumber: Yup.string()
    .required('Aadhar number is required')
    .matches(/^\d{12}$/, 'Aadhar must be 12 digits'),
});

const AddDriver = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    console.log('Driver added:', values);
    toast({
      title: 'Success',
      description: 'Driver added successfully!',
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
            <CardTitle className="text-3xl">Add New Driver</CardTitle>
            <p className="text-muted-foreground">Fill in the details to add a new driver to the team</p>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                name: '',
                mobile: '',
                email: '',
                licenseNumber: '',
                experience: '',
                address: '',
                emergencyContact: '',
                aadharNumber: '',
              }}
              validationSchema={driverSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Field
                        name="name"
                        as={Input}
                        placeholder="Enter driver's full name"
                      />
                      <ErrorMessage name="name" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number *</Label>
                      <Field
                        name="mobile"
                        as={Input}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                      />
                      <ErrorMessage name="mobile" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Field
                        name="email"
                        type="email"
                        as={Input}
                        placeholder="driver@example.com"
                      />
                      <ErrorMessage name="email" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">License Number *</Label>
                      <Field
                        name="licenseNumber"
                        as={Input}
                        placeholder="Enter license number"
                        className="uppercase"
                      />
                      <ErrorMessage name="licenseNumber" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Field
                        name="experience"
                        type="number"
                        as={Input}
                        placeholder="e.g., 5"
                      />
                      <ErrorMessage name="experience" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="aadharNumber">Aadhar Number *</Label>
                      <Field
                        name="aadharNumber"
                        as={Input}
                        placeholder="12-digit Aadhar number"
                        maxLength={12}
                      />
                      <ErrorMessage name="aadharNumber" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <Field
                        name="address"
                        as={Input}
                        placeholder="Full residential address"
                      />
                      <ErrorMessage name="address" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                      <Field
                        name="emergencyContact"
                        as={Input}
                        placeholder="Emergency contact number"
                        maxLength={10}
                      />
                      <ErrorMessage name="emergencyContact" component="p" className="text-sm text-red-500" />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">
                      Add Driver
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

export default AddDriver;