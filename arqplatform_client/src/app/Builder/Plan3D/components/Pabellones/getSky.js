import { MathUtils } from "three";
import { Vector3 } from "three";
import { Sky } from "./Sky";

export function getSky() {
	const phi = MathUtils.degToRad(90 - 2);
	const theta = MathUtils.degToRad(0);

	const sun = new Vector3();
	sun.setFromSphericalCoords(1, phi, theta);

	const sky = new Sky();
	sky.material.uniforms.turbidity.value = 0.5;
	sky.material.uniforms.rayleigh.value = 0.4;
	sky.material.uniforms.mieCoefficient.value = 0.005;
	sky.material.uniforms.mieDirectionalG.value = 0.7;



	sky.material.uniforms.sunPosition.value.copy(sun);
	sky.scale.addScalar(15000);

	// gl.setPixelRatio(window.devicePixelRatio);
	// gl.outputEncoding = sRGBEncoding;
	// gl.toneMapping = ACESFilmicToneMapping;
	// gl.toneMappingExposure = 0.4;

	return sky;
}
