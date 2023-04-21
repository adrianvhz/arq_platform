import { BackSide } from "three";
import ClassroomGroup from "./ClassroomGroup";

// aulas = 20
// aulas permitidas = 6
// e.g. solo se permite una fila de hasta 6 aulas

export default function Linear({ classrooms, data, maxIndex }) {
	return data.map(el => (
		<ClassroomGroup position={el.position} side={BackSide} />
	))
}
