import { createReadStream } from 'fs';
import parse from 'csv-parse';

import { average } from './math.mjs'

const CSV_PATH = '../third_party/coronavirus-data/case-hosp-death.csv';

async function getCityData() {
  const csvURL = new URL(CSV_PATH, import.meta.url);
  const parser = createReadStream(csvURL).pipe(parse());
  const data = [];

  let first = true;

  for await (const [
    dateOfInterest,
    newCovidCaseCount,
    numberHospitalized,
    numberDeaths
  ] of parser) {
    if (first) first = false
    else {
      data.push({
        date: dateOfInterest,
        positive: Number(newCovidCaseCount),
        hospitalized: Number(numberHospitalized),
        deaths: Number(numberDeaths)
      });
    }
  }
  return data;
}

function createWindows(arr, windowLength = 5, totalLength = 30) {
  const result = [];
  const step = windowLength / 2;

  const steps = Math.floor(totalLength / step) - 1;

  for (let i = 0; i < steps; i++) {
    const start = arr.length - totalLength + (Math.floor(step * i));
    const end = arr.length - totalLength + (Math.floor(step * i) + windowLength);
    result.push(arr.slice(start, end));
  }
  return result;
}

function printWindows(windowTitle, windows, windowLength = 5, totalLength = 30) {
  const step = windowLength / 2;
  for (let i = 0; i < windows.length; i++) {
    console.log(`Average ${windowTitle} between ${totalLength - Math.floor(i * step)} and ${totalLength - (Math.floor(i * step) + windowLength)} days ago: ${average(windows[i])}`);
  }
}

export {
  createWindows,
  getCityData,
  printWindows
}
