// Climbing Hill Algorithm for TSP

function randomSolution(graph: number[][]){
  let cities = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let solution = [];
  var randomCity = cities[Math.floor(Math.random() * cities.length)];

  for(let i = 0; i < 10; i++){
    randomCity = cities[Math.floor(Math.random() * cities.length)];
    solution.push(randomCity);
    cities.splice(cities.indexOf(randomCity), 1);
  }
  
  return solution;
}

function routeLength(graph: number[][], solution: number[]){
  let routeLength = 0;
  
  for(let i = 1; i < 10; i++){
    if(graph[solution[i-1]][solution[i]] == -1 || graph[solution[i-1]][solution[i]] == 0){
      return 1000000;
    }
    
    routeLength += graph[solution[i - 1]][solution[i]];
  }
  
  return routeLength;
}

function getNeighbours(solution: number[]){
  let neighbours:number[][] = new Array<number[]>();

  for(let i = 0; i < 10; i++){
    for(let j = i+1; j < 10; j++){
      if(solution[i] != i && solution[j] != j || solution[i] == solution[j]){
        let newSolution = solution.slice();
        newSolution[i] = solution[j];
        newSolution[j] = solution[i];
        neighbours.push(newSolution);
      }
    }
  }

  return neighbours;
}

function getBestNeighbour(graph: number[][], neighbours: number[][]){
  let bestRouteLength = 1000000;
  let bestNeighbour = [0];

  neighbours.forEach(neighbour => {
    let currentRouteLength = routeLength(graph, neighbour)
    
    if (currentRouteLength < bestRouteLength && currentRouteLength != 0){
      bestRouteLength = currentRouteLength;
      bestNeighbour = neighbour;
    }
  });

  return {bestNeighbour, bestRouteLength};
}

function hillClimbing(graph : number[][]){
  let currentSolution: number[] = randomSolution(graph);
  let currentRouteLength = routeLength(graph, currentSolution);
  let neighbours:number[][] = getNeighbours(currentSolution);
  let neighbor = getBestNeighbour(graph, neighbours);

  let bestNeighbour:number[] = neighbor.bestNeighbour;
  let bestNeighbourRouteLength:number = neighbor.bestRouteLength;

  while(bestNeighbourRouteLength < currentRouteLength){
    currentSolution = bestNeighbour;
    currentRouteLength = bestNeighbourRouteLength;
    neighbours = getNeighbours(currentSolution);
    neighbor = getBestNeighbour(graph, neighbours);
    bestNeighbour = neighbor.bestNeighbour;
    bestNeighbourRouteLength = neighbor.bestRouteLength;
  }

  return {currentSolution, currentRouteLength};
}

function main() {
    let graph : number[][] = [
      [0,30,84,56,0,0,0,75,0,80],
      [30,0,65,0,0,0,70,0,0,40],
      [84,65,0,74,52,55,0,60,143,48],
      [56,0,74,0,135,0,0,20,0,0],
      [1,0,52,135,0,70,0,122,98,80],
      [70,0,55,0,70,0,63,0,82,35],
      [1,70,0,0,0,63,0,0,120,57],
      [75,0,135,20,122,0,0,0,0,0],
      [0,0,143,0,98,82,120,0,0,0],
      [80,40,48,0,80,35,57,0,0,0],
    ];

    let path:number[], cost:number;
    let solution = hillClimbing(graph);

    while(solution.currentRouteLength == 1000000){
      solution = hillClimbing(graph);
    }

    path = solution.currentSolution;
    cost = solution.currentRouteLength - 1;
  
    console.log("Caminho:", path);
    console.log("Custo:", cost);
  }

  main()