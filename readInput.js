const fs = require("fs");
const rl = require("readline");

let graphMatrix;
let graphList;

const readStdin = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function program() {
  readStdin.question(
    "Escolha o numero de vertices de seu grafo entre as opções:\n1. n = 3\n2. n = 7\n3. n = 10\n4. n = 100\n5. n = 200\n6. n = 500\n",
    answer => {
      let fileName = getFileName(answer);
      if (fileName === "badOption") return program();
      loadGraph(fileName);
    }
  );
}

readStdin.on("line", line => {
  if (line === "eof") readStdin.close();
});

program();

function getFileName(option) {
  let filename = "";
  switch (option) {
    case "1":
      filename = "graph3";
      break;
    case "2":
      filename = "graph3";
      break;
    case "3":
      filename = "graph3";
      break;
    case "4":
      filename = "graph3";
      break;
    case "5":
      filename = "graph3";
      break;
    case "6":
      filename = "graph3";
      break;
    default:
      filename = "badOption";
      break;
  }
  return filename;
}

function loadGraph(fileName) {
  const readline = rl.createInterface({
    input: fs.createReadStream(fileName),
    output: process.stdout,
    terminal: false
  });

  let input = [];
  let grafo;

  readline.on("line", line => {
    // console.log("Received : ", line);
    input.push(line);
  });

  readline.on("close", () => {
    input = input.join("\n");
    grafo = JSON.parse(input);

    console.log(grafo.arestas);

    const adjMatrix = buildAdjMatrix(
      grafo.vertices.length,
      grafo.arestas.length,
      grafo.arestas
    );

    const adjList = buildAdjList(grafo.vertices, grafo.arestas);

    console.log(adjMatrix);

    console.log(adjList);

    graphMatrix = adjMatrix;
    graphList = adjList;

    let removedGraphMatrix = removeEdgeMatrix(adjMatrix, "1", "2");
    let removedGraphList = removeEdgeList(adjList, "1", "2");

    console.log(removedGraphMatrix);
    console.log(removedGraphList);

    console.log(addEdgeMatrix(adjMatrix, "1", "2"));
    console.log(addEdgeList(adjList, "1", "2"));
  });
}

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
    console.log(ind1, ind2);
    adjMatrix[ind1][ind2] = 1;
  }

  return adjMatrix;
}

function printArestas(adjMatrix) {
  for (let linha in adjMatrix) {
    for (let coluna in adjMatrix[linha]) {
      if (adjMatrix[linha][coluna] == 1) {
        console.log(+linha + 1, +coluna + 1);
      }
    }
  }
}

function removeEdgeMatrix(adjMatrix, vertice1, vertice2) {
  let aux;
  if (vertice1 > vertice2) {
    aux = vertice1;
    vertice1 = vertice2;
    vertice2 = aux;
  }

  adjMatrix[vertice1 - 1][vertice2 - 1] = 0;

  return adjMatrix;
}

function addEdgeMatrix(adjMatrix, vertice1, vertice2) {
  let aux;
  if (vertice1 > vertice2) {
    aux = vertice1;
    vertice1 = vertice2;
    vertice2 = aux;
  }

  adjMatrix[vertice1 - 1][vertice2 - 1] = 1;

  return adjMatrix;
}

function removeEdgeList(adjList, vertice1, vertice2) {
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

function addEdgeList(adjList, vertice1, vertice2) {
  let aux;
  if (vertice1 > vertice2) {
    aux = vertice1;
    vertice1 = vertice2;
    vertice2 = aux;
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

  return adjList;
}
