import * as THREE from "three";
import { useState, useEffect, useRef } from "react";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import square from "../../../assets/svg/a1234.svg";
import flatten from "lodash-es/flatten";

export default function Svg(props) {
	return (
		<Scene { ...props } />
	)
}

const svgResource = new Promise(resolve =>
    new SVGLoader().load(square, shapes => {
        resolve(flatten(shapes.paths.map((group, index) => {
            return group.toShapes(true).map(shape => {
                const fillColor = group.userData.style.fill;
                return ({ shape, color: "skyblue", index });
            })
        }))
        )
    })
);

function SvgShape({shape, color, index}) {
    let mesh = useRef();
    let extrudeSettings = { depth: 100, bevelEnabled: true, bevelSegments: 3, steps: 6, bevelSize: 2, bevelThickness: 1.7 };

    return (
        <mesh ref={mesh}>
            <extrudeGeometry attach="geometry" args={[shape, extrudeSettings]} />
            <meshBasicMaterial
                aspect={window.innerWidth / window.innerHeight}
                attach="material"
                color={color}
                transparent
                opacity={1}
                // side={THREE.DoubleSide}
                flatShading={true}
                depthWrite={true}
                polygonOffset
                polygonOffsetFactor={index * -0.1}
                // wireframe
            />
        </mesh>
    )
}

function Scene(props) {
    const [shapes, set] = useState([]);
    
    // useEffect(() => svgResource.then(set), []); // 🤔
    useEffect(() => {
        svgResource.then(set)
    }, []);

    return (
        <group 
            { ...props }
            position={[0, 140, 0]}
            // color={new THREE.Color(0xb0b0b0)} 
            // scale={[1, 1, 1]}
			// scale={[0.125, 0.125, 0.125]}
            rotation={[THREE.MathUtils.degToRad(90), 0, 0]}
        >
            {shapes.map(item =>  
                <SvgShape key={item.shape.uuid} {...item} />
            )}
        </group>
    )
}
