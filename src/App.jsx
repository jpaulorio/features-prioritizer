import React, { useState } from 'react';
import './App.css';
import FeaturesPane from './components/featuresPane/FeaturesPane';

function App() {
  const [dimensionsState, setDimensionsState] = useState([
    {
      index: 0,
      name: "Effort"
    },
    {
      index: 1,
      name: "Value"
    }
  ]);

  const [featuresState, setFeaturesState] = useState([
    {
      index: 0,
      name: "User Login",
      values: [{ dimension: "Effort", value: 7 }, { dimension: "Value", value: 3 }]
    },
    {
      index: 1,
      name: "Add Item to Cart",
      values: [{ dimension: "Effort", value: 3 }, { dimension: "Value", value: 6 }]
    }
  ]);

  const featureNameInput = React.createRef();
  const dimensionNameInput = React.createRef();

  const addFeatureHandler = () => {
    const newValues = dimensionsState.map(e => { return { dimension: e.name, value: 5 } });
    const newFeature = { index: featuresState.length, name: featureNameInput.current.value, values: newValues };
    setFeaturesState(
      [...featuresState, newFeature]
    );
  };

  const addDimensionHandler = () => {
    const newDimension = { index: dimensionsState.length, name: dimensionNameInput.current.value };
    setDimensionsState(
      [...dimensionsState, newDimension]
    );
  };

  const getDimensionIndex = dimensionName => {
    return dimensionsState.filter(x => x.name === dimensionName)[0].index;
  };

  const prioritizeFeatures = () => {
    const numDimensions = dimensionsState.length;
    const result = featuresState
      .map(e => {
        const f = {
          name: e.name,
          rank: e.values.map(v => v.value * (numDimensions - getDimensionIndex(v.dimension))).reduce((a, b) => a + b)
        };
        return f;
      })
      .sort((a, b) => b.rank - a.rank);
    console.log(result);
    return result;
  };

  const onDimensionChangeHandler = (event) => {
    const featureName = event.target.dataset.featurename;
    const dimensionName = event.target.name;
    const value = Number.parseInt(event.target.value, 10);

    const oldFeature = featuresState.filter(x => x.name === featureName)[0];
    const newFeature = {
      ...oldFeature,
      values: [...oldFeature.values.filter(x => x.dimension !== dimensionName), { dimension: dimensionName, value: value }]
    };
    const newFeatureState = [...featuresState.filter(x => x.name !== featureName), newFeature].sort((a, b) => a.index - b.index);
    setFeaturesState(newFeatureState);
  };

  return (
    <div className="App">
      <div>
        <input type="text" id="newFeatureName" name="newFeatureName" ref={featureNameInput}></input>
        <button onClick={addFeatureHandler}>Add new feature</button>
      </div>
      <div>
        <input type="text" id="newDimensionName" name="newDimensionName" ref={dimensionNameInput}></input>
        <button onClick={addDimensionHandler}>Add new dimension</button>
      </div>
      <div>
        <button onClick={prioritizeFeatures}>Prioritize Features</button>
      </div>
      <FeaturesPane features={featuresState} dimensions={dimensionsState} onDimensionChange={onDimensionChangeHandler}></FeaturesPane>
    </div>
  );
}

export default App;
