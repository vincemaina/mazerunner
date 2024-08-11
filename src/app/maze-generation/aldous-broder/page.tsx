import { Maze } from "@/components/maze";
import { aldousBroder } from "@/util/maze-generation/algorithms/aldous-broder";

export default function Page() {

    const mazeSize = 23;

    const objects = aldousBroder(mazeSize);

    return (
        <div className="flex flex-col gap-2 items-center">
            <h1>Aldous-Broder</h1>
            <Maze
                size={mazeSize}
                width={500}
                objects={objects}
            />
        </div>
    )
}
