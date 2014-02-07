var width = 800,
    height = 800;

var projection = d3.geo.orthographic()
                       .scale(350)
                       .translate([width/2], height/2))
                       .clipAngle(90);

var path = d3.geo.path()
             .projection(projection); // this makes it look 3d, it's an svg attribute

var graticule = d3.geo.graticule();

var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

svg.append("path").datum({type: "Sphere"}) // append path and bind to datum
                  .attr("id", "globe")
                  .attr("d", path); // stores the path

d3.json("data.json", function(error, world) { // world is the data from data.json
  svg.selectAll("path.land")
  .data(topojson.feature(world, world.objects.land)) // bind the data from the json file, grab the part you want, and pass it to topojson to turn it from topojson (smaller) into geojson which we need to use
});