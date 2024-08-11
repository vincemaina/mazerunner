import { Coordinates, Object } from "./maze";

interface Props {
    coordinates: Coordinates;
    mazeSize: number;
    type?: Object;
    isVisited?: boolean;
    isSolution?: boolean;
}

export function Cell(props: Props) {

    return (
        <div
            className={`
                aspect-square flex justify-center items-center text-xs
                ${props.type === "wall" ? "bg-neutral-500"
                    : props.type === "door" ? "bg-sky-500"
                    : props.isSolution ? "bg-green-400"
                    : props.isVisited ? "bg-amber-100"
                    : "bg-white"
                }
            `}
            style={{width: "1fr"}}
        />
    );
}