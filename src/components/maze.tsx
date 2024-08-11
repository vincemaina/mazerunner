import { Grid } from "./grid";

interface Props {
    size: number;
}

export function Maze(props: Props) {
    return (
        <div className="bg-white w-[500px]">
            <Grid
                size={props.size}
            />
        </div>
    );
}