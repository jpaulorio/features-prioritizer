import React from 'react';

const resultsView = props => {
    const features = props.features;
    return (
        <div>
            <h2>Prioritized Features</h2>
            <ol>
                {
                    features.map((e, i) => <li key={i}>{e.name}</li>)
                }
            </ol>
        </div>
    );
};

export default resultsView;