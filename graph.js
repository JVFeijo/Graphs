module.exports = function(grafo, type) {
  let graph;

  if (type == 1) {
    graph = buildAdjList(grafo.vertices, grafo.arestas);
  } else if (type == 2) {
    graph = buildAdjMatrix(
      grafo.vertices.length,
      grafo.arestas.length,
      grafo.arestas
    );
  }

  let visitedVertices;
  let discoveredEdges;
  let exploredEdges;

  const vertices = grafo.vertices;
  const arestas = grafo.arestas;
  const len = vertices.length;

  function completeBfsList() {
    visitedVertices = labelVertices(len);
    [discoveredEdges, exploredEdges] = labelEdges(len);

    let start = new Date();
    for (let i = 0; i < vertices.length; i++) {
      if (!visitedVertices[i]) {
        bfsList(i);
      }
    }
    let finish = new Date();

    return finish - start;
  }

  function bfsList(v) {
    if (!visitedVertices || !discoveredEdges || !exploredEdges) {
      visitedVertices = labelVertices(len);
      [discoveredEdges, exploredEdges] = labelEdges(len);
    }
    let w;
    let fila = [];
    v = v ? v : 0;

    visitedVertices[v] = true;
    fila.push(v + 1);

    while (fila.length > 0) {
      v = fila.shift();
      for (let i = 0; i < graph[v].length; i++) {
        w = graph[v][i];
        if (visitedVertices[w - 1]) {
          if (!exploredEdges[v - 1][w - 1]) {
            exploredEdges[v - 1][w - 1] = true;
            exploredEdges[w - 1][v - 1] = true;
          }
        } else {
          exploredEdges[v - 1][w - 1] = true;
          exploredEdges[w - 1][v - 1] = true;
          discoveredEdges[v - 1][w - 1] = true;
          discoveredEdges[w - 1][v - 1] = true;
          visitedVertices[w - 1] = true;
          fila.push(w);
        }
      }
    }

    return true;
  }

  function completeDfsList() {
    visitedVertices = labelVertices(len);
    [discoveredEdges, exploredEdges] = labelEdges(len);

    let start = new Date();
    for (let i = 0; i < vertices.length; i++) {
      if (!visitedVertices[i]) {
        dfsList(i);
      }
    }
    let finish = new Date();

    return finish - start;
  }

  function dfsList(v) {
    if (!visitedVertices || !discoveredEdges || !exploredEdges) {
      visitedVertices = labelVertices(len);
      [discoveredEdges, exploredEdges] = labelEdges(len);
    }
    let w;
    let pilha = [];
    let generator;
    let value;
    let v2;
    let w2;
    v = v ? v : 0;

    function primeiroVizinho(v) {
      if (this[0]) {
        let w = this[0];
        this.step = 1;
        return [v, w];
      } else {
        return [v, -1];
      }
    }

    function* proximoVizinho(v) {
      while (this.step < this.length) {
        let proxVizinho = this[this.step];
        this.step++;
        yield [v, proxVizinho];
      }
    }

    visitedVertices[v] = true;
    pilha.push(primeiroVizinho.call(graph[v], v + 1));

    while (pilha.length > 0) {
      [v, w] = pilha.pop();
      if (w >= 0) {
        generator = proximoVizinho.call(graph[v], v);
        value = generator.next().value;
        if (value) {
          [v2, w2] = value;
          pilha.push([v2, w2]);
        } else {
          pilha.push([v, -1]);
        }

        if (visitedVertices[w - 1]) {
          if (!exploredEdges[v - 1][w - 1]) {
            exploredEdges[v - 1][w - 1] = true;
            exploredEdges[w - 1][v - 1] = true;
          }
        } else {
          exploredEdges[v - 1][w - 1] = true;
          exploredEdges[w - 1][v - 1] = true;
          discoveredEdges[v - 1][w - 1] = true;
          discoveredEdges[w - 1][v - 1] = true;
          visitedVertices[w - 1] = true;

          pilha.push(primeiroVizinho.call(graph[w], w));
        }
      }
    }

    return true;
  }

  function completeBfsMatrix() {
    visitedVertices = labelVertices(len);
    [discoveredEdges, exploredEdges] = labelEdges(len);

    let start = new Date();
    for (let i = 0; i < vertices.length; i++) {
      if (!visitedVertices[i]) {
        bfsMatrix(i);
      }
    }
    let finish = new Date();

    return finish - start;
  }

  function bfsMatrix(v) {
    if (!visitedVertices || !discoveredEdges || !exploredEdges) {
      visitedVertices = labelVertices(len);
      [discoveredEdges, exploredEdges] = labelEdges(len);
    }
    let fila = [];
    v = v ? v : 0;

    visitedVertices[v] = true;
    fila.push(v);

    while (fila.length > 0) {
      v = fila.shift();
      for (let i = 0; i < graph[v].length; i++) {
        if (graph[v][i] == 1) {
          if (visitedVertices[i]) {
            if (!exploredEdges[v][i]) {
              exploredEdges[v][i] = true;
              exploredEdges[i][v] = true;
            }
          } else {
            exploredEdges[v][i] = true;
            exploredEdges[i][v] = true;
            discoveredEdges[v][i] = true;
            discoveredEdges[i][v] = true;
            visitedVertices[i] = true;
            fila.push(i);
          }
        }
      }
    }

    return true;
  }

  function completeDfsMatrix() {
    visitedVertices = labelVertices(len);
    [discoveredEdges, exploredEdges] = labelEdges(len);

    let start = new Date();
    for (let i = 0; i < vertices.length; i++) {
      if (!visitedVertices[i]) {
        dfsMatrix(i);
      }
    }
    let finish = new Date();

    return finish - start;
  }

  function dfsMatrix(v) {
    if (!visitedVertices || !discoveredEdges || !exploredEdges) {
      visitedVertices = labelVertices(len);
      [discoveredEdges, exploredEdges] = labelEdges(len);
    }
    let pilha = [];
    let v2;
    let w2;
    let w;
    v = v ? v : 0;

    visitedVertices[v] = true;
    pilha.push(primeiroVizinho.call(graph[v], v));

    while (pilha.length > 0) {
      [v, w] = pilha.pop();
      if (w >= 0) {
        [v2, w2] = proximoVizinho.call(graph[v], v, w);
        pilha.push([v2, w2]);

        if (visitedVertices[w]) {
          if (!exploredEdges[v][w]) {
            exploredEdges[v][w] = true;
            exploredEdges[w][v] = true;
          }
        } else {
          exploredEdges[v][w] = true;
          exploredEdges[w][v] = true;
          discoveredEdges[v][w] = true;
          discoveredEdges[w][v] = true;
          visitedVertices[w] = true;
          pilha.push(primeiroVizinho.call(graph[w], w));
        }
      }
    }

    function primeiroVizinho(v) {
      let w = this.findIndex(w => {
        return w != 0;
      });
      return [v, w];
    }

    function proximoVizinho(v, w) {
      let proxVizinho = -1;
      for (let i = w + 1; i < this.length; i++) {
        if (this[i] != 0) {
          proxVizinho = i;
          break;
        }
      }

      return [v, proxVizinho];
    }

    return true;
  }

  function labelVertices(len) {
    let visitedVertices = new Array(len);

    return visitedVertices;
  }

  function labelEdges(len) {
    let discoveredEdges = [];
    let exploredEdges = [];

    for (let i = 0; i < len; i++) {
      discoveredEdges.push([]);
      exploredEdges.push([]);
    }

    return [discoveredEdges, exploredEdges];
  }

  function buildAdjList(vertices, arestas) {
    let graph = {};

    vertices.forEach(vertice => {
      graph[vertice] = [];
    });

    arestas.forEach(aresta => {
      graph[aresta[0]].push(aresta[1]);
      graph[aresta[1]].push(aresta[0]);
    });

    return graph;
  }

  function buildAdjMatrix(verticesLen, arestasLen, arestas) {
    let graph = [];

    for (let i = 0; i < verticesLen; i++) {
      graph[i] = [];
      for (let j = 0; j < verticesLen; j++) {
        graph[i][j] = 0;
      }
    }

    let ind1, ind2, aux;

    for (let i = 0; i < arestasLen; i++) {
      ind1 = arestas[i][0] - 1;
      ind2 = arestas[i][1] - 1;

      if (ind1 > ind2) {
        aux = ind2;
        ind2 = ind1;
        ind1 = aux;
      }
      graph[ind1][ind2] = 1;
      graph[ind2][ind1] = 1;
    }

    return graph;
  }

  function removeEdgeMatrix(vertice1, vertice2) {
    let aux;
    if (vertice1 > vertice2) {
      aux = vertice1;
      vertice1 = vertice2;
      vertice2 = aux;
    }

    graph[vertice1 - 1][vertice2 - 1] = 0;

    return true;
  }

  function addEdgeMatrix(vertice1, vertice2) {
    let aux;
    if (vertice1 > vertice2) {
      aux = vertice1;
      vertice1 = vertice2;
      vertice2 = aux;
    }

    if (!graph[vertice1 - 1]) {
      return false;
    }

    graph[vertice1 - 1][vertice2 - 1] = 1;

    return true;
  }

  function removeEdgeList(vertice1, vertice2) {
    let aux;
    if (vertice1 > vertice2) {
      aux = vertice1;
      vertice1 = vertice2;
      vertice2 = aux;
    }

    if (graph[vertice1]) {
      graph[vertice1].splice(graph[vertice1].indexOf(vertice2), 1);
      graph[vertice2].splice(graph[vertice2].indexOf(vertice1), 1);
    }

    return graph;
  }

  function addEdgeList(vertice1, vertice2) {
    let aux;
    if (vertice1 > vertice2) {
      aux = vertice1;
      vertice1 = vertice2;
      vertice2 = aux;
    }

    if (graph[vertice1].includes(vertice2)) {
      console.log("Essa aresta já existe");
      return false;
    }

    if (graph[vertice1]) {
      graph[vertice1].push(vertice2);

      if (graph[vertice2]) {
        graph[vertice2].push(vertice1);
      } else {
        graph[vertice2] = [vertice1];
      }
    } else {
      graph[vertice1] = [vertice2];
    }

    return true;
  }

  function addVerticeMatrix() {
    let dimensionMatrix = graph.length;

    graph.forEach(line => {
      line[dimensionMatrix] = 0;
    });
    graph[dimensionMatrix] = [];

    return dimensionMatrix;
  }

  function addVerticeList() {
    let keys = Object.keys(graph);

    graph[+keys[keys.length - 1] + 1] = [];
    return len + 1;
  }

  function removeVerticeMatrix(vertice) {
    if (vertice <= graph.length) {
      graph.forEach(line => {
        line.splice(vertice - 1, 1);
      });
      graph.splice(vertice - 1, 1);
      return true;
    }
    return false;
  }

  function removeVerticeList(vertice) {
    let keys = Object.keys(graph);
    if (vertice <= keys.length) {
      keys.forEach(key => {
        let index = graph[key].indexOf(vertice);
        if (index !== -1) graph[key].splice(index, 1);
      });
      delete graph[vertice];
      return true;
    }
    return false;
  }

  function isConnected() {
    visitedVertices = undefined;
    exploredEdges = undefined;
    discoveredEdges = undefined;

    if (type == 1) bfsList(0);
    else bfsMatrix(0);

    for (let i = 0; i < vertices.length; i++) {
      if (!visitedVertices[i]) return false;
    }
    return true;
  }

  function hasCycle() {
    if (type == 1) completeBfsList();
    else completeBfsMatrix();

    for (let i = 0; i < arestas.length; i++) {
      let [v, w] = arestas[i];

      if (!discoveredEdges[v - 1][w - 1]) {
        return true;
      }
    }

    return false;
  }

  function isForest() {
    return !hasCycle();
  }

  function isTree() {
    if (type == 1) bfsList();
    else bfsMatrix();

    for (let i = 0; i < visitedVertices.length; i++) {
      if (!visitedVertices[i]) return false;
    }

    for (let i = 0; i < arestas.length; i++) {
      let [v, w] = arestas[i];
      if (!discoveredEdges[v - 1][w - 1]) {
        return false;
      }
    }

    return true;
  }

  function getSpanningForest() {
    let spanningForestGraph = {
      name: `GRAFO_ALEATORIO_GRUPO_JO1_N_${len}_SPANNING_FOREST`,
      vertices: vertices,
      arestas: []
    };

    if (type == 1) completeBfsList();
    else completeBfsMatrix();

    for (let i = 0; i < arestas.length; i++) {
      let [v, w] = arestas[i];
      if (discoveredEdges[v - 1][w - 1]) {
        spanningForestGraph.arestas.push([v, w]);
      }
    }

    return spanningForestGraph;
  }

  function getDistance() {
    visitedVertices = labelVertices(len);
    [discoveredEdges, exploredEdges] = labelEdges(len);
    var distanceVertices = [];

    for (let i = 0; i < vertices.length; i++) {
      if (!visitedVertices[i]) {
        if (type == 1) {
          distanceVertices = setDistanceList(i, distanceVertices);
        } else {
          distanceVertices = setDistanceMatrix(i, distanceVertices);
        }
      }
    }

    return distanceVertices;
  }

  function setDistanceList(v, distanceVertices) {
    if (!visitedVertices || !discoveredEdges || !exploredEdges) {
      visitedVertices = labelVertices(len);
      [discoveredEdges, exploredEdges] = labelEdges(len);
    }
    let w;
    let fila = [];
    v = v ? v : 0;

    visitedVertices[v] = true;
    fila.push([v + 1, 1]);

    while (fila.length > 0) {
      [v, niv] = fila.shift();
      for (let i = 0; i < graph[v].length; i++) {
        w = graph[v][i];
        if (visitedVertices[w - 1]) {
          if (!exploredEdges[v - 1][w - 1]) {
            exploredEdges[v - 1][w - 1] = true;
            exploredEdges[w - 1][v - 1] = true;
          }
        } else {
          exploredEdges[v - 1][w - 1] = true;
          exploredEdges[w - 1][v - 1] = true;
          discoveredEdges[v - 1][w - 1] = true;
          discoveredEdges[w - 1][v - 1] = true;
          visitedVertices[w - 1] = true;
          console.log(distanceVertices);
          distanceVertices[w - 1] = niv;
          fila.push([w, niv + 1]);
        }
      }
    }

    return distanceVertices;
  }

  function setDistanceMatrix(v, distanceVertices) {
    if (!visitedVertices || !discoveredEdges || !exploredEdges) {
      visitedVertices = labelVertices(len);
      [discoveredEdges, exploredEdges] = labelEdges(len);
    }

    let fila = [];
    v = v ? v : 0;

    visitedVertices[v] = true;
    fila.push([v, 1]);

    while (fila.length > 0) {
      [v, niv] = fila.shift();
      for (let i = 0; i < graph[v].length; i++) {
        if (graph[v][i] == 1) {
          if (visitedVertices[i]) {
            if (!exploredEdges[v][i]) {
              exploredEdges[v][i] = true;
              exploredEdges[i][v] = true;
            }
          } else {
            exploredEdges[v][i] = true;
            exploredEdges[i][v] = true;
            discoveredEdges[v][i] = true;
            discoveredEdges[i][v] = true;
            visitedVertices[i] = true;
            distanceVertices[i] = niv;
            fila.push([i, niv + 1]);
          }
        }
      }
    }

    return distanceVertices;
  }

  function printRaw() {
    console.log(graph);
  }

  function prettyPrint() {
    let prettyGraph = {
      nome: `GRAFO_ALEATORIO_N_${len}`,
      vertices,
      arestas
    };
    console.log(prettyGraph);
  }

  if (type == 1) {
    return {
      removeEdge: removeEdgeList,
      addEdge: addEdgeList,
      removeVertice: removeVerticeList,
      addVertice: addVerticeList,
      prettyPrint,
      printRaw,
      completeDfs: completeDfsList,
      completeBfs: completeBfsList,
      isConnected,
      hasCycle,
      isForest,
      isTree,
      getSpanningForest,
      getDistance,
      len,
      arestas,
      vertices
    };
  } else if (type == 2) {
    return {
      removeEdge: removeEdgeMatrix,
      addEdge: addEdgeMatrix,
      removeVertice: removeVerticeMatrix,
      addVertice: addVerticeMatrix,
      prettyPrint,
      printRaw,
      completeDfs: completeDfsMatrix,
      completeBfs: completeBfsMatrix,
      isConnected,
      hasCycle,
      isForest,
      isTree,
      getSpanningForest,
      getDistance,
      len,
      arestas,
      vertices
    };
  }
};
