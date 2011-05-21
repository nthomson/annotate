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
				//Not yet implemented
			}
		);
		
		//When clicking on the "source" div
		$('#source').click(
			function(e){
				if(addIsOn){
					//Get X/Y with chat-arrow and page offsets
					var x = e.pageX - this.offsetLeft - 25;
					var y = e.pageY - this.offsetTop + 10;
					
					//Create textbox
					var textBox = $(document.createElement('textarea'));
					$(textBox).keyup(
						//Grow textbox with content
						function() {
						   /* Make sure element does not have scroll bar to prevent jumpy-ness */
						   if (this.style.overflowY != 'hidden') { this.style.overflowY = 'hidden' }
						   /* Now adjust the height */
						   var scrollH = this.scrollHeight;
						   if( scrollH > this.style.height.replace(/[^0-9]/g,'') ){
							  this.style.height = scrollH+'px';
						   }
						}
					);
					
					//Create annotation
					var annotation = $(document.createElement('div')).attr('class', 'annotation');
					$(annotation).css('left', x+"px");
					$(annotation).css('top', y+"px");
					
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
					
					//Clear tool selection
					cancel();
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
	}
);
