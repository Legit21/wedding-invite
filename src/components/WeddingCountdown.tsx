"use client";

import { useEffect, useState } from "react";

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type WeddingCountdownProps = {
  targetDateTime: string;
  targetLabel: string;
};

function getTargetTimestamp(dateTime: string) {
  if (!/(?:Z|[+-]\d{2}:\d{2})$/.test(dateTime)) {
    throw new Error("The countdown target must include a timezone offset.");
  }

  const timestamp = Date.parse(dateTime);

  if (!Number.isFinite(timestamp)) {
    throw new Error("The countdown target must be a valid ISO date and time.");
  }

  return timestamp;
}

export default function WeddingCountdown({
  targetDateTime,
  targetLabel,
}: WeddingCountdownProps) {
  const targetTimestamp = getTargetTimestamp(targetDateTime);
  const [remaining, setRemaining] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const totalSeconds = Math.max(
        0,
        Math.floor((targetTimestamp - Date.now()) / 1000),
      );
      const days = Math.floor(totalSeconds / 86400);

      setRemaining({
        days,
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });

      if (totalSeconds === 0) {
        window.clearInterval(intervalId);
      }
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [targetTimestamp]);

  const units = [
    { label: "Days", value: remaining?.days },
    { label: "Hours", value: remaining?.hours },
    { label: "Minutes", value: remaining?.minutes },
    { label: "Seconds", value: remaining?.seconds },
  ];

  const hasArrived =
    remaining !== null &&
    remaining.days === 0 &&
    remaining.hours === 0 &&
    remaining.minutes === 0 &&
    remaining.seconds === 0;

  return (
    <section
      className="wedding-countdown"
      aria-labelledby="wedding-countdown-title"
    >
      <div className="countdown-content">
        <p className="introduction-kicker">THE DAYS ARE DRAWING NEAR</p>
        <h2 id="wedding-countdown-title">Counting Down to the Wedding</h2>
        <p className="countdown-target">{targetLabel}</p>

        <div className="countdown-grid">
          {units.map(({ label, value }) => (
            <div className="countdown-unit" key={label}>
              <span className="countdown-value">
                {value === undefined ? "--" : String(value).padStart(2, "0")}
              </span>
              <span className="countdown-label">{label}</span>
            </div>
          ))}
        </div>

        <p className="countdown-note" aria-live="polite">
          {hasArrived
            ? "The celebration date has arrived."
            : "Until we celebrate together"}
        </p>
      </div>
    </section>
  );
}
