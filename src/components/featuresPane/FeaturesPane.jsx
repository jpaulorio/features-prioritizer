import React from 'react';
import FeatureView from '../featureView/FeatureView';

const featuresPane = props => {
    return (
        <div>
            {
                props.features.map(e => <FeatureView key={e.index} name={e.name} dimensions={props.dimensions} values={e.values} onDimensionChange={props.onDimensionChange}></FeatureView>)
            }
        </div>
    );
};

export default featuresPane;