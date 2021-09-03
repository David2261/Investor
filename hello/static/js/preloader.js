var zzz = document.getElementById("xxx");
function fadeOutnojquery(el){
	el.style.opacity = 1;
	var interhellopreloader = setInterval(function(){
		el.style.opacity = el.style.opacity - 0.05;
		if (el.style.opacity <=0.05){
			clearInterval(interhellopreloader
				);
			zzz.style.display = "none";
		}},16);
}
window.onload = function(){
	setTimeout(function(){
		fadeOutnojquery(zzz);
	},3000);
};