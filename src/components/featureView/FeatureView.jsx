import React from 'react';
import DimensionsPane from '../dimensionsPane/DimensionsPane';

const featureView = props => {
    return (
        <div>
            <h2>{props.name}</h2>
            <DimensionsPane dimensions={props.dimensions} values={props.values} onDimensionChange={props.onDimensionChange} featureName={props.name}></DimensionsPane>
        </div>
    );
};

export default featureView;