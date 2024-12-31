import React from "react";
import { useNetworkInfo } from "./useNetworkInfo";

const NetworkInfo = () => {
  const { ip, downloadSpeed, openPorts, isPortOpen } = useNetworkInfo();

  return (
    <div>
      <h3>Network Information</h3>
      <p>IP Address: {ip}</p>
      <p>
        Download Speed:{" "}
        {downloadSpeed ? `${downloadSpeed.toFixed(2)} Mbps` : "Calculating..."}
      </p>
      <p>Open Ports: {openPorts.join(", ")}</p>
      <p>
        Is Port 80 Open:{" "}
        {isPortOpen === null ? "Checking..." : isPortOpen ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default NetworkInfo;
