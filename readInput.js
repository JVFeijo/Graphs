///////////////////////////////////////////////////
//    ENCOLHA AS FUNÇÕES E DEPOIS COMECE A LER   //
//         PARA UMA MELHOR LEGIBILIDADE          //
///////////////////////////////////////////////////

const fs = require("fs");
const rlAsync = require("readline");
const rl = require("readline-sync");
const Graph = require("./graph");

let grafo; // É UMA VARIÁVEL QUE GUARDA O GRAFO DO ARQUIVO
let graph; // E OUTRA PRO GRAFO NO TIPO QUE FOR SELECIONADO(MATRIX OU LISTA)
let weigth; // SE FOR COM PESO NAS ARESTAS ESSA VARIÁVEL VAI SER TRUE

// MAIN()
async function program() {
  let continuar = await getGraph();
  while (continuar) {
    continuar = getOperation();
  }
}

async function getGraph() {
  let answer;
  let type = rl.question(
    "Qual será o tipo do seu grafo?\n1. Lista de Adjacência\n2. Matrix de Adjacência\n3. Grafo com peso\n"
  );
  if (type != "3") {
    answer = rl.question(
      "Escolha o numero de vertices de seu grafo entre as opções:\n0. n = 0\n1. n = 3\n2. n = 7\n3. n = 10\n4. n = 200\n5. n = 1000\n"
    );
  } else {
    answer = rl.question(
      "Escolha o numero de vertices de seu grafo entre as opções:\n1. n = 7\n2. n = 15\n3. n = 20\n"
    );
    weigth = true;
    type = 2;
    answer = String(+answer + 5);
  }
  let fileName = getFileName(answer);
  if (fileName === "badOption") {
    console.log("Tente novamente por favor.");
    return false;
  } else {
    loadGraph(fileName, type, weigth);
    await sleep(100);
    return true;
  }
}

function getOperation() {
  let question =
    "Escolha uma das operações:\n1. Adicionar aresta\n2. Remover aresta\n3. Adicionar vertice\n4. Remover vertice\n5. Print\n6. pretty print\n7. Encerrar\n8. Depth first search\n9. Breadth first search\n10. Test connectivity\n11. Test cyclicity\n12. Test if is a forest\n13. Test if is a tree\n14. Get spanning forest\n15. Get distance\n";
  if (weigth) {
    question = question + "16. Find shortest path\n";
  }
  let answer = rl.question(question);
  let result = operate(graph, answer);
  if (result === "end") {
    return false;
  } else {
    return true;
  }
}

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
    case "7":
      filename = "graphweigth15";
      break;
    case "8":
      filename = "graphweigth20";
      break;
    default:
      filename = "badOption";
      break;
  }
  return filename;
}

function loadGraph(fileName, type, weigth) {
  const readline = rlAsync.createInterface({
    input: fs.createReadStream(fileName),
    output: process.stdout,
    terminal: false
  });

  let input = [];

  readline.on("line", line => {
    input.push(line);
  });

  readline.on("close", () => {
    input = input.join("\n");
    grafo = JSON.parse(input);
    graph = Graph(grafo, type, weigth);
  });
}

// NODE.JS É ASSÍNCRONO ENTÃO EU USEI UMA FUNÇÃO QUE ESPERA UM DETERMINADO
// TEMPO PARA ESPERAR A LEITURA DO GRAFO NO ARQUIVO
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
  let start = new Date();
  switch (option) {
    case "1": // ADICIONA ARESTA
      answer = rl.question(
        "Quais arestas? (Ex.: 1 2 - adiciona aresta entre vertices 1 e 2)\n"
      );
      [vertice1, vertice2] = answer.split(" ");
      graph.addEdge(vertice1, vertice2);
      console.log(`Aresta ["${vertice1}", "${vertice2}"] adicionada\n`);
      break;
    case "2": // REMOVE ARESTA
      answer = rl.question(
        "Quais arestas? (Ex.: 1 2 - remove aresta entre vertices 1 e 2)\n"
      );
      [vertice1, vertice2] = answer.split(" ");
      graph.removeEdge(vertice1, vertice2);
      console.log(`Aresta ["${vertice1}", "${vertice2}"] removida\n`);
      break;
    case "3": // ADICIONA VERTICE
      graph.addVertice();
      console.log(`\nVertice ${graph.len + 1} adicionado\n`);
      break;
    case "4": // REMOVE VERTICE
      answer = rl.question("Qual vertice? (Ex.: 3 - remove o vertice 3)\n");
      graph.removeVertice(answer);
      console.log(`\nVertice ${answer} removido\n`);
      break;
    case "5": // PRINT RAW
      graph.printRaw();
      break;
    case "6": // PRETTY PRINT
      graph.prettyPrint();
      break;
    case "7": // ENCERRA PROGRAMA
      return "end";
    case "8": // DEPTH FIRST SEARCH
      runtime = graph.completeDfs();
      console.log(`\nRuntime: ${new Date() - start}\n`);
      return true;
    case "9": // BREADTH FIRST SEARCH
      runtime = graph.completeBfs();
      console.log(`\nRuntime: ${new Date() - start}\n`);
      return true;
    case "10": // TESTA CONECTIVIDADE
      let isConnected = graph.isConnected();
      if (isConnected) {
        console.log("\nGraph is connected\n");
      } else {
        console.log("\nGraph is not connected\n");
      }
      console.log(`\nRuntime: ${new Date() - start}\n`);
      return true;
    case "11": // TESTA CICLICIDADE
      let hasCycle = graph.hasCycle();
      if (hasCycle) console.log("\nGraph is circular\n");
      else console.log("\nGraph is not circular\n");
      console.log(`\nRuntime: ${new Date() - start}\n`);
      return true;
    case "12": // TESTA SE É FLORESTA
      let isForest = graph.isForest();
      if (isForest) console.log("\nGraph is a forest\n");
      else console.log("\nGraph is not a forest\n");
      console.log(`\nRuntime: ${new Date() - start}\n`);
      return true;
    case "13": // TESTA SE É ÁRVORE
      let isTree = graph.isTree();
      if (isTree) console.log(`\nGraph is a tree\n`);
      else console.log(`\nGraph is not a tree\n`);
      console.log(`\nRuntime: ${new Date() - start}\n`);
      return true;
    case "14": // GERA UM ARQUIVO COM A SPANNING FOREST MAS EU PRINTO TAMBÉM
      let spanningForest = graph.getSpanningForest();
      let jsonSpanningForest = JSON.stringify(spanningForest);
      fs.writeFileSync(`graphSpanningForest${graph.len}`, jsonSpanningForest);
      console.log(`\nSpanningForestGraph file generated successfully\n`);
      console.log(spanningForest);
      console.log(`\nRuntime: ${new Date() - start}\n`);
      return true;
    case "15": // GERA VETOR COM NIVEIS DOS VERTICES
      let distanceVertices = graph.getDistance();
      console.log(`\nRuntime: ${new Date() - start}\n`);
      console.log(`\nDistance from root(vertice 1):\n`);
      distanceVertices.forEach((dist, index, arr) => {
        console.log(`vertice ${index + 1}: ${dist}\n`);
      });
      return true;
    case "16": // GERA VETOR
      let shortestPath = graph.shortestPath();
      console.log(`\nRuntime: ${new Date() - start}\n`);
      console.log(shortestPath);
      console.log();
      return true;
    default:
      return true;
  }
  return true;
}

program();
