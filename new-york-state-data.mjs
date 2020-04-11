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

console.log('New York City Data\n')
console.log(`Data as of: ${new Date(nyc[0].test_date).toDateString()}\n`)
console.log(`Total tests: ${total}`);
console.log(`Total positive: ${positive}\n`);
