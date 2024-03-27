import PriorityQueue from "priorityqueuejs";

const dijkstra = (grid, startNode, endNode) => {
  const visitedNodesInOrder = [];

  let nodesToVisit = new PriorityQueue((a, b) => -(a.distance - b.distance));

  startNode.distance = 0;
  nodesToVisit.enq({ row: startNode.row, col: startNode.col, distance: 0 });

  while (nodesToVisit.size() > 0) {
    const { row, col, distance } = nodesToVisit.deq();
    let currentNode = grid[row][col];

    if (distance > grid[row][col].distance) continue;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === endNode) return visitedNodesInOrder;

    const x = [1, -1, 0, 0];
    const y = [0, 0, 1, -1];
    for (let i = 0; i < 4; i++) {
      let neighborRow = row + x[i];
      let neighborCol = col + y[i];

      if (
        neighborRow >= 0 &&
        neighborRow < grid.length &&
        neighborCol >= 0 &&
        neighborCol < grid[0].length &&
        !grid[neighborRow][neighborCol].isVisited &&
        !grid[neighborRow][neighborCol].isWall
      ) {
        let neighbor = grid[neighborRow][neighborCol];
        if (neighbor.distance > currentNode.distance + neighbor.weight + 1) {
          neighbor.distance = currentNode.distance + neighbor.weight + 1;

          neighbor.previousNode = currentNode;
          nodesToVisit.enq({
            row: neighbor.row,
            col: neighbor.col,
            distance: neighbor.distance,
          });
        }
      }
    }
  }
  return visitedNodesInOrder;
};

const getNodesInShortestPathOrder = (endNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
};

export { dijkstra, getNodesInShortestPathOrder };
