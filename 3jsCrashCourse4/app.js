import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
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
    innerWidth/innerHeight,
    1000,
    0.1
);
camera.position.set(0, 0, 40)
scene.add(camera);


// Lights
const light = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 3);
scene.add(light);


// Models and Objects
const firstModelGeometry = new THREE.OctahedronGeometry(10);
const firstModelMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00})
const firstModel = new THREE.Mesh(firstModelGeometry, firstModelMaterial);

scene.add(firstModel);

// Renderer
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);


// Resize
window.addEventListener("resize", () => {
    // Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
  
    // Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
});


// Animations
const animate = (time) => {

    renderer.render(scene, camera)
};

renderer.setAnimationLoop(animate);



