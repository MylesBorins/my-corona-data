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
import { Temporal } from "proposal-temporal/polyfill/lib/index.mjs";

const DEFAULT_WINDOW_LENGTH = 3;

const counties = [
  'New York',
  'Kings',
  'Queens',
  'Bronx',
  'Richmond'
];

function createWindows(arr, totalLength = 30, windowLength = DEFAULT_WINDOW_LENGTH) {
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

function printWindows(windowTitle, windows, totalLength = 30, windowLength = DEFAULT_WINDOW_LENGTH) {
  const step = windowLength / 2;
  for (let i = 0; i < windows.length; i++) {
    console.log(`Average ${windowTitle} between ${totalLength - Math.floor(i * step)} and ${totalLength - (Math.floor(i * step) + windowLength)} days ago: ${average(windows[i])}`);
  }
}

// Parse a string like "3/11/20" to a Temporal.Date
// This is complicated: see https://github.com/tc39/proposal-temporal/issues/515
function parseMDYToTemporal(mdyString) {
  // Step 1: parse the date using the JS Date constructor.
  // jsDate is set to midnight on the parsed date in my current time zone.
  const jsDate = new Date(mdyString);

  // Step 2: convert to a Temporal.Absolute.
  const absolute = Temporal.Absolute.fromEpochMilliseconds(jsDate);

  // Step 3: convert to a Temporal.DateTime using my current time zone.
  const dateTime = absolute.inTimeZone(Temporal.now.timeZone());

  // Step 4: get out the date
  return dateTime.getDate();
}

// TODO: Make this configurable
const LOCALE = 'en-US';

export {
  LOCALE,
  Temporal,
  counties,
  createWindows,
  printWindows,
  parseMDYToTemporal,
};
