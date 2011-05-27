#Annotate

Annotate is work-in-progress, its a javascript module which adds annotations to an element specified when calling the function.

You can view a demo [here](http://nick.kanicweb.com/projects/annotate/demo)


##Usage

Annotate requires jQuery 1.6.1

To use download the annotate.js file and reference it in the head section of your page.
You must also make a call to the annotate_js function. Which takes three parameters, described below.

The simplest possible call to annotate_js is as follows:

	annotate_js({source_element: "#source"});
	
Every other parameter is optional, however you will be missing a lot of functionality without them.

##Parameters

annotate_js has a function header as follows:

	annotate_js(settings, save_annotations_to, saved_annotations)
	
Each paramater is described below

###Settings:

A JSON Object passed in controlling the behavior of annotate. This is required.

source_element:
The element the annotations should be added to. This is required.

annotation_xoff:
The X offset in pixels to use when placing annotations -- useful if you don't want the annotation's top-left corner aligned to the mouse click

annotation_yoff:
The Y offset in pixels to use when placing annotations -- useful if you don't want the annotation's top-left corner aligned to the mouse click

add_control:
The button that will be used as the add annotation tool. When add is "on" there will be a "selected" class applied to the button.

toggle_control:
The button that will be used as the Toggle all control.

save_control:
The button that will update the saved_annotations object with the json representing the annotations on the page

###save_annotations_to:

This is an object, its usually empty. After the user hits the element passed to the save_control, all of the annotations on the page will be represented within save_annotations_to.json


###saved_annotations:

A JSON Object representing any annotations you would like to be automatically populated when the page loads

x: The x position of the annotation relative to the source_element
y: The y position of the annotation relative to the source_element
text: The annotation's text
