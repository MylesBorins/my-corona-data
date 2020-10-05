import { getManualTorontoData } from './lib/data.mjs';
import { runningAverage, printAverages } from './lib/util.mjs';
import { sum } from './lib/math.mjs';

const dates = getManualTorontoData();

const positives = Object.values(dates);

function print () {
  let latestDate = Object.keys(dates);
  latestDate = latestDate[latestDate.length - 1];
  
  console.log('Manually collected Toronto Data\n');
  console.log(`Data as of: ${new Date(latestDate + ' 12:00').toDateString()}\n`);

  printAverages('postitive tests', runningAverage(dates))
  console.log();
}

export {
  positives,
  dates,
  print
};

