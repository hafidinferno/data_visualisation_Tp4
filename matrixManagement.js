function createAdjacencyMatrix(nodes, links, undefined, isSymmetric) {
    var matrix = [];
    var edgeHash = {};

    // Create a hash of edges for quick lookup
    links.forEach(function (edge) {
        var id = edge.source + "-" + edge.target;
        edgeHash[id] = edge;

        if (isSymmetric) {
             var idRev = edge.target + "-" + edge.source;
             // Don't overwrite if it exists (directed graph case handled by data, but for symmetry assumption we add if missing)
             if(!edgeHash[idRev]) {
                 edgeHash[idRev] = { source: edge.target, target: edge.source, weight: edge.weight };
             }
        }
    });

    nodes.forEach(function (source, a) {
        nodes.forEach(function (target, b) {
            var grid = {
                id: source.id + "-" + target.id,
                x: a, // Index in the nodes array (will be used for position)
                y: b, // Index in the nodes array
                weight: 0,
                name_s: source.character,
                name_t: target.character,
                zone_s: source.zone,
                zone_t: target.zone
            };
            
            // Check connections
            var edge = edgeHash[source.id + "-" + target.id];
            if (edge) {
                grid.weight = edge.weight;
            }
            
            // For Step 6: Symmetry might be enforced here too if we want the diagonal etc.
            // But usually adjacency matrix fills 'weight' if link exists.
            
            matrix.push(grid);
        });
    });

    return matrix;
}
