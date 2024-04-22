import React, { useState } from 'react'
import { nanoid } from 'nanoid'


export default function AddNode({handleAddNoe}) {

    const [input, setInput] = useState('')

    const handleAdd = () =>{

      if(!input){
        alert('Write something');
        return;
      }

        const node =   { id: nanoid(), position: { x: Math.random()*500, y: Math.random()*500 }, data: { label: input, noOfActions:2 }, sourcePosition: 'right', targetPosition: 'left' }
        handleAddNoe(node);

    }
  return (
    <div className='w-[25vw]'>
      <div className='p-2 text-center border bo rder-red-500'>
        Add Node
      </div>
      <hr/>
      <div className=' flex-col p-3'>
        <p className='my-3'>Text</p>
        <div className='flex-col'>
            
        <textarea name="" id="" cols="30" rows="3" className='border rounded-lg w-full p-3'
        value={input} onChange={(e)=>setInput(e.target.value)}></textarea>
        <button onClick={handleAdd} className='border bg-gray-400 text-white px-3 rounded-md'>Add</button>
        </div>
      </div>
      <hr />
    </div>
  )
}
