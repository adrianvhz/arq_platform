import { useEffect } from "react";
import "./styles.css";

export default function Sidebar({ state, school }) {
	useEffect(() => {
		Array.from(document.getElementsByClassName("sidebar-item")).forEach(el => {
			el.className = "sidebar-item active"
		});
	}, []); // open
	
	return (
		<div className="sidebar" style={{ height: "100%" }}>
			<ul className="sidebar-list">
				<li className="sidebar-item">
					<span className="sidebar-anchor">Proyecto </span>
					<p style={{ marginTop: ".4rem" }}>Nombre: {state.name}</p>
					<p>Versión: VERSIÓN 1: HOME</p>
					<p>Zona: {state.zone}</p>
					<p>
						Niveles:&nbsp;
						{new Intl.ListFormat("es", { style: "long", type: "conjunction" })
							.format(state.level)
						}
					</p>
					<p>Tipo: {state.sublevel}</p>
					<p>Aforo maximo: {school.maxCapacity}</p>
				</li>
				<li className="sidebar-item">
					{/* <a href="#" className="sidebar-anchor">Terreno: </a> */}
					<span className="sidebar-anchor">Terreno </span>
					<p>
						Area total: {school.totalArea}m
						<span style={{ fontSize: "1.5rem" }}>²</span>
					</p>
					<p>Area parcial: {school.partialArea}</p>
					<p>Circulación: {Math.ceil(school.circulationArea)}</p>
					<p>
						Area general: {school.generalArea}m
						<span style={{fontSize: "1.5rem"}}>²</span>
					</p>
				</li>
				<li className="sidebar-item">
					{/* <a href="#" className="sidebar-anchor">Cantidad: </a> */}
					<span className="sidebar-anchor">Cantidad </span>
					<p style={{ marginTop: ".4rem" }}>
						# Aulas: {school.numberOfClassrooms.getTotal()}
					</p>
					<p># Baños: {school.bathrooms.length}</p>
				</li>
				<li className="sidebar-item">
					{/* <a href="#" className="sidebar-anchor">Medidas de Aula</a> */}
					<span className="sidebar-anchor">Medidas del Aula</span>
					<p>Columna: 0.25m</p>
					<p>Largo: 8m</p>
					<p>Ancho: 6.25m</p>
				</li>
			</ul>
		</div>
	)
}
