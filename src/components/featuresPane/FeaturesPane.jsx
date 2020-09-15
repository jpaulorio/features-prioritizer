import React from 'react';
import FeatureView from '../featureView/FeatureView';

const featuresPane = props => {
    return (
        <div>
            {
                props.features.map(e => <FeatureView index={e.index} key={e.index} name={e.name} dimensions={props.dimensions} values={e.values} onRemoveFeature={props.onRemoveFeature} onDimensionChange={props.onDimensionChange}></FeatureView>)
            }
        </div>
    );
};

export default featuresPane;