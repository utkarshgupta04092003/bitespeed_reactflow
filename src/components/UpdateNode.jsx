import React, { useEffect, useState } from 'react'
export default function UpdateNode({ selected, handleUpdate }) {

    const [input, setInput] = useState();

    // set the data into input box recieved from the selected nodes 
    useEffect(() => {
        setInput(selected?.data.label)
    }, [selected]);

    // call the update function 
    const handleChange = (e) => {
        handleUpdate(e.target.value);
        setInput(e.target.value);

    }

    // display the edit node option only when any node is selected
    return selected && (
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
                        placeholder='select any node first' />
                </div>
            </div>
            <hr />
        </div>
    )
}
