import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'



function App() {
  const [bgColor, setBgColor] = useState('black')
  const [showCakeButton, setShowCake] = useState(false)
  const [showCake, showBirthdayCake] = useState(false)
  
  const switchOnLight = () => {
    setBgColor(bgColor === 'black' ? 'linear-gradient(90deg, hsla(307, 93%, 84%, 1) 0%, hsla(256, 96%, 44%, 1) 100%)' : 'black')
    setShowCake(!showCakeButton)
  }
  const showtheCake =()=>{
    showBirthdayCake(!showCake)
  }
  const timeline = gsap.timeline()
  // Animate cake every time it appears
  useGSAP(()=>{
    if (showCakeButton) {
      timeline.fromTo(
        '.cake-button',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 3, ease: 'elastic.out(1, 0.3)' }
      )
    }
    if(showCake){
      timeline.fromTo(
        '.cake',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 3, ease: 'elastic.out(1, 0.3)' }
      )
      timeline.fromTo(
        '.wish',
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 1.5, ease: 'power2.out' }
      )
    }
  },[showCakeButton,showCake])

  return (
    <>
    <div className='flex flex-col items-center text-center justify-center h-screen w-screen bg-black' style={{ background: bgColor }}>
    <div className='flex w-[80vw] h-screen flex-col items-center justify-center  rounded-lg text-center '>
    <button className='text-white m-2 rounded-full p-2 bg-blue-700 border-2 border-purple-800' onClick={switchOnLight}>Switch on the light</button>
    {showCakeButton &&( <h1 className='cake-button text-white text-sm md:text-md font-bold '>Hurray!!! Now lets unveil your Cake😍😍</h1>)}
    { showCakeButton && (
      <button className='cake-button text-white m-2 rounded-full p-2 bg-blue-700 border-2 border-purple-800' onClick={showtheCake}> See your cake</button>
    )}
    { showCake && (
    <h1 className=' wish text-white text-xl md:text-2xl font-bold mt-4'>Wish you a happiee birthday Poorvi 🥳🥳🥳</h1>
     )}
     { showCake && (
    <h1 className=' wish text-white text-xl md:text-2xl font-bold mt-4'>May god bless you </h1>
     )}
     { showCake && (
    <h1 className=' wish text-white text-xl md:text-2xl font-bold mt-4'>Have a great year ahead😎</h1>
     )}
     { showCake && (
    <h1 className=' wish text-white text-xl md:text-2xl font-bold mt-4'>I would like to wish you from corner of my RAM storage😍😍</h1>
     )}
     { showCake && (
    <h1 className=' wish text-white text-xl md:text-2xl font-bold mt-4'>And the main thing party yavagaa??😁</h1>
     )}
     {showCake && (
      <img src="image.png" alt="birthday cake" className='cake w-[50vw] md:w-[20vw] mt-5' />
     )}
    
   

    </div>
  </div>
    </>
    
  )
}

export default App
