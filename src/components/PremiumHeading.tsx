import React, { useRef, useState, useEffect } from 'react';

export function PremiumHeading({ 
  text, 
  delayOffset = 0, 
  style, 
  className,
  highlightWord,
  highlightStyle,
  highlightClassName
}: { 
  text: string, 
  delayOffset?: number, 
  style?: React.CSSProperties, 
  className?: string,
  highlightWord?: string,
  highlightStyle?: React.CSSProperties,
  highlightClassName?: string
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let charIndex = 0;

  return (
    <div ref={ref} style={style} className={className}>
      <div className="line-wrap" style={{ overflow: 'hidden', paddingTop: '0.4em', paddingBottom: '0.4em', marginTop: '-0.4em', marginBottom: '-0.4em' }}>
        <div 
          className="line" 
          style={{ 
            transform: isVisible ? 'translateY(0)' : 'translateY(120%)',
            transition: `transform 1.0s cubic-bezier(0.22, 1, 0.36, 1) ${delayOffset}ms`,
            willChange: 'transform',
            display: 'block'
          }}
        >
          {text.split(' ').map((word, i) => {
            const isHighlight = highlightWord && word === highlightWord;
            const wordStyle = isHighlight ? { display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em', ...highlightStyle } : { display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' };
            const wordClass = isHighlight ? `word ${highlightClassName || ''}` : 'word';
            
            return (
              <span key={i} className={wordClass} style={wordStyle as React.CSSProperties}>
                {word.split('').map((char, j) => {
                  const currentIdx = charIndex++;
                  return (
                    <span 
                      key={j} 
                      className="char" 
                      style={{ 
                        display: 'inline-block',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                        transition: `transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delayOffset + (currentIdx * 15)}ms, opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delayOffset + (currentIdx * 15)}ms`,
                        willChange: 'transform, opacity'
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
