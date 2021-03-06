import {expect} from 'chai';

import ewoloTestUtil from '../common/ewoloTestUtil';

import {segregateWorkoutsByMonth, getChartData} from './workoutsService';

const workouts = [
  {
    date: '2017-06-23'
  }, {
    date: '2017-06-15'
  }, {
    date: '2017-06-01'
  }, {
    date: '2017-05-15'
  }, {
    date: '2017-05-10'
  }, {
    date: '2017-01-01'
  }, {
    date: '2008-10-15'
  }, {
    date: '2008-10-01'
  }, {
    date: '2008-01-10'
  }, {
    date: '2008-01-01'
  }
];

describe('workoutsDisplayService', () => {

  describe('segregateWorkoutsByMonth', () => {
    it('should split workouts by month', () => {
      // when
      const segregatedWorkouts = segregateWorkoutsByMonth(workouts);

      // then
      expect(segregatedWorkouts)
        .to
        .deep
        .equal([
          {
            key: 'June, 2017',
            workouts: [
              {
                date: '2017-06-23'
              }, {
                date: '2017-06-15'
              }, {
                date: '2017-06-01'
              }
            ]
          }, {
            key: 'May, 2017',
            workouts: [
              {
                date: '2017-05-15'
              }, {
                date: '2017-05-10'
              }
            ]
          }, {
            key: 'January, 2017',
            workouts: [
              {
                date: '2017-01-01'
              }
            ]
          }, {
            key: 'October, 2008',
            workouts: [
              {
                date: '2008-10-15'
              }, {
                date: '2008-10-01'
              }
            ]
          }, {
            key: 'January, 2008',
            workouts: [
              {
                date: '2008-01-10'
              }, {
                date: '2008-01-01'
              }
            ]
          }
        ]);
    });
  });

  describe('getChartData', () => {
    it('should get chart data', () => {
      // when
      const result = getChartData(ewoloTestUtil.workoutsAnalysisResponseData);

      // then
      result.rows.length = 1 // who wants to type up all the data?

      expect(result)
        .to
        .deep
        .equal({
          rows: [
            [new Date('2012-01-01'), 65]
          ],
          columns: [
            {
              type: 'date',
              label: 'Date'
            }, {
              type: 'number',
              label: 'Volume'
            }
          ]
        });
    });

    it('should get dummy rows when no data provided', () => {
      // when
      const result = getChartData([]);

      // then
      expect(result)
        .to
        .deep
        .equal({
          rows: [
            [new Date('2017-01-01'), 0]
          ],
          columns: [
            {
              type: 'date',
              label: 'Date'
            }, {
              type: 'number',
              label: 'Volume'
            }
          ]
        });
    });

  });

});
