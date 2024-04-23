import React, { useEffect, useState } from 'react'
import message from '../assets/msg.svg';
export default function UpdateNode({ selected, handleUpdate }) {

    console.log('selected', selected)
    const [input, setInput] = useState();
    useEffect(() => {
        setInput(selected?.data.label)
    }, [selected]);
    const handleChange = (e) => {
        handleUpdate(e.target.value);
        setInput(e.target.value);

    }

    // if(!selected){
    //     return (
    //         <div className="border border-blue-600 inline-block p-10 py-4 ml-3 mt-3 rounded-md text-blue-600">
    //             <div className='flex justify-center'>
    //             <img src={message} alt="" className='w-8 h-8' />
    //             </div>
    //             <p>Message</p>
    //         </div>
    //     )
    // }
    return selected &&  (
        <div className='w-[25vw]'>
            <div className='p-2 text-center border bo rder-red-500'>
                Message
            </div>
            <hr />
            <div className=' flex-col p-3'>
                <p className='my-3'>Text</p>
                <div className='flex-col'>

                    <input name="" id="" cols="30" rows="3" className='border rounded-lg w-full p-3'
                        value={input} onChange={handleChange} disabled={!selected} 
                        placeholder='select any node first'/>
                </div>
            </div>
            <hr />
        </div>
    )
}
