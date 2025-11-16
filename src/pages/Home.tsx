import { Link } from 'react-router-dom';
import { FaCar, FaUsers, FaMapMarkedAlt, FaShieldAlt, FaClock, FaHeadset } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-car.jpg';

const Home = () => {
  const features = [
    {
      icon: FaCar,
      title: 'Wide Range of Vehicles',
      description: 'Choose from our diverse fleet of well-maintained vehicles',
    },
    {
      icon: FaUsers,
      title: 'Professional Drivers',
      description: 'Experienced and courteous drivers for your comfort',
    },
    {
      icon: FaMapMarkedAlt,
      title: 'Multiple Locations',
      description: 'Service available across major cities and tourist destinations',
    },
    {
      icon: FaShieldAlt,
      title: 'Safe & Secure',
      description: 'Your safety is our top priority with verified drivers',
    },
    {
      icon: FaClock,
      title: '24/7 Availability',
      description: 'Book anytime, anywhere with our round-the-clock service',
    },
    {
      icon: FaHeadset,
      title: 'Customer Support',
      description: 'Dedicated support team ready to assist you',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Journey, Our Priority
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Book reliable cab services for local trips, airport transfers, and outstation travel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/booking">Book Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
              <Link to="/tour-packages">Explore Tour Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose OlioCar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Local Cab Booking</h3>
                <p className="text-muted-foreground mb-4">
                  Quick and convenient rides within the city for your daily commute or errands.
                </p>
                <Button asChild variant="outline">
                  <Link to="/booking?type=local">Book Local Cab</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Airport Transfer</h3>
                <p className="text-muted-foreground mb-4">
                  Reliable and timely airport pickups and drops with comfortable vehicles.
                </p>
                <Button asChild variant="outline">
                  <Link to="/booking?type=airport">Book Airport Transfer</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Outstation Travel</h3>
                <p className="text-muted-foreground mb-4">
                  Explore destinations beyond the city with our comfortable outstation services.
                </p>
                <Button asChild variant="outline">
                  <Link to="/booking?type=outstation">Book Outstation</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your ride now and experience the best car booking service
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to="/booking">Book Your Ride</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
