interface Props {
    size: number;
}

export function Grid(props: Props) {
    return (
        <div className="w-full">
            <div className="grid grid-cols-12" style={{gridTemplateColumns: `repeat(${props.size}, minmax(0, 1fr));`}}>
                {Array.from({ length: props.size * props.size }).map((_, i) => (
                    <div
                        key={i}
                        className="aspect-square border border-neutral-400 flex justify-center items-center text-xs"
                        style={{width: "1fr"}}
                    />
                ))}
            </div>
        </div>
    );
}