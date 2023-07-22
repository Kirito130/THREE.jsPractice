import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";



// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();


// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    1000,
    0.1
);
// Orbit for the Model
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-10, 30, 30);
orbit.update();

// Models and Objects

// Box
const boxGeo = new THREE.BoxGeometry(2, 2, 2);
const boxMat = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeo, boxMat);
scene.add(box);



// Plane
const planeGeo = new THREE.PlaneGeometry(30, 30);
const planeMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeo, planeMat);
scene.add(plane);
plane.rotation.x = - 0.5 * Math.PI;
plane.receiveShadow = true;



// Torus - Donut
// const torusGeo = new THREE.TorusGeometry(2, 1, 30, 50);
// const torusMat = new THREE.MeshStandardMaterial({
//     color: 0xFFF000,
// });
// const torus = new THREE.Mesh(torusGeo, torusMat);
// scene.add(torus);
// // torus.rotation.y = - 0.5 * Math.PI;
// torus.position.set(4, 5, 0)
// torus.castShadow = true;


// Lights
// Ambient Light
const amblight = new THREE.AmbientLight(0x333333);
scene.add(amblight);

// Directional Light
// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
// scene.add(directionalLight);
// directionalLight.position.set(-30, 50, 0);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);


// Spot Light
const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);


// Helpers
// Axes Helper
// const axesHelper = new THREE.AxesHelper(20);
// scene.add(axesHelper);
// // Grid Helper
// const gridHelper = new THREE.GridHelper(20);
// scene.add(gridHelper);


// Animations
const animate = (time) => {
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;
    renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);


// Resize
window.addEventListener("resize", () => {
    // Update Camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
