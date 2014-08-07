#!/bin/env node
"use strict";

var inspect = require('eyes').inspector({maxLength: 3000});	//only for testing
var timestampBinner = require('./timestamp-binning.js');	//My own module

var binner1 = new timestampBinner("week", "day");
var binner2 = new timestampBinner("day", "hour");
var d1 = new Date(2014, 5, 27, 21, 20, 0, 0);
var d2 = new Date(2014, 5, 29, 2, 20, 0, 0);
var d3 = new Date(2014, 5, 28, 23, 20, 0, 0);
binner1.addTimestamps([d1, d3, d3, d3, d2]);
binner2.addTimestamps([d1, d1, d3, d3, d3]);
inspect(binner1.hist);
inspect(binner2.hist);