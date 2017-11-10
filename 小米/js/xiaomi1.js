/*
* @Author: l
* @Date:   2017-10-11 22:44:03
* @Last Modified by:   l
* @Last Modified time: 2017-10-11 22:44:50
*/
{
	let dhWz = document.querySelectorAll(".daohang-wenzi");
	let dqRt = document.querySelectorAll(".dianqi-right");
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