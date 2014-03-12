var methods = {

    // Straightforward recursive implementation. Exponential complexity.
    fibNaive: function(n) {
        var fib = methods.fibNaive;
        if (n < 2){
            return n;
        } else {
            return fib(n - 2) + fib(n - 1);
        }    
    },
    
    // Memoized. Linear complexity.
    fibMemo: (function() {
        var cache = {};
        var fib = function(n) {
            if (typeof cache[n] === 'undefined') {
                cache[n] = n < 2 ? n : fib(n - 2) + fib(n - 1);
            }
            return cache[n];
        };
        return fib;
    })(),
    
    // Memoized with generic function wrapper. Linear complexity.
    fibMemoGeneric: memoize(function(n) {
        var fib = methods.fibMemoGeneric;
        if (n < 2){
            return n;
        } else {
            return fib(n - 2) + fib(n - 1);
        }        
    }),
    
    // Loop-based. Linear complexity.
    fibLoop: function(n) {
        var first = 0,
            second = 1,
            tmp;
        for (var i = 2; i < n; i += 1) {
            tmp = first + second;
            first = second;
            second = tmp;
        }
        return first + second;
    }
}

// Generic memoization function
function memoize(func) {
    var cache = {};
    return function(arg){
        if (typeof cache[arg] === 'undefined') {
            cache[arg] = func(arg);
        }
        return cache[arg];
    }
}

// Performance monitoring function
function test(name, index) {
    var label = name + ' ' + index;
    console.time(label);
    methods[name](index);
    console.timeEnd(label);
}

test('fibNaive', 40);
test('fibMemo', 400);
test('fibMemoGeneric', 400);
test('fibLoop', 400);
