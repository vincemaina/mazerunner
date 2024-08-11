import { Grid } from "./grid";
import { Player } from "./player";

export type Coordinates = { x: number; y: number };

export type Object = "wall" | "door";

export type ObjectMap = {
    [x: number]: {
        [y: number]: Object
    }
};

export function getMazeCenter(size: number): Coordinates {
    return { x: Math.floor(size / 2), y: Math.floor(size / 2) };
}

interface Props {
    size: number;
    width: number;
    objects: ObjectMap;
}

export function Maze(props: Props) {
    return (
        <div className="bg-white shadow border-t relative" style={{ width: props.width }}>
            <Grid size={props.size} objects={props.objects} />
            <Player mazeSize={props.size} mazeWidth={props.width} objects={props.objects} />
        </div>
    );
}
