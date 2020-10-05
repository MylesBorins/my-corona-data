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

import { average } from './math.mjs';

const DEFAULT_WINDOW_LENGTH = 7;
const DEFAULT_TOTAL_LENGTH = 60;

function createWindows(arr, totalLength = DEFAULT_TOTAL_LENGTH, windowLength = DEFAULT_WINDOW_LENGTH) {
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

function printWindows(windowTitle, windows, totalLength = DEFAULT_TOTAL_LENGTH, windowLength = DEFAULT_WINDOW_LENGTH) {
  const step = windowLength / 2;
  console.log(`Average ${windowTitle}`);
  for (let i = 0; i < windows.length; i++) {
    console.log(`${totalLength - Math.floor(i * step)} - ${totalLength - (Math.floor(i * step) + windowLength)} days ago: ${average(windows[i])}`);
  }
}

function runningAverage(data, windowLength = DEFAULT_WINDOW_LENGTH) {
  const positives = Object.values(data);
  const dates = Object.keys(data);
  const result = [];
  for (let i = positives.length; i > windowLength; i--) {
    const slice = positives.slice(i-windowLength, i);
    result.push({
      count: Number(average(slice)),
      date: dates[i - 1]
    });
  }
  return result.reverse();
}

function printAverages(title, averages, windowLength = DEFAULT_WINDOW_LENGTH) {
  console.log(`${windowLength} day average ${title}`);
  averages.forEach(day => {
    console.log(`${new Date(day.date + ' 12:00').toDateString()}: ${day.count}`);
  });
}

export {
  createWindows,
  printWindows,
  runningAverage,
  printAverages
};
