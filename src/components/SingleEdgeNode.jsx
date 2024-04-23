import React from 'react';
import { Handle } from 'react-flow-renderer';

const SingleEdgeNode = ({ data }) => {
    return (
        <div style={{ background: 'teal', padding: 10 }}>
            <Handle
                type="source"
                position="right"
                id="a"
                style={{ borderRadius: '50%', background: 'white', border: '1px solid teal' }}
            />
            <div>
                <strong>Single Edge Node</strong>
            </div>
            <Handle
                type="target"
                position="left"
                id="b"
                style={{ borderRadius: '50%', background: 'white', border: '1px solid teal' }}
                isValidConnection={(connection) => {
                    return connection.source === data.id && data.source === null;
                }}
            />
        </div>
    );
};

export default SingleEdgeNode;
