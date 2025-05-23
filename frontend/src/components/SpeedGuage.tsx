import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

type SpeedGaugeProps = {
  speed: number;
};

const SpeedGauge: React.FC<SpeedGaugeProps> = ({ speed }) => {
  return (
    <ReactSpeedometer
      value={speed}
      needleTransitionDuration={2000}
      minValue={0}
      maxValue={120}
      segments={10}
      needleColor="steelblue"
      startColor="green"
      endColor="red"
      currentValueText="Speed: ${value} km/h"
      ringWidth={20}
      height={200}
      valueTextFontSize="22px"
    />
  );
};

export default SpeedGauge;
