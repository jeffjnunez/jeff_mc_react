import { usePlane } from '@react-three/cannon';

import { useStore } from '../hooks/useStore';
import { groundTexture } from '../images/textures';

export const Ground = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI * 0.5, 0, 0],
        position: [0, -0.5, 0]
    }));
    const [addCube] = useStore((state) => [state.addCube]);

    groundTexture.repeat.set(100, 100);

    return (
        <mesh
            onClick={(e) => {
                e.stopPropagation();
                // const [x, y, z] = Object.values(e.point).map(value => Math.round(value));
                let [x, y, z] = Object.values(e.point);
                x = Math.round(x);
                z = Math.round(z);
                y = Math.ceil(y);
                // debugger
                addCube(x, y, z);
            }}
            ref={ref}
        >
            <planeGeometry attach='geometry' args={[100, 100]} />
            <meshStandardMaterial attach='material' map={groundTexture} />

        </mesh>
    );
};