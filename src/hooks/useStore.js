import create from 'zustand';
import { nanoid } from 'nanoid';

export const useStore = create((set) => ({
    texture: 'dirt',
    cubes: [
        {
            key: nanoid(),
            pos: [2, 0, 7],
            texture: 'glass'
        },
        {
            key: nanoid(),
            pos: [1, 0, 7],
            texture: 'wood'
        },
        {
            key: nanoid(),
            pos: [0, 0, 7],
            texture: 'dirt'
        },
        {
            key: nanoid(),
            pos: [0, 0, 6],
            texture: 'wood'
        },
        {
            key: nanoid(),
            pos: [0, 0, 5],
            texture: 'wood'
        },
        {
            key: nanoid(),
            pos: [0, 0, 4],
            texture: 'wood'
        },
        {
            key: nanoid(),
            pos: [0, 0, 3],
            texture: 'grass'
        }
    ],
    addCube: (x, y, z) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.texture
                }
            ]
        }));
    },
    removeCube: (x, y, z) => {
        set((prev) => ({
            cubes: prev.cubes.filter(cube => {
                const [X, Y, Z] = cube.pos;
                return X !== x || Y !== y || Z !== z;
            })
        }));
    },
    setTexture: (texture) => {
        set(() => ({
            texture
        }));
    },
    saveWorld: () => {},
    resetWorld: () => {}
}));