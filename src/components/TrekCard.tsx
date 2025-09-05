// TrekCard.tsx
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, DollarSign } from "lucide-react";
import { Trek } from "@/types/trek";
import { format } from "date-fns";

interface TrekCardProps {
  trek: Trek;
}

const difficultyClasses = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-[color:var(--moss,#6a8f6b)]/90 text-[color:var(--sand,#f4efeb)] ring-1 ring-white/10";
    case "Moderate":
      return "bg-[color:var(--forest,#283635)]/90 text-[color:var(--sand,#f4efeb)] ring-1 ring-white/10";
    case "Difficult":
      return "bg-[color:var(--clay,#9d6556)]/95 text-[color:var(--sand,#f4efeb)] ring-1 ring-white/10";
    case "Extreme":
      return "bg-red-700/95 text-[color:var(--sand,#f4efeb)] ring-1 ring-white/10";
    default:
      return "bg-[color:var(--ink,#121e26)]/85 text-[color:var(--sand,#f4efeb)] ring-1 ring-white/10";
  }
};

const TrekCard = ({ trek }: TrekCardProps) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-white/20 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      {/* Image */}
      <img
        src={
          trek.image_url ||
          "https://images.unsplash.com/photo-1464822759844-d150ad6d1199?w=1200"
        }
        alt={trek.title}
        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,30,38,0.85)] via-[rgba(18,30,38,0.45)] to-transparent" />

      {/* Difficulty & Price */}
      <div className="absolute top-3 left-3">
        <Badge className={`${difficultyClasses(trek.difficulty)} px-3 py-1`}>
          {trek.difficulty}
        </Badge>
      </div>
      <div className="absolute top-3 right-3">
        <Badge className="bg-white text-[color:var(--ink,#121e26)] backdrop-blur-sm shadow-sm ring-1 ring-white px-3 py-1 font-semibold">
          <span>&#8377;</span>{trek.price}
        </Badge>
      </div>

      {/* Bottom Overlay Details */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
        {/* Title + Location */}
        <h3 className="text-lg sm:text-xl font-bold mb-1">{trek.title}</h3>
        <div className="flex items-center text-xs sm:text-sm opacity-90 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          {trek.location}
        </div>

        {/* Info Row */}
        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm mb-3 text-[color:var(--sand,#f4efeb)]/85">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {trek.duration} days
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {trek.max_participants}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {format(new Date(trek.start_date), "MMM dd")}
          </div>
          <div className="flex items-center">
            <span>&#8377;</span>{trek.price}
          </div>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {trek.highlights.slice(0, 2).map((highlight, index) => (
            <Badge
              key={index}
              className="bg-white/10 text-[color:var(--sand,#f4efeb)] backdrop-blur-[2px] ring-1 ring-white/15 hover:bg-white/15 transition text-[11px] sm:text-xs"
            >
              {highlight}
            </Badge>
          ))}
          {trek.highlights.length > 2 && (
            <Badge className="bg-white/10 text-[color:var(--sand,#f4efeb)] backdrop-blur-[2px] ring-1 ring-white/15 hover:bg-white/15 transition text-[11px] sm:text-xs">
              +{trek.highlights.length - 2} more
            </Badge>
          )}
        </div>

        {/* CTA Button */}
        <Link to={`/trek/${trek.id}`}>
         <Button
  className="relative w-full text-[color:var(--sand,#f4efeb)] font-bold rounded-xl border border-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] bg-inherit hover:bg-[oklch(40%_0.06_180)] focus-visible:ring-2 focus-visible:ring-[color:var(--sand,#f4efeb)]/40 overflow-hidden transition text-sm sm:text-base"
>

            <span className="relative z-10">View Details & Book</span>
            {/* Shine sweep */}
            <span className="pointer-events-none absolute inset-y-0 -left-[120%] w-[60%] bg-white/20 skew-x-45 transition-all duration-700 ease-out group-hover:left-[140%]" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TrekCard;
