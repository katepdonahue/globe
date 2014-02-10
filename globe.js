var width = 800,
    height = 800;

var projection = d3.geo.orthographic()
                       .scale(350)
                       .translate([width/2, height/2])
                       .clipAngle(90);

var path = d3.geo.path()
             .projection(projection); // this makes it look 3d, it's an svg attribute

var graticule = d3.geo.graticule();

var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

svg.append("path").datum({type: "Sphere"}) // append path and bind to datum
                  .attr("id", "globe")
                  .attr("d", path); // stores the path

d3.json("data.json", function(error, data) {
  svg.insert("path", ".graticule")
     .datum(topojson.feature(data, data.objects.land))
     .attr("class", "land")
     .attr("d", path);
  svg.call(drag);
});

var drag = d3.behavior.drag().on('drag', function() {
  var start = {
    lon: projection.rotate()[0],
    lat: projection.rotate()[1]
  };
  var delta = {
    x: d3.event.dx,
    y: d3.event.dy
  };
  var scale = 0.25;
  var end = {
    lon: start.lon + delta.x * scale,
    lat: start.lat - delta.y * scale
  };

  end.lat = end.lat > 30 ? 30 : 
            end.lat < -30 ? -30 :
            end.lat;

  projection.rotate([end.lon, end.lat]);

  svg.selectAll("path").attr("d", path);
});

