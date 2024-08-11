import { Grid } from "./grid";
import { Player } from "./player";

export type Coordinates = { x: number; y: number };

interface Props {
    size: number;
    width: number;
}

export function Maze(props: Props) {
    return (
        <div className="bg-white shadow border-t relative" style={{width: props.width}}>
            <Grid size={props.size} />
            <Player mazeSize={props.size} mazeWidth={props.width}/>
        </div>
    );
}
