const fs = require('fs');

// // tasks queue     [immediate,readFile]
// //microtask queue  [nextTick1,resolve,]
//
//
//
// console.log('start'); //1
//
// fs.readFile(__filename, (err,content)=>{
// 	console.log('read file'); //7
// });
//
// setImmediate(()=>{
// 	console.log('immediate'); //6
// });
//
// new Promise(resolve => {
// 	console.log('promise create'); //2
// 	resolve('promise then');
// }).then(value => console.log(value)); //5
//
// process.nextTick(()=>{
// 	console.log('nextTick1'); //4
// });
//
// console.log('end'); //3

// какой порядок вывода в console ?

// microqueue = [promise];
// tasksqueue = [setInterval,setTimeout, setTimepoutWithPromise, setInterval,setTimeout];




const intervalId = setInterval(() => {
	console.log('setInterval'); //2 iteration 1 call | 5 iteration 1 call
}, 10);

setTimeout(() => {
	console.log('setTimeout 1'); //3iteration 1 call
	
	const promise = new Promise((resolve, reject) => {
		resolve('then 4');
	});
	
	promise
		.then((value) => {
			console.log(value); // 3iteration 2 call
			
			setTimeout(() => {
				console.log('setTimeout 2'); // 6 iteration 1 call
				clearInterval(intervalId);
			}, 10);
		});
}, 10);

const promise = new Promise((resolve, reject) => {
	resolve('then 1');
});

promise
	.then((value) => {
		console.log(value); //1 iteration 1 call
		return 'then 2';
	})
	.then((value) => {
		console.log(value); //1 iteration 2 call
		
		return new Promise((resolve, reject) => {
			setTimeout(resolve, 10, 'then 3');
		});
	})
	.then((value) => {
		console.log(value); //4 iteration 1 call
	});


/*
 then1
 then2
 setInterval
 setTimeout1
 then4
 then3
 setInterval
 setTimeout2
 
 */




























