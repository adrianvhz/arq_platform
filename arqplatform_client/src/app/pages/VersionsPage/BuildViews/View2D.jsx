import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import SoccerFieldView from "../../../Builder/components/SoccerFieldView/SoccerFieldView";
// import Pabellones_ from "./Pabellones_";
import Pasillo from "../../../Builder/Plan3D/components/Pasillo/Pasillo";
import Terrain2D from "../../../Builder/PlanFloor/components/Terrain2D/Terrain2D";
import SoccerField2D from "../../../Builder/PlanFloor/components/SoccerField2D/SoccerField2D";

export default function View2D({ selectedVersion }) {
	// Plan 3D all data
	let {
		result_data,
		classroom_measurements,
		construction_info
	} = JSON.parse(selectedVersion.build_data);
	
	let aforoData;

	try {
		aforoData = JSON.parse(selectedVersion.aforo);
	} catch (err) {
		aforoData = selectedVersion.aforo;
	}
	
	let data = {
		levels: JSON.parse(selectedVersion.level).map(level => level.toLowerCase()),
		aforo: {
			inicial: aforoData.aforoInicial,
			primaria: aforoData.aforoPrimaria,
			secundaria: aforoData.aforoSecundaria
		},
		aulas: {
			inicial: aforoData.aulaInicial,
			primaria: aforoData.aulaPrimaria,
			secundaria: aforoData.aulaSecundaria
		},
		zone: selectedVersion.zone,
		type: selectedVersion.sublevel
	}

	let amount_bathrooms = {
		inicial: Math.ceil(aforoData.aforoInicial / 25),
		primaria: Math.ceil(aforoData.aforoPrimaria / 60),
		secundaria: Math.ceil(aforoData.aforoSecundaria / 60)
	}


	// bathrooms data...

	let baths_amount = []
	// let baths_amount = {}
	let total_bathrooms = amount_bathrooms.inicial + amount_bathrooms.primaria + amount_bathrooms.secundaria;

	if (data.levels.includes("inicial")) {
		let pab1_baths = amount_bathrooms.inicial <= 6 ? amount_bathrooms.inicial : 6;
		baths_amount.push({
			pab: 1,
			baths: pab1_baths
		});
		total_bathrooms -= pab1_baths;


		let pab2_baths = (amount_bathrooms.primaria + amount_bathrooms.secundaria) <= 6 ? (amount_bathrooms.primaria + amount_bathrooms.secundaria) : 6;
		baths_amount.push({
			pab: 2,
			baths: pab2_baths
		});
		total_bathrooms -= pab2_baths;

	} else {
		let pab1_baths = amount_bathrooms.primaria + amount_bathrooms.secundaria <= 6 ? amount_bathrooms.primaria + amount_bathrooms.secundaria : 6
		baths_amount.push({
			pab: 1,
			baths: pab1_baths
		});
		total_bathrooms -= baths_amount.pab1;

		
		let pab2_baths = total_bathrooms > 0 ? total_bathrooms : 0;
		baths_amount.push({
			pab: 2,
			baths: pab2_baths
		});
		total_bathrooms -= baths_amount.pab2;
	}



	// data objects ....

    let increment_scale = 50;
    let wall_thickness = 7.5; // 15cm (0.15 * increment_scale)

    let terrain_side = construction_info.area_general**0.5;

    let terrain = {
        length: terrain_side * increment_scale,
        width: terrain_side * increment_scale
    }
    
    let amount_classrooms = result_data.aulas; // 30

    let classroom = {
        length: (classroom_measurements.muro_horizontal * increment_scale) + (wall_thickness * 2),
        width: (classroom_measurements.muro_vertical * increment_scale) + (wall_thickness * 2),
        height: 2.2 * increment_scale,
		bigas: {
			horizontal: {
				width: 0.30 * increment_scale,
				height: 0.60 * increment_scale
			},
			vertical: {
				width: 0.30 * increment_scale,
				height: 0.40 * increment_scale
			}
		}
    }

	let bathroom = {
		lavamanos: 0.60 * increment_scale,
		inodoro: 1.40 * increment_scale, // largo del cubiculo
		ancho_de_cubiculo: 0.85 * increment_scale, // ancho del baño (cubiculo y lavamanos)
		pasillo: 1.20 * increment_scale,
		pasillo_de_entrada: 1 * increment_scale
	}

    let stairs = {
        flight: { // tramo de escalones
            width: 1.20 * 50,
            riser: 0.17 * 50, // contrapaso
            tread: 0.25 * 50, // paso
        },
        landing: { // descanso
            width: 1.20 * 50,
            length: 2.40 * 50
        },
        width: 2.40 * 50,
        length: (1.20 * 50 * 2) + (8 * 0.25 * 50),
        flight1_amount: 8,
	    flight2_amount: 8
    }

    let soccer_field = {
        width: 15 * increment_scale, // 22
        length: 28 * increment_scale // 44
    }

	let frustumSize = 857;
	let aspect = (window.innerWidth / 2) / (window.innerHeight / 2);

	return (
		<Canvas
			orthographic
            camera={{
				position: [0.0033158862420857344, 3315.741671368019, 0.000004318159471182016],
				rotation: ["-1.5707963254925756", "0.000001000043601318168", "1.5694940634737558", "XYZ"],
				manual: true,
				far: 7000,
				near: 4,
				zoom: 0.23180497402501982,
				left: frustumSize * aspect / - 2,
				right: frustumSize * aspect / 2,
				top: frustumSize / 2,
				bottom: frustumSize / - 2
            }}
        >
			{/* INIT CONFIG */}
			<color attach="background" args={[0xebebeb]} />
			<OrthographicCamera
					makeDefault
					manual
					position={[0.0033158862420857344, 3315.741671368019, 0.000004318159471182016]}
					rotation={["-1.5707963254925756", "0.000001000043601318168", "1.5694940634737558", "XYZ"]}
					left={frustumSize * aspect / - 2}
					right={frustumSize * aspect / 2}
					top={frustumSize / 2}
					bottom={frustumSize / - 2}
					zoom={0.23180497402501982}
					near={4}
					far={7000}
				/>
			<ambientLight intensity={0.2} />

			<directionalLight
				args={[0xffffff, 0.5]}
				position={[10, 19, 0]}
				// castShadow
				shadow-mapSize={[2048, 2048]}
			>
				{/* <mesh
					scale={[2.5, 2.5, 2.5]}
					onClick={() => {
						ref.current.intensity = ref.current.intensity === 1 ? 0.3 : 1
					}}
				>
					<sphereGeometry args={[5]} />
					<meshStandardMaterial color={"yellow"} emissive={"red"} />
				</mesh> */}

			</directionalLight>
			<OrbitControls
				rotateSpeed={0.5}
				zoomSpeed={1}
				panSpeed={0.5}
				enableRotate={false}
				minZoom={0.17066106572499624}
			/>
            
            <Pabellones_
                amount_classrooms={amount_classrooms}
                classroom={classroom}
                bathroom={bathroom}
                baths_amount={baths_amount}
                data={data}
                stairs={stairs}
				vista={"2D"}
                terrain={terrain}
                increment_scale={increment_scale}
                wall_thickness={wall_thickness}
            />

            <SoccerField2D
                terrain={terrain}
                amount_classrooms={amount_classrooms}
                classroom={classroom}
                soccer_field={soccer_field}
                increment_scale={increment_scale}
            />

            <Terrain2D
                width={terrain.width}
                length={terrain.length}
            />
        </Canvas>
	)
}
