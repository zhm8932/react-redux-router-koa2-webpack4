import React from "react";


var resolveAfter2Seconds = function() {
	console.log("starting slow promise");
	return new Promise(resolve => {
		console.log("xxxx--1111111111")
		setTimeout(function() {
			resolve(20);
			console.log("slow promise is done");
		}, 2000);
		console.log("xxxx--222222222")
	});
};

var resolveAfter1Second = function() {
	console.log("starting fast promise");
	return new Promise(resolve => {
		console.log("xxxx--33333333333")
		setTimeout(function() {
			resolve(10);
			console.log("fast promise is done");
		}, 1000);
		console.log("xxxx--444444444")
	});
};

var sequentialStart = async function() {
	console.log('==SEQUENTIAL START==');

	// 如果 await 操作符后的表达式不是一个 Promise 对象, 则它会被转换成一个 resolved 状态的 Promise 对象
	const slow = await resolveAfter2Seconds();
	console.log("1111111")
	const fast = await resolveAfter1Second();
	console.log("2222222222")
	console.log("slow:",slow);
	console.log("fast:",fast);
}

sequentialStart();

const Home =()=>(
	<div className="wrapper home">
		
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>
		<h1>Hello, world Koa 2!</h1>d
		<p>首页</p>
	 
	</div>
);


let obj1 = {
	a:1,
	b:2
}
let obj2 = {
	...obj1,
	c:2
}
console.log("obj1:",obj1)
console.log("obj2:",obj2);

export default Home;
