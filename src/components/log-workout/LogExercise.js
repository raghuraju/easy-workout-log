import React from 'react';
import PropTypes from 'prop-types';

import {EwoloFormHintSplit} from '../generic/EwoloFormHint';
import AutoComplete from '../generic/AutoComplete';

const LogExercise = (props) => {

  const handleWeightKgToLbs = (event) => {
    const exercise = props.exercise;
    exercise.weight = parseInt(exercise.weight * 2.20462, 10);
    exercise.converted = true;
    props.doLogWorkoutExerciseSetData(props.index, exercise);
  }

  const handleExerciseDelete = (event) => {
    event.currentTarget.blur(); // hide the tooltip
    props.doLogWorkoutExerciseDelete(props.index);
  };

  const handleChange = (event) => {
    const propertyName = event
      .target
      .getAttribute('property');
    const exercise = props.exercise;
    exercise[propertyName] = event.target.value;

    props.doLogWorkoutExerciseSetData(props.index, exercise);
  };

  const handleNameAutoCompleteChange = (value) => {
    const exercise = props.exercise;
    exercise.name = value;
    props.doLogWorkoutExerciseSetData(props.index, exercise);
  }

  const handleShowAdvanced = (event) => {
    event.currentTarget.blur(); // hide the tooltip 

    const exercise = {
      ...props.exercise
    };
    exercise.showAdvanced = true;
    props.doLogWorkoutExerciseSetData(props.index, exercise);
  };
  
  const handleHideAdvanced = (event) => {
    event.currentTarget.blur(); // hide the tooltip

    const exercise = {
      ...props.exercise
    };
    exercise.showAdvanced = false;
    props.doLogWorkoutExerciseSetData(props.index, exercise);
  };

  const handleSetShowTempoHelpClick = (event) => {
    props.doLogWorkoutSetShowTempoHelp(true);
  };
  
  const handleSetShowRestHelpClick = (event) => {
    props.doLogWorkoutSetShowRestHelp(true);
  };
  
  const handleSetShowWeightHelpClick = (event) => {
    props.doLogWorkoutSetShowWeightHelp(true);
  };

  const renderExerciseProperties = () => {
    if (!props.exercise.showProperties) {
      return renderExercisePropertiesShortForm();
    }

    const renderedAdvancedProperties = renderAdvanced();
    const renderedExerciseOperations = renderExerciseOperations();

    const renderedDivider = (
      <div className="divider-vert" data-content={'#' + (props.exercise.superSetIndex > 0 ? props.exercise.setIndex + '.' + props.exercise.superSetIndex : props.exercise.setIndex)}></div>
    );

    return (
      <div className="fade-in exercise-entry-details">
        <div className="columns">
          {renderedDivider}
          <div className="column col-11">
            <div className="form-group">
              <div className="col-3">
                <label className="form-label">Reps</label>
              </div>
              <div className="col-4">
                <input
                  className="form-input input-lg"
                  type="number"
                  min="0"
                  max="1000"
                  property="reps"
                  value={props.exercise.reps}
                  onChange={handleChange}/>
              </div>
            </div>

            <EwoloFormHintSplit formHint={props.exercise.repsFormHint} />

            <div className="form-group">
              <div className="col-3">
                <label className="form-label"><a onClick={handleSetShowWeightHelpClick}> Lbs</a></label>
              </div>
              <div className="col-9">
                <div className="input-group">
                  <input
                    className="form-input input-lg"
                    type="number"
                    property="weight"
                    min="0"
                    max="1000"
                    value={props.exercise.weight}
                    onChange={handleChange}/>
                  {/*<span className="input-group-addon">lb</span>*/}
                  <button className={"btn btn-primary btn-lg input-group-btn" + (props.exercise.converted ? ' hide ' : '')} type="button" onClick={handleWeightKgToLbs}>kg -> lbs</button>
                </div>
              </div>
            </div>

            {renderedAdvancedProperties}
            {renderedExerciseOperations}
          </div>
        </div>
      </div>
    )
  };

  const renderExercisePropertiesShortForm = () => {
    const {reps, weight, tempo, rest} = props.exercise;

    return (
      <div className="exercise-entry-details">
        {/*{sets && sets !== '1' ? sets + ' x ' : ''}*/} {reps} reps {weight ? ' @ ' + weight + ' lbs' : ''} {tempo && tempo !== '101' ? ' / ' + tempo : ''} {rest && rest !== '60' ? ' / ' + rest + ' secs': ''}
      </div>
    )
  };

  const renderExerciseOperations = () => {
    return (
        <div className="form-group">
          <div className="col-12">
            {renderAdvancedPropertiesButton()}
            <button
              className="btn btn-action btn-lg circle btn-exercise-action tooltip"
              data-tooltip="Delete exercise"
              type="button"
              onClick={handleExerciseDelete}>
              <i className="icon icon-delete"></i>
            </button>
          </div>
        </div>
      );
  }

  const renderAdvancedPropertiesButton = () => {
    if (props.exercise.showAdvanced) {
      return (
        <button
          className="btn btn-action btn-lg circle tooltip"
          data-tooltip="Hide advanced"
          type="button"
          onClick={handleHideAdvanced}>
          <i className="icon icon-arrow-up"></i>
        </button>
      )
    }

    return (
      <button
        className="btn btn-action btn-lg circle tooltip"
        data-tooltip="Show advanced"
        type="button"
        onClick={handleShowAdvanced}>
        <i className="icon icon-arrow-down"></i>
      </button>
    )
  }

  const renderAdvanced = () => {
    if (!props.exercise.showAdvanced) {
      return null;
    }

    return (
      <div className="fade-in margin-bottom-1rem">
        <div className="form-group">
          <div className="col-3">
            <label className="form-label"><a onClick={handleSetShowTempoHelpClick}>Tempo</a></label>
          </div>
          <div className="col-4">
            <input
              className="form-input input-lg"
              type="number"
              property="tempo"
              min="0"
              max="999"
              value={props.exercise.tempo}
              onChange={handleChange}/>
          </div>
          
        </div>

        <div className="form-group">
          <div className="col-3">
            <label className="form-label"><a onClick={handleSetShowRestHelpClick}>Rest</a></label>
          </div>
          <div className="col-4">
            <input
              className="form-input input-lg"
              type="number"
              min="0"
              max="99999"
              property="rest"
              value={props.exercise.rest}
              onChange={handleChange}/>
          </div>
        </div>
      </div>
    )
  }

  return (

    <div className="fade-in">
      <div className="divider"></div>

      <div className="exercise-entry">
        <div className="form-group">
          <div className="col-3">
            <label className="form-label">
              Name
            </label>
          </div>
          <div className="col-9">
            <AutoComplete
              placeholder="e.g. Squats"
              autoFocus={true}
              // name="exerciseName"
              items={props.exerciseNames} 
              input={props.exercise.name}
              handleChange={handleNameAutoCompleteChange}/>
          </div>
        </div>

        <EwoloFormHintSplit formHint={props.exercise.nameFormHint} />

        {renderExerciseProperties()}
      </div>
    </div>
  )
};

LogExercise.propTypes = {
  exerciseNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  exercise: PropTypes.object.isRequired,
  doLogWorkoutExerciseDelete: PropTypes.func.isRequired,
  doLogWorkoutExerciseSetData: PropTypes.func.isRequired,
  doLogWorkoutSetShowTempoHelp: PropTypes.func.isRequired,
  doLogWorkoutSetShowRestHelp: PropTypes.func.isRequired,
  doLogWorkoutSetShowWeightHelp: PropTypes.func.isRequired
};

export default LogExercise;
