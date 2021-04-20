function join(arr, concatStr) {
	let result="";
	for (let i = 0; i < arr.length; i++) {
		result += arr[i];
		if(i != arr.length-1){
			result += concatStr;
		}
	}
	return result;
}

function repeat(str, times) {
	let result = "";
	for( let i = 0; i < times; i++){
		result += str;
	}
	return result;
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));
