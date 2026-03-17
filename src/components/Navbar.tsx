import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About ARGUS", path: "/about" },
  { label: "Features", path: "/features" },
  { label: "Technology", path: "/technology" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-primary/20 border-t-0 border-l-0 border-r-0"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-display text-lg font-bold text-primary text-glow-cyan tracking-wider">
            ARGUS
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-display text-xs tracking-widest uppercase transition-colors duration-200 ${
                location.pathname === item.path
                  ? "text-primary text-glow-cyan"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/dashboard"
            className="font-display text-xs tracking-widest uppercase px-4 py-2 border border-primary/40 text-primary hover:bg-primary/10 transition-all duration-200 cyan-glow"
          >
            Admin Login
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-panel border-t border-primary/20 px-4 pb-4"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block py-3 font-display text-xs tracking-widest uppercase ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block py-3 font-display text-xs tracking-widest uppercase text-primary"
          >
            Admin Login
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
