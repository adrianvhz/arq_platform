import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import { Material, MeshLambertMaterial } from "three";

/**
 * 
 * @param {JSX.IntrinsicElements['mesh']} props 
 * @returns 
 */
export default function Box(props)
{
    const [ref, api] = useBox(() => ({ mass: 1, rotation: [0.4, 0.2, 0.5], ...props }));
    // const refMesh = useRef<THREE.Mesh>(null!);
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    // useFrame(({ clock }) => api.position.set(Math.sin(clock.getElapsedTime()) * props.x, 0, 0))
    // useFrame((state, delta) => (ref.current.rotation.x += 0.01))

    return (
        <mesh
            receiveShadow
            // castShadow
            // @ts-ignore
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={e => click(!clicked)}
            onPointerOver={e => hover(true)}
            onPointerOut={e => hover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshLambertMaterial color={hovered ? '#149414' : '#d80000'} />
        </mesh>
    )
}
