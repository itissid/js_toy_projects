/**
Demonstrate vector transformation by matrix multiplication.
Simple Operations: stretch, shear, sqeeze and rotation

I need to create a grid and a vector on it and show the 3 operations.
Student task can be to implement:
    1. matrix multiplication with an array
    2. transformations themselves.

Compound Operations: Multiplying two or more matrices: Like a rotation followed by a squeeze.
 */

function right_mul(matrix, vector) {
    // verify the dimensions, then multiply
    var res = [];
    assertEquals(vector.length, matrix.length);
    for(var row = 0; row < matrix.length; row++) {
        // row length == column length
        assertEquals(matrix.length, matrix[row].length);
        if(row > 0) {
            // All the rows are equal in length
            assertEquals(matrix[row-1].length, matrix[row].length);
        }
    }
    // v' = vector.Matrix.
    for(var row = 0; row < matrix.length; row++) {
        var s = 0;
        for( var col = 0; col < matrix[row].length; col++) {
            s += vector[col] * matrix[row][col];
        }
        res.push(s);
    }
    return res;
}

function stretch(k, vector, axis) {
    /**
     * Returns a stretched vector
     */

}

function squeeze(k, vector) {
    /**
     * Returns a squeezed vector
     */
    foo;
}

function rotate(angle_degrees, vector, direction) {
    /**
     * Returns a rotated vector
     */

}

function animate_transformation(vector,
    transformation_string,
    factor_opt, // for stretch and squeeze ops
    axis_opt,// Only for stretch 
    angle_opt, // Only for rotation and should be angle in degrees
    direction_opt, // Only for direction. Valid values are "cw" and "ccw"
    matrix_opt // for custom transform only
) {
    /* DO NOT CHANGE THIS UNLESS YOU WANT TO CHANGE THE ANIMATIONS IN SOME WAY; typically when adding a new transformation string or fixing an animation bug.
     Ok lets do this:  
     * Clear the canvas. Draw a grid. Draw the vector. Apply the
     * transformation. Draw the transformed vector.
           This would try to be a seamless animation from the original to the
    final vector. Find the difference between the two vectors and find |l|/10
    points on it. Then animate by drawing points that traces a path along these points.
    TODO: It won't be perfect: rotating more than 180 will animate the rotation in the complimentary direction. To fix this we need to customize the rotation animation to track points along the arc and not the difference vector.
    */
    var null_undef = [undefined, null, ""];
    if(transformation_string === "stretch"){
        assertNotEqualAny(factor_opt, null_undef, "Expected factor argument for " + transformation_string);
    } else if(transformation_string === "squeeze") {
        assertNotEqualAny(factor_opt, null_undef, "Expected factor argument for " + transformation_string);
    } else if(transformation_string === "rotate") {
        assertNotEqualAny(angle, null_undef, "Expected angle argument for " + transformation_string);
        assertAnyEquals(direction_opt, ["cw", "ccw"], "Expect direction to be one of 'cw' or 'ccw'")
    } else if(transformation_string === "custom") {
        assertNotEqualAny(matrix_opt, null_undef,  "Expected factor for " + transformation_string);

        var transformed_vector = right_mul(matrix_opt, vector);
        var tracking_points = [];
        if(transformed_vector[0] === vector[0]) {
            // create a point list with different y coordinates
            var delta = (transformed_vector[1] - vector[1])/10;
            for(var i == 0; i < 10; i++) {
                tracking_points.push([transformed_vector[0], vector[1] + delta*10]);
            }
        } else if (transformed_vector[1] === vector[1]) {
            // create a point list with different x coordinates
            var delta = (transformed_vector[0] - vector[0])/10;
            for(var i == 0; i < 10; i++) {
                tracking_points.push([vector[0] + delta*10, transformed_vector[1]]);
            }

        } else {
            // create a point list with different x coordinates
            var x_delta = (transformed_vector[0] - vector[0])/10;
            var y_delta = (transformed_vector[1] - vector[1])/10;
            for(var i == 0; i < 10; i++) {
                tracking_points.push([vector[0] + x_delta*10, 
                    vector[1] + y_delta*10]);
            }
            
        }
        // Draw a Grid
        //
        //

    } else {
        throw Error("Undefined transformation: "+ transformation_string+" make sure its one of stretch, squeeze, rotate, custom")
    }
    // Now animate

}

function draw_grid() {
}

function draw_vector() {
}
/*********************************************************/
/*********** ADD ALL THE TEST FUNCTIONS HERE. *************/
/*********************************************************/
function test_right_mul() {
    // Readers, ignore this call its used for accounting purposes only
    var m = [[ 5, 1],
             [ 1, 2]];
    var res = right_mul(m, [1, 2]);
    assertVecEquals(res, [7, 5]);
    _incr_test_ct(); // no decorators :( but this is fine for now
}


function test_shear() {
    //_incr_test_ct(); // no decorators :( but this is fine for now
}

function test_stretch() {
    //_incr_test_ct(); // no decorators :( but this is fine for now
}

function test_squeeze() {
    //_incr_test_ct(); // no decorators :( but this is fine for now
}


function test_rotate() {
    //_incr_test_ct(); // no decorators :( but this is fine for now
}

var EXPECTED_TEST_COUNT = 1; // SET ME TO THE # of tests you are gonna execute.
function call_all_tests() {
        test_right_mul();
        ////test_stretch();
        ////test_squeeze();
        ////test_rotate();
}

/***************************************************************************************/
/**** Boiler plate code meant to test your code. **************************************/
/**** Do not touch this unless you know what you are doing.****************************/
/**************************************************************************************/
var ACTUAL_TESTS_EXECUTED = 0;
function test_all() {
    try {
        call_all_tests();
        // Hackish way to verify the total number of tests, but this will do for now
        assertEquals(EXPECTED_TEST_COUNT, ACTUAL_TESTS_EXECUTED, "You executed "+
          ACTUAL_TESTS_EXECUTED + " tests, but I expected only " +
          EXPECTED_TEST_COUNT +
          ". Make sure you add a call to your tests in call_all_tests() and call _incr_test_ct() at the end of each test.");
    } finally {
        ACTUAL_TESTS_EXECUTED = 0;
    }
}

function _incr_test_ct(){
    if(ACTUAL_TESTS_EXECUTED > EXPECTED_TEST_COUNT) {
        throw Error("Total tests executed(" + ACTUAL_TESTS_EXECUTED+ ") exceeded what you set("+EXPECTED_TEST_COUNT + "). Make sure EXPECTED_TEST_COUNT is set to the actual number of tests you run");
    }
    ACTUAL_TESTS_EXECUTED++;
}

function assertVecEquals(x1, x2) {
    assertEquals(x1.length, x2.length, " Expect vectors x1, x2 to be of equal length. "+ x1.length + "!= "+ x2.length);
    for(var i = 0; i < x2.length; i++) {
        assertEquals(x1[i], x2[i], "Vector x1 and x2 are not the same.\nx1:" + x1+ "\nx2: "+x2);
    }
}

function assertAnyEquals(x1, x2s, msg) {
    for(var i = 0; i < x2s.length; i++) {
        if(x1 === x2s[i]) {
            return;
        }   
    }
    throw Error(msg+"\nExpected one of "+x2s+ " to equal"+ x1);

}

function assertEquals(x1, x2, msg) {
    if(x1 !== x2) {
        throw Error(msg+"\nAssert x1===x2, but "+x1+"!=="+x2);
    }
}

function assertNotEqualAny(x1, x2s, msg) {
    // none of the values in x2s is equal to x1
    for(var i = 0; i < x2s.length; i++) {
        assertNotEqual(x1, x2s[i], msg);
    }
}

function assertNotEquals(x1, x2, msg) {
    if(x1 === x2) {
        throw Error(msg+"\nAssert x1!=x2, but "+x1+"==="+x2);
    }
}

test_all();
console.log("All tests run ")
