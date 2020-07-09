/*
Copyright 2020 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { getStateData } from './lib/data.mjs';
import { createWindows, printWindows } from './lib/util.mjs';
import { sum } from './lib/math.mjs';

const nyc = getStateData();

let total = 0;
let positive = 0;
const countyOverTime = {};

function makeCounty() {
  return {
    positives: [],
    totalTests: []
  };
}

nyc.forEach(item => {
  if (!countyOverTime[item.county]) countyOverTime[item.county] = makeCounty();
  countyOverTime[item.county].positives.push(item.new_positives);
  countyOverTime[item.county].totalTests.push(item.total_number_of_tests);
});

let positives = [];
let totalTested = [];

Object.keys(countyOverTime).forEach(county => {
  countyOverTime[county].positives.forEach((count, i) => {
    if (!positives[i]) positives[i] = Number(count);
    else {
      positives[i] += Number(count);
    }
  });
  countyOverTime[county].totalTests.forEach((count, i) => {
    if (!totalTested[i]) totalTested[i] = Number(count);
    else {
      totalTested[i] += Number(count);
    }
  });
});

console.log('New York State Data\n');
console.log(`Data as of: ${new Date(nyc[0].test_date).toDateString()}\n`);
console.log(`Total tests: ${sum(totalTested)}`);
console.log(`Total positive: ${sum(positives)}\n`);

printWindows('daily total tests', createWindows(totalTested));
console.log();
printWindows('daily positive tests', createWindows(positives));
console.log();
