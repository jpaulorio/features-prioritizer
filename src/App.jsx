import React, { useState, useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import './App.css';
import FeaturesPane from './components/featuresPane/FeaturesPane';
import DimensionsEditor from './components/dimensionsEditor/DimensionsEditor';
import ResultsView from './components/resultsView/ResultsView';

function App() {
  const [dimensionsState, setDimensionsState] = useState([
    {
      index: 0,
      name: "Effort",
      isNegative: false
    },
    {
      index: 1,
      name: "Value",
      isNegative: false
    }
  ]);

  const [featuresState, setFeaturesState] = useState([
    {
      index: 0,
      name: "User Login",
      values: [{ dimension: "Effort", value: 7 }, { dimension: "Value", value: 3 }],
      rank: 17
    },
    {
      index: 1,
      name: "Add Item to Cart",
      values: [{ dimension: "Effort", value: 3 }, { dimension: "Value", value: 6 }],
      rank: 12
    }
  ]);

  useEffect(() => {
    prioritizeFeatures();
  }, [featuresState, dimensionsState]);

  const [prioritizedFeatures, setPrioritizedFeaturesState] = useState(featuresState);

  const featureNameInput = React.createRef();
  const dimensionNameInput = React.createRef();

  const addFeatureHandler = () => {
    const newFeatureName = featureNameInput.current.value;
    const isEmptyResult = validateEmptyInput(newFeatureName);
    if (!isEmptyResult.valid) {
      alert(isEmptyResult.message);
      return;
    }
    if (featureExists(newFeatureName)) {
      alert("Feature " + newFeatureName + " already exists!");
      return;
    }

    const newValues = dimensionsState.map(e => { return { dimension: e.name, value: 5 } });
    const newFeature = { index: featuresState.length, name: newFeatureName, values: newValues };

    setFeaturesState(
      [...featuresState, newFeature]
    );

    ;
  };

  const validateEmptyInput = input => {
    const validResult = {
      valid: true,
    };
    const invalidResult = {
      valid: false,
      message: "Input cannot be empty!"
    };

    return input === "" ? invalidResult : validResult;
  };

  const dimensionExists = dimensionName => {
    return dimensionsState.filter(e => e.name.toLocaleLowerCase() === dimensionName.toLocaleLowerCase()).length > 0;
  };

  const featureExists = featureName => {
    return featuresState.filter(e => e.name.toLocaleLowerCase() === featureName.toLocaleLowerCase()).length > 0;
  };

  const addDimensionHandler = () => {
    const newDimensionName = dimensionNameInput.current.value;
    const isEmptyResult = validateEmptyInput(newDimensionName);
    if (!isEmptyResult.valid) {
      alert(isEmptyResult.message);
      return;
    }
    if (dimensionExists(newDimensionName)) {
      alert("Dimension " + newDimensionName + " already exists!");
      return;
    }
    const newDimension = { index: dimensionsState.length, name: newDimensionName };
    setDimensionsState(
      [...dimensionsState, newDimension]
    );

    const newFeatureState = featuresState.map(e => { return { ...e, values: [...e.values, { dimension: newDimension.name, value: 5 }] } });
    setFeaturesState(
      newFeatureState
    );

    ;
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
          rank: e.values.map(v => {
          const dimensionIndex = getDimensionIndex(v.dimension);
          const dimension = dimensionsState[dimensionIndex];
          const weight = numDimensions - dimensionIndex;
          const adjustedValue = dimension.isNegative ? (10 - v.value) : v.value;
          return adjustedValue * weight;
          })
          .reduce((a, b) => a + b, null)
        };
        return f;
      })
      .sort((a, b) => b.rank - a.rank);

    setPrioritizedFeaturesState(result);
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

  const removeDimensionHandler = event => {
    const index = parseInt(event.target.dataset.dimensionindex, 10);
    const dimensionName = dimensionsState[index].name;
    const newFeatureState = featuresState.map(e => { return {...e, values: e.values.filter(v => v.dimension !== dimensionName)};});
    setFeaturesState(newFeatureState);
    const newDimensionState = dimensionsState.slice(0, index).concat(dimensionsState.slice(index + 1, dimensionsState.length));
    setDimensionsState(newDimensionState.map((e, i) => { return { index: i, name: e.name } }));
  };

  const onRemoveFeatureHandler = event => {
    const index = event.target.dataset.featureindex;
    const newFeatureState = featuresState.slice(0, index).concat(featuresState.slice(index + 1, featuresState.length))
    setFeaturesState(newFeatureState.map((e, i) => { return { index: i, name: e.name, values: e.values } }));
  };

  const onMoveDimensionHandler = (dragIndex, hoverIndex) => {
    const draggedDimension = dimensionsState[dragIndex];
    const hoveredDimension = dimensionsState[hoverIndex];
    setDimensionsState(
      update(dimensionsState, {
        $splice: [[hoverIndex, 1, {...hoveredDimension, index: dragIndex}], [dragIndex, 1], [hoverIndex, 0, {...draggedDimension, index: hoverIndex}]]
      })
    );
  };

  const onNegativeChangeHandler = event => {
    const index = parseInt(event.target.dataset.dimensionindex, 10);
    const dimension = {...dimensionsState[index], isNegative: event.target.checked};
    dimensionsState.splice(index, 1, dimension);
    const newDimensionState = dimensionsState.slice();
    setDimensionsState(newDimensionState);
  };

  return (
    <div className="App container">
    <DndProvider backend={HTML5Backend}>
      <div className="row text-center mb-3">
        <h2 className="col">Features Prioritizer</h2>
        <a href='https://github.com/jpaulorio/features-prioritizer' target="_blank" rel="noreferrer noopener"><img src='GitHub-Mark.png' alt='GitHub repo' width='16px' height='16px'/></a>
      </div>
      <div className="row mb-2">
        <div className="ControlsPane ml-auto mr-auto col-md-6 col-xs-12">
          <div className="input-group">
            <input type="text" className="form-control" id="newFeatureName" name="newFeatureName" ref={featureNameInput}></input>
            <div className="input-group-append">
              <button type="button" className="btn btn-primary" onClick={addFeatureHandler}>Add new feature</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="ControlsPane ml-auto mr-auto col-md-6 col-xs-12">
          <div className="input-group">
            <input type="text" className="form-control" id="newDimensionName" name="newDimensionName" ref={dimensionNameInput}></input>
            <div className="input-group-append">
              <button type="button" className="btn btn-primary" onClick={addDimensionHandler}>Add new dimension</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="DimensionsEditorPane col-lg col-md-12">
          <DimensionsEditor
          dimensions={dimensionsState}
          onRemoveDimension={removeDimensionHandler}
          onMoveDimension={onMoveDimensionHandler}
          onNegativeChange={onNegativeChangeHandler}
          ></DimensionsEditor>
        </div>
        <div className="RightPane col-md-12 col-lg-6">

          <div className="ViewPane">

            <FeaturesPane onRemoveFeature={onRemoveFeatureHandler} features={featuresState} dimensions={dimensionsState} onDimensionChange={onDimensionChangeHandler}></FeaturesPane>
          </div>
        </div>
        <div className="RightPane col-lg col-md-6 offset-lg-0 offset-md-3">
          <ResultsView features={prioritizedFeatures}></ResultsView>
        </div>
      </div>
      </DndProvider>
    </div>
  );
}

export default App;
