import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Constants
const canvas = document.querySelector(".three");
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();


// Camera
const camera = new THREE.PerspectiveCamera(
    50,
    sizes.width/sizes.height,
    1000,
    0.1
);
camera.position.set(-10, 20, 20);
scene.add(camera);


// Lights
// const light = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 3);
// scene.add(light);


// Models and Objects

// Torus - Donut
const torusGeo = new THREE.TorusGeometry(2, 1, 30, 50);
const torusMat = new THREE.MeshBasicMaterial({color: 0xFFF000});
const torus = new THREE.Mesh(torusGeo, torusMat);
torus.rotation.y = - 0.5 * Math.PI;
torus.position.set(4, 5, 0)
scene.add(torus);


// Plane
const planeGeo = new THREE.PlaneGeometry(20, 20);
const planeMat = new THREE.MeshBasicMaterial({color: 0xFFFFFF,side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = - 0.5 * Math.PI;
scene.add(plane);


// Octahedron
const boxGeo = new THREE.BoxGeometry(2, 2, 2);
const boxMat = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeo, boxMat);
scene.add(box);


// Orbit for the Model
const orbit = new OrbitControls(camera, canvas);
orbit.update();


// Helpers
// Axes Helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);
// Grid Helper
const gridHelper = new THREE.GridHelper(20);
scene.add(gridHelper);




// Renderer
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);



// Resize
window.addEventListener("resize", () => {
    // Update Sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
  
    // Update Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});


// Animations
const animate = (time) => {
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;
    renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);



