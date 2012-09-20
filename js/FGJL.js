function FGJL(ZoneToDraw) {
	var ListOfParticle = new Array();
	var TempPoint = new Array();
	var TempPointB = new Array();
	var ListOfLine = new Array();
	var heightArea = document.getElementById(ZoneToDraw).offsetHeight;
	var widthArea = document.getElementById(ZoneToDraw).offsetWidth;
	var Particle = new Array("e-", "e+", "t", "b", "s", "c", "u", "d", "\u02e0");
	var Possibility = new Array();
	var Selected = new Array();
	var LineLimitor;
	var quadrillageOn;
	
	function particle(LineIdP, OrderP,graphicRepresentationP) {
		this.charge
		this.spin
		this.name
		this.LineId = LineIdP;
		this.Order = OrderP;
		this.graphicRepresentation = graphicRepresentationP;
		return this;
	}
	function line(numberP, graphicRepresentationP) {
		this.Number = numberP;
		this.graphicRepresentation = graphicRepresentationP;
		return this;
	}
	this.DrawAndCreateParticle = function(y) {
		while (y > ListOfParticle.length - 1) {
			ListOfParticle[ListOfParticle.length] = new Array();
		}
		RefreshQuadrillage();
		ListOfParticle[y].push(new particle(y, ListOfParticle[y].length,Chart.append("circle").on("mousedown", function() {if(d3.select(this).style("fill")!="#0000ff"){
						d3.select(this).transition().duration(500).style("fill", "blue").attr("r", 7);
					}
					else{
						d3.select(this).transition().duration(500).style("fill", "black").attr("r", 5);
					}
				}).attr("cx", ListOfLine[y].graphicRepresentation.attr("x1")).attr("cy", (ListOfParticle[y].length + 1) * (heightArea / (ListOfParticle[y].length + 2))).attr("r", 5).style("fill", "black").style("opacity", 0.5)));
		RefreshParticle();
		return this;
	}
	this.RefreshParticle = function() { 		
			var stepX = widthArea / (ListOfParticle.length + 2);
			for(i=0;i<ListOfParticle.length;i++)
			{
				for(y=0;y<ListOfParticle[i].length;y++)
				{
					
					ListOfParticle[i][y].graphicRepresentation.transition().duration(1000).attr("cx", (ListOfParticle[i][y].LineId+1)*(stepX)).attr("cy", (ListOfParticle[i][y].Order + 1) * (heightArea / (ListOfParticle[i].length + 1))).attr("r", 5).style("fill", "black").style("opacity", 0.5);	
				}
			}
	}
	this.RefreshQuadrillage = function() {
		var stepX = widthArea / (ListOfParticle.length + 2);
		for ( i = 0; i < ListOfParticle.length + 1; i++) {
			if(ListOfLine[i]==undefined)
			{
				ListOfLine.push(new line(i, Chart.append("line").on("mouseover", particleShow).on("mouseout", deleteTempParticle).on("mousedown", function() {
				for ( y = 0; y < ListOfLine.length; y++) {
					if (ListOfLine[y].graphicRepresentation.attr("x1") == d3.select(this).attr("x1")) {
						DrawAndCreateParticle(y);
						break;
					}
				}
				}).attr("x1", stepX * (i + 1)).attr("x2", stepX * (i + 1)).attr("y1", 0).attr("y2", heightArea).style("stroke", "#CCCCCC")));
		
			}
			else
			{
				ListOfLine[i].graphicRepresentation.transition().duration(1000).attr("x1", stepX * (i + 1)).attr("x2", stepX * (i + 1)).attr("y1", 0).attr("y2", heightArea).style("stroke", "#CCCCCC");
			}
		}
	}
	this.deleteTempParticle = function() {
		for ( i = 0; i < TempPoint.length; i++) {
			TempPoint[i].remove();
		}
	}
	this.particleShow = function() {
		for ( i = 0; i < TempPoint.length; i++) {
			TempPoint[i].remove();
		}
		TempPoint=[]
		var m = d3.svg.mouse(this);
		TempPoint.push(Chart.append("circle").attr("cx", m[0]).attr("cy", m[1]).attr("r", 5).style("stroke", "#CCCCCC").style("stroke-opacity", 0.01).style("opacity", 0.1));
	}

	this.RedrawAll = function() {
		RefreshQuadrillage();
		RefreshPoint();
	}
	Chart = d3.select("#" + ZoneToDraw).append("svg").attr("class", "chart").attr("width", widthArea).attr("height", heightArea);
	RefreshQuadrillage();
	return this;
}

