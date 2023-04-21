export default function getConstructionData(state) {
	console.log(state)
	let aforoData;

	try {
		aforoData = JSON.parse(state.aforo);
	} catch (err) {
		aforoData = state.aforo;
	}

	let data = {
		levels: JSON.parse(state.level).map(level => level.toLowerCase()),
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
		zone: state.zone,
		type: state.sublevel
	}

	let {
		result_data,
		classroom_measurements,
		construction_info
	} = JSON.parse(state.build_data);

	let amount_baths = {
		inicial: Math.ceil(aforoData.aforoInicial / 25),
		primaria: Math.ceil(aforoData.aforoPrimaria / 60),
		secundaria: Math.ceil(aforoData.aforoSecundaria / 60)
	}

	let bathrooms = [];
	// let total_bathrooms = amount_baths.inicial + amount_baths.primaria + amount_baths.secundaria;

	for (let level of data.levels) {
		while (amount_baths[level] > 0) {
			const baths = amount_baths[level] >= 6
				? 6
				: amount_baths[level]

			bathrooms.push({
				level,
				baths
			});
			amount_baths[level] -= baths
		}
	}

	console.log({
		result_data,
		classroom_measurements,
		construction_info,
		bathrooms,
		data
	});
	
	return {
		result_data,
		classroom_measurements,
		construction_info,
		bathrooms,
		data
	}
}
