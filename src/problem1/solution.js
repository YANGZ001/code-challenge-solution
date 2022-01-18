var sum_to_n_a = function(n) {
	// your code here
	return n * (n+1) / 2;
};

var sum_to_n_b = function(n) {
	// your code here
	let res = 0;
	for (i = 1; i <= n; i++) {
		res += i;
	}
	return res;
};

var sum_to_n_c = function(n) {
	// your code here
	let helper = function(n) {
		if (n == 1) return 1;
		return n + helper(n-1);
	}
	return helper(n);
};

