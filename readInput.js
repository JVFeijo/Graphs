const fs = require("fs");
const rlAsync = require("readline");
const rl = require("readline-sync");
const Graph = require("./graph");

let grafo;
let graph;

async function program() {
  let continuar = await getGraph();
  while (continuar) {
    continuar = getOperation();
  }
}

async function getGraph() {
  let answer = rl.question(
    "Escolha o numero de vertices de seu grafo entre as opções:\n1. n = 3\n2. n = 7\n3. n = 10\n"
  );
  let fileName = getFileName(answer);
  if (fileName === "badOption") {
    console.log("Tente novamente por favor.");
    return false;
  } else {
    loadGraph(fileName);
    await sleep(100);
    return true;
  }
}

function getOperation() {
  let answer = rl.question(
    "Escolha uma das operações:\n1. Adicionar aresta\n2. Remover aresta\n3. Adicionar vertice\n4. Remover vertice\n5. Print\n6. pretty print\n7. Encerrar\n"
  );
  let result = operate(graph, answer);
  if (result === "end") {
    return false;
  } else {
    return true;
  }
}

program();

function getFileName(option) {
  let filename = "";
  switch (option) {
    case "1":
      filename = "graph3";
      break;
    case "2":
      filename = "graph7";
      break;
    case "3":
      filename = "graph10";
      break;
    case "4":
      filename = "kill";
      break;
    default:
      filename = "badOption";
      break;
  }
  return filename;
}

function loadGraph(fileName) {
  const readline = rlAsync.createInterface({
    input: fs.createReadStream(fileName),
    output: process.stdout,
    terminal: false
  });

  let input = [];

  readline.on("line", line => {
    // console.log("Received : ", line);
    input.push(line);
  });

  readline.on("close", () => {
    input = input.join("\n");
    grafo = JSON.parse(input);
    graph = Graph(grafo);
  });
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

function operate(graph, option) {
  let answer;
  let vertice;
  let vertice1;
  let vertice2;
  switch (option) {
    case "1":
      answer = rl.question(
        "Quais arestas? (Ex.: 1 2 - adiciona aresta entre vertices 1 e 2)\n"
      );
      [vertice1, vertice2] = answer.split(" ");
      graph.addEdgeMatrix(vertice1, vertice2);
      graph.addEdgeList(vertice1, vertice2);
      break;
    case "2":
      answer = rl.question(
        "Quais arestas? (Ex.: 1 2 - remove aresta entre vertices 1 e 2)\n"
      );
      [vertice1, vertice2] = answer.split(" ");
      graph.removeEdgeMatrix(vertice1, vertice2);
      graph.removeEdgeList(vertice1, vertice2);
      break;
    case "3":
      graph.addVerticeMatrix();
      graph.addVerticeList();
      console.log(`Vertice ${graph.len + 1} adicionado`);
      break;
    case "4":
      answer = rl.question("Qual vertice? (Ex.: 3 - remove o vertice 3)\n");

      graph.removeVerticeMatrix(answer);
      graph.removeVerticeList(answer);
      break;
    case "5":
      graph.printRaw();
      break;
    case "6":
      graph.prettyPrint();
      break;
    case "7":
      return "end";
    default:
      return true;
  }
  return true;
}
