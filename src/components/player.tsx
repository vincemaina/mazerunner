'use client';

import { atom, map } from "nanostores";
import { useEffect } from "react";
import { Coordinates } from "./maze";
import { useStore } from "@nanostores/react";

export const $currentPosition = map<Coordinates>({ x: 0, y: 0 });
export const $numberOfMoves = atom<number>(0);

$currentPosition.listen((value) => {
    console.log('currentPosition:', value);
    $numberOfMoves.set($numberOfMoves.get() + 1);
});

interface Props {
    mazeSize: number;
    mazeWidth: number;
}

export function Player(props: Props) {

    const currentPosition = useStore($currentPosition);
    const numberOfMoves = useStore($numberOfMoves);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', (event) => {
                switch (event.key) {
                    case 'ArrowUp':
                    case 'w':
                    case 'W':
                        console.log('up');
                        if ($currentPosition.get().y === 0) return;
                        $currentPosition.setKey("y", $currentPosition.get().y - 1);
                        break;
                    case 'ArrowDown':
                    case 's':
                    case 'S':
                        console.log('down');
                        if ($currentPosition.get().y >= props.mazeSize - 1) return;
                        $currentPosition.setKey("y", $currentPosition.get().y + 1);
                        break;
                    case 'ArrowLeft':
                    case 'a':
                    case 'A':
                        console.log('left');
                        if ($currentPosition.get().x === 0) return;
                        $currentPosition.setKey("x", $currentPosition.get().x - 1);
                        break;
                    case 'ArrowRight':
                    case 'd':
                    case 'D':
                        console.log('right');
                        if ($currentPosition.get().x >= props.mazeSize - 1) return;
                        $currentPosition.setKey("x", $currentPosition.get().x + 1);
                        break;
                    default:
                        break;
                }
            });
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('keydown', () => {});
            };
        };
    }, []);

    const playerSize = props.mazeWidth / props.mazeSize;
    const cellSize = props.mazeWidth / props.mazeSize;

    return (
        <>
            <pre className="absolute bottom-0 left-0">{JSON.stringify({
                currentPosition,
                numberOfMoves
            })}</pre>

            <div className="absolute inset-0">
                <div className="bg-red-500 aspect-square rounded-full relative w-10"
                    style={{top: currentPosition.y * cellSize, left: currentPosition.x * cellSize, width: `${playerSize}px`}}
                />
            </div>
        </>
    );
}