
// 1. Créer et positionner le SVG

const margin = { top: 0, right: 30, bottom: 20, left: 10 },
    width = 960,
    height = 960;

d3.select("#visu-tp4").selectAll("*").remove(); // Clean up if needed

var svg = d3
    .select("#visu-tp4")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#fff");

// Group for Matrix and Axes, shifted by 60,60 as per Step 5
var mainGroup = svg.append("g")
    .attr("transform", "translate(60, 60)");

// 2. Chargement et transformation des données
d3.json("got_social_graph.json").then(function (graph) {
    
    // Step 6: Call with undefined, true for symmetry
    var adjacencyMatrix = createAdjacencyMatrix(graph.nodes, graph.links, undefined, true);

    // 3. Créer un domaine pour notre échelle
    // Scale domain: 0 to maxWeight
    var maxWeight = d3.max(adjacencyMatrix, function (d) { return d.weight; });

    // Step 6: "Renforcé la force des liens en multipliant toutes les valeurs par 10"
    
    var weightScale = d3.scaleLinear()
        .domain([0, maxWeight]) 
        .range([0, 1]); 

    // Zone scale Step 6
    var zoneScale = d3.scaleOrdinal(d3.schemeCategory10);

    // 5. Axes positioning
    var positions = graph.nodes.map(d => d.id); // By ID
    
    // Effective width for the matrix (960 - 60 - 10 approx)
    var effectiveWidth = 850; 
    
    var echellexy = d3.scaleBand()
        .range([0, effectiveWidth])
        .domain(positions)
        .paddingInner(0.1)
        .align(0)
        .round(true);

    // 4. Afficher la matrice
    var matrixViz = mainGroup.selectAll("rect.cell")
        .data(adjacencyMatrix)
        .join("rect")
        .attr("class", "cell")
        .attr("width", echellexy.bandwidth())
        .attr("height", echellexy.bandwidth())
        .attr("x", function (d) {
            return echellexy(graph.nodes[d.x].id);
        })
        .attr("y", function (d) {
            return echellexy(graph.nodes[d.y].id);
        })
        .style("stroke", "#ddd")
        .style("stroke-width", ".2px")
        .style("fill", function (d) {
            // Step 6: Zone coloring
            if (d.zone_s == d.zone_t) {
                return zoneScale(d.zone_s);
            } else {
                return "#eee";
            }
        })
        .style("opacity", function(d) {
            // Step 6: Opacity reinforced
             if (d.weight === 0) return 0; // or very low
             // Reinforce: d.weight * 10. Clamp to maxWeight or 1.0?
             // If weight=5, max=50. weight*10 = 50. Opacity = 1.
             // If weight=1, max=50. weight*10 = 10. Opacity = 0.2.
             return weightScale(d.weight * 10); 
        });

    // 5. Axes
    var labels = mainGroup.append("g")
        .style("font-size", "8px")
        .style("font-family", "sans-serif");

    var columns = labels
        .append("g")
        .attr("transform", "translate(0,-5)")
        .selectAll("text")
        .data(graph.nodes)
        .join("text")
        .text(d => d.character)
        .attr("transform", d => "translate(" + (echellexy(d.id) + echellexy.bandwidth()/2) + ", 0) rotate(-90)")
        .style("text-anchor", "start");

    var rows = labels
        .append("g")
        .attr("transform", "translate(-5,0)")
        .selectAll("text")
        .data(graph.nodes)
        .join("text")
        .text(d => d.character)
        .attr("y", d => echellexy(d.id) + echellexy.bandwidth()/2)
        .style("text-anchor", "end")
        .attr("dy", ".32em");

    // 7. Ré-ordonnancement et animation
    d3.select("#sortOrder").on("change", function() {
        update(this.value);
    });

    function update(sortType) {
        var sortedNodes = [...graph.nodes];
        
        if (sortType === "appearance") {
            sortedNodes.sort((a, b) => d3.ascending(a.id, b.id));
        } else if (sortType === "zone") {
            sortedNodes.sort((a, b) => d3.ascending(a.zone, b.zone) || d3.ascending(a.id, b.id));
        } else if (sortType === "influence") {
            sortedNodes.sort((a, b) => d3.descending(a.influence, b.influence));
        }

        var newDomain = sortedNodes.map(d => d.id);
        echellexy.domain(newDomain);

        var duration = 2500;
        
        // Step 7.2 Animation with delay
        // We can stagger based on index in NEW domain? Or old?
        // Usually stagger by index i.
        
        var t = svg.transition().duration(duration);

        rows.transition(t)
            .delay((d, i) => i * 5) // Stagger
            .attr("y", d => echellexy(d.id) + echellexy.bandwidth()/2);

        columns.transition(t)
            .delay((d, i) => i * 5)
            .attr("transform", d => "translate(" + (echellexy(d.id) + echellexy.bandwidth()/2) + ", 0) rotate(-90)");

        matrixViz.transition(t)
            .delay((d, i) => i * 2) 

            .attr("x", function(d) { return echellexy(graph.nodes[d.x].id); })
            .attr("y", function(d) { return echellexy(graph.nodes[d.y].id); });
    }
});

