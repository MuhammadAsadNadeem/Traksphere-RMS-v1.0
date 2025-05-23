import React from "react";
import BatteryGauge from "react-battery-gauge";

interface BatteryGaugeProps {
  value: number;
  size?: number;
  orientation?: "vertical" | "horizontal";
  label?: string;
}

const BatteryState: React.FC<BatteryGaugeProps> = ({
  value,
  size = 150,
  orientation = "vertical",
  label,
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <BatteryGauge value={value} size={size} orientation={orientation} />
      {label && (
        <div style={{ marginTop: "0.5rem", fontWeight: "bold" }}>{label}</div>
      )}
    </div>
  );
};

export default BatteryState;
