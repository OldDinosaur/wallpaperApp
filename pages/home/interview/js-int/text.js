function test() {
	for (var i = 0; i < 4; i++) {
		console.log(i)
	}
	for (var i = 0; i < 4; i++) {
		setTimeout(() => {
			console.log(i)
		}, 1000)
	}
	for (let i = 0; i < 4; i++) {
		setTimeout(() => {
			console.log(i)
		}, 1000)
	}
}

function test1 (){
	const a =1
	const b =2
	this.c = 3
	this.d = 4
	// return {a:1}
}
 
let obj = new test1() 
console.log(obj.bb());
// let obj1 = test1()
// console.log(obj1); 
export {
	test
}