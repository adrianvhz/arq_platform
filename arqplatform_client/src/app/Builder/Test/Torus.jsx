import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

/**
 * 
 * @param {JSX.IntrinsicElements['mesh']} props 
 * @returns 
 */
export default function Torus(props) {
    const ref = useRef(null);
    // const [clicked, click] = useState(false);
    // useFrame((state, delta) => (ref.current.rotation.x += 0.01))

    return (
        <mesh
        receiveShadow
        {...props}
        ref={ref}>
            <torusGeometry  args={[1, 0.5, 32, 100]} />
            {/* <torusGeometry args={[3, .7, 8, 20, Math.PI * 2]} /> */}
            <meshNormalMaterial color={0x00ff00} />
            {/* <meshNormalMaterial color={0x00ff00} wireframe /> */}
        </mesh>
    )
}
