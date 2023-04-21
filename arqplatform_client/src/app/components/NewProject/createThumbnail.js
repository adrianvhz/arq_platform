import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from "three";
import { createThumbnailService } from "../../../services/projectsService";

export function createThumbnail(projectID, file) {
	const scene = new Scene();
	const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	const renderer = new WebGLRenderer();
	renderer.setSize( 600, 450 );
	// document.body.appendChild( renderer.domElement );

	const geometry = new BoxGeometry( 1, 1, 1 );
	const material = new MeshBasicMaterial( { color: 0x00ff00 } );
	const cube = new Mesh( geometry, material );
	scene.add( cube );

	camera.position.z = 5;

	function animate() {
		requestAnimationFrame( animate );

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		renderer.render( scene, camera );
	}

	animate();
	
	renderer.domElement.toBlob((data) => {
		const formData = new FormData();
		formData.append("thumbnail", data);
	
		createThumbnailService(projectID, formData);
	});
}
