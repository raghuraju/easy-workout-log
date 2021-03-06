import { c } from './userWorkoutsActions';

export const initialState = {
  workouts: [],
  workoutsViewDetails: {},
  workoutsAnalysis: []
};

const userWorkoutsReducer = (state = initialState, action) => {
  switch (action.type) {
    case c.USER_WORKOUTS_FETCH_SUCCESS:
      {
        const { workouts } = action;

        return {
          ...state,
          workouts: workouts
        };
      }
    case c.USER_WORKOUTS_ANALYSIS_FETCH_SUCCESS:
      {
        const { workoutsAnalysis } = action;

        return {
          ...state,
          workoutsAnalysis: workoutsAnalysis
        };
      }
    case c.USER_WORKOUTS_DELETE_SUCCESS:
      {
        const { workoutId } = action;

        const workouts = state.workouts.filter(workout => {
          return (workout.id !== workoutId);
        });

        return {
          ...state,
          workouts: workouts
        }
      }
    case c.USER_WORKOUTS_SET_VIEW_DETAILS:
      {
        const { workoutId, show } = action;
        const workoutsViewDetails = {
          ...state.workoutsViewDetails
        }
        workoutsViewDetails[workoutId] = show;

        return {
          ...state,
          workoutsViewDetails: workoutsViewDetails
        };
      }
    default:
      return state;
  }
};

export default userWorkoutsReducer;
