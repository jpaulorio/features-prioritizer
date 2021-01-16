import React from 'react';
import './DimensionsEditor.css';
import DimensionsEditorItem from '../dimensionsEditorItem/DimensionsEditorItem';

const dimensionsEditor = props => {
    const dimensions = props.dimensions;

    return (
        <div className="DimensionsEditor mb-3">
            <h2>Dimensions</h2>
            {
                dimensions.map(e => (
                <DimensionsEditorItem
                key={e.index}
                                                                           index={e.index}
                                                                           name={e.name}
                                                                           onDimensionChange={props.onDimensionChange}/>))
            }
        </div >
    );
};

export default dimensionsEditor;