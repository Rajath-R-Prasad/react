import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CONFETTI_COUNT = 60;
const COLORS = [
  '#FF6B9D', '#FFD700', '#FF8C42', '#C77DFF', '#56CFE1',
  '#FF9FF3', '#FFEAA7', '#A29BFE', '#FD79A8', '#00CEC9',
];
const SHAPES = ['circle', 'rect', 'star'];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function ConfettiPiece({ index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const delay = randomBetween(0, 4);
    const duration = randomBetween(3.5, 7);
    const startX = randomBetween(0, 100);
    const endX = startX + randomBetween(-25, 25);
    const rotation = randomBetween(-360, 360);

    gsap.fromTo(
      el,
      {
        x: `${startX}vw`,
        y: '-10vh',
        rotation: 0,
        opacity: 1,
        scale: randomBetween(0.5, 1.2),
      },
      {
        x: `${endX}vw`,
        y: '110vh',
        rotation,
        opacity: 0,
        duration,
        delay,
        ease: 'power1.in',
        repeat: -1,
        repeatDelay: randomBetween(0, 3),
      }
    );

    return () => gsap.killTweensOf(el);
  }, []);

  const color = COLORS[index % COLORS.length];
  const shape = SHAPES[index % SHAPES.length];

  const size = randomBetween(8, 16);
  const style = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 5,
    pointerEvents: 'none',
    width: size,
    height: shape === 'rect' ? size / 2 : size,
    backgroundColor: shape !== 'star' ? color : 'transparent',
    borderRadius: shape === 'circle' ? '50%' : shape === 'rect' ? '2px' : 0,
    clipPath: shape === 'star'
      ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
      : 'none',
    background: shape === 'star' ? color : undefined,
  };

  return <div ref={ref} style={style} />;
}

function Confetti({ active }) {
  if (!active) return null;

  return (
    <>
      {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </>
  );
}

export default Confetti;
