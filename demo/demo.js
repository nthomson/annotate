$(document).ready(function(){
    var srcId = $.getQueryString('source_id');
    
    var settings = {
        source_element: '#source',
        annotation_xoff: -25,
        annotation_yoff: 10,
        add_control: '.add.control',
        toggle_control: '.toggle.control',
    };
    
    //We pass this object to annotate_js, when the save function is run, it will have a 
    //.json property that contains all the annotations on the page
    var save_annotations_to = new Object();
    
    $.getJSON("json_retrieve.php?source_id="+srcId, function(saved_annotations) {
        annotate_js(settings, save_annotations_to, saved_annotations);
    });
    
    $('.save.control.').click(function(){
        var json = JSON.stringify(save_annotations_to.json);
        $.post("json_save.php", {source_id: srcId, data: json}, function(data){
        });
    });
});
