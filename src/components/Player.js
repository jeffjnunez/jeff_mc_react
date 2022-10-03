import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { useKeyboard } from '../hooks/useKeyboard';

const JUMP_FORCE = 4;
const MOVE_FORCE = 3;

export const Player = () => {
    const {
        moveBackward,
        moveForward,
        moveLeft,
        moveRight,
        jump
    } = useKeyboard();

    const { camera } = useThree();
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        'position': [0, 1, 10]
    }));

    const vel = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => vel.current = v);
    }, [api.velocity]);

    const pos = useRef([0, 0, 0]);
    useEffect(() => {
        api.position.subscribe((p) => pos.current = p);
    }, [api.position]);

    useFrame(() => {
        camera.position.copy(new Vector3(
            pos.current[0],
            pos.current[1],
            pos.current[2]
        ));

        const direction = new Vector3();

        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
        );
        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0
        );

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(MOVE_FORCE)
            .applyEuler(camera.rotation);

        api.velocity.set(
            direction.x,
            vel.current[1],
            direction.z
        );

        if (jump && Math.abs(vel.current[1]) < 0.005) {
            api.velocity.set(
                vel.current[0],
                JUMP_FORCE,
                vel.current[2],
            );
        }

        // // console.log(sideVector, frontVector);
        // api.velocity.set(
        //     sideVector.x * MOVE_FORCE,
        //     vel.current[1],
        //     frontVector.z * MOVE_FORCE
        // );
    });

    return (
        <mesh ref={ref}></mesh>
    );
};