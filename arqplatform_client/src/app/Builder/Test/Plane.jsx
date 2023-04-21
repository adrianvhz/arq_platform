import { usePlane } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

/**
 * 
 * @param {any} props 
 * @returns 
 */
export default function Plane(props)
{
  const [ref, api] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props}))
  // useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  return (
    <mesh
    receiveShadow
    // @ts-ignore
    ref={ref}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial color="#171717" transparent opacity={0.4} />
    </mesh>
  )
}
