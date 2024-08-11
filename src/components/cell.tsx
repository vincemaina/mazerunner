import { Coordinates } from "./maze";

interface Props {
    coordinates: Coordinates;
    mazeSize: number;
    type?: "wall" | "door";
}

export function Cell(props: Props) {
    return (
        <div
            className={`
                aspect-square flex justify-center items-center text-xs
                ${props.type === "wall" ? "bg-gray-500" : props.type === "door" ? "bg-red-200" : "bg-white border-b border-r"}
            `}
            style={{width: "1fr"}}
        />
    );
}