import { ObjectMap } from "@/components/maze";

export function fillMazeWithWalls(size: number): ObjectMap {
    const objects: ObjectMap = {};
    for (let i = 0; i < size; i++) {
        objects[i] = {};
        for (let j = 0; j < size; j++) {
            objects[i][j] = "wall";
        }
    }
    return objects;
}
