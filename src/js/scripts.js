//= jquery.min.js
//= jquery.bxslider.min.js
//= jquery.imgRotate.js
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
$('.slider-subdomain ul').bxSlider({
  mode: 'fade',
  captions: true
});
$('.imgblock').imgRotate({
	nameformul: '00001',
	delimiter: '',
	way: 'http://collazyer.ru/img/r2/',
	direction:'right',	
	mode: 'auto',
	speed: 2000	
});