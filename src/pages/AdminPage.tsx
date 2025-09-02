import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AdminTrekForm from "@/components/AdminTrekForm";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Trek, Booking } from "@/types/trek";
import { toast } from "sonner";
import { format } from "date-fns";
import emailjs from "@emailjs/browser";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminPage = () => {
  const [showTrekForm, setShowTrekForm] = useState(false);
  const [editingTrek, setEditingTrek] = useState<Trek | undefined>();
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return null;
  }

  const { data: treks, isLoading: treksLoading, refetch: refetchTreks } = useQuery({
    queryKey: ["admin-treks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("treks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Trek[];
    },
  });

  // IMPORTANT: include treks.location and treks.start_date for the email
  const { data: bookings, isLoading: bookingsLoading, refetch: refetchBookings } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          *,
          treks (
            title,
            location,
            start_date,
            price
          )
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as (Booking & {
        treks: { title: string; location: string; start_date?: string; price?: number };
      })[];
    },
  });

  const handleDeleteTrek = async (trekId: string) => {
    try {
      const { error } = await supabase.from("treks").delete().eq("id", trekId);
      if (error) throw error;

      toast.success("Trek deleted successfully!");
      refetchTreks();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete trek. Please try again.");
    }
  };

  const handleTrekFormSuccess = () => {
    setShowTrekForm(false);
    setEditingTrek(undefined);
    refetchTreks();
  };

  const handleCancelForm = () => {
    setShowTrekForm(false);
    setEditingTrek(undefined);
  };

  // Confirm booking and email customer with full details
  const handleConfirmBooking = async (
    bookingId: string,
    customerEmail: string,
    customerName: string,
    trekTitle: string
  ) => {
    try {
      // Update status
      const { error } = await supabase
        .from("bookings")
        .update({ booking_status: "confirmed" })
        .eq("id", bookingId);

      if (error) throw error;

      // Pull details for email
      const b = bookings?.find((x) => x.id === bookingId);
      const trekLocation =
        b?.treks?.location ||
        treks?.find((t) => t.title === trekTitle)?.location ||
        "Location TBA";
      const startDateRaw =
        b?.treks?.start_date ||
        treks?.find((t) => t.title === trekTitle)?.start_date ||
        "";
      const startDate = startDateRaw ? new Date(startDateRaw).toDateString() : "TBA";
      const participants = b?.participants_count ?? "";
      const totalAmount = b?.total_amount ?? "";

      // EmailJS send with full params — ensure template variables match exactly
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CUSTOMER; // your customer confirmation template id
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: customerEmail,
          customer_name: customerName,
          trek_title: trekTitle,
          trek_location: trekLocation,
          start_date: startDate,
          participants: participants,
          total_amount: totalAmount,
          booking_id: bookingId,
          confirmation_message:
            "Your booking has been confirmed! Get ready for an amazing adventure.",
          support_email: "treklovers.spprt@gmail.com",
          manage_url: `${window.location.origin}/booking/confirmation/${bookingId}`,
        },
        publicKey
      );

      toast.success("Booking confirmed and customer notified!");
      refetchBookings();
    } catch (error) {
      console.error("Confirmation error:", error);
      toast.error("Failed to confirm booking. Please try again.");
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ booking_status: "cancelled" })
        .eq("id", bookingId);

      if (error) throw error;

      toast.success("Booking cancelled successfully!");
      refetchBookings();
    } catch (error) {
      console.error("Cancellation error:", error);
      toast.error("Failed to cancel booking. Please try again.");
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-[color:var(--moss,#6a8f6b)]/15 text-[color:var(--moss,#6a8f6b)]";
      case "Moderate":
        return "bg-[color:var(--forest,#283635)]/15 text-[color:var(--forest,#283635)]";
      case "Difficult":
        return "bg-[color:var(--clay,#9d6556)]/15 text-[color:var(--clay,#9d6556)]";
      case "Extreme":
        return "bg-red-600/10 text-red-600";
      default:
        return "bg-muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-[color:var(--moss,#6a8f6b)]/15 text-[color:var(--moss,#6a8f6b)]";
      case "pending":
        return "bg-amber-500/15 text-amber-600";
      case "cancelled":
        return "bg-red-600/10 text-red-600";
      default:
        return "bg-muted";
    }
  };

  const totalTreks = treks?.length || 0;
  const activeTreks = treks?.filter((t) => t.is_active).length || 0;
  const totalBookings = bookings?.length || 0;
  const totalRevenue =
    bookings?.reduce((sum, booking) => sum + booking.total_amount, 0) || 0;

  if (showTrekForm || editingTrek) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <AdminTrekForm
            trek={editingTrek}
            onSubmitSuccess={handleTrekFormSuccess}
            onCancel={handleCancelForm}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Header */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[color:var(--forest,#283635)] via-[color:var(--forest,#283635)]/85 to-[color:var(--ink,#121e26)] text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
          <div className="pointer-events-none absolute top-8 right-8 w-24 sm:w-28 md:w-32 aspect-square bg-white/5 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute bottom-8 left-8 w-20 sm:w-24 md:w-28 aspect-square bg-white/10 rounded-full blur-2xl" />
          <div className="container mx-auto px-4 py-10 sm:py-12 md:py-14 relative">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4 sm:mb-6 shadow-sm">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                <span className="text-xs sm:text-sm font-medium tracking-wide">
                  Premium Admin Dashboard
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight mb-2 sm:mb-3 md:mb-4 [text-shadow:0_2px_10px_rgba(0,0,0,0.35)]">
                Admin Dashboard
              </h1>
              <p className="text-sm sm:text-base md:text-xl text-white/90 font-light max-w-3xl mx-auto">
                Manage your premium trek experiences and bookings
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </section>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {[
            {
              label: "Total Treks",
              value: totalTreks,
              icon: <TrendingUp className="h-6 w-6 text-white" />,
              bg: "from-[color:var(--forest,#283635)] to-[color:var(--forest,#283635)]/70",
            },
            {
              label: "Active Treks",
              value: activeTreks,
              icon: <Calendar className="h-6 w-6 text-white" />,
              bg: "from-emerald-600 to-emerald-600/70",
            },
            {
              label: "Total Bookings",
              value: totalBookings,
              icon: <Users className="h-6 w-6 text-white" />,
              bg: "from-sky-600 to-sky-600/70",
            },
            {
              label: "Total Revenue",
              value: `₹${totalRevenue.toFixed(2)}`,
              icon: <DollarSign className="h-6 w-6 text-white" />,
              bg: "from-amber-600 to-amber-600/70",
            },
          ].map((item, idx) => (
            <Card
              key={idx}
              className="bg-white/5 backdrop-blur border border-white/10 shadow-sm overflow-hidden"
            >
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-xs sm:text-sm font-medium">
                      {item.label}
                    </p>
                    <p className="text-2xl sm:text-3xl font-black text-foreground">{item.value}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm bg-gradient-to-br ${item.bg}`}
                  >
                    {item.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs - scrollable on small screens */}
        <Tabs defaultValue="treks" className="space-y-5 sm:space-y-6">
          <div className="relative -mx-4 px-4 overflow-x-auto">
            <TabsList className="inline-flex min-w-full sm:min-w-0">
              <TabsTrigger value="treks" className="whitespace-nowrap">
                Manage Treks
              </TabsTrigger>
              <TabsTrigger value="bookings" className="whitespace-nowrap">
                View Bookings
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Treks */}
          <TabsContent value="treks" className="space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Treks Management</h2>
              <Button
                onClick={() => setShowTrekForm(true)}
                className="bg-[color:var(--forest,#283635)] hover:bg-[oklch(40%_0.06_180)]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Trek
              </Button>
            </div>

            {treksLoading ? (
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-5 sm:p-6">
                      <div className="h-6 bg-muted rounded mb-4" />
                      <div className="h-4 bg-muted rounded mb-2" />
                      <div className="h-4 bg-muted rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {treks?.map((trek) => (
                  <Card key={trek.id} className="bg-white/5 backdrop-blur border border-white/10 shadow-sm">
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                            <h3 className="text-lg sm:text-xl font-semibold text-foreground truncate">
                              {trek.title}
                            </h3>
                            <Badge className={`${getDifficultyColor(trek.difficulty)} px-2.5 py-0.5`}>
                              {trek.difficulty}
                            </Badge>
                            <Badge variant={trek.is_active ? "default" : "secondary"}>
                              {trek.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{trek.location}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {trek.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/trek/${trek.id}`, "_blank")}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setEditingTrek(trek)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Trek</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{trek.title}"? This action
                                  cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteTrek(trek.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="ml-2 font-medium">{trek.duration} days</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Price:</span>
                          <span className="ml-2 font-medium">₹{trek.price}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Max Participants:</span>
                          <span className="ml-2 font-medium">{trek.max_participants}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Start Date:</span>
                          <span className="ml-2 font-medium">
                            {format(new Date(trek.start_date), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Bookings */}
          <TabsContent value="bookings" className="space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Bookings Overview</h2>
            </div>

            {bookingsLoading ? (
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-5 sm:p-6">
                      <div className="h-6 bg-muted rounded mb-4" />
                      <div className="h-4 bg-muted rounded mb-2" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {bookings?.map((booking) => (
                  <Card
                    key={booking.id}
                    className="bg-white/5 backdrop-blur border border-white/10 shadow-sm overflow-hidden"
                  >
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground truncate">
                              {booking.customer_name}
                            </h3>
                            <Badge
                              className={`${getStatusColor(
                                booking.booking_status
                              )} font-medium px-2.5 py-0.5`}
                            >
                              {booking.booking_status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-muted-foreground mb-1">
                                <strong className="text-foreground">Trek:</strong>{" "}
                                {booking.treks?.title}
                              </p>
                              <p className="text-muted-foreground mb-1">
                                <strong className="text-foreground">Email:</strong>{" "}
                                {booking.customer_email}
                              </p>
                              <p className="text-muted-foreground mb-1">
                                <strong className="text-foreground">Phone:</strong>{" "}
                                {booking.customer_phone}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">
                                <strong className="text-foreground">Participants:</strong>{" "}
                                {booking.participants_count}
                              </p>
                              <p className="text-muted-foreground mb-1">
                                <strong className="text-foreground">Amount:</strong> ₹
                                {booking.total_amount}
                              </p>
                              <p className="text-muted-foreground mb-1">
                                <strong className="text-foreground">Booked:</strong>{" "}
                                {format(new Date(booking.created_at), "MMM dd, yyyy")}
                              </p>
                            </div>
                          </div>

                          {booking.special_requests && (
                            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm">
                                <strong className="text-foreground">Special Requests:</strong>{" "}
                                {booking.special_requests}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons / Status */}
                        <div className="flex flex-row md:flex-col gap-2 md:ml-4">
                          {booking.booking_status === "pending" && (
                            <>
                              <Button
                                onClick={() =>
                                  handleConfirmBooking(
                                    booking.id,
                                    booking.customer_email,
                                    booking.customer_name,
                                    booking.treks?.title || "Your Trek"
                                  )
                                }
                                className="bg-[color:var(--moss,#6a8f6b)] hover:bg-[oklch(40%_0.06_180)] text-white px-4 py-2 text-sm font-semibold rounded-md"
                                size="sm"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Confirm
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-red-500/20 text-red-600 hover:bg-red-50/10"
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Cancel
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to cancel this booking for{" "}
                                      {booking.customer_name}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleCancelBooking(booking.id)}
                                      className="bg-red-600 hover:bg-red-600/90"
                                    >
                                      Cancel Booking
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </>
                          )}
                          {booking.booking_status === "confirmed" && (
                            <Badge className="bg-[color:var(--moss,#6a8f6b)]/15 text-[color:var(--moss,#6a8f6b)] px-3 py-1">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Confirmed
                            </Badge>
                          )}
                          {booking.booking_status === "cancelled" && (
                            <Badge className="bg-red-600/10 text-red-600 px-3 py-1">
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancelled
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
