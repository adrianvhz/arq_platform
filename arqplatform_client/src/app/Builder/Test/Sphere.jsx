import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useSphere } from "@react-three/cannon";
import { Material, MeshLambertMaterial } from "three";

/**
 * 
 * @param {any} props
 * @returns 
 */
export default function Sphere(props)
{
    const [ref, api] = useSphere(() => ({ mass: 1, rotation: [-Math.PI / 2, 0, 0], ...props }))
    // useFrame((state, delta) => (ref.current.rotation.x += 0.01))
    return (
        <mesh
        receiveShadow
        // castShadow
        // @ts-ignore
        ref={ref}>
            <sphereGeometry args={[1, 32, 16]} />
            <meshBasicMaterial color="#764aa7" />
        </mesh>
    )
}