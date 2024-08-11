'use client';

import { map } from "nanostores";
import { useEffect } from "react";
import { Coordinates } from "./maze";
import { useStore } from "@nanostores/react";

export const $currentPosition = map<Coordinates>({ x: 0, y: 0 });

interface Props {
    mazeSize: number;
    mazeWidth: number;
}

export function Player(props: Props) {

    const currentPosition = useStore($currentPosition);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', (event) => {
                switch (event.key) {
                    case 'ArrowUp':
                        console.log('up');
                        $currentPosition.setKey("y", currentPosition.y - 1);
                        break;
                    case 'ArrowDown':
                        console.log('down');
                        $currentPosition.setKey("y", currentPosition.y + 1);
                        break;
                    case 'ArrowLeft':
                        console.log('left');
                        $currentPosition.setKey("x", currentPosition.x - 1);
                        break;
                    case 'ArrowRight':
                        console.log('right');
                        $currentPosition.setKey("x", currentPosition.x + 1);
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

    return (
        <div className="absolute inset-0">
            <div className="h-full w-full relative">
                <div className="bg-red-500 aspect-square rounded-full absolute"
                    style={{top: currentPosition.y / props.mazeSize, left: currentPosition.x / props.mazeSize, width: `${playerSize}px`}}
                />
            </div>
        </div>
    );
}