$(document).ready(function(){

	var settings = {
		source_element: '#source',
		annotation_xoff: -25,
		annotation_yoff: 10,
		add_control: '.add.control',
		toggle_control: '.toggle.control',
		share_control: '.share.control'
	};
	

	
	//We pass this object to annotate_js, when the save function is run, it will have a 
	//.json property that contains all the annotations on the page
	var saved_annotations = new Object();
	
	annotate_js(settings, saved_annotations);
});
