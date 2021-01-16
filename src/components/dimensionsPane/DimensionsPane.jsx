import React from 'react';
import DimensionsView from '../dimensionView/DimensionView';

const dimensionsPane = props => {
    const featureName = props.featureName;
    const dimensions = props.values;
    return (
        <div className="mb-5">
            {
                props.dimensions.map(e => (<DimensionsView onMoveDimension={props.onMoveDimension}
                                                           key={e.index}
                                                           index={e.index}
                                                           name={e.name}
                                                           value={dimensions.filter(x => x.dimension === e.name)[0].value}
                                                           featureName={featureName}>
                </DimensionsView>))
            }
        </div>
    );
}

export default dimensionsPane;