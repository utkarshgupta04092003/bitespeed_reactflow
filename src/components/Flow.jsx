import React, { useCallback, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';

import 'reactflow/dist/style.css';
import AddNode from './AddNode';
import UpdateNode from './UpdateNode';

const initialNodes = [
    { id: '1', position: { x: 100, y: 100 }, data: { label: 'Node 1', noOfActions: 2 }, sourcePosition: 'right', targetPosition: 'left' },
    { id: '2', position: { x: 300, y: 200 }, data: { label: 'Node 2' }, sourcePosition: 'right', targetPosition: 'left' },
];
const initialEdges = [{ id: '1-2', source: '1', target: '2' }];

export default function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [isError, setIsError] = useState(false);
    const [selected, setSelected] = useState();

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    const edgeOptions = {
        animated: true,
        style: {
            stroke: 'white',
        },
    };

    const handleAddNoe = (currNode) => {
        const modifiedNodes = [...nodes, currNode];
        setNodes(modifiedNodes);
    }

    // Function to find unique values of the "target" key
    const findUniqueTargets = () => {
        const uniqueTargets = new Set();
        edges.forEach(item => {
            uniqueTargets.add(item.target);
        });
        return [...uniqueTargets];
    };

    const handleSaveChanges = () => {
        const targets = findUniqueTargets();
        console.log('unique target', targets);
        if (nodes.length > 1 && targets.length < nodes.length - 1) {
            console.log('error');
            setIsError(true);
            setTimeout(() => {
                setIsError(false);
            }, 2000);
        }
    }

    return (
        <div className='h-[90vh] border border-red-500 flex  justify-betweenm-2'>
            <div className='border border-red-500 w-[75vw]'>

                <div className={`flex justify-center h-16`}>
                    <p className={` ${isError ? 'flex' : "hidden"}  border border-green-400 p-2 rounded-lg bg-red-300 font-bold my-2 cursor-pointer`}>Cannot save flow</p>
                </div>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    style={{ backgroundColor: 'lightgrey' }}
                    defaultEdgeOptions={edgeOptions}
                    connectionLineStyle={{ stroke: 'white' }}
                />

            </div>
            <div>

                <div className="flex justify-center" onClick={handleSaveChanges}>
                    <span className='border border-blue-500 p-2 rounded-lg text-blue-500 font-bold my-3 cursor-pointer'>Save Changes</span>
                </div>

                <AddNode handleAddNoe={handleAddNoe} />

                <UpdateNode selected={selected}/>
            </div>
        </div>
    );
}