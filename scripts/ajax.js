function getXMLHttpRequest() {
	var xmlhttp = null;
	
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
		
		if(typeof xmlhttp.overrideMimeType != 'undefined') {
			xmlhttp.overrideMimeType('text/xml');
		}
	} else if(window.ActiveXObject) {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	return xmlhttp;
}

function sendRequest(xmlhttp, url, method, params) {
	if(typeof(params) == "undefined")
		params = null;
	if(typeof(method) == "undefined")
		method = "GET";

	// if the url doesn't have the ? to start to query string, then add it		
	if(url.indexOf("?") == -1) {
		url += "?";
	} else if(url.indexOf("?") != url.length - 1) { // if the url already has keys in the query string, then add an &
		url += "&";
	}
	
	//We add this random tag to prevent browser caching of resources.
    //Because the added tag, the browser thinks its requesting a new resource.
    //It forces the browser to actually query the server, instead of returning the cached data.
	var d = new Date();
	url += "nocache="+d.getTime()+""+Math.random();
	
	xmlhttp.open(method, url, true);
	xmlhttp.send(params);
}
