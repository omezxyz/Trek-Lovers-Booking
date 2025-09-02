import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TrekCard from "@/components/TrekCard";
import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search /*, Filter*/ } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Trek } from "@/types/trek";

const TreksPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  // const [sortBy, setSortBy] = useState<string>("newest");

  const { data: treks, isLoading } = useQuery({
    queryKey: ['treks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('treks')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Trek[];
    },
  });

  // const filteredTreks = treks?.filter(trek => {
  //   const q = searchTerm.toLowerCase();
  //   const matchesSearch =
  //     trek.title.toLowerCase().includes(q) ||
  //     trek.location.toLowerCase().includes(q) ||
  //     trek.description.toLowerCase().includes(q);
  //   const matchesDifficulty = difficultyFilter === "all" || trek.difficulty === difficultyFilter;
  //   return matchesSearch && matchesDifficulty;
  // })?.sort((a, b) => {
  //   switch (sortBy) {
  //     case 'price-low':
  //       return a.price - b.price;
  //     case 'price-high':
  //       return b.price - a.price;
  //     case 'duration-short':
  //       return a.duration - b.duration;
  //     case 'duration-long':
  //       return b.duration - a.duration;
  //     case 'newest':
  //     default:
  //       return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  //   }
  // });

  // With filters commented, just do search (client-side)
  const filteredTreks = treks?.filter(trek => {
    const q = searchTerm.toLowerCase();
    return (
      trek.title.toLowerCase().includes(q) ||
      trek.location.toLowerCase().includes(q) ||
      trek.description.toLowerCase().includes(q)
    );
  });

  const clearFilters = () => {
    setSearchTerm("");
    // setDifficultyFilter("all");
    // setSortBy("newest");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative">
        <div className="bg-gradient-to-r from-[color:var(--forest,#283635)] to-[color:var(--ink,#121e26)] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Treks</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover amazing adventures across the world's most beautiful destinations
            </p>
          </div>
        </div>
        {/* thin divider shimmer */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search (glass) */}
        {/* <Card className="mb-8 border-white/10 bg-white/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-foreground">Search Treks</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-foreground placeholder:text-foreground/60 focus-visible:ring-2 focus-visible:ring-white/30"
                  />
                </div>
              </div>

              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full md:w-auto border-white/15 text-foreground hover:bg-white/10"
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card> */}

      

        {/* Treks Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse overflow-hidden">
                <div className="h-64 bg-muted rounded-t-lg" />
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-4" />
                  <div className="h-3 bg-muted rounded mb-1" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredTreks && filteredTreks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTreks.map((trek) => (
              <TrekCard key={trek.id} trek={trek} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No treks found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or clear to see all available treks.
            </p>
            <Button onClick={clearFilters}>Clear</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreksPage;
