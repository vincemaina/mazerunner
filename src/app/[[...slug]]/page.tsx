import { Maze } from "@/components/maze";
import { aldousBroderMaze } from "@/util/maze-generation/algorithms/aldous-broder";

export const dynamic = 'force-dynamic';

export default function Page({ params }: { params: { slug: string[] } }) {

    console.log(params);

    let mazeSize = params.slug ? parseInt(params.slug[0]) : 63;
    mazeSize % 2 === 0 && mazeSize++;

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
