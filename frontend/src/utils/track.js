export const trackEvent = (event) => {
     console.log("TRACK FUNCTION CALLED");
  const existing = JSON.parse(localStorage.getItem("interactions")) || [];

  const newEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  };

  const updated = [...existing, newEvent];

  localStorage.setItem("interactions", JSON.stringify(updated));
    console.log("Saved:", updated);
};