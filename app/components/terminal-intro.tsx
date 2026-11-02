import { useEffect, useRef, useState } from "react";

interface TerminalIntroProps {
  onComplete: () => void;
}

const introDuration = 2_500;
const exitAt = 2_150;
const command = "npm run portfolio:init";

export function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const [elapsed, setElapsed] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const startedAt = Date.now();

    intervalRef.current = setInterval(() => {
      const nextElapsed = Math.min(Date.now() - startedAt, introDuration);
      setElapsed(nextElapsed);

      if (nextElapsed >= exitAt) {
        setIsExiting(true);
      }

      if (nextElapsed >= introDuration) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsComplete(true);
        onComplete();
      }
    }, 40);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [onComplete]);

  function skipIntro() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsComplete(true);
    onComplete();
  }

  if (isComplete) {
    return null;
  }

  const typedCharacters = Math.min(
    command.length,
    Math.floor(elapsed / 38),
  );
  const progress = Math.min((elapsed / introDuration) * 100, 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`terminal-intro ${isExiting ? "terminal-intro--exit" : ""}`}
      aria-label="Intro terminal portfolio"
    >
      <div className="terminal-window" aria-hidden="true">
        <div className="terminal-window__bar">
          <div className="terminal-window__lights">
            <span />
            <span />
            <span />
          </div>
          <p>fikri@portfolio — zsh</p>
          <span className="terminal-window__badge">SESSION 001</span>
        </div>

        <div className="terminal-window__body">
          <p className="terminal-window__label">INITIALIZING PORTFOLIO</p>
          <p className="terminal-window__command">
            <span className="terminal-window__prompt">fikri@portfolio:~$</span>
            {" "}
            {command.slice(0, typedCharacters)}
            <span className="terminal-cursor" />
          </p>

          <div className="terminal-window__output">
            {elapsed >= 1_000 && (
              <p>
                <span>✓</span> Compiling interface
              </p>
            )}
            {elapsed >= 1_350 && (
              <p>
                <span>✓</span> Preparing components
              </p>
            )}
            {elapsed >= 1_700 && (
              <p>
                <span>✓</span> Portfolio ready
              </p>
            )}
          </div>

          <div className="terminal-window__progress">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p className="terminal-window__footer">
            <span>BUILDING A BETTER WEB</span>
            <span>{Math.round(progress).toString().padStart(3, "0")}%</span>
          </p>
        </div>
      </div>

      <div className="sr-only">
        <p role="status" aria-live="polite" aria-atomic="true">
          {elapsed >= 1_700
            ? "Portfolio siap."
            : "Memuat animasi pembuka portfolio."}
        </p>
        <div
          role="progressbar"
          aria-label="Progres animasi pembuka"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        />
      </div>
      <button
        type="button"
        autoFocus
        onClick={skipIntro}
        className="terminal-intro__skip"
      >
        Lewati intro <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
