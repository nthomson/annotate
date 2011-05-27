function annotate_js(settings, existing_annotations) {
	var source_element = settings.source_element;
	var annotation_xoff = settings.annotation_xoff;
	var annotation_yoff = settings.annotation_yoff;
	var add_control = settings.add_control;
	var toggle_control = settings.toggle_control;
	var share_control = settings.share_control;

	//source_element is required
	if(source_element === undefined){return false;}
	
	if( $(source_element).css('position') == 'static') {
		$(source_element).css('position', 'relative');
	}
	
	var addIsOn = false;
	/* Menu Buttons */
	
	if(add_control !== undefined) {
		//Add button
		$(add_control).click(
			function(){
				if(addIsOn){
					nav_selection_cancel();
				}
				else {
					//Turn control on
					addIsOn = true;
					//Show "on" image
					$(this).toggleClass('selected');
					//Change cursor
					$(source_element).css('cursor', 'crosshair');
				}
			}
		);
	}

	if(toggle_control !== undefined) {
		//Toggle All button
		$(toggle_control).click(
			function(){
				$('.annotation').each(
					function(){
						annotation_toggle(this);
					}
				);
			}
		);
	}

	if(share_control !== undefined) {
		//Share button
		$(share_control).click(
			function() {
				var url = get_share_url();
				$('#share input').val(url);
				$('#share').toggle();
				$('#share input').select();
			}
		);
	}
	
	$(source_element).click(
		function(e){
			if(addIsOn){
				//Get X/Y with chat-arrow and page offsets
				var x = e.pageX - this.offsetLeft + annotation_xoff;
				var y = e.pageY - this.offsetTop + annotation_yoff;
								
				add_annotation(x, y);
			}
		}
	);

	var get_share_url = function(){
		var lefts = '';
		var tops = '';
		var strings = '';
		$('.annotation').each(
			function() {
				lefts += this.style.left.replace('px', '') +'|';
				tops += this.style.top.replace('px', '') + '|';
				strings += $(this).children('textarea').val() + '|';
			}
		);
		lefts = lefts.substring(0, lefts.length-1);
		tops = tops.substring(0, tops.length-1);
		strings = strings.substring(0, strings.length-1);
	
		return 'http://nick.kanicweb.com/projects/annotate/demo/?lefts='+lefts+"&tops="+tops+'&strings='+strings;
	}

	//Add an annotation
	var add_annotation = function(x, y, text) {
		//Create annotation
		var annotation = $(document.createElement('div')).addClass('annotation');
		
		
		//Create textbox
		var textBox = $(document.createElement('textarea'));
		$(textBox).html(text);
		
		

		//Create remove button
		var remove = $(document.createElement('a')).addClass('button remove');
		$(remove).attr('href', 'javascript:void(0)');
		$(remove).html('x');
		$(remove).click(function(){
			annotation_remove(annotation);
		});

		//Create toggle button
		var toggle = $(document.createElement('a')).attr('class', 'button toggle');
		$(toggle).attr('href', 'javascript:void(0)');
		$(toggle).html('~');
		$(toggle).click(function(){annotation_toggle( annotation );});

		
		var buttons = $(document.createElement('div')).attr('class', 'buttons');
	
		//Append everything where it needs to be
		$(toggle).appendTo(buttons);
		$(remove).appendTo(buttons);
		$(buttons).appendTo(annotation);
		$(textBox).appendTo(annotation);

	
		//Add the annotation to the DOM
		$(annotation).appendTo(source_element);
		
		var annOp = $(annotation).css('opacity');
		$(annotation).css({
			left: x + 'px',
			top: y + 'px',
			position: 'absolute',
		 
		});
		$(annotation).css('opacity', 0);
		
		var tbH = $(textBox).height();
		var tbW = $(textBox).width();
		$(textBox).css({height: 0, width: 0});

		//Animate the annotation in
		$(annotation).animate({opacity: annOp}, 800);
		$(textBox).animate({height: tbH, width: tbW}, 400,
			function(){
				$(textBox).autogrow();
				$(textBox).focus();
				nav_selection_cancel();
				$(textBox).keyup();
			}
		); 
	}

	var nav_selection_cancel = function(){
		$('.control').each(
			function(){
				$(this).removeClass('selected');
			}
		);
		//Reset controls
		addIsOn = false;

		$(source_element).css('cursor', 'default');
	}



	/* Functions required for annotations */
	var annotation_remove = function(annotation){
		$(annotation).fadeOut(300, 
			function(){
				$(this).remove()
			}
		);
	}

	var annotation_toggle = function(annotation){
		$(annotation).children('textarea').animate({height: 'toggle', width: 'toggle', opacity: 'toggle'});
	}

	//Add annotations from querystring
	var lefts = $.getQueryString('lefts');
	var tops = $.getQueryString('tops')
	var strings = $.getQueryString('strings')
	
	if(lefts != undefined){
		lefts = lefts.split('|');
		tops = tops.split('|');
		strings = strings.split('|');
		for(var x = 0; x < strings.length; x++) {
			if(lefts[x] != '') {
				add_annotation(lefts[x], tops[x], strings[x]);
			}
		}
	}
}

/* jQuery Plugins */

;(function ($) {
$.extend({			
getQueryString: function (name) {					 
function parseParams() {
var params = {},
e,
a = /\+/g,	// Regex for replacing addition symbol with a space
r = /([^&=]+)=?([^&]*)/g,
d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
q = window.location.search.substring(1);

while (e = r.exec(q))
params[d(e[1])] = d(e[2]);

return params;
}

if (!this.queryStringParams)
this.queryStringParams = parseParams(); 

return this.queryStringParams[name];
}
});
})(jQuery);

(function($) {

/*
* Auto-growing textareas; technique ripped from Facebook
*/
$.fn.autogrow = function(options) {

this.filter('textarea').each(function() {

var $this			 = $(this),
minHeight	 = $this.height(),
lineHeight	= $this.css('lineHeight');

var shadow = $('<div></div>').css({
position:	 'absolute',
top:				-10000,
left:			 -10000,
width:			$(this).width() - parseInt($this.css('paddingLeft')) - parseInt($this.css('paddingRight')),
fontSize:	 $this.css('fontSize'),
fontFamily: $this.css('fontFamily'),
lineHeight: $this.css('lineHeight'),
resize:		 'none'
}).appendTo(document.body);

var update = function() {

var times = function(string, number) {
for (var i = 0, r = ''; i < number; i ++) r += string;
return r;
};

var val = this.value.replace(/</g, '&lt;')
.replace(/>/g, '&gt;')
.replace(/&/g, '&amp;')
.replace(/\n$/, '<br/>&nbsp;')
.replace(/\n/g, '<br/>')
.replace(/ {2,}/g, function(space) { return times('&nbsp;', space.length -1) + ' ' });

shadow.html(val);
$(this).css('height', Math.max(shadow.height(), minHeight));

}

$(this).change(update).keyup(update).keydown(update);

update.apply(this);

});

return this;

}

})(jQuery);
