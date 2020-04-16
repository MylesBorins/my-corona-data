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
import { createWindows, printWindows } from './lib/util.mjs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const data = require('./third_party/nys-doh-testing-data/testing.json');

const counties = [
  'New York',
  'Kings',
  'Queens',
  'Bronx',
  'Richmond'
];

const nyc = data.reduce((acc, item) => {
  if (counties.includes(item.county)) acc.push(item);
  return acc;
}, []);

let total = 0;
let positive = 0;

for (let i = 0; i < 5; i++) {
  total += Number(nyc[i].cumulative_number_of_tests);
  positive += Number(nyc[i].cumulative_number_of_positives);
}

const countyOverTime = counties.reduce((acc, county) => {
  acc[county] = {
    positives: [],
    totalTests: []
  };
  return acc;
}, {});

nyc.forEach(item => {
  countyOverTime[item.county].positives.push(item.new_positives);
  countyOverTime[item.county].totalTests.push(item.total_number_of_tests);
});

let positives = [];
let totalTested = [];

counties.forEach(county => {
  countyOverTime[county].positives.forEach((count, i) => {
    if (!positives[i]) positives[i] = Number(count);
    else {
      positives[i] += Number(count)
    };
  });
  countyOverTime[county].totalTests.forEach((count, i) => {
    if (!totalTested[i]) totalTested[i] = Number(count);
    else {
      totalTested[i] += Number(count)
    };
  })
});

positives = positives.reverse();
totalTested = totalTested.reverse();

console.log('New York State Data\n')
console.log(`Data as of: ${new Date(nyc[0].test_date).toDateString()}\n`)
console.log(`Total tests: ${total}`);
console.log(`Total positive: ${positive}\n`);

printWindows('daily total tests', createWindows(totalTested, 15), 15);
console.log();
printWindows('daily positive tests', createWindows(positives, 15), 15);
console.log();
