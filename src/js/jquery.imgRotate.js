;(function ( $, window, document, undefined ) {

	var pluginName = 'imgRotate',
	defaults = {	
		mode: 'auto',				//[ 'auto' || 'manual'] default: 'auto'
		way: '/',                 	//default: в корне	
		nameformul: 'img',			//Формула имени, можно задать имя любой по порядку картинки
		delimiter: '_',				//Разделитель между именем и индексом	
		speed: 1500,				//Скорость, чем больше значение тем медленнее	
		buttons: '.stop, .start',	//кнопки	
		direction:'right',			//['right' || 'left'] default: 'right' Направление кручения
		step:7						//Управление скроллбаром, количество пикселей для одного шага скроллбара
		};
	function Plugin( element, options ) {

		this.element = element;
		var default_speed = defaults.speed;
		var default_step = defaults.step;
		this.options = $.extend(defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		var buttons = new Array();	
		buttons = this.options.buttons.split(", ");
		if (buttons.length < 2) {buttons = this.options.buttons.split(",");}
		if (buttons.length < 2) {buttons = this.defaults.buttons.split(", ");}
		this.stop = buttons[0];
		this.starting = buttons[1];	
		if (typeof(this.options.speed)=='number') {this.speed = this.options.speed;}
		else {this.speed = default_speed;}
		this.delimiter = this.options.delimiter;
		this.mode = this.options.mode;
		this.nameformul = this.options.nameformul;
		this.way = this.options.way;
		this.direction = this.options.direction;
		if ((typeof(this.options.step)=='number') && (this.options.step>0)) {this.step = this.options.step;}
		else {this.step = default_step;}
		this.init();

	}

	Plugin.prototype.init = function () {
		this.treatment = function () {
			index_formule = this.nameformul.substring(this.nameformul.indexOf(this.delimiter)+1,this.nameformul.length);
			pre = this.way+this.nameformul.substring(0,this.nameformul.indexOf(this.delimiter))+this.delimiter;
			var k = index_formule.substring(index_formule.match(/[^0]+/).index,index_formule.length).length-1;

			index_formule = index_formule.substring(0,index_formule.match(/[^0]+/).index);
			for (var i=0;i<k;i++){
				index_formule += '0';
			}
		}	
		this.rewrite = function (index) {
			prefind = index_formule.substring(0,index_formule.length-(index.toString().length-1))+index;
		  	imgattr = pre+prefind+'.png';
		}
		this.testimg = function () {
			this.rewrite(index+1);
			var imgtest = new Image();
			imgtest.src = imgattr;
			imgtest.onerror = function(){
				clearInterval(timerId);
				$progress_bar.css('display','none');
				if (imgcache.length==0) {
					console.log('Неверный путь, формула имени или разделитель');
					that.hideall();
				} else {
					if (mode == 'auto') {
						index = 0;
						time = speed/imgcache.length;
						that.autoscroll();
						that.showall();
					}
					if (mode == 'manual') {
						$scrollbar.width($over.width()-((imgcache.length-1)*(step+1)));
						if ($scrollbar.width()<30) {
							step = Math.ceil(($over.width()-80)/(imgcache.length-1))-1;
							$scrollbar.width($over.width()-((imgcache.length-1)*(step+1)));
						}
						$img.attr('src',imgcache[0].src);
						that.showall();
					}
					if (mode != 'manual' && mode != 'auto')
					{
						console.log('Такого режима не существует');
						that.hideall();
					}
				}
			};
			this.rewrite(index);
		}
		this.directscroll = function () {
			if (direction == 'left') {
				if (index == 0) {index=imgcache.length;}
				index -= 1;
			}
			else 
			{
				if (index == (imgcache.length-1)) {index=-1;}
				index += 1;
			}
		}
		this.autoscroll = function () {
			 timerId = setInterval(function() {
			 	$img.attr('src',imgcache[index].src);
			 	that.directscroll();
			  },time);
		}
		this.first_scroll_function = function() {
			if (index>0) {
			  	var image = new Image(); 
			  	image.src = imgattr;
			  	imgcache.push(image);
			}
			that.testimg();
			index+=1;
			that.rewrite(index);
		}
		this.first_scroll = function () {
			this.treatment();
			index = 0;
			this.rewrite(index);			
			timerId = setInterval(that.first_scroll_function,100);
		}

		this.manual = function(cord) {
			try{
				$img.attr('src',imgcache[Math.ceil(cord/step)].src);
			}catch(e){}
		}
		this.hideall = function() {
			$img.css('display','none');
			$stop.css('display','none');
			$start.css('display','none');
			$over.css('display','none');
		}
		this.showall = function() {
			$img.css('display','block');
			if (mode=='auto') {
			$stop.css('display','inline-block');
			$start.css('display','inline-block');
			}
			if (mode=='manual'){
			$over.css('display','block');}
		}
		var mode = this.mode;
		if (mode == 'manual') {$(this.element).prepend('<div class="over"><div class="flow"></div></div>');}
		$(this.element).prepend('<img src="" unselectable="on">');
		$(this.element).prepend('<div class="progress-bar"></div>');
		var $img = $(this.element).find('img');
		var $stop = $(this.element).find(this.stop);
		var $start = $(this.element).find(this.starting);
		var $over = $(this.element).find('.over');
		if (mode == 'manual') {
			$stop.css('display','none');
			$start.css('display','none');
		}
		var $scrollbar = $(this.element).find('.flow');
		var $progress_bar = $(this.element).find('.progress-bar');
		var timerId;
		var imgattr;
		var prefind;
		var time;
		var index;
		var imgcache = [];
		var index_formule;
		var pre;
		var direction = this.direction;
		var speed = this.speed;
		var x1;
		var step = this.step;
		var that=this;
		/*Последовательность запуска*/
		this.hideall();
		this.first_scroll();
		$start.addClass('active');
		$(this.element).attr("unselectable", "on").select(function() {return false}).css({
			"-moz-user-select": "-moz-none",
			"-o-user-select": "none",
			"-khtml-user-select": "none",
			"-webkit-user-select": "none",
			"user-select": "none"
		});
		/*Последовательность запуска*/
		$stop.mouseup(function(){
			clearInterval(timerId);
			$stop.addClass('active');
			$start.removeClass('active');
		});
		$start.mouseup(function(){
			clearInterval(timerId);
			$stop.removeClass('active');
			$start.addClass('active');
			that.autoscroll();
		});
		$img.mousedown (function(e){
		    e.preventDefault();
		    x1=e.clientX;
		});
		$img.mouseup (function(e){
			if (e.clientX>x1) {direction = 'right';} else {direction = 'left';}
		});
		$scrollbar.mousedown (function(e){
			var coords = $over.offset();
			var coords_2 = $scrollbar.offset();
			var shiftX = e.pageX - coords_2.left;
			$scrollbar.addClass('active');
			$(document).mousemove (function(e){
				var left_pos = e.pageX - shiftX - coords.left;
				if (left_pos>($over.width()-$scrollbar.width())) {left_pos =$over.width()-$scrollbar.width();}
				if (left_pos<0) {left_pos = 0;}
				$scrollbar.offset({left:left_pos+coords.left}); 
				that.manual(left_pos);
			});
			$(window).mouseup (function(){
				$(document).off('mousemove');
				$scrollbar.removeClass('active');
			});
		});	

	// доступ к DOM, и входным параметрам через объект, типа this.element и this.options
	};

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );