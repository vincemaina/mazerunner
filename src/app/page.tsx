import { Coordinates, Maze, ObjectMap } from "@/components/maze";

export default function Home() {

  const mazeSize = 23;
  const objects: ObjectMap = {};
  const outerWalls: Coordinates[] = [];

  for (let i = 0; i < mazeSize; i++) {
    objects[i] = {};
    for (let j = 0; j < mazeSize; j++) {
      if (i === 0 || i === mazeSize - 1 || j === 0 || j === mazeSize - 1) {
        objects[i][j] = "wall";
        outerWalls.push({ x: i, y: j });
      }
    }
  }

  const door = outerWalls[Math.floor(Math.random() * outerWalls.length)];
  if (door) {
    objects[door.x][door.y] = "door";
  }

  return (
    <div>
      <Maze size={mazeSize} width={500} objects={objects} />
    </div>
  );
}
