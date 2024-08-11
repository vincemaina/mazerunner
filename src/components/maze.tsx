'use client';

import { useEffect } from "react";
import { Grid } from "./grid";

interface Props {
    size: number;
    width: number;
}

export function Maze(props: Props) {

    useEffect(() => {

    }, []);

    return (
        <div className="bg-white shadow border-t" style={{width: props.width}}>
            <Grid
                size={props.size}
            />
        </div>
    );
}