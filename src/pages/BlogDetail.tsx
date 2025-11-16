import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FaCalendar, FaUser, FaArrowLeft } from 'react-icons/fa';
import { Card } from '@/components/ui/card';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Tourist Destinations Near Bangalore',
      author: 'OlioCar Team',
      date: '2024-01-15',
      category: 'Travel Tips',
      content: `
        <h2>Discover the Best Weekend Getaways from Bangalore</h2>
        <p>Bangalore, known as the Silicon Valley of India, is surrounded by numerous beautiful destinations perfect for weekend getaways. With OlioCar's reliable cab services, exploring these destinations has never been easier.</p>
        
        <h3>1. Mysore Palace - The Royal Heritage</h3>
        <p>Just 150 km from Bangalore, Mysore is a city that beautifully blends history with modernity. The magnificent Mysore Palace is a must-visit, especially during the evening when it's illuminated with thousands of lights. Don't miss the Chamundi Hills and the vibrant Devaraja Market.</p>
        
        <h3>2. Ooty - The Queen of Hill Stations</h3>
        <p>Located about 270 km from Bangalore, Ooty offers breathtaking views, pleasant weather, and lush tea gardens. The Nilgiri Mountain Railway, Botanical Gardens, and Ooty Lake are popular attractions. Book your OlioCar cab for a comfortable journey through the scenic Nilgiri hills.</p>
        
        <h3>3. Coorg - The Scotland of India</h3>
        <p>Known for its coffee plantations and misty hills, Coorg is approximately 250 km from Bangalore. Visit Abbey Falls, Raja's Seat, and explore the spice plantations. The journey itself is scenic and best enjoyed in the comfort of our premium cabs.</p>
        
        <h3>4. Chikmagalur - Coffee Land</h3>
        <p>Famous for its coffee estates and stunning mountain ranges, Chikmagalur is about 240 km from Bangalore. Trek to Mullayanagiri, the highest peak in Karnataka, or visit the serene Hebbe Falls. Our outstation cab services make this trip hassle-free.</p>
        
        <h3>5. Hampi - The Ancient Wonder</h3>
        <p>A UNESCO World Heritage Site, Hampi is around 340 km from Bangalore. The ruins of Vijayanagara Empire, boulder-strewn landscapes, and ancient temples make it a photographer's paradise. Plan a 2-3 day trip with OlioCar's driver booking service.</p>
        
        <h3>6. Wayanad - Nature's Paradise</h3>
        <p>Located in Kerala, about 280 km from Bangalore, Wayanad offers pristine forests, wildlife, and waterfalls. Visit Edakkal Caves, Soochipara Falls, and Banasura Sagar Dam. Our experienced drivers know the best routes to this beautiful destination.</p>
        
        <h3>7. Pondicherry - The French Riviera of India</h3>
        <p>Approximately 310 km from Bangalore, Pondicherry is known for its French colonial architecture and serene beaches. Stroll through the French Quarter, visit Auroville, and enjoy the coastal charm. Perfect for a relaxing weekend trip with OlioCar.</p>
        
        <h3>8. Gokarna - The Beach Haven</h3>
        <p>About 480 km from Bangalore, Gokarna offers pristine beaches and a more peaceful alternative to Goa. Om Beach, Kudle Beach, and the Mahabaleshwar Temple are must-visits. Book our outstation service for this amazing coastal retreat.</p>
        
        <h3>9. Kodaikanal - The Princess of Hill Stations</h3>
        <p>Located around 460 km from Bangalore, Kodaikanal is famous for its waterfalls, pillar rocks, and the star-shaped Kodai Lake. The pleasant climate throughout the year makes it a perfect escape. Our 3N/4D tour packages include comfortable transportation.</p>
        
        <h3>10. Bandipur National Park - Wildlife Adventure</h3>
        <p>Just 220 km from Bangalore, Bandipur is ideal for wildlife enthusiasts. Spot tigers, elephants, and various bird species. Early morning safaris offer the best wildlife viewing experience. Book our cab service for safe forest trail navigation.</p>
        
        <h3>Why Choose OlioCar for Your Road Trips?</h3>
        <ul>
          <li><strong>Reliable Service:</strong> Well-maintained vehicles and experienced drivers</li>
          <li><strong>Flexible Booking:</strong> Book immediately or schedule for later</li>
          <li><strong>Competitive Pricing:</strong> Transparent rates with no hidden charges</li>
          <li><strong>24/7 Support:</strong> Round-the-clock customer assistance</li>
          <li><strong>Safety First:</strong> GPS tracking and verified drivers</li>
        </ul>
        
        <p>Ready to explore these amazing destinations? Book your cab or driver with OlioCar today and embark on an unforgettable journey!</p>
      `,
    },
    {
      id: 2,
      title: 'How to Choose the Right Cab for Your Journey',
      author: 'Travel Expert',
      date: '2024-01-10',
      category: 'Travel Guide',
      content: `
        <h2>Your Complete Guide to Selecting the Perfect Vehicle</h2>
        <p>Choosing the right cab for your journey can significantly impact your travel experience. Whether you're planning a short city trip or a long outstation journey, OlioCar offers a variety of options to suit your needs.</p>
        
        <h3>1. Understanding Your Travel Needs</h3>
        <p>Before booking, consider these key factors:</p>
        <ul>
          <li><strong>Distance:</strong> Local trips (within city), airport transfers, or outstation journeys</li>
          <li><strong>Number of Passengers:</strong> Solo travel, family trips, or group outings</li>
          <li><strong>Luggage Requirements:</strong> Amount and size of baggage</li>
          <li><strong>Comfort Level:</strong> Economy, premium, or luxury options</li>
          <li><strong>Budget:</strong> Daily budget and overall trip cost</li>
        </ul>
        
        <h3>2. Vehicle Categories at OlioCar</h3>
        
        <h4>Sedan - Perfect for City Rides</h4>
        <p><strong>Capacity:</strong> 4 passengers + 2 bags<br>
        <strong>Best For:</strong> Airport transfers, business meetings, short city trips<br>
        <strong>Features:</strong> AC, comfortable seating, fuel-efficient<br>
        Popular models: Swift Dzire, Honda City, Toyota Etios</p>
        
        <h4>SUV - Ideal for Family Trips</h4>
        <p><strong>Capacity:</strong> 6-7 passengers + 4 bags<br>
        <strong>Best For:</strong> Family vacations, group outings, hill station trips<br>
        <strong>Features:</strong> Spacious, powerful engine, ample luggage space<br>
        Popular models: Toyota Innova, Maruti Ertiga, Mahindra XUV</p>
        
        <h4>Luxury - Premium Travel Experience</h4>
        <p><strong>Capacity:</strong> 4 passengers + 3 bags<br>
        <strong>Best For:</strong> Business travel, special occasions, VIP transfers<br>
        <strong>Features:</strong> Premium interiors, superior comfort, professional chauffeurs<br>
        Popular models: Honda Accord, Toyota Camry, Mercedes E-Class</p>
        
        <h4>Tempo Traveller - Group Adventures</h4>
        <p><strong>Capacity:</strong> 12-17 passengers + luggage<br>
        <strong>Best For:</strong> Large groups, corporate outings, wedding functions<br>
        <strong>Features:</strong> Push-back seats, music system, ample space<br>
        Perfect for: Corporate events, family reunions, pilgrimages</p>
        
        <h3>3. Local vs Outstation - What's the Difference?</h3>
        
        <h4>Local Booking</h4>
        <ul>
          <li>Within city limits (typically 8-10 hours or 80-100 km)</li>
          <li>Best for: Shopping, meetings, local sightseeing</li>
          <li>Pricing: Hourly basis with kilometer limits</li>
          <li>Vehicle Type: Compact sedan or hatchback for easy city navigation</li>
        </ul>
        
        <h4>Airport Transfer</h4>
        <ul>
          <li>Dedicated service from/to airport</li>
          <li>Best for: Flight pickups/drops with flexible timing</li>
          <li>Pricing: Fixed rates based on distance</li>
          <li>Vehicle Type: Sedan or SUV based on luggage requirements</li>
        </ul>
        
        <h4>Outstation Booking</h4>
        <ul>
          <li>Inter-city or long-distance travel</li>
          <li>Best for: Weekend getaways, pilgrimage, business trips</li>
          <li>Pricing: Per kilometer with driver allowance</li>
          <li>Vehicle Type: Comfortable SUV or sedan for long hours</li>
        </ul>
        
        <h3>4. Cab Booking vs Driver Booking</h3>
        
        <h4>Cab Booking (Self-Drive Alternative)</h4>
        <p>Book a cab with a professional driver who drives you around. Ideal when you want to relax and enjoy the journey without driving stress.</p>
        <ul>
          <li>No driving responsibility</li>
          <li>Local drivers familiar with routes</li>
          <li>Focus on work or leisure during travel</li>
          <li>Insurance and maintenance included</li>
        </ul>
        
        <h4>Driver Booking</h4>
        <p>Hire just a driver for your personal vehicle. Perfect when you have your own car but prefer not to drive.</p>
        <ul>
          <li>Use your own comfortable vehicle</li>
          <li>Cost-effective for long trips</li>
          <li>Flexible timing and routes</li>
          <li>Experienced drivers with clean records</li>
        </ul>
        
        <h3>5. Important Factors to Consider</h3>
        
        <h4>Road Conditions</h4>
        <ul>
          <li><strong>Highway Travel:</strong> Sedan works well for smooth highways</li>
          <li><strong>Hill Stations:</strong> SUV recommended for steep, winding roads</li>
          <li><strong>Rural Areas:</strong> High ground clearance vehicles preferred</li>
        </ul>
        
        <h4>Weather Conditions</h4>
        <ul>
          <li><strong>Monsoon:</strong> Choose vehicles with good tires and maintenance</li>
          <li><strong>Summer:</strong> Ensure AC is working perfectly</li>
          <li><strong>Winter Hills:</strong> 4WD capability may be needed</li>
        </ul>
        
        <h4>Journey Duration</h4>
        <ul>
          <li><strong>2-4 hours:</strong> Any comfortable vehicle works</li>
          <li><strong>4-8 hours:</strong> Choose vehicles with good suspension</li>
          <li><strong>8+ hours:</strong> SUV or premium sedan for maximum comfort</li>
        </ul>
        
        <h3>6. Smart Booking Tips</h3>
        <ol>
          <li><strong>Book in Advance:</strong> Get better vehicle options and rates</li>
          <li><strong>Check Reviews:</strong> Read driver and vehicle ratings</li>
          <li><strong>Verify Details:</strong> Confirm pickup time, location, and vehicle type</li>
          <li><strong>Communicate Clearly:</strong> Inform about special requirements (child seats, extra luggage)</li>
          <li><strong>Plan Breaks:</strong> For long journeys, schedule meal and rest stops</li>
        </ol>
        
        <h3>7. Cost Optimization</h3>
        <ul>
          <li><strong>Weekday Travel:</strong> Often cheaper than weekends</li>
          <li><strong>Advance Booking:</strong> May offer early bird discounts</li>
          <li><strong>Round Trip:</strong> Usually more economical than one-way</li>
          <li><strong>Package Deals:</strong> Tour packages can offer better value</li>
        </ul>
        
        <h3>8. Safety Checklist</h3>
        <p>Before confirming your booking, ensure:</p>
        <ul>
          <li>Driver has valid license and experience</li>
          <li>Vehicle is properly insured</li>
          <li>GPS tracking is available</li>
          <li>Emergency contact numbers are shared</li>
          <li>Vehicle maintenance is up-to-date</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>The right cab choice enhances your entire travel experience. With OlioCar's diverse fleet and professional service, you can find the perfect vehicle for any journey. Consider your specific needs, budget, and comfort preferences to make an informed decision.</p>
        
        <p><strong>Ready to book?</strong> Visit OlioCar's booking page and select your ideal vehicle today!</p>
      `,
    },
    {
      id: 3,
      title: 'Safety Tips for Outstation Travel',
      author: 'Safety Team',
      date: '2024-01-05',
      category: 'Safety',
      content: `
        <h2>Essential Safety Measures for a Worry-Free Journey</h2>
        <p>Safety should always be your top priority when traveling outstation. Whether you're heading out for a business trip or a leisure vacation, following these safety guidelines will ensure a secure and pleasant journey with OlioCar.</p>
        
        <h3>1. Pre-Journey Safety Checks</h3>
        
        <h4>Verify Driver Details</h4>
        <ul>
          <li>Check driver's license and experience</li>
          <li>Note down driver's name, photo, and contact number</li>
          <li>Verify vehicle registration number</li>
          <li>Review driver ratings and previous customer feedback</li>
        </ul>
        
        <h4>Vehicle Inspection</h4>
        <p>Before starting your journey, ensure:</p>
        <ul>
          <li>Tires are properly inflated with good tread</li>
          <li>Brakes are functioning correctly</li>
          <li>All lights (headlights, indicators, brake lights) work</li>
          <li>Windshield wipers and washer fluid are operational</li>
          <li>First aid kit and emergency tools are available</li>
          <li>Vehicle documents are valid and present</li>
        </ul>
        
        <h4>Documentation</h4>
        <ul>
          <li>Keep your ID proof handy</li>
          <li>Save booking confirmation details</li>
          <li>Carry emergency contact numbers</li>
          <li>Have travel insurance documents if applicable</li>
        </ul>
        
        <h3>2. During the Journey</h3>
        
        <h4>Communication Protocol</h4>
        <ul>
          <li>Share your travel itinerary with family/friends</li>
          <li>Send live location updates at regular intervals</li>
          <li>Keep your phone charged at all times</li>
          <li>Save OlioCar's 24/7 helpline number</li>
          <li>Inform someone about any route changes</li>
        </ul>
        
        <h4>Inside the Vehicle</h4>
        <ul>
          <li><strong>Seatbelts:</strong> Always wear seatbelts, front and back seats</li>
          <li><strong>Children:</strong> Use appropriate child seats for kids under 12</li>
          <li><strong>Windows:</strong> Keep windows partially closed in isolated areas</li>
          <li><strong>Doors:</strong> Ensure all doors are properly locked</li>
          <li><strong>Valuables:</strong> Keep cash, jewelry, and electronics out of sight</li>
        </ul>
        
        <h4>Driver Monitoring</h4>
        <ul>
          <li>Observe if driver follows traffic rules</li>
          <li>Check if speed limits are maintained</li>
          <li>Ensure driver is alert and not using phone while driving</li>
          <li>Request breaks if driver seems tired</li>
          <li>Report any suspicious behavior immediately</li>
        </ul>
        
        <h3>3. Night Travel Safety</h3>
        <ul>
          <li>Prefer daytime travel when possible</li>
          <li>If night travel is necessary, book well-lit highway routes</li>
          <li>Avoid stopping at isolated places</li>
          <li>Stay awake or take turns if traveling in a group</li>
          <li>Keep emergency numbers on speed dial</li>
          <li>Ensure vehicle has functioning night lights</li>
        </ul>
        
        <h3>4. Rest Stop Guidelines</h3>
        <ul>
          <li>Plan stops at well-known, busy locations</li>
          <li>Use restrooms at reputed hotels or restaurants</li>
          <li>Stay in groups if traveling with others</li>
          <li>Lock vehicle and valuables during stops</li>
          <li>Keep stop duration minimal in unfamiliar areas</li>
          <li>Inform someone about your stop location</li>
        </ul>
        
        <h3>5. Weather-Related Precautions</h3>
        
        <h4>Monsoon Safety</h4>
        <ul>
          <li>Check weather forecast before travel</li>
          <li>Avoid traveling during heavy rainfall warnings</li>
          <li>Be cautious of waterlogged roads</li>
          <li>Maintain safe distance from other vehicles</li>
          <li>Reduce speed on wet roads</li>
        </ul>
        
        <h4>Fog and Low Visibility</h4>
        <ul>
          <li>Use fog lights appropriately</li>
          <li>Reduce speed significantly</li>
          <li>Avoid overtaking in low visibility</li>
          <li>Consider delaying travel if visibility is very poor</li>
        </ul>
        
        <h4>Summer Heat</h4>
        <ul>
          <li>Stay hydrated throughout journey</li>
          <li>Ensure AC is working properly</li>
          <li>Take regular breaks to avoid heat exhaustion</li>
          <li>Avoid midday travel in extreme heat</li>
        </ul>
        
        <h3>6. Medical and Health Safety</h3>
        <ul>
          <li>Carry essential medications and prescriptions</li>
          <li>Keep motion sickness medicine handy</li>
          <li>Pack a basic first aid kit</li>
          <li>Know location of hospitals on your route</li>
          <li>Carry health insurance card</li>
          <li>Stay hydrated and eat at clean places</li>
        </ul>
        
        <h3>7. COVID-19 and Hygiene Protocols</h3>
        <ul>
          <li>Verify vehicle is properly sanitized</li>
          <li>Carry hand sanitizer and masks</li>
          <li>Maintain social distancing where possible</li>
          <li>Avoid touching face during journey</li>
          <li>Ventilate the vehicle regularly</li>
        </ul>
        
        <h3>8. Emergency Preparedness</h3>
        
        <h4>What to Keep in Vehicle</h4>
        <ul>
          <li>Fully charged power bank</li>
          <li>Flashlight with extra batteries</li>
          <li>Drinking water and snacks</li>
          <li>Blanket or warm clothing</li>
          <li>Basic tool kit</li>
          <li>Emergency flares or reflectors</li>
        </ul>
        
        <h4>Important Numbers to Save</h4>
        <ul>
          <li>OlioCar 24/7 helpline</li>
          <li>Local police: 100</li>
          <li>Ambulance: 108</li>
          <li>Roadside assistance</li>
          <li>Insurance company</li>
          <li>Family emergency contacts</li>
        </ul>
        
        <h3>9. Ladies' Safety Tips</h3>
        <ul>
          <li>Prefer daytime travel when alone</li>
          <li>Share driver details and live location with family</li>
          <li>Sit in the back seat</li>
          <li>Keep emergency contacts on speed dial</li>
          <li>Trust your instincts - report uncomfortable situations</li>
          <li>Stay alert and avoid sleeping during solo travel</li>
          <li>Keep personal safety apps handy</li>
        </ul>
        
        <h3>10. Financial Safety</h3>
        <ul>
          <li>Avoid carrying large amounts of cash</li>
          <li>Use digital payment methods when possible</li>
          <li>Keep emergency cash in a separate, safe place</li>
          <li>Don't display expensive gadgets or jewelry</li>
          <li>Be aware of toll booth charges beforehand</li>
        </ul>
        
        <h3>11. Route Planning Safety</h3>
        <ul>
          <li>Choose well-known, frequently traveled routes</li>
          <li>Avoid shortcuts through isolated areas</li>
          <li>Check for road work or diversions beforehand</li>
          <li>Have offline maps downloaded</li>
          <li>Know the locations of police stations en route</li>
          <li>Plan stops at verified, safe locations</li>
        </ul>
        
        <h3>12. OlioCar Safety Features</h3>
        <p>When you book with OlioCar, you benefit from:</p>
        <ul>
          <li><strong>Verified Drivers:</strong> All drivers undergo background checks</li>
          <li><strong>GPS Tracking:</strong> Real-time vehicle tracking for your safety</li>
          <li><strong>24/7 Support:</strong> Round-the-clock customer assistance</li>
          <li><strong>Emergency Button:</strong> Quick access to help in the app</li>
          <li><strong>Trip Sharing:</strong> Share your journey details with contacts</li>
          <li><strong>Insurance Coverage:</strong> All vehicles are properly insured</li>
        </ul>
        
        <h3>13. What to Do in Case of Emergency</h3>
        
        <h4>Vehicle Breakdown</h4>
        <ol>
          <li>Move vehicle to safe location if possible</li>
          <li>Turn on hazard lights</li>
          <li>Contact OlioCar support immediately</li>
          <li>Stay inside vehicle if on highway</li>
          <li>Call roadside assistance</li>
        </ol>
        
        <h4>Accident</h4>
        <ol>
          <li>Check for injuries and call ambulance if needed</li>
          <li>Inform police (mandatory for insurance claims)</li>
          <li>Contact OlioCar support</li>
          <li>Take photos of accident scene</li>
          <li>Exchange information with other parties</li>
          <li>Don't sign any documents without understanding</li>
        </ol>
        
        <h4>Feeling Unsafe</h4>
        <ol>
          <li>Call OlioCar emergency helpline</li>
          <li>Share live location with trusted contact</li>
          <li>If necessary, call 100 (police)</li>
          <li>Stay calm and be alert</li>
          <li>Exit at the next safe, public location</li>
        </ol>
        
        <h3>14. Post-Journey Actions</h3>
        <ul>
          <li>Verify final billing and save receipt</li>
          <li>Provide honest feedback about driver and service</li>
          <li>Report any issues experienced during journey</li>
          <li>Review your belongings before leaving vehicle</li>
          <li>If something was left behind, contact support immediately</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>Your safety is our priority at OlioCar. By following these comprehensive safety guidelines and utilizing our safety features, you can enjoy a secure and comfortable outstation journey. Remember, it's always better to be over-prepared than under-prepared when it comes to travel safety.</p>
        
        <p><strong>Safe travels with OlioCar!</strong> For any safety concerns or questions, our support team is available 24/7 to assist you.</p>
      `,
    },
  ];

  const post = blogPosts.find((p) => p.id === parseInt(id || '1'));

  if (!post) {
    return (
      <div className="min-h-screen bg-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground">Blog post not found</p>
          <Button onClick={() => navigate('/blog')} className="mt-4 mx-auto block">
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="outline"
          onClick={() => navigate('/blog')}
          className="mb-6 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Blog
        </Button>

        <Card className="overflow-hidden">
          <div className="p-8">
            <div className="mb-6">
              <span className="text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 mb-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <FaUser className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <div
                className="prose prose-lg max-w-none
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                  prose-h4:text-xl prose-h4:mt-4 prose-h4:mb-2
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                  prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                  prose-li:text-muted-foreground prose-li:mb-2
                  prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">Ready to book your next trip?</p>
          <Button size="lg" onClick={() => navigate('/booking')}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;