import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Pasillo from "../../../Builder/Plan3D/components/Pasillo/Pasillo";
import SoccerField from "../../../Builder/Plan3D/components/SoccerField/SoccerField";
import Terrain from "../../../Builder/Plan3D/components/Terrain/Terrain";
// import Pabellones_ from "./Pabellones_";

export default function View3D({ selectedVersion }) {
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

    let pasillo = {
        width: 2.4 * increment_scale
    }

	return (
		<Canvas
            camera={{
                fov: 65, // 60
                aspect: window.innerWidth / window.innerHeight,
                position: [3202.3188734998785, 858.758291437268, -42.78855655034773],
                rotation: ["-1.6205812315008037", "1.3084828063007592", "1.6223414925263104", "XYZ"],
                far: 7000, // 3200
                near: 4
            }}
        >
			{/* INIT CONFIG */}
			<color attach="background" args={[0xebebeb]} />
			<ambientLight intensity={0.2} />

			<directionalLight
				args={[0xffffff, 0.5]}
				position={[10, 19, 0]}
				// castShadow
				shadow-mapSize={[2048, 2048]}
			/>

			<OrbitControls
				rotateSpeed={0.5}
				zoomSpeed={1}
				panSpeed={0.5}
				enableRotate={true}
				minZoom={0.17066106572499624}
			/>
            
            <Pabellones_
                amount_classrooms={amount_classrooms}
                classroom={classroom}
                bathroom={bathroom}
                baths_amount={baths_amount}
                data={data}
                stairs={stairs}
                terrain={terrain}
                increment_scale={increment_scale}
                wall_thickness={wall_thickness}
            />

            <SoccerField
                terrain={terrain}
                amount_classrooms={amount_classrooms}
                soccer_field={soccer_field}
				color={0x8a8a8a}
            />

            <Pasillo
				args={[pasillo.width, terrain.width - 200]}
                position={[0, 0, (terrain.width / 2) - classroom.width - (pasillo.width / 2)]}
				rotation={[Math.PI / 2, 0, Math.PI / 2]}
                color={0xa8a8a8}
            />

            <Terrain
                width={terrain.width}
                length={terrain.length}
            />
        </Canvas>
	)
}
