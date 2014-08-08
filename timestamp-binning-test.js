#!/bin/env node
"use strict";

var inspect = require('eyes').inspector({maxLength: 3000});	//only for testing
var timestampBinner = require('timestamp-binning');	//My own module

var binner = new timestampBinner("week", "day");
//some dummy timestamps (dates) as examples:
var d1 = new Date(2014, 5, 27, 21, 20, 0, 0);
var d2 = new Date(2014, 5, 29, 2, 20, 0, 0);
var d3 = new Date(2014, 5, 28, 23, 20, 0, 0);

//add an array of time stamps:
binner.addTimestamps([d1, d3, d3, d3, d2]);

console.log(binner.hist);

//add a single timestamp
binner.addTimestamp(d1);

console.log(binner.hist);