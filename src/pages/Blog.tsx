import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaCalendar, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();
  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Tourist Destinations Near Bangalore',
      excerpt: 'Explore the best places to visit near Bangalore for a perfect weekend getaway.',
      author: 'OlioCar Team',
      date: '2024-01-15',
      category: 'Travel Tips',
    },
    {
      id: 2,
      title: 'How to Choose the Right Cab for Your Journey',
      excerpt: 'A comprehensive guide to selecting the perfect vehicle for your travel needs.',
      author: 'Travel Expert',
      date: '2024-01-10',
      category: 'Travel Guide',
    },
    {
      id: 3,
      title: 'Safety Tips for Outstation Travel',
      excerpt: 'Essential safety measures to keep in mind while traveling to different cities.',
      author: 'Safety Team',
      date: '2024-01-05',
      category: 'Safety',
    },
  ];

  return (
    <div className="min-h-screen bg-secondary/10 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Travel Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, guides, and stories to enhance your travel experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="text-sm text-primary font-semibold mb-2">{post.category}</div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="mr-2" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
