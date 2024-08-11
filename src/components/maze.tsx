import { Grid } from "./grid";
import { Player } from "./player";

export type Coordinates = { x: number; y: number };

export type Object = "wall" | "door" | "path";

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
    isPlayable?: boolean;
    isComputer?: boolean;
}

export function Maze(props: Props) {
    return (
        <div className="relative rounded overflow-hidden" style={{ width: props.width }}>
            <div
                className="absolute inset-0 z-10"
                style={{boxShadow: "inset rgba(0,0,0,0.2) 1px 1px 5px"}}
            />
            <Grid size={props.size} objects={props.objects} />
            {props.isPlayable &&
                <Player mazeSize={props.size} mazeWidth={props.width} objects={props.objects} isComputer={props.isComputer} />
            }
        </div>
    );
}
