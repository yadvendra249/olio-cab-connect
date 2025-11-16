import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FAQ = () => {
  const faqs = [
    {
      question: 'How do I book a cab?',
      answer: 'You can book a cab by clicking on the "Book Now" button on our homepage or visiting the Booking page. Choose your preferred service type (Local, Airport, or Outstation), fill in the required details, and submit your booking.',
    },
    {
      question: 'What are the payment methods available?',
      answer: 'We accept multiple payment methods including cash, credit/debit cards, UPI, and digital wallets. You can choose your preferred payment method at the time of booking.',
    },
    {
      question: 'Can I cancel or modify my booking?',
      answer: 'Yes, you can cancel or modify your booking from your profile section under "My Bookings". Please note that cancellation charges may apply based on the timing of cancellation.',
    },
    {
      question: 'Are your drivers verified?',
      answer: 'Yes, all our drivers are thoroughly verified with background checks. They are experienced, professional, and committed to providing safe and comfortable rides.',
    },
    {
      question: 'What types of vehicles do you offer?',
      answer: 'We offer a wide range of vehicles including Sedans, SUVs, Luxury cars, and Tempo Travellers to suit different travel needs and group sizes.',
    },
    {
      question: 'Do you provide 24/7 service?',
      answer: 'Yes, our services are available 24/7. You can book a cab at any time, and our customer support team is always ready to assist you.',
    },
    {
      question: 'What is included in the tour packages?',
      answer: 'Our tour packages include accommodation, transportation, sightseeing tours with guides, and breakfast. Additional meals and entry fees are not included unless specified.',
    },
    {
      question: 'How far in advance should I book?',
      answer: 'While we accept immediate bookings, we recommend booking at least 24 hours in advance for better availability and to ensure your preferred vehicle type.',
    },
  ];

  return (
    <div className="min-h-screen bg-secondary/10 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about our services
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Still have questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Please contact our support team.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2"
              >
                Contact Support
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
