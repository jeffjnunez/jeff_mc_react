import { useBox } from '@react-three/cannon';
import { useState } from 'react';

import * as textures from '../images/textures';
import { useStore } from '../hooks/useStore';
import { Color } from 'three';

export const Cube = ({ position, texture }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [ref] = useBox(() => ({
        type: 'Static',
        position
    }));
    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube]);

    const activeTexture = textures[texture+'Texture'];
    // console.log('activeTexture', activeTexture);

    return (
        <mesh
            onPointerMove={(e) => {
                e.stopPropagation();
                setIsHovered(true);
            }}
            onPointerOut={(e) => {
                e.stopPropagation();
                setIsHovered(false);
            }}
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
            <boxGeometry attach='geometry' />
            <meshStandardMaterial
                color={isHovered ? new Color(0xCDCE90) : new Color(0xFFFFFF)}
                map={activeTexture}
                transparent={true}
                opacity={texture === 'glass' ? 0.85 : 1}
                attach ='material'
            />
        </mesh>
    )
};