angular.module('starter.directives', [])

.directive('voroniTesselation', function() {
  return {
    restrict: 'E',
    template: '<div class="tesselation"></div>',
    scope: {
      control: '='
    },
    link: function(scope) {
      scope.api = scope.control || {};

      var width = window.innerWidth,
          height = window.innerHeight;

      var vertices = d3.range(100).map(function(d) {
        return [Math.random() * width, Math.random() * height];
      });

      var voronoi = d3.geom.voronoi()
          .clipExtent([[0, 0], [width, height]]);

      var svg = d3.select(".tesselation").append("svg")
          .attr("width", width)
          .attr("height", height)
          // .on("mousemove", function() { vertices[0] = d3.mouse(this); redraw();});

      var path = svg.append("g").selectAll("path");

      svg.selectAll("circle")
          .data(vertices.slice(1))
        .enter().append("circle")
          .attr("transform", function(d) { return "translate(" + d + ")"; })
          .attr("r", 1.5);

      redraw();

      function redraw() {
        path = path
            .data(voronoi(vertices), polygon);

        path.exit().remove();

        path.enter().append("path")
            .attr("class", function(d, i) { return "q" + (i % 5) + "-9"; })
            .attr("d", polygon);

        path.order();
      }

      function polygon(d) {
        return "M" + d.join("L") + "Z";
      }

      scope.api.updatePointer = function(x,y) {
        vertices[0][0] = x;
        vertices[0][1] = y;
        redraw();
      };
    }
  }
});
