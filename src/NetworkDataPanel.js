import React from "react";
import {
  useNetworkStatus,
  useDownloadSpeed,
  useIp,
  useRTCIp,
} from "./useNetworkData";

export const NetworkDataPanel = () => {
  const isOnline = useNetworkStatus();
  const ip = useIp();
  const downloadSpeed = useDownloadSpeed();
  const { ip: rtcIp, mDNSName } = useRTCIp();

  return (
    <div>
      <h4>Network Information</h4>
      <p>IP Address: {ip}</p>
      <p>
        Download Speed:{" "}
        {downloadSpeed ? `${downloadSpeed.toFixed(2)} Mbps` : "Calculating..."}
      </p>
      <p>RTCIp: {rtcIp}</p>
      <p>mDNSName: {mDNSName}</p>
      <p>Is Online: {isOnline.toString()}</p>
    </div>
  );
};
