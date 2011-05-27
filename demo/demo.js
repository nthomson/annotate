$(document).ready(function(){

	var settings = {
		source_element: '#source',
		annotation_xoff: -25,
		annotation_yoff: 10,
		add_control: '.add.control',
		toggle_control: '.toggle.control',
		share_control: '.share.control'
	};
	
	var saved_annotations = [
		{'x': 200, 'y': 200, 'text': 'Sample Text'}
	];
	
	//We pass this object to annotate_js, when the save function is run, it will have a 
	//.json property that contains all the annotations on the page
	var save_annotations_to = new Object();
	
	annotate_js(settings, save_annotations_to, saved_annotations);
});
