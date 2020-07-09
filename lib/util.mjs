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

function createWindows(arr, totalLength = 60, windowLength = DEFAULT_WINDOW_LENGTH) {
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

function printWindows(windowTitle, windows, totalLength = 60, windowLength = DEFAULT_WINDOW_LENGTH) {
  const step = windowLength / 2;
  for (let i = 0; i < windows.length; i++) {
    console.log(`Average ${windowTitle} between ${totalLength - Math.floor(i * step)} and ${totalLength - (Math.floor(i * step) + windowLength)} days ago: ${average(windows[i])}`);
  }
}

export {
  createWindows,
  printWindows
};
