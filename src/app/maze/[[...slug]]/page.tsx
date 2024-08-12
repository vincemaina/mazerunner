import { Maze } from "@/components/maze";
import { aldousBroderMaze } from "@/util/maze-generation/algorithms/aldous-broder";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default function Page({ params }: { params: { slug: string[] } }) {

    console.log(params);

    let mazeSize = params.slug ? parseInt(params.slug[0]) : 63;
    mazeSize % 2 === 0 && mazeSize++;
    mazeSize = Math.max(5, Math.min(101, mazeSize));

    const objects = aldousBroderMaze(mazeSize, mazeSize);

    let playedByComputer = true;
    if (params.slug && params.slug[1] == 'play') {
        playedByComputer = false;
    }

    return (
        <div className="flex flex-col gap-2 items-center justify-center w-full flex-auto relative">
            <div
                className="absolute inset-0 z-0"
                style={{background: 'url(/vine-tile.webp)', backgroundSize: 'contain'}}
            />
       
            <Maze
                size={mazeSize}
                width={550}
                objects={objects}
                isPlayable
                isComputer={playedByComputer}
            />
        </div>
    )
}
