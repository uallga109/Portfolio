import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const fullText = "https://uallga109.github.io/Portfolio/";
  const subtitle = "INITIALIZING PORTFOLIO...";
  
  // Progress bar logic
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 8 + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => onComplete(), 700);
      }
      setProgress(current);
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  // Typing effect logic
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTypingDone(true);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#000000] font-[family-name:var(--font-mono)]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full max-w-sm px-8 text-left">
        {/* Progress Bar */}
        <div className="mb-6 h-[2px] w-full bg-[#111] overflow-hidden rounded-full">
          <motion.div 
            className="h-full bg-white origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
        </div>
        
        {/* Terminal Output */}
        <div className="flex flex-col gap-2 h-16">
          <p className="text-sm text-[#a3a3a3] font-medium tracking-tight">
            <span className="text-[#525252] mr-2">~</span>
            {text}
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="inline-block w-2.5 h-4 bg-white ml-2 align-middle"
            />
          </p>
          
          <AnimatePresence>
            {isTypingDone && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-white text-xs tracking-[0.2em]"
              >
                {subtitle}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        
        {/* Percentage Counter */}
        <div className="mt-8 flex justify-between text-[#525252] text-[10px] tracking-widest font-bold">
          <span>LOADING</span>
          <span>{Math.floor(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
