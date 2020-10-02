import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DimensionsView from '../dimensionView/DimensionView';

const dimensionsPane = props => {
    const featureName = props.featureName;
    const dimensions = props.values;
    return (
        <div className="mb-5">
            <DndProvider backend={HTML5Backend}>
            {
                props.dimensions.map(e => (<DimensionsView onMoveDimension={props.onMoveDimension}
                                                           key={e.index}
                                                           index={e.index}
                                                           name={e.name}
                                                           value={dimensions.filter(x => x.dimension === e.name)[0].value}
                                                           onDimensionChange={props.onDimensionChange}
                                                           featureName={featureName}>
                </DimensionsView>))
            }
            </DndProvider>
        </div>
    );
}

export default dimensionsPane;