import React, { useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MarkerType } from 'reactflow';

import 'reactflow/dist/style.css';
import AddNode from './AddNode';
import UpdateNode from './UpdateNode';

// initial default nodes
const initialNodes = [
    { id: '1', position: { x: 100, y: 100 }, data: { label: 'Node 1', noOfActions: 2 }, sourcePosition: 'right', targetPosition: 'left' },
    { id: '2', position: { x: 300, y: 200 }, data: { label: 'Node 2' }, sourcePosition: 'right', targetPosition: 'left' },
];
// initial edges for the connected nodes
const initialEdges = [{ id: '1-2', source: '1', target: '2' }];


export default function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [isError, setIsError] = useState(false);
    const [selected, setSelected] = useState();

    
    // check for the condtion that any node cannot have more than 1 source edges when connecting two nodes
    const onConnect = (params) => {
        console.log('params', params)
        if (params.source) {
            const isTargetAlreadyConnected = edges.some((edge) => edge.source === params.source);
            if (isTargetAlreadyConnected) return;
        }
        console.log(edges);
        setEdges((edges) => addEdge(params, edges));
      
    };

    // edge style and arrow 
    const edgeOptions = {
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 10,
            height: 10,
        },
        style: {
            strokeWidth: 2,
        },
    };

    // add new node to the flow
    const handleAddNode = (currNode) => {
        setNodes(prevNodes => [...prevNodes, currNode]);
    }

    // Function to find unique values of the "target" key
    const findUniqueTargets = () => {
        const uniqueTargets = new Set();
        edges.forEach(item => {
            uniqueTargets.add(item.target);
        });
        return [...uniqueTargets];
    };

    // check the given condition in the docs for the save error
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

    // on clicking set the current node to selected
    const onNodeClick = (event, node) => setSelected(node);

    // update the content of any node
    const handleUpdate = (content) => {
        console.log('handle update content', content);

        const updated = nodes.map((node) => {
            if (node.id === selected?.id) {
                node.data.label = content;
                console.log(selected.id)
            }
            return node;
        })
        setNodes(updated);
    }

    return (
        <div className='h-[90vh] flex  justify-betweenm-2'>
            <div className=' w-[75vw]'>

                <div className={`flex justify-center h-16`}>
                    <p className={` ${isError ? 'flex' : "hidden"}   p-2 rounded-lg bg-red-300 font-bold my-2 cursor-pointer`}>Cannot save flow</p>
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
                    onNodeClick={onNodeClick}
                />

            </div>
            {/* right side section for add and update node data */}
            <div>
                <div className="flex justify-center" onClick={handleSaveChanges}>
                    <span className='border border-blue-500 p-2 rounded-lg text-blue-500 font-bold my-3 cursor-pointer'>Save Changes</span>
                </div>
                <AddNode handleAddNode={handleAddNode} />
                <UpdateNode selected={selected} handleUpdate={handleUpdate} />
            </div>
        </div>
    );
}