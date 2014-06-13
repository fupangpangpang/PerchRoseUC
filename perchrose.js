//setup some containers to put the plots inside

var visWidth = 200;
//Pathogen-List
var pathogennumber=27;//need manually change this number

                 
//Data Manipulation and draw wedges
// Function to draw a single arc for the wind rose
// Input: Drawing options object containing
//   width: degrees of width to draw (ie 5 or 15)
//   from: integer, inner radius
//   to: function returning the outer radius
// Output: a function that when called, generates SVG paths.
//   It expects to be called via D3 with data objects from totalsToFrequences()
var arc = function(o) {
    return d3.svg.arc()
        .startAngle(function(d) { return (d.d - o.width) * Math.PI/180; })
        .endAngle(function(d) { return (d.d + o.width) * Math.PI/180; })
        .innerRadius(o.from)
        .outerRadius(function(d) { return o.to(d) });
};

//** Code for data manipulation **/
//JSON DATA
var perchrose = 
[{"month":0,"Order":1,"Pathogen":"RSV","Prob":0.280019792},
{"month":0,"Order":2,"Pathogen":"RHINO","Prob":0.15172651},
{"month":0,"Order":3,"Pathogen":"PV/EV","Prob":0.022219112},
{"month":0,"Order":4,"Pathogen":"PARA4","Prob":0.009772582},
{"month":0,"Order":5,"Pathogen":"PARA3","Prob":0.025292526},
{"month":0,"Order":6,"Pathogen":"PARA2","Prob":0.003587787},
{"month":0,"Order":7,"Pathogen":"PARA1","Prob":0.018383729},
{"month":0,"Order":8,"Pathogen":"FLU_B","Prob":0.009111328},
{"month":0,"Order":9,"Pathogen":"FLU_A","Prob":0.019679859},
{"month":0,"Order":10,"Pathogen":"HMPV","Prob":0.048711823},
{"month":0,"Order":22,"Pathogen":"HBOV","Prob":0.005377825},
{"month":0,"Order":11,"Pathogen":"FLU_C","Prob":0.001896199},
{"month":0,"Order":12,"Pathogen":"COR_HKU","Prob":0.002409374},
{"month":0,"Order":13,"Pathogen":"COR_63","Prob":0.002830511},
{"month":0,"Order":23,"Pathogen":"COR_43","Prob":0.004360891},
{"month":0,"Order":24,"Pathogen":"COR_229","Prob":0.002367356},
{"month":0,"Order":25,"Pathogen":"CMV","Prob":0.011454672},
{"month":0,"Order":14,"Pathogen":"ADENO","Prob":0.028671156},
{"month":0,"Order":15,"Pathogen":"PCP","Prob":0.010148242},
{"month":0,"Order":26,"Pathogen":"M_PNEU","Prob":0.00400991},
{"month":0,"Order":16,"Pathogen":"C_PNEU","Prob":0.002294151},
{"month":0,"Order":17,"Pathogen":"BORD","Prob":0.002769557},
{"month":0,"Order":18,"Pathogen":"SAUR","Prob":0.018443344},
{"month":0,"Order":19,"Pathogen":"SASP","Prob":0.006187527},
{"month":0,"Order":20,"Pathogen":"PNEU","Prob":0.269283854},
{"month":0,"Order":21,"Pathogen":"MCAT","Prob":0.009974873},
{"month":0,"Order":27,"Pathogen":"HINF","Prob":0.02901662},
{"month":1,"Order":1,"Pathogen":"RSV","Prob":0.238039658},
{"month":1,"Order":2,"Pathogen":"RHINO","Prob":0.161406958},
{"month":1,"Order":3,"Pathogen":"PV/EV","Prob":0.021878885},
{"month":1,"Order":4,"Pathogen":"PARA4","Prob":0.010495739},
{"month":1,"Order":5,"Pathogen":"PARA3","Prob":0.026603429},
{"month":1,"Order":6,"Pathogen":"PARA2","Prob":0.003828128},
{"month":1,"Order":7,"Pathogen":"PARA1","Prob":0.018781011},
{"month":1,"Order":8,"Pathogen":"FLU_B","Prob":0.009218478},
{"month":1,"Order":9,"Pathogen":"FLU_A","Prob":0.021722972},
{"month":1,"Order":10,"Pathogen":"HMPV","Prob":0.051205253},
{"month":1,"Order":22,"Pathogen":"HBOV","Prob":0.005275128},
{"month":1,"Order":11,"Pathogen":"FLU_C","Prob":0.001786624},
{"month":1,"Order":12,"Pathogen":"COR_HKU","Prob":0.002443197},
{"month":1,"Order":13,"Pathogen":"COR_63","Prob":0.003095477},
{"month":1,"Order":23,"Pathogen":"COR_43","Prob":0.004494933},
{"month":1,"Order":24,"Pathogen":"COR_229","Prob":0.002243786},
{"month":1,"Order":25,"Pathogen":"CMV","Prob":0.010954825},
{"month":1,"Order":14,"Pathogen":"ADENO","Prob":0.030368907},
{"month":1,"Order":15,"Pathogen":"PCP","Prob":0.00991401},
{"month":1,"Order":26,"Pathogen":"M_PNEU","Prob":0.004193928},
{"month":1,"Order":16,"Pathogen":"C_PNEU","Prob":0.002402609},
{"month":1,"Order":17,"Pathogen":"BORD","Prob":0.003196188},
{"month":1,"Order":18,"Pathogen":"SAUR","Prob":0.019325734},
{"month":1,"Order":19,"Pathogen":"SASP","Prob":0.006121435},
{"month":1,"Order":20,"Pathogen":"PNEU","Prob":0.29076374},
{"month":1,"Order":21,"Pathogen":"MCAT","Prob":0.011125089},
{"month":1,"Order":27,"Pathogen":"HINF","Prob":0.029113437},
{"month":2,"Order":1,"Pathogen":"RSV","Prob":0.199026609},
{"month":2,"Order":2,"Pathogen":"RHINO","Prob":0.166216266},
{"month":2,"Order":3,"Pathogen":"PV/EV","Prob":0.023267834},
{"month":2,"Order":4,"Pathogen":"PARA4","Prob":0.011160136},
{"month":2,"Order":5,"Pathogen":"PARA3","Prob":0.028114841},
{"month":2,"Order":6,"Pathogen":"PARA2","Prob":0.004310671},
{"month":2,"Order":7,"Pathogen":"PARA1","Prob":0.019654524},
{"month":2,"Order":8,"Pathogen":"FLU_B","Prob":0.008972119},
{"month":2,"Order":9,"Pathogen":"FLU_A","Prob":0.02280506},
{"month":2,"Order":10,"Pathogen":"HMPV","Prob":0.053049099},
{"month":2,"Order":22,"Pathogen":"HBOV","Prob":0.00497685},
{"month":2,"Order":11,"Pathogen":"FLU_C","Prob":0.001893461},
{"month":2,"Order":12,"Pathogen":"COR_HKU","Prob":0.00234212},
{"month":2,"Order":13,"Pathogen":"COR_63","Prob":0.003533141},
{"month":2,"Order":23,"Pathogen":"COR_43","Prob":0.004468763},
{"month":2,"Order":24,"Pathogen":"COR_229","Prob":0.002567026},
{"month":2,"Order":25,"Pathogen":"CMV","Prob":0.010948736},
{"month":2,"Order":14,"Pathogen":"ADENO","Prob":0.031864326},
{"month":2,"Order":15,"Pathogen":"PCP","Prob":0.010611565},
{"month":2,"Order":26,"Pathogen":"M_PNEU","Prob":0.004034561},
{"month":2,"Order":16,"Pathogen":"C_PNEU","Prob":0.002701006},
{"month":2,"Order":17,"Pathogen":"BORD","Prob":0.003289463},
{"month":2,"Order":18,"Pathogen":"SAUR","Prob":0.020225006},
{"month":2,"Order":19,"Pathogen":"SASP","Prob":0.006492517},
{"month":2,"Order":20,"Pathogen":"PNEU","Prob":0.311730901},
{"month":2,"Order":21,"Pathogen":"MCAT","Prob":0.011726681},
{"month":2,"Order":27,"Pathogen":"HINF","Prob":0.030011352}]

// Convert a dictionary of {direction: total} to frequencies
// Output is an array of objects with three parameters:
//   d: wind direction
//   p: probability of the wind being in this direction
//   s: average speed of the wind in this direction
var months = [];
for(var i = 1; i < 12; i++) {
  months.push(false);
}
months[1]=true

function rollupForMonths(d, months) {
    var ret = {}
    ret.dirs = []
    var obs = d.length
    for (var i=0;i<obs;i +=1) { 
        var month = d[i].month;
        if (!months[month]) { continue; }
        
        var direction = d[i].Order*360/pathogennumber;
        var prob = d[i].Prob;
        var zero = 0.001;
        var max = 1;
        ret.dirs.push({d:direction,p:prob,n:d[i].Pathogen,z:zero,m:max})
             }
    return ret;
}


// Code for visualization

/** Code for big visualization **/

// Transformation to place a mark on top of an arc
function probArcTextT(d) {
    var tr = probabilityToRadius(d);
    return "translate(" + visWidth + "," + (visWidth-tr) + ")" +
           "rotate(" + d.d + ",0," + tr + ")"; };

// Return a string representing the probability of wind coming from this direction
function probabilityText(d) { return d.p < 0.02 ? "" : (100*d.p).toFixed(0); };


// Map a wind probability to a color                     
var probabilityToColorScale = d3.scale.linear()
                                .domain([0, 0.6])
                                .range(["hsl(0, 70%, 95%)", "hsl(0, 70%, 10%)"])
                                .interpolate(d3.interpolateHsl);
function probabilityToColor(d) { return probabilityToColorScale(d.p); }
                                
// Width of the whole visualization; used for centering               
var visWidth = 200;

// Map a wind probability to an outer radius for the chart      
var probabilityToRadiusScale = d3.scale.log().domain([0.001, 0.5]).range([34, visWidth-20]).clamp(true);
function probabilityToRadius(d) { return probabilityToRadiusScale(d.p); }
function zeroprobabilityToRadius(d) { return probabilityToRadiusScale(d.z); }
function maxprobabilityToRadius(d) { return probabilityToRadiusScale(d.m); }

// Options for drawing the complex arc chart
var windroseArcOptions = {
    width: 180/pathogennumber,
    from: 34,
    to: probabilityToRadius
}   
var zerowindroseArcOptions = {
    width: 180/pathogennumber,
    from: 34,
    to: zeroprobabilityToRadius
}   
var maxwindroseArcOptions = {
    width: 180/pathogennumber,
    from: 34,
    to: maxprobabilityToRadius
}   
//tooltip - show details for each wedge
// Draw a complete wind rose visualization, including axes and center text
function drawComplexArcs(parent, plotData, colorFunc, arcTextFunc, complexArcOptions, arcTextT) {
    // Draw the main wind rose arcs

parent.append("svg:g")
        .attr("class", "arcs_f")
        .selectAll("path")
        .data(plotData.dirs)
      .enter().append("svg:path")
      .attr("transform", "translate(" + visWidth + "," + visWidth + ")")
        .attr("d", arc(maxwindroseArcOptions))
        .style("fill", "white")
        .append("svg:title")
        .text(function(d) { return d.n + "  "+ (100*d.p).toFixed(1) + "% " })
  
  ;    

parent.append("svg:g")
        .attr("class", "arcs")
        .selectAll("path")
        .data(plotData.dirs)
      .enter().append("svg:path")
      .attr("transform", "translate(" + visWidth + "," + visWidth + ")")
        .attr("d", arc(zerowindroseArcOptions))
        .style("fill", colorFunc)
        .transition()
        .attr("d", arc(complexArcOptions))
        .style("fill", colorFunc)
        .duration(1000)



    // Add the calm wind probability in the center
    var cw = parent.append("svg:g").attr("class", "calmwind")
        .selectAll("text")
        .data([plotData.dirs.p])
        .enter();
    cw.append("svg:text")
        .attr("transform", "translate(" + visWidth + "," + (visWidth+5) + ")")
        .attr("class", "calmcaption")
        .text("KENYA 50%PNEU");
}


    // Various visualization size parameters
    var w = 400,
        h = 400,
        r = Math.min(w, h) / 2,      // center; probably broken if not square
        p = 20,                      // padding on outside of major elements
        ip = 34;                     // padding on inner circle
    

    // The main SVG visualization element
    var vis = d3.select("body")
        .append("svg")
        .attr("id", "windrose")
        .attr("viewBox", "0 0 500 500")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
   .call(d3.behavior.zoom().on("zoom", zoom))

function zoom() {
  vis.selectAll(".arcs").attr("transform", "rotate(" + d3.event.scale + ",200,200)")
  vis.selectAll(".arcs_f").attr("transform", "rotate(" + d3.event.scale + ",200,200)")
  vis.selectAll(".labels").attr("transform", "rotate(" + d3.event.scale + ",200,200)")
}

    // Set up axes: circles whose radius represents probability or speed
        var ticks = [0.01,0.02,0.04,0.08,0.16,0.32,0.5];
        var tickmarks = [0.01,0.02,0.04,0.08,0.16,0.32,0.5];
        var radiusFunction = probabilityToRadiusScale;
        var tickLabel = function(d) { return "" + (d*100).toFixed(0) + "%"; }
   //
   

    //data part              
    var rollup = rollupForMonths(perchrose, months);

    // Labels: degree markers

    vis.append("svg:g")
      .attr("class", "labels")
      .selectAll("text")
        .data(rollup.dirs)
      .enter().append("svg:text")
        .attr("dy", "-4px")
        .attr("transform", function(d) {     
            return "translate(" + r + "," + p + ") rotate(" + d.d + ",0," + (r-p) + ")"})        
        .text(function(dir) { 
		  return dir.n; });
    //core
    drawComplexArcs(vis, rollup, probabilityToColor, probabilityText, windroseArcOptions, probArcTextT);
        
         // Circles representing chart ticks
    vis.append("svg:g")
        .attr("class", "axes")
        .attr("transform", "translate(" + [0, 0] + ")")
        .selectAll("circle")
        .data(ticks)
        .enter()
        .append("svg:circle")
        .attr("cx", r).attr("cy", r)
        .attr("r", function(d) {return radiusFunction(d)})
        ;

   
        // Text representing chart tickmarks
        
    vis.append("svg:g").attr("class", "tickmarks")
        .selectAll("text")
        .data(tickmarks)
      .enter().append("svg:text")
        .text(tickLabel)
        .attr("dy", "3.28px")
        .attr("transform", function(d) {
            var y = visWidth - radiusFunction(d);
            return "translate(" + r + "," + y + ") " })
            
    //caption
    vis.append("svg:text")
       .text("PERCH ROSE")
       .attr("class", "caption")
       .attr("transform", "translate(" + w/2 + "," + (h + 20) + ")");
 

                  
                  
vis.selectAll("text").style( { font: "8px sans-serif", "text-anchor": "middle" });
vis.selectAll(".arcs").style( {  stroke: "#000", "stroke-width": "0.5px", "fill-opacity": 0.9 })
vis.selectAll(".arcs_f").style( {  stroke: "#000", "stroke-width": "0.5px", "fill-opacity": 0.9 })
vis.selectAll(".caption").style( { font: "18px sans-serif" });
vis.selectAll(".axes").style( { stroke: "#aaa", "stroke-width": "0.3px", fill: "none" })
vis.selectAll("text.labels").style( { "letter-spacing": "0.1px", fill: "#444", "font-size": "2px" })
vis.selectAll("text.arctext").style( { "font-size": "2px" })

// Update a specific digram to the newly selected months
// Update drawn arcs, etc to the newly selected months
function updateComplexArcs(parent, plotData, colorFunc, arcTextFunc, complexArcOptions, arcTextT) {
    // Update the arcs' shape and color
    parent.select(".arcs").selectAll("path")
        .data(plotData.dirs)
        .transition().duration(1000)
        .style("fill", colorFunc)
        .attr("d", arc(complexArcOptions));

    // Update the arcs' title tooltip
    parent.select(".arcs_f").selectAll("path").select("title")
    	.data(plotData.dirs)
        .text(function(d) { return d.n + "  "+ (100*d.p).toFixed(1) + "% " })
    
              
}
var RSV =0 
//button event
    d3.select("#NORSV")
        .on("click", function(d,i) {
        if (RSV ==0) {
        months[0]=false
        months[2]=true
        RSV = 1
        }
        else {
        months[0]=true
        months[2]=false
        RSV = 0
        }
        rollup = rollupForMonths(perchrose, months);

        updateComplexArcs(vis, rollup, probabilityToColor, probabilityText, windroseArcOptions, probArcTextT)}
            );

 
