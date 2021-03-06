import exercisesJson from './exercises';

// TODO: refactor this out
export default class ExerciseService {

  constructor() {
    this.exercises = new Set();
    for (const category in exercisesJson) {
      if (exercisesJson.hasOwnProperty(category)) {
        for (const exercise of exercisesJson[category]) {
          this.exercises.add(exercise);
        }
      }
    }
  }

}
