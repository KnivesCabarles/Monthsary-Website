import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed = 28, start = true) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    setOutput("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);

  return { output, done };
}
