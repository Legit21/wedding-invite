"use client";

import { useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { wedding, weddingEvents } from "../config/wedding";
import WeddingCountdown from "./WeddingCountdown";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerReducedMotionSnapshot() {
  return false;
}

export default function OpeningReveal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
  const transitionDuration = prefersReducedMotion ? 0 : 0.7;

  return (
    <main
      className={`invitation${isOpen ? " is-open" : ""}${
        hasEntered ? " is-entered" : ""
      }`}
    >
      <div className="ambient-glow" aria-hidden="true" />

      {hasEntered ? (
        <motion.section
          className="invitation-cover"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: transitionDuration, ease: "easeInOut" }}
          aria-labelledby="invitation-title"
          aria-live="polite"
        >
          <div className="invitation-card">
            <motion.div
              className="ornament"
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: transitionDuration, delay: 0.15 }}
              aria-hidden="true"
            >
              ✦
            </motion.div>

            <p className="eyebrow">{wedding.invitationLine}</p>
            <p className="cover-kicker">THE WEDDING CELEBRATION OF</p>
            <h1 id="invitation-title" className="couple-names">
              <span>{wedding.groomName}</span>
              <span className="ampersand">&</span>
              <span>{wedding.brideName}</span>
            </h1>
            <div className="cover-divider" aria-hidden="true">
              <span />
              <span className="divider-star">✦</span>
              <span />
            </div>
            <p className="wedding-date">{wedding.displayDate}</p>
            <p className="invitation-message">{wedding.openingMessage}</p>
          </div>

          <button
            className="replay-button"
            onClick={() => {
              setHasEntered(false);
              setIsOpen(false);
            }}
          >
            Replay opening
          </button>
        </motion.section>
      ) : (
        <motion.section
          className="invitation-content"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: transitionDuration, ease: "easeInOut" }}
          aria-hidden={!isOpen}
        >
          <motion.div
            className="ornament"
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.2 }}
            aria-hidden="true"
          >
            ✦
          </motion.div>

          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
          >
            {wedding.invitationLine}
          </motion.p>

          <motion.h1
            className="couple-names"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 1,
              delay: isOpen && !prefersReducedMotion ? 0.6 : 0,
            }}
          >
            <span>{wedding.groomName}</span>
            <span className="ampersand">&</span>
            <span>{wedding.brideName}</span>
          </motion.h1>

          <motion.p
            className="wedding-date"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 1,
              delay: isOpen && !prefersReducedMotion ? 1 : 0,
            }}
          >
            {wedding.displayDate}
          </motion.p>

          <motion.p
            className="invitation-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 1,
              delay: isOpen && !prefersReducedMotion ? 1.2 : 0,
            }}
          >
            {wedding.openingMessage}
          </motion.p>
        </motion.section>
      )}

      {hasEntered && (
        <motion.section
          className="couple-introduction"
          aria-labelledby="couple-introduction-title"
          initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: transitionDuration, ease: "easeOut" }}
        >
          <div className="introduction-content">
            <p className="introduction-kicker">A NOTE FROM THE COUPLE</p>
            <h2 id="couple-introduction-title">
              {wedding.introductionHeading}
            </h2>
            <p className="introduction-message">
              {wedding.introductionMessage}
            </p>

            <div className="couple-portraits">
              <article className="couple-card">
                <p className="couple-role">THE GROOM</p>
                <h3>{wedding.groomName}</h3>
              </article>

              <span className="couple-connector" aria-hidden="true">
                &
              </span>

              <article className="couple-card">
                <p className="couple-role">THE BRIDE</p>
                <h3>{wedding.brideName}</h3>
              </article>
            </div>

            <div className="introduction-date">
              <span className="date-line" aria-hidden="true" />
              <p>
                <span className="date-label">SAVE THE DATE</span>
                <span>{wedding.displayDate}</span>
              </p>
              <span className="date-line" aria-hidden="true" />
            </div>
          </div>
        </motion.section>
      )}

      {hasEntered && (
        <motion.section
          className="wedding-events"
          aria-labelledby="wedding-events-title"
          initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: transitionDuration, ease: "easeOut" }}
        >
          <div className="events-content">
            <p className="introduction-kicker">THE CELEBRATION</p>
            <h2 id="wedding-events-title">Wedding Events</h2>

            {weddingEvents.length > 0 ? (
              <div className="event-grid">
                {weddingEvents.map((event) => (
                  <article className="event-card" key={event.id}>
                    <div className="event-ornament" aria-hidden="true">
                      ✦
                    </div>
                    <h3>{event.name}</h3>
                    <dl className="event-details">
                      <div>
                        <dt>Date</dt>
                        <dd>{event.date}</dd>
                      </div>
                      <div>
                        <dt>Time</dt>
                        <dd>{event.time}</dd>
                      </div>
                      <div>
                        <dt>Venue</dt>
                        <dd>{event.venue}</dd>
                      </div>
                    </dl>
                    {event.description && (
                      <p className="event-description">{event.description}</p>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <p className="events-pending">
                Wedding event details will be shared soon.
              </p>
            )}
          </div>
        </motion.section>
      )}

      {hasEntered && (
        <WeddingCountdown
          targetDateTime={wedding.weddingDateTime}
          targetLabel={`${wedding.displayDate} · ${wedding.displayTime}`}
        />
      )}

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

      {isOpen && !hasEntered && (
        <motion.button
          className="enter-invitation"
          onClick={() => setHasEntered(true)}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: transitionDuration,
            delay: prefersReducedMotion ? 0 : 1.2,
          }}
          aria-label="Enter the wedding invitation"
        >
          Enter Invitation
          <span className="button-arrow" aria-hidden="true">
            ↗
          </span>
        </motion.button>
      )}

      {isOpen && !hasEntered && (
        <button
          className="replay-button"
          onClick={() => {
            setHasEntered(false);
            setIsOpen(false);
          }}
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