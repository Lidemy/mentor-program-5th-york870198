function printFactor(n) {
	for(let i = 1; i<=(n/2); i++){ //這邊是在偷懶，2 是最小的質數，所以除了自己以外的最大可能因數就是 n/2，以上的都不用測
		if(n%i===0){
			console.log(i);
		}
	}
	console.log(n); //忘了自己也是因數，補上這行把自己印上去
}

printFactor(10);
