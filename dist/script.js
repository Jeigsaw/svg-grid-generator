var gapX, gapY, stkColor, stkWidth;

function generateSVG (){
	$("#canvas svg").remove();
	var painter = SVG().addTo("#canvas");
	
	let w = painter.node.clientWidth;
	let h = painter.node.clientHeight;
	
	painter.size(w,h).viewbox(0,0,w,h);
	
	getValues();
	
	var group = painter.group().stroke({ color: stkColor, width: stkWidth});
	
	//first iteration - X-Grids
	for( i=0; i<w; i=i+gapX ){
		group.line(i,0,i,h);
	}
	// second iteration - Y-Grids
	for( j=0; j<h; j=j+gapY ){
		group.line(0,j,w,j);
	}
	
	var svgData = $("#canvas").html();
	// place svg code in the outputFields
	$("#outputSVG p").text(svgData);
	
	var cssData = "data:image/svg+xml," + encodeURIComponent(svgData);
	$("#outputCSS p").text(cssData);
	
	// copy to clipboard
	var clipboard1 = new ClipboardJS('#outputSVG');
		clipboard1.on('success', function(e) {
		alert("Copied Successfully!")

		e.clearSelection();
	});
	var clipboard2 = new ClipboardJS('#outputCSS');
		clipboard2.on('success', function(e) {
		alert("Copied Successfully!")

		e.clearSelection();
	});
	

}



// Input values getter
function getValues(){
	gapX = parseInt($("#gapXinput").val());
	gapY = parseInt($("#gapYinput").val());
	stkColor = $("#strkClrField").val();
	stkWidth = $("#strkWdthField").val();
}

// show the value of inputs in range selector
$("[type='range']").mouseup(function(e){
	$(e.currentTarget).mousemove(function(){
		var gap = $(e.currentTarget).val();
		$(e.currentTarget).prev().text(gap);
	});
});