$(document).ready(
	function(){
		var addIsOn = false;
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
		$('.cancel.control').click(function(){cancel();});
		$('.share.control').click(
			function(){
				//Not yet implemented
			}
		);
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
					var remove = $(document.createElement('a')).attr('class', 'remove');
					$(remove).attr('href', 'javascript:void(0)');
					$(remove).html('x');
					$(remove).click(function(){$(this).parent().remove();});
					
					//Append textbox and remove button to annotation, and annotation to textbox
					$(remove).appendTo(annotation);
					$(textBox).appendTo(annotation);
					
					$(annotation).appendTo('#source');
					
					$(annotation).hover(function(){$(remove).show();}, function(){$(remove).hide();});
					
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
	}
);
