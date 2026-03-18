import { motion } from "framer-motion";
import { CRIME_TYPES } from "@/lib/crime-types";
import { Check } from "lucide-react";

const severityStyle = {
  critical: "border-destructive/40 bg-destructive/5",
  high: "border-orange-400/40 bg-orange-400/5",
  medium: "border-yellow-400/40 bg-yellow-400/5",
};

const severityText = {
  critical: "text-destructive",
  high: "text-orange-400",
  medium: "text-yellow-400",
};

const CrimeDetectionPanel = () => {
  return (
    <div className="space-y-4">
      <div className="glass-panel p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="font-display text-xs text-primary tracking-widest uppercase">
            AI Detection Capabilities
          </div>
          <span className="font-mono text-[10px] text-primary">
            {CRIME_TYPES.length} MODELS ACTIVE
          </span>
        </div>
        <p className="font-mono text-[10px] text-muted-foreground">
          Real-time crime detection using YOLO and CNN architectures trained on surveillance datasets.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {CRIME_TYPES.map((crime, i) => (
          <motion.div
            key={crime.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`glass-panel p-4 border ${severityStyle[crime.severity]} hover:cyan-glow transition-all duration-300`}
          >
            <div className="flex items-start justify-between mb-2">
              <crime.icon className={`w-5 h-5 ${severityText[crime.severity]}`} />
              <span className={`font-mono text-[9px] uppercase px-1.5 py-0.5 rounded-sm ${severityText[crime.severity]} bg-card/60`}>
                {crime.severity}
              </span>
            </div>
            <h4 className="font-display text-xs font-semibold text-foreground mb-1">
              {crime.label}
            </h4>
            <p className="font-mono text-[10px] text-muted-foreground leading-relaxed mb-3">
              {crime.description}
            </p>
            <div className="flex items-center gap-1 font-mono text-[9px] text-primary">
              <Check className="w-3 h-3" /> MODEL ACTIVE
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CrimeDetectionPanel;
