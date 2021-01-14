import {getOntarioData} from '#lib/data';
import { runningAverage, printAverages } from '#lib/util';

function sanitize(data) {
  let total = 0;
  let positives = {};
  let percents = {};
  
  // example data
  // {
  //   date: '2020-05-03',
  //   change_cases: 242,
  //   change_fatalities: 38,
  //   change_tests: 17146,
  //   change_hospitalizations: 33,
  //   change_criticals: 11,
  //   change_recoveries: 615,
  //   change_vaccinations: null,
  //   change_vaccines_distributed: null,
  //   change_vaccinated: null,
  //   total_cases: 18398,
  //   total_fatalities: 1303,
  //   total_tests: 327505,
  //   total_hospitalizations: 1010,
  //   total_criticals: 232,
  //   total_recoveries: 12005,
  //   total_vaccinations: null,
  //   total_vaccines_distributed: null,
  //   total_vaccinated: null
  // },

  data.forEach(item => {
    positives[item.date] = item.change_cases;
    percents[item.date] = item.change_cases / item.change_tests * 100;
  });
  
  return {
    positives,
    percents
  };
}
const {positives, percents} = sanitize(getOntarioData());
let latestDate = Object.keys(positives);
latestDate = latestDate[latestDate.length - 1];

function print () {
  console.log('Ontario Data\n');
  console.log(`Data as of: ${new Date(latestDate + ' 12:00').toDateString()}\n`);

  printAverages('postitive tests', runningAverage(positives));
  console.log();
}

export {
  positives,
  print
};

print();
