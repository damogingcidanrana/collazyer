//= jquery.min.js
//= jquery.bxslider.min.js
//= jquery.imgRotate.js

$('.slider-subdomain ul').bxSlider({
  mode: 'fade',
  captions: true
});
$('.imgblock').imgRotate({
	nameformul: '00001',
	delimiter: '',
	way: '/img/r2/',
	direction:'right',	
	mode: 'auto',
	speed: 2000	
});