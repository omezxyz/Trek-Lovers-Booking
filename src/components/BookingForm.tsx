import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trek, BookingFormData } from "@/types/trek";
import { supabase } from "@/integrations/supabase/client";
import emailjs from "@emailjs/browser";

const bookingSchema = z.object({
  customer_name: z.string().min(2, "Name must be at least 2 characters"),
  customer_email: z.string().email("Please enter a valid email"),
  customer_phone: z.string().min(10, "Please enter a valid phone number"),
  participants_count: z.number().min(1, "At least 1 participant required"),
  special_requests: z.string().optional(),
});

interface BookingFormProps {
  trek: Trek;
  onBookingSuccess: (bookingId: string) => void;
}

const BookingForm = ({ trek, onBookingSuccess }: BookingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      participants_count: 1,
      special_requests: "",
    },
  });

  const participantsCount = form.watch("participants_count");
  const totalAmount = participantsCount * trek.price;

  // ADMIN-ONLY email
  const notifyAdminEmail = async (bookingData: BookingFormData, bookingId: string) => {
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID; // EmailJS service ID
      const adminTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN; // Admin template ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY; // EmailJS public key

      await emailjs.send(
        serviceId,
        adminTemplateId,
        {
          to_email: "treklovers.spprt@gmail.com", // Replace with admin email
          subject: `New Booking: ${trek.title}`,
          customer_name: bookingData.customer_name,
          customer_email: bookingData.customer_email,
          customer_phone: bookingData.customer_phone,
          trek_title: trek.title,
          trek_location: trek.location,
          start_date: trek.start_date,
          participants: bookingData.participants_count,
          total_amount: totalAmount,
          booking_id: bookingId,
          special_requests: bookingData.special_requests || "None",
          message: `New booking received from ${bookingData.customer_name}. Please review and confirm in the admin panel.`,
        },
        publicKey
      );
    } catch (error) {
      console.error("Admin email error:", error);
      // Do not throw; the booking is already created
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    if (data.participants_count > trek.max_participants) {
      toast.error(`Maximum ${trek.max_participants} participants allowed for this trek`);
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: booking, error } = await supabase
        .from("bookings")
        .insert({
          trek_id: trek.id,
          customer_name: data.customer_name,
          customer_email: data.customer_email,
          customer_phone: data.customer_phone,
          participants_count: data.participants_count,
          total_amount: totalAmount,
          special_requests: data.special_requests,
        })
        .select()
        .single();

      if (error) throw error;

      // Send ONLY admin notification email
      await notifyAdminEmail(data, booking.id);

      toast.success("Request submitted. Admin has been emailed — please wait for confirmation.");
      form.reset();
      onBookingSuccess(booking.id);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card via-card to-primary/5 shadow-2xl border-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-adventure/5 to-nature/5" />
      <div className="bg-gradient-to-r from-primary/15 via-adventure/10 to-nature/10 border-b border-white/10">
        <CardHeader className="relative pb-6">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-adventure bg-clip-text text-transparent">
            Book Your Adventure
          </CardTitle>
        </CardHeader>
      </div>
      <CardContent className="relative p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="customer_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customer_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customer_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="participants_count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Participants</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max={trek.max_participants}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="special_requests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any dietary requirements, medical conditions, or special requests..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-gradient-to-r from-primary/10 via-adventure/5 to-nature/10 p-6 rounded-xl border border-border/20 shadow-lg">
              <div className="flex justify-between items-center text-xl font-bold mb-2">
                <span className="text-foreground">Total Amount:</span>
                <span className="text-2xl bg-gradient-to-r from-primary to-adventure bg-clip-text text-transparent">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {participantsCount} participant(s) × ₹{trek.price} per person
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-900 hover:from-primary/90 hover:via-adventure/90 hover:to-nature/90 text-white font-semibold py-6 text-lg rounded-xl shadow-lg transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                "Request Booking"
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              After submitting, an admin will contact to confirm your booking and on successfull booking you will be notified via email.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
