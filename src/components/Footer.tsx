import { Link } from "react-router-dom";
import { Mountain, Mail, Phone, MapPin, Instagram, Github, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TrekLovers</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Discover amazing treks and create unforgettable memories with our expertly guided adventures.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/treks" className="text-muted-foreground hover:text-primary transition-colors">
                  All Treks
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h3 className="font-semibold">Follow Us</h3>
            <p className="text-muted-foreground text-sm">
              Join the community for routes, photos, and updates.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.instagram.com/trek_lovers__?igsh=MWZhc2hrZXd4c2Vocg=="
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-foreground/80 hover:text-pink-500 hover:border-pink-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/40 transition"
              >
                <Instagram className="h-5 w-5" />
              </a>
              {/* <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-foreground/80 hover:text-sky-500 hover:border-sky-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 transition"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@yourhandle"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-foreground/80 hover:text-red-500 hover:border-red-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 transition"
              >
                <Youtube className="h-5 w-5" />
              </a> */}
              {/* <a
                href="https://github.com/yourhandle"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-foreground/80 hover:text-white hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition"
              >
                <Github className="h-5 w-5" />
              </a> */}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>treklovers.spprt@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+916002056975</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Dibrugarh, Kutuha Borbil, Assam</span>
              </div>
            </div>
          </div>
        </div>
         <div className="pt-2 mt-10 text-center"> <a href={ "https://wa.me/916002056975?text=" + encodeURIComponent("Hi TrekLovers! I want to know more about upcoming treks.") } target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-foreground/90 hover:text-white hover:border-emerald-500/40 bg-white/5 hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 transition" > {/* Simple WA glyph (inline SVG) to avoid extra deps; swap with a WhatsApp icon if available */} <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-500" fill="currentColor" aria-hidden="true"> <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.14 1.6 5.95L0 24l6.2-1.6A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52ZM12 21.6c-1.86 0-3.67-.5-5.23-1.45l-.37-.23-3.68.95.98-3.58-.24-.37A9.59 9.59 0 0 1 2.4 12c0-5.3 4.3-9.6 9.6-9.6s9.6 4.3 9.6 9.6-4.3 9.6-9.6 9.6Zm5.6-7.2c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.23-.64.08-.3-.15-1.25-.46-2.38-1.46-.88-.79-1.48-1.77-1.65-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.62-.92-2.2-.24-.58-.48-.5-.67-.51l-.57-.01c-.2 0-.53.08-.8.38-.27.3-1.05 1.02-1.05 2.48 0 1.46 1.08 2.87 1.23 3.07.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.56-.35Z" /> </svg> <span>Chat on WhatsApp</span> </a> <p className="mt-1 text-xs text-muted-foreground">Fastest response during 9 AM – 6 PM IST</p> </div>
        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} TrekLovers. All rights reserved. Built with passion for adventure.
          </p>
        </div>
        <div className="mt-8"> <div className="h-px w-full bg-white/10 " /> <p className="text-xs sm:text-sm text-muted-foreground text-center"> Designed & developed by{" "} <a href="https://www.instagram.com/omesskeetit?igsh=enI3dDBmOG41dDMy" target="_blank" rel="noreferrer" className="font-semibold text-foreground/90 hover:text-primary transition-colors" aria-label="Visit Instagram profile" >Omesh Rabha</a> </p> </div>
      </div>
    </footer>
  );
};

export default Footer;
