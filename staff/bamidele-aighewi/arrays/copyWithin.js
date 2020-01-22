'use strict';

/*

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin

The copyWithin() method shallow copies part of an array 
to another location in the same array and returns it without modifying its length.

- return value
    The modified array.
*/

function copyWithin(array, index, start, end) {
    var rangeValues = [];
    start = typeof start === 'undefined' ? 0 : start;
    end = typeof end === 'undefined' ? array.length : end;
    index = typeof index === 'undefined' ? 0 : index;

    if(end > array.length) end = array.length
    if(end < start) end = start;

    for(var x = start; x < end; x++){
        rangeValues[rangeValues.length] = array[x];
    }

    for(var x = 0; x < rangeValues.length; x++) {
        array[index] = rangeValues[x];
        index++;
    }

    return array;
}