import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaCalendar, FaUsers, FaClock } from 'react-icons/fa';
import mysoreImage from '@/assets/mysore-palace.jpg';
import kodaikanalImage from '@/assets/kodaikanal.jpg';
import pondicherryImage from '@/assets/pondicherry.jpg';

const TourPackages = () => {
  const packages = [
    {
      id: 1,
      title: 'Bangalore to Mysore-Ooty',
      image: mysoreImage,
      duration: '3N/4D',
      type: 'Group Departure',
      description: 'Explore the royal city of Mysore and the scenic beauty of Ooty. Visit Mysore Palace, Chamundi Hills, and the beautiful tea gardens of Ooty.',
      highlights: [
        'Mysore Palace Tour',
        'Chamundi Hills',
        'Ooty Botanical Gardens',
        'Doddabetta Peak',
      ],
      price: '₹12,999',
    },
    {
      id: 2,
      title: 'Bangalore to Kodaikanal',
      image: kodaikanalImage,
      duration: '3N/4D',
      type: 'Group Departure',
      description: 'Experience the serene beauty of Kodaikanal, the Princess of Hill Stations. Enjoy misty mountains, pristine lakes, and lush green valleys.',
      highlights: [
        'Kodai Lake',
        'Coaker\'s Walk',
        'Bryant Park',
        'Pillar Rocks',
      ],
      price: '₹11,999',
    },
    {
      id: 3,
      title: 'Bangalore to Pondicherry',
      image: pondicherryImage,
      duration: '3N/4D',
      type: 'Group Departure',
      description: 'Discover the French colonial charm of Pondicherry. Explore beautiful beaches, Auroville, and French Quarter with its colorful streets.',
      highlights: [
        'Auroville',
        'Paradise Beach',
        'French Quarter',
        'Sri Aurobindo Ashram',
      ],
      price: '₹10,999',
    },
  ];

  return (
    <div className="min-h-screen bg-secondary/10 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tour Packages
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore amazing destinations with our carefully curated tour packages
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full font-semibold">
                  {pkg.price}
                </div>
              </div>

              <CardHeader>
                <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.title}</h3>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-primary" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="mr-2 text-primary" />
                    {pkg.type}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4">{pkg.description}</p>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Highlights:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    {pkg.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/booking?package=${pkg.id}`}>Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-card rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-bold text-foreground mb-4">Package Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Inclusions:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Accommodation in comfortable hotels</li>
                <li>All transportation as per itinerary</li>
                <li>Sightseeing tours with guide</li>
                <li>Breakfast at hotels</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Exclusions:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Lunch and dinner</li>
                <li>Entry fees to monuments</li>
                <li>Personal expenses</li>
                <li>Any items not mentioned in inclusions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPackages;
