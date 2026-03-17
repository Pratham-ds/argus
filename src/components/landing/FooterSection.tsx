import { Shield } from "lucide-react";

const FooterSection = () => (
  <footer className="border-t border-primary/10 py-8">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-primary" />
        <span className="font-display text-xs text-primary tracking-wider">ARGUS</span>
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        © 2026 ARGUS Autonomous Systems. Authorized use only.
      </p>
    </div>
  </footer>
);

export default FooterSection;
