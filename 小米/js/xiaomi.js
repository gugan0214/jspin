/*
* @Author: l
* @Date:   2017-10-10 21:12:59
* @Last Modified by:   l
* @Last Modified time: 2017-10-15 19:33:33
*/
// 内容
{
	function fenzhuang(prem){
		let dians=prem.querySelectorAll(".lunbo");
		let kuan=prem.querySelector(".list-ty");
		let le =prem.querySelector(".kuohao-left");
		let ri =prem.querySelector(".kuohao-right");
		dians.forEach(function(val,index){
			val.onclick=function(){
			for(let i=0;i<dians.length;i++){
				dians[i].classList.remove("active");
			}
			val.classList.add("active");
			kuan.style.marginLeft="-296"*index+"px";
			now=index;
			}
		});
		let now=0;
		ri.onclick=function(){
			fn1("r");
		}
		le.onclick=function(){
			fn1("l");
		}
		function fn1(ele="r"){
			if (ele=="r") {
				now++;
				if (now===dians.length) {
				now=dians.length-1;
				}
			}else if (ele=="l") {
				now--;
				if (now===-1) {
				now=0;
				}
			}
			for(let i=0;i<dians.length;i++){
				dians[i].classList.remove("active");
			}
			dians[now].classList.add("active");
			kuan.style.marginLeft="-296"*now+"px";
		}
	}
	let list =document.querySelectorAll(".neirong-list");
	for(let i=0;i<list.length;i++){
		fenzhuang(list[i]);
	}
}
//选项卡
{
	function dianqis(pres){
		let dhWz = pres.querySelectorAll(".daohang-wenzi");
		let dqRt = pres.querySelectorAll(".dianqi-right");
		dhWz.forEach(function(val,index){
			val.onmouseover=function(){
				for(let i = 0;i<dhWz.length;i++){
					dhWz[i].classList.remove("active");
					dqRt[i].style.display="none";
				}
				val.classList.add("active");
				dqRt[index].style.display="block";
			}
		})
	}
	let wer = document.querySelectorAll("#dianqi");
	for(let i=0;i<wer.length;i++){
		dianqis(wer[i]);
	}
}
// banner图
{
	let dians = document.querySelectorAll(".dianbox li");
	let imgs=document.querySelectorAll(".bannerbox li");
	dians.forEach(function(val,index){
		val.onclick=function(){
			for(let i=0;i<dians.length;i++){
				dians[i].classList.remove("active");
				imgs[i].classList.remove("active");
			}
			val.classList.add("active");
			imgs[index].classList.add("active");
			now = index;
		}
	});
	let now = 0;
	let st=setInterval(fn,2000);
	function fn(dir="r"){
		if (dir=="r") {
			now++;
		}else if (dir=="l") {
			now--;
			if (now==-1) {
				now=dians.length-1;
			}
		}
			if (now===dians.length) {
				now=0;
			}
			for(let i=0;i<dians.length;i++){
					dians[i].classList.remove("active");
					imgs[i].classList.remove("active");
				}
				dians[now].classList.add("active");
				imgs[now].classList.add("active");
	}
	let bann = document.querySelector(".banner");
	bann.onmouseover=function(){
		clearInterval(st);
	}
	bann.onmouseout=function(){
		st=setInterval(fn,2000)
	}
	let le = document.querySelector("#left");
	let ri = document.querySelector("#right");
	ri.onclick=function(){
		fn();
	}
	le.onclick=function(){
		fn("l");
	}
}
// 单品啊
{
	let dan =document.querySelectorAll("#danpin");
	for(let i=0;i<dan.length;i++){
		fen(dan[i]);
	}
	function fen(denr){
		let right=denr.querySelector(".right");
		let left=denr.querySelector(".left");
		let bt=denr.querySelector(".danpin-bottom");
		let mm=denr.querySelector(".danpin-anniu");
		right.onclick=fn1;
		function fn1(){
			right.classList.add("active");
			left.classList.remove("active");
			bt.style.marginLeft="-1240px";
		}
		left.onclick=fn2;
		function fn2(){
			right.classList.remove("active");
			left.classList.add("active");
			bt.style.marginLeft="0";
		}
		let i = 1;
		 let er=setInterval(fn3,3000);
		 function fn3(){
			i++;
			if (i%2==0) {
					fn1();
				}else{
					fn2();
				}
		}
		mm.onmouseover=function(){
			clearInterval(er);
		}
		mm.onmouseout=function(){
			er=setInterval(fn3,3000);
		}
	}	
}