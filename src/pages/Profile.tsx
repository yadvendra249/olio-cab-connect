import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaTrash } from 'react-icons/fa';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { bookings } = useSelector((state: RootState) => state.booking);
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      case 'completed':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      default:
        return '';
    }
  };

  // Filter bookings
  const filteredBookings = useMemo(() => {
    if (statusFilter === 'all') return bookings;
    return bookings.filter((booking) => booking.status === statusFilter);
  }, [bookings, statusFilter]);

  // Separate bookings by status
  const pendingBookings = bookings.filter((b) => b.status === 'pending');
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed');
  const completedBookings = bookings.filter((b) => b.status === 'completed');
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled');

  const handleEdit = (bookingId: string) => {
    console.log('Edit booking:', bookingId);
  };

  const handleDelete = (bookingId: string) => {
    console.log('Delete booking:', bookingId);
  };

  return (
    <div className="min-h-screen bg-secondary/10 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">My Profile</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{user?.name || 'User'}</CardTitle>
                    <p className="text-muted-foreground">Member since 2024</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <FaUser className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium text-foreground">{user?.name || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <FaEnvelope className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-medium text-foreground">{user?.email || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <FaPhone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mobile Number</p>
                      <p className="font-medium text-foreground">{user?.mobile || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <FaUser className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Account Status</p>
                      <Badge className="mt-1">Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <div className="flex gap-4 mt-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Bookings ({bookings.length})</SelectItem>
                      <SelectItem value="pending">Pending ({pendingBookings.length})</SelectItem>
                      <SelectItem value="confirmed">Confirmed ({confirmedBookings.length})</SelectItem>
                      <SelectItem value="completed">Completed ({completedBookings.length})</SelectItem>
                      <SelectItem value="cancelled">Cancelled ({cancelledBookings.length})</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {filteredBookings.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    {statusFilter === 'all' 
                      ? 'No bookings yet. Book your first ride now!'
                      : `No ${statusFilter} bookings found.`}
                  </p>
                ) : (
                  <div className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Booking ID</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-mono text-sm">
                              {booking.id.slice(0, 8)}...
                            </TableCell>
                            <TableCell className="capitalize">{booking.type}</TableCell>
                            <TableCell className="capitalize">{booking.category}</TableCell>
                            <TableCell className="text-sm">{booking.pickupLocation}</TableCell>
                            <TableCell className="text-sm">{booking.dropLocation}</TableCell>
                            <TableCell>{booking.date}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {booking.status === 'pending' && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleEdit(booking.id)}
                                      className="text-primary"
                                    >
                                      <FaEdit />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleDelete(booking.id)}
                                      className="text-destructive"
                                    >
                                      <FaTrash />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
