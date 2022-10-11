import { useBox } from '@react-three/cannon';
import * as textures from '../images/textures';

import { useStore } from '../hooks/useStore';

export const Cube = ({ position, texture }) => {
    const [ref] = useBox(() => ({
        type: 'Static',
        position
    }));
    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube]);

    const activeTexture = textures[texture+'Texture'];
    // console.log('activeTexture', activeTexture);

    return (
        <mesh
            onClick={(e) => {
                e.stopPropagation();
                const clickedFace = Math.floor(e.faceIndex / 2);
                let {x, y, z} = e.object.position;
                if (e.altKey) {
                    removeCube(x, y, z);
                }
                else {
                    switch (clickedFace) {
                        case 0:
                            x++;
                            break;
                        case 1:
                            x--;
                            break;
                        case 2:
                            y++;
                            break;
                        case 3:
                            y--;
                            break;
                        case 4:
                            z++;
                            break;
                        case 5:
                            z--;
                            break;
                        default:
                            return;
                    }
                    addCube(x, y, z);
                }
            }}
            ref={ref}

        >
            <boxBufferGeometry attach='geometry' />
            <meshStandardMaterial map={activeTexture} attach ='material' />
        </mesh>
    )
};