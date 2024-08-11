import { Grid } from "./grid";
import { Player } from "./player";

export type Coordinates = { x: number; y: number };

export function getMazeCenter(size: number): Coordinates {
    return { x: Math.floor(size / 2), y: Math.floor(size / 2) };
}

interface Props {
    size: number;
    width: number;
}

export function Maze(props: Props) {
    return (
        <div className="bg-white shadow border-t relative overflow-hidden" style={{width: props.width}}>
            <Grid size={props.size} />
            <Player mazeSize={props.size} mazeWidth={props.width}/>
        </div>
    );
}
