import { FlyControls, OrbitControls, PointerLockControls } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import { setPlayCamera } from "../../../../../redux/building/buildingSlice";

export default function CameraControls({ view }) {
	const isPlayCamera = useSelector(selectIsPlayCamera);
	const is3DView = view === "3D";
	const dispatch = useDispatch();

	const stopFly = function(evt) {
		if (evt.key === "Escape") dispatch(setPlayCamera({ isPlayCamera: "non-play" }));
	}

	window.onkeyup = isPlayCamera === "play"
		? stopFly
		: null

	if (isPlayCamera === "play") {
		const onKeyDown = function ( event ) {

			switch ( event.code ) {

				case 'ArrowUp':
				case 'KeyW':
					moveForward = true;
					break;

				case 'ArrowLeft':
				case 'KeyA':
					moveLeft = true;
					break;

				case 'ArrowDown':
				case 'KeyS':
					moveBackward = true;
					break;

				case 'ArrowRight':
				case 'KeyD':
					moveRight = true;
					break;

				case 'Space':
					if ( canJump === true ) velocity.y += 350;
					canJump = false;
					break;

			}

		};

		const onKeyUp = function ( event ) {

			switch ( event.code ) {

				case 'ArrowUp':
				case 'KeyW':
					moveForward = false;
					break;

				case 'ArrowLeft':
				case 'KeyA':
					moveLeft = false;
					break;

				case 'ArrowDown':
				case 'KeyS':
					moveBackward = false;
					break;

				case 'ArrowRight':
				case 'KeyD':
					moveRight = false;
					break;

			}

		}
		
		return <FlyControls rollSpeed={.5} movementSpeed={700} />
	}
	else {
		return (
			<OrbitControls
				rotateSpeed={0.5}
				zoomSpeed={is3DView ? 1.1 : 1.8}
				panSpeed={0.5}
				enableRotate={is3DView}
				minZoom={0.17066106572499624}
				maxDistance={5500}
			/>
		)
	}
}

const selectIsPlayCamera = (state) =>  state.building.isPlayCamera;
