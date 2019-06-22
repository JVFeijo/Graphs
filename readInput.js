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
  let type = rl.question(
    "Qual será o tipo do seu grafo?\n1. Lista de Adjacência\n2. Matrix de Adjacência\n3. Grafo com peso\n"
  );
  if (type != "3") {
    let answer = rl.question(
      "Escolha o numero de vertices de seu grafo entre as opções:\n0. n = 0\n1. n = 3\n2. n = 7\n3. n = 10\n4. n = 200\n5. n = 1000\n"
    );
    let fileName = getFileName(answer);
    if (fileName === "badOption") {
      console.log("Tente novamente por favor.");
      return false;
    } else {
      loadGraph(fileName, type, false);
      await sleep(100);
      return true;
    }
  } else {
    let fileName = getFileName("6");
    loadGraph(fileName, 2, true);
    await sleep(100);
    return true;
  }
}

function getOperation() {
  let answer = rl.question(
    "Escolha uma das operações:\n1. Adicionar aresta\n2. Remover aresta\n3. Adicionar vertice\n4. Remover vertice\n5. Print\n6. pretty print\n7. Encerrar\n8. Depth first search\n9. Breadth first search\n10. Test connectivity\n11. Test cyclicity\n12. Test if is a forest\n13. Test if is a tree\n14. Get spanning forest\n15. Get distance\n"
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
    case "0":
      filename = "graph0";
      break;
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
      filename = "graph200";
      break;
    case "5":
      filename = "graph1000";
      break;
    case "6":
      filename = "graphweigth7";
      break;
    default:
      filename = "badOption";
      break;
  }
  return filename;
}

function loadGraph(fileName, type) {
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
    graph = Graph(grafo, type);
    console.log(grafo.arestas.length);
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
  let runtime;
  switch (option) {
    case "1":
      answer = rl.question(
        "Quais arestas? (Ex.: 1 2 - adiciona aresta entre vertices 1 e 2)\n"
      );
      [vertice1, vertice2] = answer.split(" ");
      graph.addEdge(vertice1, vertice2);
      break;
    case "2":
      answer = rl.question(
        "Quais arestas? (Ex.: 1 2 - remove aresta entre vertices 1 e 2)\n"
      );
      [vertice1, vertice2] = answer.split(" ");
      graph.removeEdge(vertice1, vertice2);
      break;
    case "3":
      graph.addVertice();
      console.log(`\nVertice ${graph.len + 1} adicionado\n`);
      break;
    case "4":
      answer = rl.question("Qual vertice? (Ex.: 3 - remove o vertice 3)\n");
      graph.removeVertice(answer);
      console.log(`\nVertice ${answer} removido\n`);
      break;
    case "5":
      graph.printRaw();
      break;
    case "6":
      graph.prettyPrint();
      break;
    case "7":
      return "end";
    case "8":
      runtime = graph.completeDfs();
      console.log(`\nRuntime: ${runtime}\n`);
      return true;
    case "9":
      runtime = graph.completeBfs();
      console.log(`\nRuntime: ${runtime}\n`);
      return true;
    case "10":
      let isConnected = graph.isConnected();
      if (isConnected) {
        console.log("\nGraph is connected\n");
      } else {
        console.log("\nGraph is not connected\n");
      }
      return true;
    case "11":
      let hasCycle = graph.hasCycle();
      if (hasCycle) console.log("\nGraph is circular\n");
      else console.log("\nGraph is not circular\n");
      return true;
    case "12":
      let isForest = graph.isForest();
      if (isForest) console.log("\nGraph is a forest\n");
      else console.log("\nGraph is not a forest\n");
      return true;
    case "13":
      let isTree = graph.isTree();
      if (isTree) console.log(`\nGraph is a tree\n`);
      else console.log(`\nGraph is not a tree\n`);
      return true;
    case "14":
      let spanningForest = graph.getSpanningForest();
      let jsonSpanningForest = JSON.stringify(spanningForest);
      fs.writeFileSync(`graphSpanningForest${graph.len}`, jsonSpanningForest);
      console.log(`\nSpanningForestGraph file generated successfully\n`);
      console.log(spanningForest);
      console.log();
      return true;
    case "15":
      let distanceVertices = graph.getDistance();
      console.log(`\nDistance from root(vertice 1):\n`);
      distanceVertices.forEach((dist, index, arr) => {
        console.log(`vertice ${index + 1}: ${dist}\n`);
      });
      return true;
    default:
      return true;
  }
  return true;
}
