'use client';

import { atom, map } from "nanostores";
import { useEffect } from "react";
import { Coordinates, ObjectMap } from "./maze";
import { useStore } from "@nanostores/react";
import { Loader } from "./loader";
import { depthFirstSearch } from "@/util/maze-solving/depth-first-search";

export const $objectMap = map<ObjectMap>({});
export const $numberOfMoves = atom<number>(0);
export const $currentPosition = map<Coordinates>({ x: 1, y: 1 });
export const $hasWon = atom<boolean>(false);
export const $visitedCells = atom<Coordinates[]>([{ x: 1, y: 1 }]);
export const $solution = atom<Coordinates[]>([{ x: 1, y: 1 }]);

function movePlayer({ x = 0, y = 0 }: Coordinates) {
    if ($hasWon.get()) return;

    const currentPosition = $currentPosition.get();
    const newPosition = { x: currentPosition.x + x, y: currentPosition.y + y };
    

    const object = $objectMap.get()[newPosition.y]?.[newPosition.x];
    
    console.log('object:', object);
    if (object === "wall") return;

    $currentPosition.set(newPosition);
    $visitedCells.set([...$visitedCells.get(), newPosition]);
}

interface Props {
    mazeSize: number;
    mazeWidth: number;
    objects: ObjectMap;
    isComputer?: boolean;
}

export function Player(props: Props) {

    const currentPosition = useStore($currentPosition);
    const numberOfMoves = useStore($numberOfMoves);
    const hasWon = useStore($hasWon);

    useEffect(() => {
        console.log(props.objects);
        $objectMap.set(props.objects);

        $currentPosition.listen((value) => {
            console.log('currentPosition:', value);
            $numberOfMoves.set($numberOfMoves.get() + 1);
            const object = $objectMap.get()[value.y]?.[value.x];
            if (object === "door") $hasWon.set(true);
        });

        if (props.isComputer) {
            depthFirstSearch(props.mazeSize, props.objects);
        }

        if (!props.isComputer && typeof window !== 'undefined') {
            window.addEventListener('keydown', (event) => {
                switch (event.key) {
                    case 'ArrowUp':
                    case 'w':
                    case 'W':
                        console.log('up');
                        if ($currentPosition.get().y === 0) return;
                        movePlayer({ x: 0, y: -1 });
                        break;
                    case 'ArrowDown':
                    case 's':
                    case 'S':
                        console.log('down');
                        if ($currentPosition.get().y >= props.mazeSize - 1) return;
                        movePlayer({ x: 0, y: 1 });
                        break;
                    case 'ArrowLeft':
                    case 'a':
                    case 'A':
                        console.log('left');
                        if ($currentPosition.get().x === 0) return;
                        movePlayer({ x: -1, y: 0 });
                        break;
                    case 'ArrowRight':
                    case 'd':
                    case 'D':
                        console.log('right');
                        if ($currentPosition.get().x >= props.mazeSize - 1) return;
                        movePlayer({ x: 1, y: 0 });
                        break;
                    default:
                        break;
                }
            });
        }

        return () => {
            if (!props.isComputer && typeof window !== 'undefined') {
                window.removeEventListener('keydown', () => {});
            };
        };
    }, []);

    const playerSize = props.mazeWidth / props.mazeSize;
    const cellSize = props.mazeWidth / props.mazeSize;

    if (currentPosition.x === -1 || currentPosition.y === -1) {
        return (
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <Loader/>
            </div>
        )
    }

    return (
        <>
            {hasWon &&
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <h1 className="text-4xl font-bold text-black">Level Complete</h1>
                </div>
            }

            <pre className="absolute -bottom-10 left-0">{JSON.stringify({
                currentPosition,
                numberOfMoves
            })}</pre>

            <div className="absolute inset-0">
                <div className="bg-red-500 aspect-square rounded-full relative w-10 transition-all duration-75"
                    style={{top: currentPosition.y * cellSize, left: currentPosition.x * cellSize, width: playerSize}}
                />
            </div>
        </>
    );
}