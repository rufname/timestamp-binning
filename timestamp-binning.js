#!/bin/env node
"use strict";

module.exports = function(evalPeriodString, binSizeString, excludeBursts) {
	//the parameter excludeBursts allows to disregard any additional timestamps
	//for a bin that had already seen a timestamp. This makes the histrogram
	//to only have values 0 or 1.
	if (typeof excludeBursts === "undefined") {
		excludeBursts = false;
	}

	//the week starts on Monday at 00:00 am
	//calculate the reference date (the next Monday based on the current date)
	var now = new Date();
	var oneDay = 1000*60*60*24;
	var dayOfWeek = now.getDay();
	var day = now.getDate();
	var month = now.getMonth();
	var year = now.getFullYear();	
	var refDate = new Date((new Date(year, month, day, 0,0,0,0)).getTime() + oneDay * (8-dayOfWeek));
	
	var binSize = 3600000; //in msec, default: 1000 * 60 * 60 = 1 hour	
	//day, hour, minute, second	
	switch (binSizeString.toLowerCase()) {
		case "day":
			binSize = 86400000; //1000 * 60 * 60 * 24 = 1 day
			break;
		case "hour":
			binSize = 3600000; //1000 * 60 * 60 = 1 hour
			break;
		case "minute":
			binSize = 60000; //1000 * 60 = 1 minute
			break;
		case "second":
			binSize = 1000; //1000 = 1 second
			break;
	}
	
	var evalPeriod = 604800000 / binSize;	//default: 1 week = 1000*60*60*24*7
	//evalPeriod also corresponds to the number of possible bins
	//week, day, hour
	switch (evalPeriodString.toLowerCase()) {
		case "week":
			evalPeriod = 604800000 / binSize;
			break;
		case "day":
			evalPeriod = 86400000 / binSize;
			break;
		case "hour":
			evalPeriod = 3600000 / binSize;
			break;
	}
	
	//initialize histogram array:
	this.hist = [];
	for (var i = 0; i < evalPeriod; i++) {
		this.hist[i] = 0;
	}


	
	//public properties and functions:	
	return {
		hist: this.hist,
		
		getBin : function (date) {
			//bins start at 0
			return Math.floor(evalPeriod - ((refDate.getTime() - date.getTime()) / binSize) % evalPeriod);
		},
		
		addTimestamp : function (date) {
			//add one timestamp
			var bin = Math.floor(evalPeriod - ((refDate.getTime() - date.getTime()) / binSize) % evalPeriod);
			if (excludeBursts) {
				this.hist[bin] = 1;
			} else {
				this.hist[bin]++;
			}
		},
		
		addTimestamps : function (dates, excludeBurstsOnce) {
			//add an array of timestamps		
			//excludeBurstsOnce allowes to only count one occurence
			//in each bin for the addition of this dates array
			if (typeof excludeBurstsOnce === "undefined") {
				excludeBurstsOnce = false;
			}		
			var updated = [];		//used to keep track of updated bins in histogram.
			
			for (var i in dates) {
				var bin = Math.floor(evalPeriod - ((refDate.getTime() - dates[i].getTime()) / binSize) % evalPeriod);
				if (excludeBursts) {
					this.hist[bin] = 1;
				} else {
					if (excludeBurstsOnce && !updated[bin]) {
						this.hist[bin]++;
						updated[bin] = true;	//mark bin as updated => do not increment again
					} else if (!excludeBurstsOnce) {
						this.hist[bin]++;
					}
				}			
			}
		}
	};
};
