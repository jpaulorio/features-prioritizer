import React from 'react';
import DimensionsView from '../dimensionView/DimensionView';

const dimensionsPane = props => {
    const featureName = props.featureName;
    return (
        <div>
            {
                props.dimensions.map(e => <DimensionsView key={e.index} index={e.index} name={e.name} value={props.values[e.index]} onDimensionChange={props.onDimensionChange} featureName={featureName}></DimensionsView>)
            }
        </div>
    );
}

export default dimensionsPane;