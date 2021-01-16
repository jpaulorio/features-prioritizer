import React from 'react';
import FeatureView from '../featureView/FeatureView';

const featuresPane = props => {
    return (
        <div>
            {
                props.features.map(e => (<FeatureView onMoveDimension={props.onMoveDimension}
                                                      index={e.index}
                                                      key={e.index}
                                                      name={e.name}
                                                      dimensions={props.dimensions}
                                                      values={e.values}
                                                      onRemoveFeature={props.onRemoveFeature}
                                                      >
                </FeatureView>))
            }
        </div>
    );
};

export default featuresPane;