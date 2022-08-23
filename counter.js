import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Setup
// variables for setup
let container;
let camera;
let renderer;
let scene;
let controls;

const raycaster = new THREE.Raycaster(); // This class helps you find where the 3D object is in relation to the 3D scene.
const mouse = new THREE.Vector2(); // This 

// Array of models to be rendered
const models = [
  {
    gltf: "model/camara/scene.gltf",
    link: "https://gallery.ronnycoste.com",
    position: [1, 0.12, 0],
    scale: 0.2,
  },
  {
    gltf: "model/laptop/scene.gltf",
    link: "https://ronnycoste.com/projects",
    position: [-1, 0.3, 0],
    scale: 3,
  },
  {
    gltf: "model/super8/scene.gltf",
    link: "https://gallery.ronnycoste.com/cinematography",
    position: [-3, 0.3, 0],
    scale: 4,
  },
  {
    gltf: "model/typewriter/scene.gltf",
    link: "https://blog.ronnycoste.com",
    position: [3, 0.16, 0],
    scale: 30,
  }
]

// Mouse event / Hook / Action
function onMouseMove( event ) {
	mouse.x = ( event.clientX / container.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / container.clientHeight ) * 2 + 1;
}

container = document.querySelector('.scene'); // Taking an element from the canvas

// create scene
scene = new THREE.Scene();

const modelContainer = new THREE.Group(); // Creating a group to have all the models together
scene.add(modelContainer);

const fov = 10; // Camera Field of View
const aspect = container.clientWidth / container.clientHeight; // size of the canvas
const near = 1; // How close it is on first load
const far = 500; // how far you could get before it disappears

// camera setup
camera = new THREE.PerspectiveCamera(fov, aspect, near, far); // importing the values for the camera
camera.position.set(0, 15, 30);
camera.lookAt(new THREE.Vector3(5, 5, 5));

// Lighting setup
const ambient = new THREE.AmbientLight(0x404040, 10); // color and intensity of the ambient light
scene.add(ambient);

const directLight = new THREE.DirectionalLight(0xffffff, 3); // Color and intensity of the directional light
directLight.position.set(0,5,20); // Without a position it wont show the 3D models
scene.add(directLight);

// Helper functions
// const lightHelper = new THREE.DirectionalLightHelper(directLight);
// const gridHelper = new THREE.GridHelper(100, 50);
// scene.add( gridHelper, lightHelper ); // Adding the helpers to the scene


// Renderer
renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);
controls = new OrbitControls (camera, renderer.domElement);

// Minimun and maximun distance that the user / client can go in or out
controls.minDistance = 10;
controls.maxDistance = 300;

// Load models
let loader = new GLTFLoader();
models.forEach(modelDetails => {
  const { gltf, scale, position, link } = modelDetails;
  loader.load(gltf, ({ scene }) => {
    scene.traverse(child => {
      child.userData.link = link;
    });
    modelContainer.add(scene);
    scene.scale.set(scale, scale, scale);
    scene.position.set(...position);
  });
});

// Animating the scene and models
function animate(){
  requestAnimationFrame(animate);
  
	raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects(modelContainer.children);
  if (intersects.length > 0) {
    container.style.cursor = "pointer";
  } else {
    container.style.cursor = "initial"; 
  }
  
  // Speed of the rotation
  modelContainer.children.forEach(child => {
    child.rotation.y += 0.01;
  });

  controls.update();  
  renderer.render(scene, camera);
}

// If there is a click this function is called
function onMouseClick() {
  raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects(modelContainer.children);
  if (intersects.length > 0) {
    const { link } = intersects[0].object.userData;
    window.open(link, '_blank');
  }
}
// if the windows is resize this function is called
function onWindowResize () {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

// Event Listeners
window.addEventListener('resize', onWindowResize);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('click', onMouseClick, false);

animate(); // Animate and show everything
onWindowResize(); // if there is a resize, call this function