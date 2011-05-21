function hideEmail (domain, front, end) {
	return addLink( front+"@"+domain+"."+end, "mailto:");
}
function addLink(address, protocol) {
	return "<a href='"+protocol+address+"'>"+address+"</a>";
}
function hidePhone(mid, last, area) {
	return addLink(area+"."+mid+"."+last, "tel:");
}
