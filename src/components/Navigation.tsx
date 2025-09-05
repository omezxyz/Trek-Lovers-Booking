import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mountain, Menu, User, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";

const LOGO_URL = "https://res.cloudinary.com/dnutxe5ni/image/upload/v1756962920/trek_lovers.logo_jxsedi.png"; // replace with your logo URL

const Navigation = () => {
  const { user, isAdmin, signOut } = useAuth();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Treks", href: "/treks" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md supports-[backdrop-filter]:bg-black/30">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="TrekLovers"
              className="h-8 w-auto select-none pointer-events-none"
            />
            <span className="text-lg md:text-xl font-bold tracking-tight text-white">
              TrekLovers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative text-sm font-medium text-white/80 hover:text-white transition-colors
                           after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2
                           after:bg-white/70 after:transition-all after:duration-200 hover:after:w-3/4"
              >
                {item.name}
              </Link>
            ))}

            {isAdmin && (
              <Link to="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-black hover:bg-white/10"
                >
                  Admin
                </Button>
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/70">{user.email}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="flex items-center gap-2 text-white hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button asChild size="sm" className="text-white hidden hover:bg-white/10">
                <Link to="/auth" className="flex items-center gap-2">
                  {/* <User className="h-4 w-4" />
                  Admin */}
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 border-l border-white/10 bg-gray-900 backdrop-blur-md text-white"
            >
              <div className="mt-2 flex items-center gap-3">
                <img src={LOGO_URL} alt="TrekLovers" className="h-7 w-auto" />
                <span className="text-base font-semibold">TrekLovers</span>
              </div>

              <div className="flex flex-col space-y-3 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="relative text-base font-medium text-white/90 hover:text-white transition-colors
                               after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0
                               after:bg-white/70 after:transition-all after:duration-200 hover:after:w-1/2"
                  >
                    {item.name}
                  </Link>
                ))}

                {isAdmin && (
                  <Link to="/admin" className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-black hover:bg-white/10"
                    >
                      Admin
                    </Button>
                  </Link>
                )}

                {user ? (
                  <div className="pt-4 space-y-2">
                    <p className="text-sm text-white/70">{user.email}</p>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-black hover:bg-white/10"
                      onClick={signOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="w-full mt-4 hidden text-white hover:bg-white/10">
                    <Link to="/auth">
                      {/* <User className="h-4 w-4 mr-2" />
                      Admin */}
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
