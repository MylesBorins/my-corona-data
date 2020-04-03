function sum(arr) {
  return arr.reduce((acc, num) => {
    return acc + num;
  });
}

function average(arr) {
  return (sum(arr) / arr.length).toFixed(2);
}

function percentage(num, den) {
  return ((num / den) * 100).toFixed(2);
}

export {
  sum,
  average,
  percentage
}
