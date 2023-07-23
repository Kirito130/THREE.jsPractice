// Library and Framework imports
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

// Image imports
import nebula from "./src/nebula.jpg";
import stars from "./src/stars.jpg";

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);


// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);
camera.position.set(-25, 20, 25 );


// Lights
// Ambient Light
const amblight = new THREE.AmbientLight(0x333333);
scene.add(amblight);

// Directional Light
// const dirLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
// scene.add(dirLight);
// dirLight.position.set(-30, 50, 0);
// dirLight.castShadow = true;
// dirLight.shadow.camera.bottom = -12;
// // Directional Light Helper
// const dlHelper = new THREE.DirectionalLightHelper(dirLight, 5);
// scene.add(dlHelper);
// const dlShadowHelper = new THREE.CameraHelper(dirLight.shadow.camera);
// scene.add(dlShadowHelper);


// Spot Light
const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;
// Spot Light Helper
const slHelper = new THREE.SpotLightHelper(spotLight);
scene.add(slHelper);

// Adding Fog
scene.fog = new THREE.Fog(0xFFFFFF, 0, 200);
scene.fog = new THREE.FogExp2(0xFFFFFF, 0.011);


// Helpers
// Axes Helper
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);
// Grid Helper
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);


// Textures and Backgrounds
// Single texture Background
const textureLoader = new THREE.TextureLoader();
// scene.background = textureLoader.load(stars);

// Cube texture Background
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    stars,
    stars,
    nebula,
    nebula,
    stars,
    stars,
]);



// Models and Objects
// Box
const boxGeo = new THREE.BoxGeometry(2, 2, 2);
const boxMat = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeo, boxMat);
scene.add(box);

// Box2
const box2Geo = new THREE.BoxGeometry(5, 5, 5);
// const box2Mat = new THREE.MeshBasicMaterial({
    // map: textureLoader.load(nebula)
// });
const box2MultiMat = [
    new THREE.MeshBasicMaterial({map: textureLoader.load(nebula)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(nebula)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(nebula)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(nebula)}),
];
const box2 = new THREE.Mesh(box2Geo, box2MultiMat);
box2.position.set(0, 15, 10); 
scene.add(box2);
box2.material.map = textureLoader.load(nebula);


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
const torusGeo = new THREE.TorusGeometry(2, 1, 30, 50);
const torusMat = new THREE.MeshStandardMaterial({
    color: 0xFF00FF,
});
const torus = new THREE.Mesh(torusGeo, torusMat);
scene.add(torus);
torus.rotation.y = - 0.25 * Math.PI;
torus.position.set(4, 5, 0)
torus.castShadow = true;



// Orbit for the Model
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();


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
