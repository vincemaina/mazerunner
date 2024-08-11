import { Maze } from "@/components/maze";
import { aldousBroderMaze } from "@/util/maze-generation/algorithms/aldous-broder";

export const dynamic = 'force-dynamic';

export default function Page() {

    const mazeSize = 49;

    const objects = aldousBroderMaze(mazeSize, mazeSize);

    return (
        <div className="flex flex-col gap-2 items-center">
            <Maze
                size={mazeSize}
                width={550}
                objects={objects}
                isPlayable
                isComputer
            />
        </div>
    )
}
