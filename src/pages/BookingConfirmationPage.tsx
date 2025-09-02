import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Calendar, 
  Users, 
  MapPin, 
  Mail, 
  Phone, 
  DollarSign,
  FileText,
  Home
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface BookingDetails {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  participants_count: number;
  total_amount: number;
  special_requests?: string;
  booking_status: string;
  created_at: string;
  trek: {
    id: string;
    title: string;
    location: string;
    start_date: string;
    end_date: string;
    duration: number;
    difficulty: string;
    price: number;
  };
}

const BookingConfirmationPage = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();

  const { data: booking, isLoading, error } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: async () => {
      if (!bookingId) throw new Error("Booking ID is required");
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          treks (
            id,
            title,
            location,
            start_date,
            end_date,
            duration,
            difficulty,
            price
          )
        `)
        .eq('id', bookingId)
        .single();
      
      if (error) throw error;
      return {
        ...data,
        trek: data.treks as any
      } as BookingDetails;
    },
    enabled: !!bookingId,
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-nature/10 text-nature border-nature/20';
      case 'Moderate':
        return 'bg-adventure/10 text-adventure border-adventure/20';
      case 'Difficult':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'Extreme':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted border-muted-foreground/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-nature/10 text-nature border-nature/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted border-muted-foreground/20';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-96 h-96 bg-muted rounded-lg" />
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Booking Not Found</h1>
          <p className="text-muted-foreground mb-6">The booking you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-nature mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your booking. We've sent confirmation details to your email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Booking ID:</span>
                <span className="font-mono text-sm">{booking.id}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(booking.booking_status)}>
                  {booking.booking_status.charAt(0).toUpperCase() + booking.booking_status.slice(1)}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Booking Date:</span>
                <span>{format(new Date(booking.created_at), 'PPP')}</span>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{booking.customer_name}</div>
                  <div className="text-sm text-muted-foreground">{booking.customer_email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{booking.customer_phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{booking.participants_count} participant(s)</span>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-lg">${booking.total_amount.toFixed(2)}</span>
              </div>

              {booking.special_requests && (
                <>
                  <Separator />
                  <div>
                    <div className="font-medium mb-1">Special Requests:</div>
                    <p className="text-sm text-muted-foreground">{booking.special_requests}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Trek Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Trek Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{booking.trek.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={getDifficultyColor(booking.trek.difficulty)}>
                    {booking.trek.difficulty}
                  </Badge>
                  <Badge className="bg-earth text-earth-foreground">
                    ${booking.trek.price} per person
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{booking.trek.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {format(new Date(booking.trek.start_date), 'PPP')} - {format(new Date(booking.trek.end_date), 'PPP')}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">Duration:</span>
                <span>{booking.trek.duration} days</span>
              </div>

              <Separator />

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">What's Next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Check your email for detailed confirmation</li>
                  <li>• Our team will contact you within 24 hours</li>
                  <li>• Prepare for your amazing adventure!</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button onClick={() => navigate('/')} variant="outline">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <Button onClick={() => navigate('/treks')}>
            Explore More Treks
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;