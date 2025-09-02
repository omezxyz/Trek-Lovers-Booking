import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mountain, Star, Award, Users } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden mt-[-70px]">
      {/* Premium Background with Parallax Effect */}
      <div 
        className="absolute inset-0 z-0 scale-110 pointer-events-none"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-adventure/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Premium Floating Elements */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-adventure rounded-full animate-pulse opacity-60" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-nature rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-40 left-32 w-3 h-3 bg-accent rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-adventure rounded-full animate-pulse opacity-70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white ">
        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
          <Award className="h-5 w-5 text-adventure" />
          <span className="text-sm font-medium">Premium Adventure Experiences</span>
          <Star className="h-4 w-4 text-adventure fill-current" />
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
          <span className="bg-gradient-to-r from-white via-white to-adventure bg-clip-text text-transparent">
            Epic Adventures
          </span>
          <br />
          {/* <span className="bg-gradient-to-r from-adventure via-nature to-accent bg-clip-text text-transparent animate-pulse"> */}
          <span className="bg-green-100 bg-clip-text text-transparent animate-pulse">
            Await You
          </span>
        </h1>
        
        {/* <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-white/90 leading-relaxed font-light">
          Embark on extraordinary journeys to the world's most breathtaking destinations. 
          From the towering peaks of the Himalayas to the mystical trails of the Andes, 
          discover nature's most spectacular landscapes with our expert guides and premium service.
        </p> */}

        {/* Premium Stats */}
        {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <Users className="h-5 w-5 text-adventure" />
            <span className="text-sm font-medium">10,000+ Happy Adventurers</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <Mountain className="h-5 w-5 text-nature" />
            <span className="text-sm font-medium">50+ Destinations Worldwide</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <Award className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium">Award-Winning Service</span>
          </div>
        </div> */}
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/treks">
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-adventure to-accent hover:from-adventure/90 hover:to-accent/90 text-white px-12 py-6 text-lg font-semibold rounded-full border-2 border-white/20 shadow-2xl hover:shadow-adventure/50 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                Explore Treks
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
          {/* <Link to="/about">
            <Button 
              variant="outline" 
              size="lg" 
              className="group relative overflow-hidden bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-12 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link> */}
        </div>
      </div>

      {/* Premium Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
      
      {/* Subtle Animation Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-adventure/5 to-transparent animate-pulse opacity-30 z-5 pointer-events-none" />
    </div>
  );
};

export default Hero;