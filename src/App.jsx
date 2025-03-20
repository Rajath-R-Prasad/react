import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)
  const addValue= ()=>{
    setCount(count+1)
  }
  const removeValue= ()=>{
    if (count>0) {
      setCount(count-1)
    }
  }
    


  return (
    <>
    <div className='bg-gray-800 p-4 border-2 flex flex-col gap-2 items-center justify-center text-zinc-200  border-white rounded-md m-4'>
      <h1 className='text-3xl font-mono'>Counter App</h1>
    <h1 className='text-2xl text-white p-3'>Counter : {count}</h1>
    <button
    className='bg-zinc-800 text-white outline-none border-2 p-1 rounded-md '
    onClick={addValue}
    >Add value</button>
    <button
    className='bg-zinc-800 text-white outline-none border-2 p-1 rounded-md'
    onClick={removeValue}
    >Remove value</button>
    </div>
    </>
    
  )
}

export default App
