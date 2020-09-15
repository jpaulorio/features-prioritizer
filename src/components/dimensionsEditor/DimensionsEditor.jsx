import React from 'react';
import './DimensionsEditor.css';

const dimensionsEditor = props => {
    const dimensions = props.dimensions;

    return (
        <div className="DimensionsEditor">
            <h2>Dimensions</h2>
            {
                dimensions.map(e => <div className="DimensionsEditorItem" key={e.index}><p>{e.name}</p><button data-dimensionindex={e.index} onClick={props.onRemoveDimension}>Remove</button></div>)
            }
        </div >
    );
};

export default dimensionsEditor;