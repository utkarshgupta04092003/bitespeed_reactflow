import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import message from '../assets/msg.svg';
import { Draggable } from 'drag-react';

export default function AddNode({ handleAddNode }) {

  // call the callback function to add newnode to the array of nodes
  const handleAdd = (e) => {
    const node = { id: nanoid(), position: { x: e.x, y: e.y }, data: { label: '', noOfActions: 2 }, sourcePosition: 'right', targetPosition: 'left' }
    handleAddNode(node);

  }
  // Draggable message box
  return (


    <Draggable
      defaultPosition={{ x: 0, y: 100 }}
      onDragEnd={handleAdd}
    >
      <div className="border border-blue-600 inline-block p-1 ml-3 mt-3 rounded-md text-blue-600">
        <div className='flex justify-center'>
          <img src={message} alt="" className='w-4 h-4' />
        </div>
        <p>Message</p>
      </div>
    </Draggable>
  )
}
