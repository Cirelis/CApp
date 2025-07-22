import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useState, useEffect, useImperativeHandle, forwardRef, useCallback, useRef } from 'react';
import { deleteEvents } from 'src/api/matomo';
import { v4 as uuid } from 'uuid';

type SessionTrackerProps = {
  matomoPath: string;
  trackId: string;
  onSessionEnd?: (time: number, id: string) => void;
  onSessionTimeUpdate?: (time: number) => void;
};

export type SessionTrackerHandle = {
  startSession: () => void;
  endSession: () => void;
};

const timerInterval = 1; // allways 1 for accuracy
const safeInterval = 5;
const deleteInterval = 20;
const inactiveLimit = 15;
const maxTime = 120;

const SessionTracker = forwardRef<SessionTrackerHandle, SessionTrackerProps>(
  ({ matomoPath, trackId, onSessionEnd, onSessionTimeUpdate }, ref) => {
    const { trackEvent } = useMatomo();
    const [sessionTime, setSessionTime] = useState(
      () => Number(localStorage.getItem(`sessionTime-${trackId}`)) || 0
    );
    const [sessionId, setSessionId] = useState(() => {
      const existingId = localStorage.getItem(`sessionId-${trackId}`);
      if (existingId && existingId !== 'null') {
        return existingId;
      }
      const newSessionId = uuid();
      localStorage.setItem(`sessionId-${trackId}`, newSessionId);
      return newSessionId;
    });
    const [lastActiveTime, setLastActiveTime] = useState(new Date());
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [wasSessionActive, setWasSessionActive] = useState(false);

    const lastLogTimeRef = useRef(Date.now()); // Track the last log time

    // End session and clear session time from storage, but keep session ID
    const endSession = useCallback(
      (time: number, id: string) => {
        setIsSessionActive(false);
        setWasSessionActive(false);
        if (id && time > 0) {
          console.log(`Session Event Saved: ID ${id} Time ${time}`);
          deleteEvents(`${id}/${matomoPath}`).then(() => {
            trackEvent({ category: `${id}/${matomoPath}`, action: 'session', value: time });
          }).then(()=>{
            onSessionEnd?.(time, id);
            localStorage.removeItem(`sessionTime-${trackId}`); // Clear session time but keep sessionId
          })
        }
      },
      [onSessionEnd, matomoPath, trackId, trackEvent]
    );

    // Start or resume a session
    const startSession = useCallback(() => {
      setIsSessionActive(true);
      setLastActiveTime(new Date());
    }, []);

    useImperativeHandle(ref, () => ({
      startSession,
      endSession: () => endSession(sessionTime, sessionId),
    }));

    useEffect(() => {
      const timer = setInterval(() => {
        if (isSessionActive) {
          const now = Date.now(); // Get the current time as a timestamp

          // Calculate updated session time accurately
          const elapsedSinceLastUpdate = (now - lastActiveTime.getTime()) / 1000; // in seconds
          const updatedSessionTime = sessionTime + elapsedSinceLastUpdate;

          setSessionTime(updatedSessionTime);
          setLastActiveTime(new Date(now)); // Update last active time to now
          localStorage.setItem(`sessionTime-${trackId}`, updatedSessionTime.toString());

          // Check if safeInterval seconds have passed since the last log time
          if (now - lastLogTimeRef.current >= safeInterval * 1000) {
            // console.log(`Session Event Saved: ID ${localStorage.getItem(`sessionId-${matomoPath}`)} Time ${updatedSessionTime}`);
            trackEvent({
              category: `${localStorage.getItem(`sessionId-${trackId}`)}/${matomoPath}`,
              action: 'session',
              value: Math.round(updatedSessionTime), 
            });
            onSessionTimeUpdate?.(updatedSessionTime);
            lastLogTimeRef.current = now;
          }
          // Check if deleteInterval seconds have passed since the last log time
          if (now - lastLogTimeRef.current >= deleteInterval * 1000) {
            // Delete Events and Track 
            deleteEvents(`${localStorage.getItem(`sessionId-${trackId}`)}/${matomoPath}`).then(() => {
              trackEvent({
                category: `${localStorage.getItem(`sessionId-${trackId}`)}/${matomoPath}`,
                action: 'session',
                value: Math.round(updatedSessionTime), 
              });
            })
          }
          if (updatedSessionTime >= maxTime) {
            endSession(updatedSessionTime, sessionId);
          }
        }
      }, timerInterval * 1000);

      const checkInactivity = () => {
        const now = new Date();
        const inactiveDuration = (now.getTime() - lastActiveTime.getTime()) / 1000;
        if (inactiveDuration > inactiveLimit && isSessionActive) {
          endSession(sessionTime, sessionId);
        }
      };

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden' && isSessionActive) {
          endSession(sessionTime, sessionId);
          setWasSessionActive(true);
        } else if (document.visibilityState === 'visible' && wasSessionActive) {
          startSession();
        }
      };

      const handleUserActivity = () => setLastActiveTime(new Date());

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('mousemove', handleUserActivity);
      window.addEventListener('keydown', handleUserActivity);
      const inactivityTimer = setInterval(checkInactivity, 5000);

      return () => {
        clearInterval(timer);
        clearInterval(inactivityTimer);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('mousemove', handleUserActivity);
        window.removeEventListener('keydown', handleUserActivity);
      };
    }, [
      isSessionActive,
      sessionTime,
      sessionId,
      lastActiveTime,
      matomoPath,
      trackId,
      trackEvent,
      endSession,
      onSessionTimeUpdate,
      startSession,
      wasSessionActive,
    ]);

    useEffect(() => {
      const handleBeforeUnload = () => {
        localStorage.removeItem(`sessionTime-${trackId}`); // Clear session time
        localStorage.removeItem(`sessionId-${trackId}`); // Clear sessionId
        endSession(sessionTime, sessionId);
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [sessionTime, sessionId, endSession, matomoPath, trackId]);

    return null;
  }
);

export default SessionTracker;
