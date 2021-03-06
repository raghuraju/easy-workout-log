import { push } from 'react-router-redux';

// import ewoloConstants from '../../common/ewoloConstants';
import ewoloUtil from '../../common/ewoloUtil';
import { handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';
import signupActions from '../signup/signupActions';

export const c = {
  LOG_WORKOUT: 'LOG-WORKOUT',
  LOG_WORKOUT_EXERCISE: 'LOG-WORKOUT-EXERCISE',
  LOG_WORKOUT_EXERCISE_DELETE: 'LOG-WORKOUT-EXERCISE-DELETE',
  LOG_WORKOUT_EXERCISE_SET_DATA: 'LOG-WORKOUT-EXERCISE-SET-DATA',
  LOG_WORKOUT_SET_DATA: 'LOG-WORKOUT-SET-DATA',
  LOG_WORKOUT_SET_SHOW_TEMPO_HELP: 'LOG-WORKOUT-SET-SHOW-TEMPO-HELP',
  LOG_WORKOUT_SET_SHOW_REST_HELP: 'LOG-WORKOUT-SET-SHOW-REST-HELP',
  LOG_WORKOUT_SET_SHOW_WEIGHT_HELP: 'LOG-WORKOUT-SET-SHOW-WEIGHT-HELP',
  LOG_WORKOUT_SAVE_SUCCESS: 'LOG-WORKOUT-SAVE-SUCCESS',
  LOG_WORKOUT_COPY: 'LOG-WORKOUT-COPY',
  LOG_WORKOUT_EDIT: 'LOG-WORKOUT-EDIT'
};

const logWorkoutActions = {
  logWorkout: () => {
    return {
      type: c.LOG_WORKOUT
    }
  },
  logWorkoutExercise: ({ name, reps, weight, sets, tempo, rest, showAdvanced }) => {
    return {
      type: c.LOG_WORKOUT_EXERCISE,
      name: name,
      reps: reps,
      weight: weight,
      sets: sets,
      tempo: tempo,
      rest: rest,
      showAdvanced
    };
  },
  logWorkoutExerciseDelete: (index) => {
    return {
      type: c.LOG_WORKOUT_EXERCISE_DELETE,
      index: index
    };
  },
  logWorkoutExerciseSetData: (index, exercise) => {
    return {
      type: c.LOG_WORKOUT_EXERCISE_SET_DATA,
      exerciseIndex: index,
      exercise: exercise
    };
  },
  logWorkoutSetData: (date, notes, showTempoHelp = false, showRestHelp = false) => {
    return {
      type: c.LOG_WORKOUT_SET_DATA,
      date: date,
      notes: notes,
      showTempoHelp: showTempoHelp,
      showRestHelp: showRestHelp
    };
  },
  logWorkoutSetShowTempoHelp: (showTempoHelp = true) => {
    return {
      type: c.LOG_WORKOUT_SET_SHOW_TEMPO_HELP,
      showTempoHelp: showTempoHelp
    };
  },
  logWorkoutSetShowRestHelp: (showRestHelp = true) => {
    return {
      type: c.LOG_WORKOUT_SET_SHOW_REST_HELP,
      showRestHelp: showRestHelp
    };
  },
  logWorkoutSetShowWeightHelp: (showWeightHelp = true) => {
    return {
      type: c.LOG_WORKOUT_SET_SHOW_WEIGHT_HELP,
      showWeightHelp: showWeightHelp
    };
  },
  logWorkoutSaveSuccess: (id) => {
    return {
      type: c.LOG_WORKOUT_SAVE_SUCCESS,
      id: id
    };
  },
  logWorkoutSaveThunk: () => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;

      if (!authToken) {
        return Promise.resolve()
          .then(() => {
            const action = logWorkoutActions.logWorkoutSaveThunk();
            dispatch(signupActions.signupSetAfterSuccess(action));
            dispatch(push('/signup'));
          });
      }

      const logWorkout = getState().user.logWorkout;
      const userId = getState().user.data.id;
      const logWorkoutDate = logWorkout.date;
      const logWorkoutId = logWorkout.id;

      dispatch(globalActions.taskStart());

      let promise = null;

      if (logWorkoutId) {
        promise = ewoloUtil.getApiRequest({
          route: `/users/${userId}/workouts/${logWorkoutId}`,
          method: 'PUT',
          body: logWorkout,
          authToken: authToken
        });
      } else {
        promise = ewoloUtil.getApiRequest({
          route: '/workouts',
          method: 'POST',
          body: logWorkout,
          authToken: authToken
        });
      }

      return promise
        .then(ewoloUtil.getApiResponse)
        .then(body => {
          dispatch(logWorkoutActions.logWorkoutSaveSuccess(body.id));
          dispatch(globalActions.userNotificationAdd('SUCCESS', 'Saved workout for ' + logWorkoutDate));
          dispatch(push('/dashboard'));
        })
        .catch(error => {
          handleError(error);
          dispatch(globalActions.userNotificationAdd('ERROR', 'An error occured when saving workout for ' + logWorkoutDate));
        })
        .then(() => {
          dispatch(globalActions.taskEnd());
        });
    };
  },
  logWorkoutCopy: (workout) => {
    return {
      type: c.LOG_WORKOUT_COPY,
      workout
    };
  },
  logWorkoutCopyThunk: (workout) => {
    return (dispatch, getState) => {
      return Promise.resolve()
        .then(() => {
          dispatch(logWorkoutActions.logWorkoutCopy(workout));
          dispatch(push('/log-workout'));
        });
    };
  },
  logWorkoutEdit: (workout) => {
    return {
      type: c.LOG_WORKOUT_EDIT,
      workout
    };
  },
  logWorkoutEditThunk: (workout) => { // TODO: this should load the correct workout based on id if no workout provided
    return (dispatch, getState) => {
      return Promise.resolve()
        .then(() => {
          dispatch(logWorkoutActions.logWorkoutEdit(workout));
          dispatch(push('/log-workout'));
        });
    };
  }
};

export default logWorkoutActions;
