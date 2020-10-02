import React, { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import './DimensionView.css';

const type = "DimensionView";

const dimensionsView = props => {
    const ref = useRef(null);
    const featureName = props.featureName;
    const name = props.name;
    const value = props.value;
    const index = props.index;

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
        item: { type, id: name, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            style={{ opacity: isDragging ? 0 : 1 }}
            className="DimensionView">
            <label htmlFor="dimension">{name}:</label>            
            <input type="range"
                   data-featurename={featureName}
                   id={name}
                   name={name}
                   defaultValue={value}
                   onChange={props.onDimensionChange}
                   step="1"
                   min="0"
                   max="10">
            </input>
        </div>
    );
}

export default dimensionsView;