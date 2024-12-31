import { useState, useEffect } from "react";

export const useNetworkInfo = () => {
  const [ip, setIp] = useState(null);
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [openPorts, setOpenPorts] = useState([]);
  const [isPortOpen, setIsPortOpen] = useState(null);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    const testDownloadSpeed = async () => {
      const startTime = Date.now();
      try {
        await fetch(
          "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
        );
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        const fileSize = 272 * 92 * 4; // Approximate size in bytes
        const speed = fileSize / duration / (1024 * 1024); // Convert to Mbps
        setDownloadSpeed(speed);
      } catch (error) {
        console.error("Error testing download speed:", error);
      }
    };

    const checkPort = async (port) => {
      try {
        const ws = new WebSocket(`ws://localhost:${port}`);
        ws.onopen = () => {
          setIsPortOpen(true);
          ws.close();
        };
        ws.onerror = () => {
          setIsPortOpen(false);
        };
      } catch (error) {
        console.error(`Error checking port ${port}:`, error);
        setIsPortOpen(false);
      }
    };

    fetchIp();
    testDownloadSpeed();
    checkPort(80); // Check if port 80 is open
  }, []);

  return { ip, downloadSpeed, openPorts, isPortOpen };
};
