type CellType = "start" | "end" | "wall" | "empty";

type Coordinates = { x: number; y: number };

function getCellType(coords: Coordinates, mazeSize: number): CellType {
    if (Math.floor(mazeSize / 2) === coords.x && Math.floor(mazeSize / 2) === coords.y) {
        return "start";
    }
    return "empty";
}

interface Props {
    coordinates: Coordinates;
    mazeSize: number;
}

export function Cell(props: Props) {

    const type: CellType = getCellType(props.coordinates, props.mazeSize);

    return (
        <div
            className={`
                aspect-square border-b border-r flex justify-center items-center text-xs
                ${type === "start" ? "bg-green-500" : ""}
            `}
            style={{width: "1fr"}}
        />
    );
}