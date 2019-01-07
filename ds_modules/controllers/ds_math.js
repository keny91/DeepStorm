/**
 * This documents contains algorthms that vary from very fundamental
 * to more complex clutter detection tecniques.
 */

var rn = require('random-number');
var stats = require('stats-lite');

// var gen = rn.generator({
//   min:  -1000
// , max:  1000
// , integer: true
// })
// gen(500) // example outputs → 735
// gen(500, null, false) // example outputs → 828.6001032683998


/**
 * 
 * @param {Array of numeric samples} theArray 
 */
function OrderArray_High2Low(theArray)
{
    var temp_ordered_array = [];
     // First order array
     for(let i = 0; i< theArray.length; i++){
        let temp_value = theArray[i];
        if (count == 0) // First time
        {
            temp_ordered_array.push(theArray[i]);
        } 
        else 
        {
            let inserted = 0;
            // go one-by-one finding the appropiate insertion position
            for(let j=0; j < temp_ordered_array.length;j++)
            {
                if(temp_value <= temp_ordered_array[j])
                {
                    temp_ordered_array.splice(j, 0, temp_value);
                    inserted = 1;
                    break;
                }
            }

            // if we have not yet inserted it, means that this is the largest value so far
            if (!inserted)
                temp_ordered_array.push(theArray[i]);


        }

    }

    return temp_ordered_array;

}



/**
 * 
 * @param {Array of numeric samples} theArray 
 * @param {Number of samples to be split} nof_samples 
 * 
 * THIS FUNCTION NEEDS TO BE VERIFIED
 */
function getHighestArrayValues(theArray, nof_samples)
{
    let count = 0;
    let ArrayLength;
    var outArray = [];
    let temp_ordered_array  = OrderArray_High2Low(theArray)
    ArrayLength = temp_ordered_array.length;

    for(let i = 0; i < ArrayLength ; i++)
    {
        outArray.push(temp_ordered_array(i));
    }

    return outArray;
}

/**
 * 
 * @param {Array of numeric samples} theArray 
 * @param {Number of samples to be split} nof_samples 
 * 
 * THIS FUNCTION NEEDS TO BE VERIFIED
 */
function getLowestArrayValues(theArray, nof_samples)
{
    let count = 0;
    let ArrayLength;
    var outArray = [];
    let temp_ordered_array  = OrderArray_High2Low(theArray)
    ArrayLength = temp_ordered_array.length;

    for(let i = 1; i >= ArrayLength-i ; i++){
        outArray.push(temp_ordered_array(ArrayLength - i));
    }

    return outArray;
}


function CalculateStandardDeviation(theArray)
{
    
    for(let i = 0; i < ArrayLength ; i++){
        outArray.push(temp_ordered_array(ArrayLength - i));
    }
} 

/** Find the distance between the maximum and minimum value of a numeric array.
 * 
 * @returns {Array} [distance, max, min]
 * @param {Number} theArray the array 
 */
function CalculateArrayDifference(theArray)
{
    let min = -1, max = -1;

    for(let i = 0; i < ArrayLength ; i++)
    {
        // determine if is the minimum value so far
        if(min==-1 || theArray[i] < min){
            min = theArray[i];
        }

        // determine if is the minimum value so far
        if(max==-1 || theArray[i] > max){
            max = theArray[i];
        }
    }

    return [max-min,max,min];
}

