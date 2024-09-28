import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState("")

  const [buttonText, setButtonText] = useState('Copy');

  //useRef hook 

  const passwordRef=useRef(null)

  //useCallback hooks use to optimise the method
  const passwordGenerator=useCallback(()=>{
   let pass=""
   let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
   if(numberAllowed) str+="0123456789"
   if(charAllowed) str+="~!@#$%^&*(()|{}[]`"
      
   for (let i = 0; i <=length; i++) {
    let char =Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
    
   }
   setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])
  
 const copypasclipbord=useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,99);
  // For copy password in clipboard
  window.navigator.clipboard.writeText(password)
  
  // Change button text to 'Copied'
  setButtonText('Copied');

  // Reset the button text after a few seconds
  setTimeout(() => {
    setButtonText('Copy');
  }, 2000);

 },[password])

  //useEffect use any change in method than re-run the code
useEffect(()=>{
  passwordGenerator()
}
,[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-500 bg-gray-700 '>
   <h1 className='text-white text-center mx-3' > Password generator </h1>
   <div className='flex shadow rounded-lg overflow-hidden mb-4'>
    <input 
       type="text"
       value={password}
       className='outline-none w-full py-1 px-3'
       placeholder='Password'
       readOnly
       ref={passwordRef}
        />
   <button onClick={copypasclipbord}
    className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 hover:bg-blue-900' >  {buttonText}
    </button>


   </div>

   <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input 
       type="range" 
       min={8}
       max={50}
       value={length}
       className='cursor-pointer'
       onChange={(e)=>{setlength(e.target.value)}}
      /> 
      <label >Length:{length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input 
          type="checkbox" 
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{setNumberAllowed((prev)=> !prev)
           }}
          />
          <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
      <input 
          type="checkbox" 
          defaultChecked={charAllowed}
          id="charInput"
          onChange={()=>{setCharAllowed((prev)=> !prev)
           }}
          />
          <label htmlFor="charInput">Charector</label>
      </div>

   </div>
      
    </div>
    </>
  )
}

export default App
