import React from 'react';
import DimensionsPane from '../dimensionsPane/DimensionsPane';

const featureView = props => {
    return (
        <div className="mb-3">
            <h2>{props.name}</h2>
            <button type="button"
                    className="btn btn-danger mb-3"
                    data-featureindex={props.index} onClick={props.onRemoveFeature}>Delete</button>
            <DimensionsPane dimensions={props.dimensions}
                            values={props.values}
                            featureName={props.name}
                            onDimensionChange={props.onDimensionChange}>
            </DimensionsPane>
        </div>
    );
};

export default featureView;