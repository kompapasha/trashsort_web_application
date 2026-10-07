param n;
param m;

set I= 1..m;
set J= 1..n;

param c{J};
param b{I};
param a{I,J};

var x{J} >=0;

maximize F: sum {j in J} c[j] * x[j];
subject to y{i in I}: sum {j in J} a[i,j] * x[j] <= b[i];



data;
param n:=5;
param m:=5;

param c [1] 84  [2] 5.7 [3] 0   [4] 10   [5] -3;
param b [1] -50 [2] 120 [3] 600 [4] -600 [5] -210;


param a:   1      2      3      4      5   :=
      1   -4     -8.5   -16     0     -10
      2    10.4   0      6      2      4
      3    19     18     0     -20     30
      4   -19    -18     0      20    -30
      5   -200   -45     8     -3.4    0   ;
      
      
      
solve;
display F, x;
