import { getManualTorontoData } from './lib/data.mjs';
import { createWindows, printWindows } from './lib/util.mjs';
import { sum } from './lib/math.mjs';

const dates = getManualTorontoData();

const positives = Object.values(dates);

function print () {
  let latestDate = Object.keys(dates);
  latestDate = latestDate[latestDate.length - 1];
  
  console.log('Manually collected Toronto Data\n');
  console.log(`Data as of: ${new Date(latestDate + ' 12:00').toDateString()}\n`);

  printWindows('daily positive tests', createWindows(positives, 30, 5), 30, 5);
  console.log();
}

export {
  positives,
  dates,
  print
};
