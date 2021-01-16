import React from 'react';
import './DimensionView.css';

const dimensionsView = props => {
    const featureName = props.featureName;
    const name = props.name;
    const value = props.value;

    return (
        <div className="DimensionView">
            <label htmlFor="dimension">{name}:</label>            
            <input type="range"
                   data-featurename={featureName}
                   id={name}
                   name={name}
                   defaultValue={value}
                   onChange={props.onDimensionChange}
                   step="1"
                   min="0"
                   max="10">
            </input>
        </div>
    );
}

export default dimensionsView;