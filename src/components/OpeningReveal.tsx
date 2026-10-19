"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { wedding } from "../config/wedding";


export default function OpeningReveal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className={`invitation ${isOpen ? "is-open" : ""}`}>
      <div className="ambient-glow" aria-hidden="true" />

      <section className="invitation-content">
        <motion.div
          className="ornament"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          aria-hidden="true"
        >
          ✦
        </motion.div>

        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {wedding.invitationLine}
        </motion.p>

        <motion.h1
          className="couple-names"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
          transition={{ duration: 1, delay: isOpen ? 0.6 : 0 }}
        >
          <span>{wedding.groomName}</span>
          <span className="ampersand">&</span>
          <span>{wedding.brideName}</span>
        </motion.h1>

        <motion.p
          className="wedding-date"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {wedding.displayDate}
        </motion.p>

        <motion.p
          className="invitation-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {wedding.openingMessage}
        </motion.p>
      </section>

      <div
        className="door-scene"
        aria-hidden="true"
      >
        <div className="door door-left">
          <div className="door-frame">
            <div className="door-emblem">✦</div>
            <div className="door-detail" />
            <div className="door-handle" />
          </div>
        </div>

        <div className="door door-right">
          <div className="door-frame">
            <div className="door-emblem">✦</div>
            <div className="door-detail" />
            <div className="door-handle" />
          </div>
        </div>
      </div>

      {!isOpen && (
        <button
          className="open-invitation"
          onClick={() => setIsOpen(true)}
          aria-label="Open wedding invitation"
        >
          <span className="button-star">✦</span>
          Open Invitation
          <span className="button-arrow">↗</span>
        </button>
      )}

      {isOpen && (
        <button
          className="replay-button"
          onClick={() => setIsOpen(false)}
        >
          Replay opening
        </button>
      )}

      <p className="bottom-caption">
        MADE WITH LOVE
      </p>
    </main>
  );
}