import { Maze } from "@/components/maze";

export default function Home() {
  return (
    <div className="">
      <h1>Pathfinder</h1>

      <Maze size={23}/>
    </div>
  );
}
