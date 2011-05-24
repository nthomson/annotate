$(document).ready(
	function(){
		var addIsOn = false;
		
		//Add menu button
		$('.add.control').click(
			function(){
				cancel();
				//Turn control on
				addIsOn = true;
				//Show "on" image
				$(this).toggleClass('selected');
				//Change cursor
				$('#source').css('cursor', 'crosshair');
			}
		);
		
		//Show All menu button
		$('.show.control').click(
			function(){
				$('.annotation').each(
					function(){
						$(this).children('textarea').show();
					}
				);
			}
		);
		
		//Hide All menu button
		$('.hide.control').click(
			function(){
				$('.annotation').each(
					function(){
						$(this).children('textarea').hide();
					}
				);
			}
		);
		
		//Cancel menu button
		$('.cancel.control').click(function(){cancel();});
		
		//Share menu button
		$('.share.control').click(
			function(){
				getURL();
			}
		);
		
		//When clicking on the "source" div
		$('#source').click(
			function(e){
				if(addIsOn){
					//Get X/Y with chat-arrow and page offsets
					var x = e.pageX - this.offsetLeft - 25;
					var y = e.pageY - this.offsetTop + 10;
										
					addAnnotation(x, y);
				}
			}
		);
		
		var cancel = function(){
			$('.control').each(
				function(){
					$(this).removeClass('selected');
				}
			);
			//Reset controls
			addIsOn = false;
			//Show "off" images
			$('#source').css('cursor', 'default');
		}
		
		var minMax = function(toToggle) {
			$(toToggle).children('textarea').toggle();
		}
		
		var sizeTextBox = function(box) {
			/* Make sure element does not have scroll bar to prevent jumpy-ness */
		   if (box.style.overflowY != 'hidden') { box.style.overflowY = 'hidden' }
		   /* Now adjust the height */
		   var scrollH = box.scrollHeight;
		   if( scrollH > box.style.height.replace(/[^0-9]/g,'') ){
			  box.style.height = scrollH+'px';
		   }
		}
		
		var addAnnotation = function(left, top, text) {
			//Create textbox
			var textBox = $(document.createElement('textarea'));
			$(textBox).keyup(
				//Grow textbox with content
				function() {
				   sizeTextBox(this);
				}
			);
			$(textBox).html(text);
			
			//Create annotation
			var annotation = $(document.createElement('div')).attr('class', 'annotation');
			$(annotation).css('left', left+"px");
			$(annotation).css('top', top+"px");
			
			//Create remove button
			var remove = $(document.createElement('a')).attr('class', 'button remove');
			$(remove).attr('href', 'javascript:void(0)');
			$(remove).html('x');
			$(remove).click(function(){$(this).parent().parent().remove();});
			
			//Create toggle button
			var toggle = $(document.createElement('a')).attr('class', 'button toggle');
			$(toggle).attr('href', 'javascript:void(0)');
			$(toggle).html('~');
			$(toggle).click(function(){minMax($(this).parent().parent());});

					
			var buttons = $(document.createElement('div')).attr('class', 'buttons');
				
			//Append textbox and buttons to annotation, and annotation to textbox
			$(toggle).appendTo(buttons);
			$(remove).appendTo(buttons);
			$(buttons).appendTo(annotation);
			$(textBox).appendTo(annotation);
					
			$(annotation).appendTo('#source');
			
			//Set focus
			$(textBox).focus();
			
			//Do resizing
			$(textBox).keyup();
			
			cancel();
		}
		
		var getURL = function(){
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
			
			
			var url = 'http://nick.kanicweb.com/projects/annotate/?lefts='+lefts+"&tops="+tops+'&strings='+strings;
			share(url);
		}
		
		var share = function(url) {
			$('#share input').val(url);
			$('#share').show();
			$('#share input').focus();
			$('#share input').select();
		}
		
		//Add URL annotations
		var lefts = $.getQueryString('lefts').split('|');
		var tops = $.getQueryString('tops').split('|');
		var strings = $.getQueryString('strings').split('|');
		
		for(var x = 0; x < strings.length; x++) {
			if(lefts != '') {
				addAnnotation(lefts[x], tops[x], strings[x]);
			}
		}
	}
);

;(function ($) {
    $.extend({      
        getQueryString: function (name) {           
            function parseParams() {
                var params = {},
                    e,
                    a = /\+/g,  // Regex for replacing addition symbol with a space
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

