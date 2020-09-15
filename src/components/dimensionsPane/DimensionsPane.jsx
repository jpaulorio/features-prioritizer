import React from 'react';
import DimensionsView from '../dimensionView/DimensionView';

const dimensionsPane = props => {
    const featureName = props.featureName;
    const dimensions = props.values;
    return (
        <div>
            {
                props.dimensions.map(e => <DimensionsView key={e.index} index={e.index} name={e.name} value={dimensions.filter(x => x.dimension === e.name)[0].value} onDimensionChange={props.onDimensionChange} featureName={featureName}></DimensionsView>)
            }
        </div>
    );
}

export default dimensionsPane;