import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import LightRays from './LightRays'
import Confetti from './Confetti'

// Floating balloon component
function Balloon({ color, left, delay, duration }) {
  return (
    <div
      className="balloon"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        '--balloon-color': color,
      }}
    >
      <div className="balloon-body" style={{ background: color }} />
      <div className="balloon-knot" style={{ borderTopColor: color }} />
      <div className="balloon-string" />
    </div>
  )
}

// Floating sparkle
function Sparkle({ style }) {
  return <div className="sparkle" style={style}>✦</div>
}

const BALLOONS = [
  { color: '#FF6B9D', left: 8, delay: 0, duration: 8 },
  { color: '#C77DFF', left: 16, delay: 1.5, duration: 10 },
  { color: '#FFD700', left: 85, delay: 0.5, duration: 9 },
  { color: '#56CFE1', left: 92, delay: 2, duration: 7 },
  { color: '#FF8C42', left: 50, delay: 3, duration: 11 },
]

const SPARKLES = [
  { top: '15%', left: '10%', animationDelay: '0s', fontSize: '1rem' },
  { top: '25%', left: '88%', animationDelay: '0.8s', fontSize: '1.4rem' },
  { top: '60%', left: '5%', animationDelay: '1.2s', fontSize: '0.8rem' },
  { top: '70%', left: '93%', animationDelay: '0.4s', fontSize: '1.2rem' },
  { top: '45%', left: '50%', animationDelay: '2s', fontSize: '0.7rem', opacity: 0.5 },
]

const WISHES = [
  { text: ' Happy Birthday Shreyaa!!! ', cls: 'wish wish-main' },
  { text: 'May God bless you ✨', cls: 'wish wish-sub' },
  { text: 'Have an absolutely great year ahead 😎🔥', cls: 'wish wish-sub' },
  { text: 'Sending this wish from the corner of my RAM storage 😍💾', cls: 'wish wish-sub' },
  // { text: 'Andd ning wish madod mariyak agatta 🤷🏻‍♂️😂', cls: 'wish wish-sub wish-kannada' },
]

function App() {
  const [showCakeButton, setShowCakeButton] = useState(false)
  const [showCake, setShowCake] = useState(false)
  const [lightOn, setLightOn] = useState(false)
  const containerRef = useRef(null)

  const switchOnLight = () => {
    if (lightOn) {
      setLightOn(false)
      setShowCakeButton(false)
      setShowCake(false)
    } else {
      setLightOn(true)
      setTimeout(() => setShowCakeButton(true), 600)
    }
  }

  const revealCake = () => {
    setShowCake(true)
  }

  // Animate light turning on
  useGSAP(() => {
    if (lightOn) {
      // Flash / reveal the background
      gsap.fromTo('.birthday-root',
        { backgroundColor: '#000000' },
        { backgroundColor: 'transparent', duration: 1.2, ease: 'power2.out' }
      )
      // Title slides up and fades in
      gsap.fromTo('.page-title',
        { y: 40, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 1.0, ease: 'back.out(1.7)', delay: 0.3 }
      )
      // Birthday name pops in after title
      gsap.fromTo('.birthday-name',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.9 }
      )
    } else {
      // Reset on turn off
      gsap.set('.page-title', { opacity: 0 })
      gsap.set('.birthday-name', { opacity: 0 })
    }
  }, [lightOn])

  // Animate cake button appearance
  useGSAP(() => {
    if (showCakeButton && !showCake) {
      gsap.fromTo('.cake-reveal-btn', 
        { scale: 0, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.4)', delay: 0.2 }
      )
      gsap.fromTo('.cake-hint',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 }
      )
    }
  }, [showCakeButton, showCake])

  // Animate cake + wishes
  useGSAP(() => {
    if (showCake) {
      // Cake bounce in first
      gsap.fromTo('.birthday-cake-img',
        { scale: 0, opacity: 0, rotation: -10 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)', delay: 0.1 }
      )
      // Cake gentle float after bounce
      gsap.to('.birthday-cake-img', {
        y: -10,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.4,
      })
      // Wishes stagger in (quicker)
      gsap.fromTo('.wish',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.35, ease: 'power3.out', delay: 0.5 }
      )
    }
  }, [showCake])

  return (
    <div
      ref={containerRef}
      className={`birthday-root ${lightOn ? 'light-on' : ''}`}
    >
      {/* Background gradient orbs — only visible when light is on */}
      {lightOn && (
        <>
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
          <div className="bg-orb bg-orb-3" />
        </>
      )}

      {/* Sparkles — only visible when light is on */}
      {lightOn && SPARKLES.map((s, i) => <Sparkle key={i} style={s} />)}

      {/* Balloons */}
      {lightOn && BALLOONS.map((b, i) => <Balloon key={i} {...b} />)}

      {/* Confetti on cake reveal */}
      <Confetti active={showCake} />

      {/* Light Rays */}
      {lightOn && (
        <div className="light-rays-container">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ff9ff3"
            raysSpeed={0.8}
            lightSpread={2.0}
            rayLength={12}
            followMouse={false}
            mouseInfluence={0}
            noiseAmount={0.1}
            distortion={0}
            pulsating={true}
            fadeDistance={8}
            saturation={3}
          />
        </div>
      )}

      {/* Main content */}
      <div className="main-content">

        {/* Switch button — always visible first */}
        <button
          className={`light-btn ${lightOn ? 'light-btn-on' : 'light-btn-off'}`}
          onClick={switchOnLight}
        >
          {lightOn ? (
            <><span className="btn-icon"></span> Turn off</>
          ) : (
            <><span className="btn-icon"></span> Turn the lights on!</>
          )}
        </button>

        {/* Title — appears below button after lights on */}
        {lightOn && (
          <h1 className="page-title" style={{ opacity: 0 }}>
            <span className="title-line-1">Happy</span>
            <span className="title-line-2">Birthday!</span>
          </h1>
        )}

        {/* Birthday person name */}
        {lightOn && (
          <p className="birthday-name" style={{ opacity: 0 }}>🎀 Shreya 🎀</p>
        )}

        {/* Cake button stage */}
        {showCakeButton && !showCake && (
          <div className="cake-stage">
            <button className="cake-reveal-btn" onClick={revealCake}>
              <span className="btn-icon"></span> Reveal your Cake!
            </button>
          </div>
        )}

        {/* Cake & wishes */}
        {showCake && (
          <div className="cake-section">
            {/* Cake image — shown first so it's always visible */}
            <div className="cake-wrapper">
              <div className="cake-glow" />
              <img
                src="image.png"
                alt="Birthday cake"
                className="birthday-cake-img"
              />
            </div>

            {/* Wishes below the cake */}
            <div className="wishes-container">
              {WISHES.map((w, i) => (
                <p key={i} className={w.cls}>{w.text}</p>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default App
