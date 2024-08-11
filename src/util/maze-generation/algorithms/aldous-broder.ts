/**
 * Created by https://github.com/professor-l/mazes/blob/master/scripts/aldous-broder.js
 */

import { ObjectMap } from "@/components/maze";

export function aldousBroderMaze(width: number, height: number): ObjectMap {
    // Make dimensions odd
    width -= width % 2;
    width++;
    height -= height % 2;
    height++;

    // Initialize maze: each square is its own set
    const maze: number[][] = [];
    let unvisited = 0;

    for (let i = 0; i < height; i++) {
        maze.push([]);
        for (let j = 0; j < width; j++) {
            const isPathCell = i % 2 === 1 && j % 2 === 1;
            if (isPathCell) unvisited++;
            maze[i].push(1); // 1 represents a wall initially
        }
    }

    let on: [number, number] = [0, 0];

    do {
        on[0] = Math.floor(Math.random() * height);
        on[1] = Math.floor(Math.random() * width);
    } while (on[0] % 2 === 0 || on[1] % 2 === 0);

    maze[on[0]][on[1]] = 0; // 0 represents a path
    unvisited--;

    while (unvisited > 0) {
        const n = neighborsAB(maze, on[0], on[1]);
        if (!n.length) break;

        const to = n[Math.floor(Math.random() * n.length)];

        if (maze[to[0]][to[1]] === 1) {
            maze[to[0]][to[1]] = 0; // Mark new cell as path
            maze[(to[0] + on[0]) / 2][(to[1] + on[1]) / 2] = 0; // Mark passage between cells
            unvisited--;
        }
        on = to;
    }

    // Set the entrance and exit
    // maze[0][1] = 0; // Start point
    maze[height - 1][width - 2] = 2; // Exit point, 2 represents the door

    // Convert maze to ObjectMap
    const objectMap: ObjectMap = {};
    for (let i = 0; i < height; i++) {
        objectMap[i] = {};
        for (let j = 0; j < width; j++) {
            if (maze[i][j] === 0) {
                objectMap[i][j] = "path";
            } else if (maze[i][j] === 2) {
                objectMap[i][j] = "door";
            } else {
                objectMap[i][j] = "wall";
            }
        }
    }

    return objectMap;
}

function neighborsAB(maze: number[][], ic: number, jc: number): [number, number][] {
    const final: [number, number][] = [];
    for (let i = 0; i < 4; i++) {
        const n: [number, number] = [ic, jc];

        // Iterates through four neighbors
        // [i][j - 2] 
        // [i][j + 2]
        // [i - 2][j]
        // [i + 2][j]
        n[i % 2] += (Math.floor(i / 2) * 2) || -2;
        if (n[0] < maze.length && n[1] < maze[0].length && n[0] > 0 && n[1] > 0) {
            final.push(n);
        }
    }
    return final;
}

// async function animateAldousBroderMaze(width, height, canvasId, speed) {
    
//     var canvas = document.getElementById(canvasId);
//     var ctx = canvas.getContext("2d");
    
//     // Make dimensions odd
//     width -= width % 2; width++;
//     height -= height % 2; height++;
    
//     var rectWidth = Math.floor(canvas.width / width);
//     var rectHeight = Math.floor(canvas.height / height);
    
//     ctx.fillStyle = "black";
//     ctx.fillRect(0, 0, width * rectWidth, height * rectHeight);
//     ctx.fillStyle = "#EC407A";

//     // Initialize maze: each square is its own set
//     var maze = [];
//     var unvisited = 0;
    
//     for (var i = 0; i < height; i++) {
//         maze.push([]);
//         for (var j = 0; j < width; j++) {
            
//             var add = (i % 2 == 1 && j % 2 == 1);
//             if (add)
//                 unvisited++;
            
//             maze[i].push(1);
//         }
//     }
//     var on = [];
    
//     do {
//         on[0] = Math.floor(Math.random() * height);
//         on[1] = Math.floor(Math.random() * width);
//     } while (on[0] % 2 == 0 || on[1] % 2 == 0);
    
//     maze[on[0]][on[1]] = 0;
//     unvisited--;
    
//     while (unvisited > 0) {
//         var n = neighborsAB(maze, on[0], on[1]);
        
//         var to = n[Math.floor(Math.random() * n.length)];
        
//         if (maze[to[0]][to[1]] == 1) {
            
//             var wall = [];
//             wall.push((to[0] + on[0]) / 2);
//             wall.push((to[1] + on[1]) / 2);
            
//             maze[to[0]][to[1]] = 0;
//             maze[wall[0]][wall[1]] = 0;
            
//             unvisited--;
            
//             await new Promise(function(resolve, reject) {
//                 setTimeout(function() {
                    
//                     ctx.clearRect(to[1] * rectWidth,
//                                   to[0] * rectHeight,
//                                   rectWidth,
//                                   rectHeight);
                    
//                     ctx.clearRect(wall[1] * rectWidth,
//                                   wall[0] * rectHeight,
//                                   rectWidth,
//                                   rectHeight);
                    
//                     resolve();
//                 }, speed);
//             });
//         }
        
//         await new Promise(function(resolve, reject) {
//             setTimeout(function() {
                
//                 ctx.clearRect(on[1] * rectWidth,
//                               on[0] * rectHeight,
//                               rectWidth,
//                               rectHeight);
                    
//                 if (unvisited != 0) {
//                     ctx.fillRect(to[1] * rectWidth,
//                                  to[0] * rectHeight,
//                                  rectWidth,
//                                  rectHeight);
//                 }
//                 resolve();
//             }, speed);
//         });
        
//         on = to;
//     }
    
//     maze[0][1] = 0;
//     maze[height - 1][width - 2] = 0;
    
//     ctx.clearRect(rectWidth, 0, rectWidth, rectHeight);
//     ctx.clearRect((width - 2) * rectWidth,
//                   (height - 1) * rectHeight,
//                   rectWidth,
//                   rectHeight);
    
//     return maze;
    
// }