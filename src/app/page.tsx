import { Maze, ObjectMap } from "@/components/maze";

export default function Home() {

  const mazeSize = 23;

  const objects: ObjectMap = {};

  for (let i = 0; i < mazeSize; i++) {
    objects[i] = {};
    for (let j = 0; j < mazeSize; j++) {
      if (i === 0 || i === mazeSize - 1 || j === 0 || j === mazeSize - 1) {
        objects[i][j] = "wall";
      }
    }
  }

  return (
    <div>
      <Maze size={mazeSize} width={500} objects={objects} />
    </div>
  );
}
