import { Cell } from "./cell";
import { ObjectMap } from "./maze";

interface Props {
    size: number;
    objects: ObjectMap;
}

export function Grid(props: Props) {
    return (
        <div className="w-full">
            <div className="grid grid-cols-12" style={{gridTemplateColumns: `repeat(${props.size}, minmax(0, 1fr))`}}>
                {Array.from({ length: props.size * props.size }).map((_, index) => {
                    const i = Math.floor(index / props.size);
                    const j = index % props.size;
                    const type = props.objects[i]?.[j];
                    
                    return (
                        <Cell
                            key={`${i}-${j}`}
                            coordinates={{ x: i, y: j }}
                            mazeSize={props.size}
                            type={type}
                        />
                    );
                })}
            </div>
        </div>
    );
}