// Paris metro implementation using A* algorithm (A-star) 
import {
  MinPriorityQueue, IGetCompareValue
} from '@datastructures-js/priority-queue';

let distancesGraph = [
  [0, 11, 20, 27, 40, 43, 39, 28, 18, 10, 18, 30, 30, 32],
  [11, 0, 9, 16, 29, 32, 28, 19, 11, 4, 17, 23, 21, 24],
  [20, 9, 0, 7, 20, 22, 19, 15, 10, 11, 21, 21, 13, 18],
  [27, 16, 7, 0, 13, 16, 12, 13, 13, 18, 26, 21, 11, 17],
  [40, 29, 20, 13, 0, 3, 2, 21, 25, 31, 38, 27, 16, 20],
  [43, 32, 22, 16, 3, 0, 4, 23, 28, 33, 41, 30, 17, 20],
  [39, 28, 19, 12, 2, 4, 0, 22, 25, 29, 38, 28, 13, 17],
  [28, 19, 15, 13, 21, 23, 22, 0, 9, 22, 18, 7, 25, 30],
  [18, 11, 10, 13, 25, 28, 25, 9, 0, 13, 12, 12, 23, 28],
  [10, 4, 11, 18, 31, 33, 29, 22, 13, 0, 20, 27, 20, 23],
  [18, 17, 21, 26, 38, 41, 38, 18, 12, 20, 0, 15, 35, 39],
  [30, 23, 21, 21, 27, 30, 28, 7, 12 , 27, 15, 0, 31, 37],
  [30, 21, 13, 11, 16, 17, 13, 25, 23, 20, 35, 31, 0, 5],
  [32, 24, 18, 17, 20, 20, 17, 30, 28, 23, 39, 37, 5, 0]
]

class node {
  public index : number
  public gCost : number = Number.MAX_VALUE
  public fCost : number = Number.MAX_VALUE
  public hCost : number = 0
  
  public neighbors = new Array<node>()

  public constructor(index: number, hCost: number) {
    this.index = index
    this.hCost = hCost
  }

  public setNeighbors(neighbour: node, cost : number) {
    this.neighbors.push(neighbour)
    this.neighbors[this.neighbors.length - 1].gCost = cost
  }
}

const compare: IGetCompareValue<node> = (node) => node.fCost;

function Astar(start: node, end: node) {
  start.gCost = 0
  start.fCost = start.hCost

  let frontier = new MinPriorityQueue<node>(compare)
  frontier.enqueue(start)

  let explored = new Array<node>()

  let steps = 0
  while(!frontier.isEmpty()) {
    let current = frontier.dequeue()
    explored.push(current)
    steps++

    console.log("Nó atual: "+ current.index)

    if(current.index == end.index) {
      console.log("Steps: " + steps)
      return
    }

    for(let i = 0; i < current.neighbors.length; i++) {
      let neighbor : node = current.neighbors[i]

      if(!explored.includes(neighbor)) {
        neighbor.gCost = current.gCost + neighbor.gCost
        neighbor.fCost = neighbor.gCost + neighbor.hCost
        frontier.enqueue(neighbor)
      }
    }
  }
}

function main() {
  let start = 0
  let end = 1

  let adjacencyList = [
    [0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [11, 0, 9, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0],
    [0, 9, 0, 7, 0, 0, 0, 0, 10, 0, 0, 0, 13, 0],
    [0, 0, 7, 0, 13, 0, 0, 13, 0, 0, 0, 0, 11, 0],
    [0, 0, 0, 13, 0, 3, 2, 21, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 13, 21, 0, 0, 0, 9, 0, 0, 7, 0, 0],
    [0, 0, 10, 0, 0, 0, 0, 9, 0, 0, 12, 0, 0, 0],
    [0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0],
    [0, 0, 13, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0]
  ]

  let lines = [
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9],
    [11, 12, 13]
  ]
  
  let tree = new Array<node>()
  for(let i = 0; i < adjacencyList.length; i++) {
    let newnode = new node(i, 0)

    for(let j = 0; j < adjacencyList[i].length; j++) {
      if(j != i) {
        let neighbor = new node(j, distancesGraph[i][j])
        newnode.setNeighbors(neighbor, adjacencyList[i][j])
      }
    }
    tree.push(newnode)
  }
  
  Astar(tree[start], tree[end])
}

main()