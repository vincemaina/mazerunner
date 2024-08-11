'use client';

import { useStore } from "@nanostores/react";
import { Cell } from "./cell";
import { ObjectMap } from "./maze";
import { $solution, $visitedCells } from "./player";

interface Props {
    size: number;
    objects: ObjectMap;
}

export function Grid(props: Props) {

    const visited = useStore($visitedCells);
    const solution = useStore($solution);

    return (
        <div className="w-full">
            <div className="grid grid-cols-12" style={{gridTemplateColumns: `repeat(${props.size}, minmax(0, 1fr))`}}>
                {Array.from({ length: props.size * props.size }).map((_, index) => {
                    const i = Math.floor(index / props.size);
                    const j = index % props.size;
                    const type = props.objects[i]?.[j];
                    const isVisited = !!visited.find(cell => cell.x === j && cell.y === i);
                    const isSolution = !!solution.find(cell => cell.x === j && cell.y === i);
                    
                    return (
                        <Cell
                            key={`${i}-${j}`}
                            coordinates={{ x: i, y: j }}
                            mazeSize={props.size}
                            type={type}
                            isVisited={isVisited}
                            isSolution={isSolution}
                        />
                    );
                })}
            </div>
        </div>
    );
}