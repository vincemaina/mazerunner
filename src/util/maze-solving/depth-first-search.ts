import { Coordinates, ObjectMap } from "@/components/maze";
import { $currentPosition, $hasWon, $solution } from "@/components/player";
import { $visitedCells } from "@/components/player";

const DELAY = 10;

export async function depthFirstSearch(mazeSize: number, objectMap: ObjectMap, previousPosition?: Coordinates) {
    let neighbors;
    while ((neighbors = getNeighbors(mazeSize, objectMap)).length > 0 && !$hasWon.get()) {
        const nextPosition = neighbors[0];
        const currentPosition = $currentPosition.get();
        $currentPosition.set(nextPosition);
        $visitedCells.set([...$visitedCells.get(), nextPosition]);
        $solution.set([...$solution.get(), nextPosition]);
        await new Promise((resolve) => setTimeout(resolve, DELAY));
        await depthFirstSearch(mazeSize, objectMap, currentPosition);
    }



    if (previousPosition && !$hasWon.get()) {
        await new Promise((resolve) => setTimeout(resolve, DELAY));
        $currentPosition.set(previousPosition);
        $solution.set($solution.get().slice(0, -1));
    }
    return;
}

function getNeighbors(mazeSize: number, objectMap: ObjectMap) {

    const currentPosition = $currentPosition.get();
    const neighbors = [];

    neighbors.push({ x: currentPosition.x - 1, y: currentPosition.y });
    neighbors.push({ x: currentPosition.x + 1, y: currentPosition.y });
    neighbors.push({ x: currentPosition.x, y: currentPosition.y - 1 });
    neighbors.push({ x: currentPosition.x, y: currentPosition.y + 1 });

    const unvisitedNeighbors = neighbors.filter(
        (neighbor) => {
            const isVisited = $visitedCells.get().some(
                (cell) => cell.x === neighbor.x && cell.y === neighbor.y
            );
            const object = objectMap[neighbor.y]?.[neighbor.x];
            return !isVisited && object !== "wall";
        }
    );

    return unvisitedNeighbors;
}
