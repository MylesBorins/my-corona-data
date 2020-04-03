import { createReadStream } from 'fs';
import parse from 'csv-parse';

import { average } from './math.mjs'

const CSV_PATH = '../third_party/coronavirus-data/testing.csv';

async function getData() {
  const csvURL = new URL(await import.meta.resolve(CSV_PATH));
  const parser = createReadStream(csvURL).pipe(parse());
  const data = [];

  let first = true;

  for await (const [
    extractDate,
    specimenDate,
    numberTested,
    numberConfirmed,
    numberHospitalized,
    numberDeaths
  ] of parser) {
    if (first) first = false
    else {
      data.push({
        date: specimenDate,
        tested: Number(numberTested),
        positive: Number(numberConfirmed),
        hospitalized: Number(numberHospitalized),
        deaths: Number(numberDeaths)
      });
    }
  }
  return data;
}

function createWindows(arr) {
  return [
    arr.slice(arr.length - 21, arr.length - 14),
    arr.slice(arr.length - 17, arr.length - 10),
    arr.slice(arr.length - 14, arr.length - 7),
    arr.slice(arr.length - 11, arr.length - 4),
    arr.slice(arr.length - 7, arr.length)
  ];
}

function printWindows(windowTitle, windows) {
  console.log(`Average ${windowTitle} two weeks ago: ${average(windows[0])}`);
  console.log(`Average ${windowTitle} week and a half ago: ${average(windows[1])}`);
  console.log(`Average ${windowTitle} last week: ${average(windows[2])}`);
  console.log(`Average ${windowTitle} half a week ago: ${average(windows[3])}`);
  console.log(`Average ${windowTitle} this week: ${average(windows[4])}`);
}

export {
  createWindows,
  getData,
  printWindows
}
