var x1 >=0; 
var x2 >=0;
var x3 >=0; 
var x4 >=0;
var x5 >=0;

maximize F: 84*x1 + 5.7*x2 + 10*x4 - 3*x5;

subject to y1: 4*x1 + 8.5*x2 + 16*x3 + 10*x5 >= 50;
subject to y2: 10.4*x1 + 6*x3 + 2*x4 + 4*x5 <= 120;
subject to y3: 19*x1 + 18*x2 - 20*x4 + 30*x5 = 600;
subject to y4: 200*x1 + 45*x2 - 8*x3 + 3.4*x4 >= 210;

solve;

display F;

display x1, x2, x3, x4, x5;

