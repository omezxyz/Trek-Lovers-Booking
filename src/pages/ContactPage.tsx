import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-[color:var(--forest,#283635)] to-[color:var(--ink,#121e26)] text-white">
          <div className="container mx-auto px-4 py-14 sm:py-16 md:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Contact Us</h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-white/90">
              Get in touch for your next adventure
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </section>

      {/* Contact grid */}
      <section className="container mx-auto px-4 py-12 sm:py-14 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            <Card className="bg-white/5 backdrop-blur border border-white/10 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Mail className="h-5 w-5 text-[color:var(--forest,#283635)]" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-2">treklovers.spprt@gmail.com</p>
                {/* <p className="text-foreground/80">bookings@trekflow.com</p> */}
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur border border-white/10 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Phone className="h-5 w-5 text-[color:var(--moss,#6a8f6b)]" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-2">+916002056975</p>
                <p className="text-foreground/80">+919395931311</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur border border-white/10 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <MapPin className="h-5 w-5 text-[color:var(--forest,#283635)]" />
                  Visit Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  Dibrugarh, Kutuha Borbil, Assam
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur border border-white/10 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Clock className="h-5 w-5 text-[color:var(--clay,#9d6556)]" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
