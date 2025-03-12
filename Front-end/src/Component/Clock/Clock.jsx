import React from "react";
import AnalogClock from "analog-clock-react";

const Clock = () => {
  const options = {
    useCustomTime: false,
    width: "90px",
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#31333a",
    centerColor: "#31333a",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "#c8ae76",
      minute: "#ffffff",
      hour: "#ffffff",
    },
  };

  return <AnalogClock {...options} />;
};

export default Clock;
