import * as THREE from "three";
import gsap from "gsap" 
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

// Constant Variables
const canvas = document.querySelector(".mini-car");
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const context = canvas.getContext("3d");





// Three JS

//Scene
const scene = new THREE.Scene();

// GLTF Object
const loader = new GLTFLoader();
var obj;
loader.load("/lamborghini-red/scene.gltf", (gltf) => {
    obj = gltf.scene;
    scene.add(gltf.scene);
});

//Lights
const light = new THREE.HemisphereLight(0xffffff, 0x000000, 2, 100);
// const light2 = new THREE.PointLight(0xffffff, 10, 100000);
light.position.set(0, 10, 50);
// light2.position.set(0, -10, -50);

scene.add(light);


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.01, 1000);
camera.position.set(0, 125, 500);
scene.add(camera);

// Renderer 
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
// document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);



// Resize

window.addEventListener('resize', () => {
    // Update Sizes
    sizes.width = window.innerWidth
    sizes.height= window.innerHeight
    // Update Camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
});

const loop = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
    if (obj != null) {
        obj.rotation.y += 0.02;
    }
};
loop();
