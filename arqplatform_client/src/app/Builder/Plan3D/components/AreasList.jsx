import { useState } from "react"
import { useSelector } from "react-redux"

export default function AreasList() {
	const open = useSelector(state => state.building.view) !== "3D";
	
	if (open) return (
		<div style={{position: "absolute"}}>
			<ul>
				<li><button>NIVEL 1</button></li>
				<li><button>NIVEL 2</button></li>
				<li><button>AMBIENTES</button></li>
				<ul>
					<li><button>MODULO AULA</button></li>
					<li><button>CAFETERIA</button></li>
					<li><button>BIBLIOTECA</button></li>
					<li><button>AUDITORIO</button></li>
				</ul>
			</ul>
		</div>
	)
}
