import { useState, useEffect } from "react";

/**
 * Custom React hook to check network status.
 * @returns {boolean} - True if online, false otherwise.
 */
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  return isOnline;
};

/**
 * Custom React hook to test download speed.
 * @returns {number} - The download speed in Mbps.
 */
export const useDownloadSpeed = () => {
  const [downloadSpeed, setDownloadSpeed] = useState(null);

  useEffect(() => {
    const testDownloadSpeed = async () => {
      const image = new Image();
      const imageUrl = "https://via.placeholder.com/1000";
      const startTime = new Date().getTime();
      await new Promise((resolve) => {
        image.src = `${imageUrl}?cacheBuster=${startTime}`;
        image.onload = resolve;
      });
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000;
      const bitsLoaded = 1000 * 1000 * 8; // 1000x1000 image at 8 bits per pixel
      const speedBps = bitsLoaded / duration;
      const speedMbps = speedBps / (1024 * 1024);
      setDownloadSpeed(speedMbps);
    };

    testDownloadSpeed();
  }, []);

  return downloadSpeed;
};

/**
 * Custom React hook to fetch the IP address.
 * @returns {string} - The IP address.
 */
export const useIp = () => {
  const [ip, setIp] = useState(null);

  useEffect(() => {
    const fetchIpFromIpify = async () => {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setIp(data.ip);
    };

    fetchIpFromIpify();
  }, []);

  return ip;
};

/**
 * Custom React hook to fetch the IP address from RTCPeerConnection.
 * @returns {object} - The IP address and mDNS name. { ip: string, mDNSName: string }
 */
export const useRTCIp = () => {
  const [rtcIp, setRtcIp] = useState(null);
  const [mDNSName, setmDNSName] = useState(null);

  useEffect(() => {
    const fetchIpFromRTCPeerConnection = async () => {
      try {
        const pc = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });
        const localIPs = new Set();

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            const ip = event.candidate.candidate.split(" ")[4];
            if (ip && !localIPs.has(ip)) {
              localIPs.add(ip);
            }
          } else {
            pc.close();
            const ips = Array.from(localIPs);
            if (ips.length > 0) setRtcIp(ips[0]);
            if (ips.length > 1) setmDNSName(ips[1]);
          }
        };

        pc.oniceconnectionstatechange = () => {
          if (pc.iceConnectionState === "failed") {
            pc.close();
          }
        };

        pc.createDataChannel("");
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
      } catch (error) {
        console.error("WebRTC connection failed:", error);
      }
    };

    fetchIpFromRTCPeerConnection();
  }, []);

  return { ip: rtcIp, mDNSName };
};
