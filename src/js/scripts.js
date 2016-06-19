//= jquery.min.js
//= jquery.bxslider.min.js
$(".button").on('click',function(){
	show_modal($(this).attr('class').replace('button ',''));
});
$(document).on("click",".overlay",function(){
	if ($(event.target).closest(".modal-inner>div").length) return;
	$(".overlay").hide();
});
function show_modal(form) {
	$('.modal-inner>div').hide();
	if (!$('.'+form+'-form').length) return;
	$('.overlay').css('display','table');
	$('.'+form+'-form').show();
}