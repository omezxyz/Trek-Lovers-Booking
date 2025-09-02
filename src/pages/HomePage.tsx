import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/Hero";
import TrekCard from "@/components/TrekCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Trek } from "@/types/trek";
import { Award, Users, MapPin, Calendar } from "lucide-react";

const HomePage = () => {
  const { data: featuredTreks, isLoading } = useQuery({
    queryKey: ['featured-treks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('treks')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data as Trek[];
    },
  });

  const stats = [
    { icon: Award, label: "Years Experience", value: "3+" },
    { icon: Users, label: "Happy Trekkers", value: "2,500+" },
    { icon: MapPin, label: "Destinations", value: "50+" },
    { icon: Calendar, label: "Treks Completed", value: "500+" },
  ];

  return (
    <div className="min-h-screen">
      <Hero />
        {/* Featured Treks */}
     {/* Featured Treks */}
<section className="relative mt-0]">
  {/* Background with gradient overlay */}
  {/* <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1755529582689-7a158b8f9183?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Mountains background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
  </div> */}

  <div className="relative container mx-auto px-4">
    <div className="text-center mb-14 max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-700 mb-4 tracking-tight">
        Featured Adventures
      </h2>
      <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
      <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
        Discover our most popular treks that offer unforgettable experiences 
        and breathtaking views of nature's wonders.
      </p>
    </div>

    {isLoading ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="h-64 bg-white/20 rounded-t-lg" />
            <CardContent className="p-6">
              <div className="h-4 bg-white/30 rounded mb-2" />
              <div className="h-4 bg-white/30 rounded w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredTreks?.map((trek) => (
          <TrekCard key={trek.id} trek={trek} />
        ))}
      </div>
    )}

    <div className="text-center mt-12">
      <Link to="/treks">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 transition-transform hover:scale-105 mb-10"
        >
          View All Treks
        </Button>
      </Link>
    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose TrekFlow?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing safe, sustainable, and unforgettable adventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Expert Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our certified local guides have years of experience and deep knowledge 
                  of the regions we explore.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-adventure/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-adventure" />
                </div>
                <CardTitle>Small Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We keep our groups small to ensure personalized attention and 
                  minimal environmental impact.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-nature/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-nature" />
                </div>
                <CardTitle>Sustainable Tourism</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're committed to responsible tourism that benefits local 
                  communities and preserves natural environments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;