timestamp-binning
=================

A small module that bins past timestamps into desired intervals and creates an histogram array.

## Installation

`npm install timestamp-binning`

## Usage
```js
var timestampBinner = require('timestamp-binning');

//cretae a new timestamp binner:
var evalPeriod = "week";
var binSize = "day";
var binner = new timestampBinner(evalPeriod, binSize);

//some dummy timestamps (dates) as examples:
var d1 = new Date(2014, 5, 27, 21, 20, 0, 0);
var d2 = new Date(2014, 5, 29, 2, 20, 0, 0);
var d3 = new Date(2014, 5, 28, 23, 20, 0, 0);

//add an array of time stamps:
binner.addTimestamps([d1, d3, d3, d3, d2]);

console.log(binner.hist);
//will output: [ 0, 0, 0, 0, 1, 3, 1 ]

//add a single timestamp
binner.addTimestamp(d1);

console.log(binner.hist);
//will output: [ 0, 0, 0, 0, 2, 3, 1 ]
```

### More options

Possible bin sizes are: **day, hour, minute, second**
Available evaluation periods are: **week, day, hour**