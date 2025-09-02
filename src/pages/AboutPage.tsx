import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, MapPin, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[color:var(--forest,#283635)] to-[color:var(--ink,#121e26)] text-white">
          <div className="container mx-auto px-4 py-14 sm:py-16 md:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              About TrekLovers
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Your trusted partner for unforgettable adventure experiences around the globe
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-12 sm:py-14 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">Our Story</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Founded in 2025, TrekLovers has been at the forefront of adventure tourism, providing safe,
            sustainable, and transformative trekking experiences. Our passion for the outdoors and
            commitment to responsible tourism has made us a trusted name among adventure enthusiasts
            worldwide.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 pb-10 sm:pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          <Card className="bg-white/5 backdrop-blur border border-white/10 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Heart className="h-5 w-5 text-[color:var(--moss,#6a8f6b)]" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                To create life-changing adventures that connect people with nature while supporting
                local communities and preserving the environments we explore.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur border border-white/10 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MapPin className="h-5 w-5 text-[color:var(--forest,#283635)]" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                To be the world's leading sustainable adventure travel company, inspiring people to
                explore responsibly and fostering a global community of conscious travelers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why TrekFlow */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          <Card className="text-center bg-white/5 backdrop-blur border border-white/10 shadow-sm">
            <CardHeader>
              <Award className="h-12 w-12 text-[color:var(--forest,#283635)] mx-auto mb-3" />
              <CardTitle className="text-foreground">Expert Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                Our certified local guides bring years of experience and deep cultural knowledge.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/5 backdrop-blur border border-white/10 shadow-sm">
            <CardHeader>
              <Users className="h-12 w-12 text-[color:var(--moss,#6a8f6b)] mx-auto mb-3" />
              <CardTitle className="text-foreground">Small Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                We maintain small group sizes for personalized experiences and minimal impact.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/5 backdrop-blur border border-white/10 shadow-sm">
            <CardHeader>
              <Heart className="h-12 w-12 text-[color:var(--clay,#9d6556)] mx-auto mb-3" />
              <CardTitle className="text-foreground">Responsible Tourism</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                We're committed to sustainable practices that benefit local communities.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
