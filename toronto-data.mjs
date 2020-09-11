import { getTorontoData } from './lib/data.mjs';
import { createWindows, printWindows } from './lib/util.mjs';
import { sum } from './lib/math.mjs';

function sanitize(data) {
  let total = 0;
  let dates = {};
  
  // example data
  // {
  //   'Age Group': '40 to 49 Years',
  //   'Neighbourhood Name': 'Willowridge-Martingrove-Richview',
  //   Outcome: 'RESOLVED',
  //   'Client Gender': 'FEMALE',
  //   Classification: 'CONFIRMED',
  //   FSA: 'M9R',
  //   'Currently Hospitalized': 'No',
  //   'Episode Date': '2020-03-13',
  //   Assigned_ID: 96,
  //   'Outbreak Associated': 'Sporadic',
  //   'Ever Intubated': 'No',
  //   'Reported Date': '2020-03-14',
  //   'Currently in ICU': 'No',
  //   'Source of Infection': 'Close contact',
  //   _id: 77883,
  //   'Ever in ICU': 'No',
  //   'Ever Hospitalized': 'No',
  //   'Currently Intubated': 'No'
  // }
  
  data.forEach(covidCase => {
    const episodeDate = covidCase['Episode Date'];
    if (!dates[episodeDate]) {
      dates[episodeDate] = 1;
    } else {
      dates[episodeDate] += 1;
    }
    total += 1;
  });
  
  const sortedDates = Object.entries(dates).sort((a,b) => {
    const dateOne = new Date(a[0]);
    const dateTwo = new Date(b[0]);
    return dateOne - dateTwo;
  });
  
  return {
    total,
    dates: Object.fromEntries(sortedDates)
  };
}

const {
  total,
  dates
} = sanitize(getTorontoData());

console.log(total);
console.log(dates)