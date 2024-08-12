import Image from "next/image";
import { redirect } from "next/navigation";

export default function Page() {

    async function handleSubmit(formData: FormData) {
        'use server';

        const mazeSize = formData.get('mazeSize') as string;
        const mode = formData.get('mode') as string;

        redirect(`/maze/${mazeSize}/${mode}`);
    }

    return (
        <>
            <div
                className="fixed inset-0 -z-10"
                style={{background: 'url(/forest.png)', backgroundSize: 'cover'}}
            />

            <div className="bg-black text-white shadow-lg p-16 rounded">
                <Image
                    src={`/logo.svg`}
                    width={200}
                    height={200}
                    alt="Maze"
                    className="mb-10"
                />

                <form action={handleSubmit} className="flex flex-col">

                    <label>
                        Maze size

                        <input
                            type="number"
                            name="mazeSize" 
                            id="mazeSize"
                            step={2}
                            min={5}
                            max={101}
                            defaultValue={15}
                            required
                            className="text-black ml-2"
                        />
                    </label>

                    <label>
                        Mode

                        <select name="mode" id="mode" required className="text-black ml-2">
                            <option value="dfs">Algorithm: Depth-First Search</option>
                            <option value="play">I want to solve it myself!</option>
                        </select>
                    </label>

                    <button type="submit" className="bg-white text-black p-3 rounded mt-10">
                        Start
                    </button>
                </form>
            </div>
        </>
    )
}
