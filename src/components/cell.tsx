import { Coordinates, Object } from "./maze";

interface Props {
    coordinates: Coordinates;
    mazeSize: number;
    type?: Object;
    isVisited?: boolean;
}

export function Cell(props: Props) {

    return (
        <div
            className={`
                aspect-square flex justify-center items-center text-xs
                ${props.type === "wall" ? "bg-neutral-500"
                    : props.type === "door" ? "bg-red-200"
                    : props.isVisited ? "bg-amber-200"
                    : "bg-white"
                }
            `}
            style={{width: "1fr"}}
        />
    );
}