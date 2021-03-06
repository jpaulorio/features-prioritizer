import React, { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import './DimensionsEditorItem.css';

const type = "DimensionsEditorItem";

const dimensionsEditorItem = props => {
    const ref = useRef(null);
    const index = props.index;
    const name = props.name;
    const numDimensions = props.numDimensions;
    const isNegative = props.isNegative;

    const [, drop] = useDrop({
        accept: type,
        hover(item) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;

            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            props.onMoveDimension(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        item: { type: type, id: name, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));

    return (
                <div className={isDragging ? 'DimensionsEditorItem dragging' : 'DimensionsEditorItem' } key={index}
                ref={ref}
                style={{ opacity: isDragging ? 0 : 1 }}
                >
                    <p>Name: {name}</p>
                    <p>Weight: {numDimensions - index}</p>
                    <p>Negative <input type='checkbox' id={name + '-negative'}
                    data-dimensionindex={index}
                                                     checked={isNegative}
                                                     onChange={props.onNegativeChange}/></p>
                    <button type="button" className="btn btn-danger" data-dimensionindex={index} onClick={props.onRemoveDimension}>
                        Remove
                    </button>
                </div>
    );
};

export default dimensionsEditorItem;