// import { useParams, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import BookingForm from "@/components/BookingForm";
// import { 
//   Calendar, 
//   Clock, 
//   Users, 
//   MapPin, 
//   Star, 
//   Check, 
//   X,
//   Mountain,
//   Camera,
//   Image as ImageIcon
// } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
// import { Trek } from "@/types/trek";
// import { format } from "date-fns";
// import { toast } from "sonner";
// import ImageViewer from "@/components/ImageViewer";

// const TrekDetailPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const { data: trek, isLoading, refetch } = useQuery({
//     queryKey: ['trek', id],
//     queryFn: async () => {
//       if (!id) throw new Error("Trek ID is required");
      
//       const { data, error } = await supabase
//         .from('treks')
//         .select('*')
//         .eq('id', id)
//         .eq('is_active', true)
//         .single();
      
//       if (error) throw error;
//       return data as Trek;
//     },
//     enabled: !!id,
//   });

//   const getDifficultyColor = (difficulty: string) => {
//     switch (difficulty) {
//       case 'Easy':
//         return 'bg-nature/10 text-nature border-nature/20';
//       case 'Moderate':
//         return 'bg-adventure/10 text-adventure border-adventure/20';
//       case 'Difficult':
//         return 'bg-accent/10 text-accent border-accent/20';
//       case 'Extreme':
//         return 'bg-destructive/10 text-destructive border-destructive/20';
//       default:
//         return 'bg-muted border-muted-foreground/20';
//     }
//   };

//   const handleBookingSuccess = (bookingId: string) => {
//     navigate(`/booking/confirmation/${bookingId}`);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         {/* Premium Loading Hero */}
//         <div className="relative h-96 overflow-hidden bg-gradient-to-br from-primary/20 via-adventure/10 to-accent/20">
//           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent animate-pulse" />
//           <div className="absolute bottom-0 left-0 right-0 p-8">
//             <div className="container mx-auto">
//               <div className="flex flex-wrap items-center gap-3 mb-4">
//                 <div className="h-6 w-20 bg-white/20 rounded-full animate-pulse" />
//                 <div className="h-6 w-32 bg-white/20 rounded-full animate-pulse" />
//               </div>
//               <div className="h-12 w-3/4 bg-white/20 rounded-lg animate-pulse mb-2" />
//               <div className="h-6 w-1/2 bg-white/20 rounded animate-pulse" />
//             </div>
//           </div>
//         </div>

//         <div className="container mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-8">
//               {/* Premium Quick Info Skeleton */}
//               <div className="bg-gradient-to-r from-card via-card to-muted/50 rounded-xl p-8 shadow-xl border border-border/50">
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                   {[...Array(4)].map((_, i) => (
//                     <div key={i} className="text-center space-y-3">
//                       <div className="h-8 w-8 bg-primary/20 rounded-full mx-auto animate-pulse" />
//                       <div className="h-6 w-12 bg-muted rounded mx-auto animate-pulse" />
//                       <div className="h-4 w-16 bg-muted/60 rounded mx-auto animate-pulse" />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Premium Content Skeletons */}
//               {[...Array(3)].map((_, i) => (
//                 <div key={i} className="bg-gradient-to-br from-card to-muted/30 rounded-xl shadow-lg border border-border/30 overflow-hidden">
//                   <div className="p-6 border-b border-border/20 bg-gradient-to-r from-primary/5 to-adventure/5">
//                     <div className="h-6 w-48 bg-muted rounded animate-pulse" />
//                   </div>
//                   <div className="p-6 space-y-4">
//                     <div className="h-4 bg-muted rounded animate-pulse" />
//                     <div className="h-4 bg-muted/80 rounded animate-pulse w-5/6" />
//                     <div className="h-4 bg-muted/60 rounded animate-pulse w-4/6" />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Premium Booking Form Skeleton */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-24 bg-gradient-to-br from-card via-card to-primary/5 rounded-xl shadow-2xl border border-border/30 overflow-hidden">
//                 <div className="p-6 bg-gradient-to-r from-primary/10 to-adventure/10 border-b border-border/20">
//                   <div className="h-6 w-40 bg-muted rounded animate-pulse" />
//                 </div>
//                 <div className="p-6 space-y-6">
//                   {[...Array(5)].map((_, i) => (
//                     <div key={i} className="space-y-2">
//                       <div className="h-4 w-24 bg-muted rounded animate-pulse" />
//                       <div className="h-10 bg-muted/50 rounded-lg animate-pulse" />
//                     </div>
//                   ))}
//                   <div className="h-12 bg-primary/20 rounded-lg animate-pulse" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!trek) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <Mountain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-foreground mb-2">Trek Not Found</h1>
//           <p className="text-muted-foreground">The trek you're looking for doesn't exist or is no longer available.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Premium Hero Section */}
//       <div className="relative h-[70vh] overflow-hidden">
//         <img
//           src={trek.image_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920'}
//           alt={trek.title}
//           className="w-full h-full object-cover scale-110 transition-transform duration-700 hover:scale-105"
//         />
//         <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
//         {/* Premium Floating Elements */}
//         <div className="absolute top-8 right-8">
//           <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
//             <div className="flex items-center gap-2 text-white/90 text-sm">
//               <Star className="h-4 w-4 fill-current text-adventure" />
//               <span>Premium Experience</span>
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 p-8">
//           <div className="container mx-auto">
//             <div className="flex flex-wrap items-center gap-4 mb-6">
//               <Badge className={`${getDifficultyColor(trek.difficulty)} backdrop-blur-sm border border-white/20 text-lg px-4 py-2`}>
//                 {trek.difficulty}
//               </Badge>
//               <Badge className="bg-gradient-to-r from-earth to-accent text-white backdrop-blur-sm border border-white/20 text-lg px-4 py-2 font-semibold">
//                 ${trek.price} per person
//               </Badge>
//             </div>
//             <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight bg-gradient-to-r from-white to-white/90 bg-clip-text">
//               {trek.title}
//             </h1>
//             <div className="flex items-center text-white/90 text-xl font-medium">
//               <MapPin className="h-6 w-6 mr-3 text-adventure" />
//               {trek.location}
//             </div>
//           </div>
//         </div>

//         {/* Premium gradient overlay */}
//         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent" />
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Premium Quick Info */}
//             <Card className="bg-gradient-to-br from-card via-card to-primary/5 shadow-2xl border-0 overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-adventure/5" />
//               <CardContent className="relative p-8">
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//                   <div className="text-center group">
//                     <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-primary/30 transition-all duration-300 group-hover:scale-110">
//                       <Clock className="h-8 w-8 text-white" />
//                     </div>
//                     <div className="text-3xl font-black text-foreground mb-1">{trek.duration}</div>
//                     <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Days</div>
//                   </div>
//                   <div className="text-center group">
//                     <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-adventure to-adventure/70 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-adventure/30 transition-all duration-300 group-hover:scale-110">
//                       <Users className="h-8 w-8 text-white" />
//                     </div>
//                     <div className="text-3xl font-black text-foreground mb-1">{trek.max_participants}</div>
//                     <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Max Group</div>
//                   </div>
//                   <div className="text-center group">
//                     <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-nature to-nature/70 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-nature/30 transition-all duration-300 group-hover:scale-110">
//                       <Calendar className="h-8 w-8 text-white" />
//                     </div>
//                     <div className="text-3xl font-black text-foreground mb-1">
//                       {format(new Date(trek.start_date), 'MMM dd')}
//                     </div>
//                     <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Start Date</div>
//                   </div>
//                   <div className="text-center group">
//                     <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-accent/30 transition-all duration-300 group-hover:scale-110">
//                       <Star className="h-8 w-8 text-white" />
//                     </div>
//                     <div className="text-3xl font-black text-foreground mb-1">{trek.difficulty}</div>
//                     <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Difficulty</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Premium Description */}
//             <Card className="bg-gradient-to-br from-card to-muted/20 shadow-xl border border-border/30 overflow-hidden">
//               <div className="bg-gradient-to-r from-primary/10 via-adventure/5 to-nature/10 border-b border-border/20">
//                 <CardHeader className="pb-4">
//                   <CardTitle className="flex items-center gap-3 text-2xl font-bold">
//                     <div className="w-10 h-10 bg-gradient-to-br from-primary to-adventure rounded-xl flex items-center justify-center">
//                       <Mountain className="h-5 w-5 text-white" />
//                     </div>
//                     About This Trek
//                   </CardTitle>
//                 </CardHeader>
//               </div>
//               <CardContent className="p-8">
//                 <p className="text-muted-foreground leading-relaxed text-lg font-light">
//                   {trek.description}
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Highlights */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Camera className="h-5 w-5" />
//                   Trek Highlights
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {trek.highlights.map((highlight, index) => (
//                     <div key={index} className="flex items-center gap-3">
//                       <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
//                       <span className="text-muted-foreground">{highlight}</span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Gallery */}
//             {trek.gallery_images && trek.gallery_images.length > 0 && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <ImageIcon className="h-5 w-5" />
//                     Photo Gallery
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                     {trek.gallery_images.map((image, index) => (
//                       <ImageViewer key={index} images={trek.gallery_images}>
//                         <div className="cursor-pointer group">
//                           <img
//                             src={image}
//                             alt={`${trek.title} - Image ${index + 1}`}
//                             className="w-full h-32 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
//                           />
//                         </div>
//                       </ImageViewer>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Included & Excluded */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2 text-nature">
//                     <Check className="h-5 w-5" />
//                     What's Included
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-2">
//                     {trek.included.map((item, index) => (
//                       <li key={index} className="flex items-center gap-2">
//                         <Check className="h-4 w-4 text-nature flex-shrink-0" />
//                         <span className="text-muted-foreground text-sm">{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2 text-destructive">
//                     <X className="h-5 w-5" />
//                     What's Excluded
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-2">
//                     {trek.excluded.map((item, index) => (
//                       <li key={index} className="flex items-center gap-2">
//                         <X className="h-4 w-4 text-destructive flex-shrink-0" />
//                         <span className="text-muted-foreground text-sm">{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Itinerary */}
//             {Object.keys(trek.itinerary).length > 0 && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Sample Itinerary</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {Object.entries(trek.itinerary).map(([day, activity], index) => (
//                       <div key={day} className="flex gap-4">
//                         <div className="flex-shrink-0">
//                           <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
//                             {index + 1}
//                           </div>
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="font-semibold text-foreground capitalize mb-1">
//                             {day.replace(/([A-Z])/g, ' $1').trim()}
//                           </h4>
//                           <p className="text-muted-foreground text-sm">{activity}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           {/* Premium Sidebar - Booking Form */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-24">
//               <div className="transform hover:scale-105 transition-transform duration-300">
//                 <BookingForm trek={trek} onBookingSuccess={handleBookingSuccess} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrekDetailPage;
 
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingForm from "@/components/BookingForm";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Star,
  Check,
  X,
  Mountain,
  Camera,
  Image as ImageIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Trek } from "@/types/trek";
import { format } from "date-fns";
import ImageViewer from "@/components/ImageViewer";
import { Button } from "@/components/ui/button";

const TrekDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: trek, isLoading } = useQuery({
    queryKey: ["trek", id],
    queryFn: async () => {
      if (!id) throw new Error("Trek ID is required");
      const { data, error } = await supabase
        .from("treks")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .single();
      if (error) throw error;
      return data as Trek;
    },
    enabled: !!id,
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-[color:var(--moss,#6a8f6b)]/20 text-[color:var(--moss,#6a8f6b)] ring-1 ring-white/10";
      case "Moderate":
        return "bg-[color:var(--forest,#283635)]/20 text-[color:var(--forest,#283635)] ring-1 ring-white/10";
      case "Difficult":
        return "bg-[color:var(--clay,#9d6556)]/20 text-[color:var(--clay,#9d6556)] ring-1 ring-white/10";
      case "Extreme":
        return "bg-red-700/20 text-red-600 ring-1 ring-white/10";
      default:
        return "bg-[color:var(--ink,#121e26)]/20 text-[color:var(--ink,#121e26)] ring-1 ring-white/10";
    }
  };

  const handleBookTop = () => {
    const el = document.getElementById("booking-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Reserve space for bar */}
        <div className="pt-[64px] md:pt-[72px]" />
        <div className="relative h-72 md:h-96 overflow-hidden bg-gradient-to-br from-black/30 via-black/20 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent animate-pulse" />
        </div>
        <div className="container mx-auto px-4 py-8">
          {/* Skeletons omitted for brevity */}
        </div>
      </div>
    );
  }

  if (!trek) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <Mountain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Trek Not Found</h1>
          <p className="text-muted-foreground">The trek might not exist or is no longer available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Full-width Book Now bar right under navbar */}
      <div className="fixed top-[64px] md:top-[72px] left-0 right-0 z-50 bg-[color:var(--ink,#121e26)]/90 backdrop-blur border-b border-white/10">
        <div className="mx-auto w-full">
          <div className="px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-3">
            <div className="min-w-0 flex items-center gap-3">
              <Badge className={`${getDifficultyColor(trek.difficulty)} hidden sm:inline-flex px-3 py-1`}>
                {trek.difficulty}
              </Badge>
              <div className="text-green-950">
                <div className="text-xs opacity-80">From</div>
                <div className="text-base sm:text-lg font-semibold">
                  ₹{trek.price} per person
                </div>
              </div>
            </div>
            <Button
              onClick={handleBookTop}
              className="w-full sm:w-auto justify-center rounded-lg border border-white/10 shadow-sm text-[color:var(--sand,#f4efeb)] bg-[color:var(--forest,#283635)] hover:bg-[oklch(40%_0.06_180)] focus-visible:ring-2 focus-visible:ring-white/30 px-4 sm:px-6 py-2.5"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* Spacer so content doesn't sit under the bar */}
      <div className="h-[72px] md:h-[84px]" />

      {/* Hero with strong contrast */}
      <div className="relative h-[56vh] md:h-[64vh] lg:h-[70vh] overflow-hidden">
        <img
          src={trek.image_url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"}
          alt={trek.title}
          className="w-full h-full object-cover"
        />
        {/* Stronger overlay for readability */}
        <div className="absolute inset-0 bg-black/55 md:bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />

        {/* Foreground content with readable background on small screens */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
          <div className="container mx-auto">
            {/* Underlay panel for text on small screens */}
            <div className="sm:bg-transparent bg-black/45 rounded-lg p-3 sm:p-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Badge className={`${getDifficultyColor(trek.difficulty)} backdrop-blur-sm border text-white text-xs sm:text-sm md:text-base px-2.5 sm:px-3 py-1.5`}>
                  {trek.difficulty}
                </Badge>
                <Badge className="bg-[color:var(--sand,#f4efeb)] text-[color:var(--ink,#121e26)] backdrop-blur-sm border border-white/20 text-xs sm:text-sm md:text-base px-2.5 sm:px-3 py-1.5 font-semibold">
                  ₹{trek.price} per person
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]">
                {trek.title}
              </h1>
              <div className="mt-2 sm:mt-3 flex items-center text-white/95 text-base sm:text-xl font-medium [text-shadow:0_1px_6px_rgba(0,0,0,0.65)]">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-white" />
                <span className="truncate">{trek.location}</span>
                <span className="mx-2">•</span>
                <span>{format(new Date(trek.start_date), "MMM dd")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Quick Info */}
            <Card className="border border-white/10 shadow-sm bg-white/5 backdrop-blur">
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                  <div className="text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 bg-[color:var(--forest,#283635)] rounded-2xl flex items-center justify-center text-white">
                      <Clock className="h-7 w-7 md:h-8 md:w-8" />
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-foreground">{trek.duration}</div>
                    <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 bg-[color:var(--forest,#283635)] rounded-2xl flex items-center justify-center text-white">
                      <Users className="h-7 w-7 md:h-8 md:w-8" />
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-foreground">{trek.max_participants}</div>
                    <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">Max Group</div>
                  </div>
                  <div className="text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 bg-[color:var(--forest,#283635)] rounded-2xl flex items-center justify-center text-white">
                      <Calendar className="h-7 w-7 md:h-8 md:w-8" />
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-foreground">
                      {format(new Date(trek.start_date), "MMM dd")}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">Start Date</div>
                  </div>
                  <div className="text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 bg-[color:var(--forest,#283635)] rounded-2xl flex items-center justify-center text-white">
                      <Star className="h-7 w-7 md:h-8 md:w-8" />
                    </div>
                    <div className="text-xl md:text-2xl font-black text-foreground">{trek.difficulty}</div>
                    <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">Difficulty</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="shadow-sm border border-white/10 bg-white/5 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[color:var(--forest,#283635)] rounded-xl flex items-center justify-center text-white">
                    <Mountain className="h-5 w-5" />
                  </div>
                  About This Trek
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90 leading-relaxed">
                  {trek.description}
                </p>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card className="shadow-sm border border-white/10 bg-white/5 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Trek Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {trek.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[color:var(--forest,#283635)] rounded-full" />
                      <span className="text-foreground/80">{h}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gallery */}
            {trek.gallery_images && trek.gallery_images.length > 0 && (
              <Card className="shadow-sm border border-white/10 bg-white/5 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Photo Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {trek.gallery_images.map((img, i) => (
                      <ImageViewer key={i} images={trek.gallery_images}>
                        <div className="cursor-pointer group rounded-lg overflow-hidden">
                          <img
                            src={img}
                            alt={`${trek.title} - Image ${i + 1}`}
                            className="w-full h-28 md:h-32 object-cover group-hover:opacity-90 transition"
                          />
                        </div>
                      </ImageViewer>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Included / Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm border border-white/10 bg-white/5 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-950">
                    <Check className="h-5 w-5" />
                    What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {trek.included.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-900 flex-shrink-0" />
                        <span className="text-foreground/80 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-sm border border-white/10 bg-white/5 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-950">
                    <X className="h-5 w-5" />
                    What's Excluded
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {trek.excluded.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <X className="h-4 w-4 text-red-900 flex-shrink-0" />
                        <span className="text-foreground/80 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Itinerary */}
            {trek.itinerary && Object.keys(trek.itinerary).length > 0 && (
              <Card className="shadow-sm border border-white/10 bg-white/5 backdrop-blur">
                <CardHeader>
                  <CardTitle>Sample Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(trek.itinerary).map(([day, activity], idx) => (
                      <div key={day} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-[color:var(--forest,#283635)] text-[color:var(--sand,#f4efeb)] rounded-full flex items-center justify-center text-sm font-semibold">
                            {idx + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground capitalize mb-1">
                            {day.replace(/([A-Z])/g, " $1").trim()}
                          </h4>
                          <p className="text-foreground/80 text-sm">{activity as string}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Booking */}
          <div className="lg:col-span-1">
            <div id="booking-form" className="sticky top-28">
              <div className="transform transition-transform hover:scale-[1.005]">
                <BookingForm
                  trek={trek}
                  onBookingSuccess={(bookingId: string) =>
                    navigate(`/booking/confirmation/${bookingId}`)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekDetailPage;
