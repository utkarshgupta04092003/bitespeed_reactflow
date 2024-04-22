import React, { useState } from 'react'

export default function UpdateNode() {

    const [input, setInput] = useState();
    const  handleUpdate = () =>{
        
    }
  return (<div className='w-[25vw]'>
  <div className='p-2 text-center border bo rder-red-500'>
    Message
  </div>
  <hr/>
  <div className=' flex-col p-3'>
    <p className='my-3'>Text</p>
    <div className='flex-col'>
        
    <textarea name="" id="" cols="30" rows="3" className='border rounded-lg w-full p-3'
    value={input} onChange={(e)=>setInput(e.target.value)}></textarea>
    </div>
  </div>
  <hr />
</div>
  )
}
