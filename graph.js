module.exports = function(grafo) {
  const adjList = buildAdjList(grafo.vertices, grafo.arestas);
  const adjMatrix = buildAdjMatrix(
    grafo.vertices.length,
    grafo.arestas.length,
    grafo.arestas
  );
  const len = adjMatrix.length;

  function buildAdjList(vertices, arestas) {
    let adjList = {};

    vertices.forEach(vertice => {
      adjList[vertice] = [];
    });

    arestas.forEach(aresta => {
      adjList[aresta[0]].push(aresta[1]);
      adjList[aresta[1]].push(aresta[0]);
    });

    return adjList;
  }

  function buildAdjMatrix(verticesLen, arestasLen, arestas) {
    let adjMatrix = [];

    for (let i = 0; i < verticesLen; i++) {
      adjMatrix[i] = [];
      for (let j = i + 1; j < verticesLen; j++) {
        adjMatrix[i][j] = 0;
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
      adjMatrix[ind1][ind2] = 1;
    }

    return adjMatrix;
  }

  function removeEdgeMatrix(vertice1, vertice2) {
    let aux;
    if (vertice1 > vertice2) {
      aux = vertice1;
      vertice1 = vertice2;
      vertice2 = aux;
    }

    adjMatrix[vertice1 - 1][vertice2 - 1] = 0;

    return true;
  }

  function addEdgeMatrix(vertice1, vertice2) {
    let aux;
    if (vertice1 > vertice2) {
      aux = vertice1;
      vertice1 = vertice2;
      vertice2 = aux;
    }

    if (!adjMatrix[vertice1 - 1]) {
      return false;
    }

    adjMatrix[vertice1 - 1][vertice2 - 1] = 1;

    return true;
  }

  function removeEdgeList(vertice1, vertice2) {
    let aux;
    if (vertice1 > vertice2) {
      aux = vertice1;
      vertice1 = vertice2;
      vertice2 = aux;
    }

    if (adjList[vertice1]) {
      adjList[vertice1].splice(adjList[vertice1].indexOf(vertice2), 1);
      adjList[vertice2].splice(adjList[vertice2].indexOf(vertice1), 1);
    }

    return adjList;
  }

  function addEdgeList(vertice1, vertice2) {
    let aux;
    if (vertice1 > vertice2) {
      aux = vertice1;
      vertice1 = vertice2;
      vertice2 = aux;
    }

    if (adjList[vertice1].includes(vertice2)) {
      console.log("Essa aresta já existe");
      return false;
    }

    if (adjList[vertice1]) {
      adjList[vertice1].push(vertice2);

      if (adjList[vertice2]) {
        adjList[vertice2].push(vertice1);
      } else {
        adjList[vertice2] = [vertice1];
      }
    } else {
      adjList[vertice1] = [vertice2];
    }

    return true;
  }

  function addVerticeMatrix() {
    let dimensionMatrix = adjMatrix.length;

    adjMatrix.forEach(line => {
      line[dimensionMatrix] = 0;
    });
    adjMatrix[dimensionMatrix] = [];

    return dimensionMatrix;
  }

  function addVerticeList() {
    let keys = Object.keys(adjList);

    adjList[+keys[keys.length - 1] + 1] = [];
    return len + 1;
  }

  function removeVerticeMatrix(vertice) {
    if (vertice <= adjMatrix.length) {
      adjMatrix.forEach(line => {
        line.splice(vertice - 1, 1);
      });
      adjMatrix.splice(vertice - 1, 1);
      return true;
    }
    return false;
  }

  function removeVerticeList(vertice) {
    let keys = Object.keys(adjList);
    if (vertice <= keys.length) {
      keys.forEach(key => {
        let index = adjList[key].indexOf(vertice);
        if (index !== -1) adjList[key].splice(index, 1);
      });
      delete adjList[vertice];
      return true;
    }
    return false;
  }

  function printRaw() {
    console.log(adjMatrix);
    console.log(adjList);
  }

  function prettyPrint() {
    let arestas = [];
    let vertices = Object.keys(adjList);
    vertices.forEach(vertice => {
      adjList[vertice].forEach(vizinho => {
        if (vizinho > vertice) {
          let par = [vertice, vizinho];
          arestas.push(par);
        }
      });
    });
    let prettyGraph = {
      nome: `GRAFO_ALEATORIO_N_${len}`,
      vertices,
      arestas
    };
    console.log(prettyGraph);
  }

  return {
    removeEdgeList,
    removeEdgeMatrix,
    addEdgeList,
    addEdgeMatrix,
    removeVerticeMatrix,
    removeVerticeList,
    addVerticeMatrix,
    addVerticeList,
    prettyPrint,
    printRaw,
    len
  };
};
