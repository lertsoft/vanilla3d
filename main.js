import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Setup

// Every Three JS project need these three instances
const scene = new THREE.Scene(); // A Scene to be render
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 100, 1000); // A Camera perspective that the user / client will see from.
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
  antialias: true,
}); // A renderer to render and show the scene, with the textures and shapes.

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// Camera position could be either set to X, Y, or Z.
camera.position.setZ(115); // how close will the camera be to the rendered object.
camera.position.setX(-3); 

renderer.render(scene, camera); // Rendering what we have.

// Shapes

const geometry = new THREE.TorusGeometry (10, 3, 16, 100); // Shape size and dimensions
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347
}); // Color of the mesh material in hexadecimal
const torus = new THREE.Mesh(geometry, material); // merging the geometry and material together to render it.

scene.add(torus); // scene.add() add every shape  or object to our scene that will be rendered

// Lights
// Every threeJS project needs a light source or it would not look correctly.
// Meaning that it would look just black.

const pointLight = new THREE.PointLight(0xffffff); // Color of the light source
pointLight.position.set(5, 5, 5); // Position of the camera X, Y, Z

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers
// Helper functions to see and determnined where the pointlight is coming from, and to see the grid of our canvas.

// const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 100);
scene.add( gridHelper); // Adding the helpers to the scene

const controls = new OrbitControls(camera, renderer.domElement); // Giving control to the user to move the camera


// GLTF Loader 
const loader = new GLTFLoader(); // Initiating the GLTF loader

// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
// loader.setDRACOLoader( dracoLoader );

// Loading 3D rendered objects.
loader.load( 'model/earth/scene.gltf', function ( gltf ) {

	scene.add( gltf.scene );

  gltf.animations;

}, function ( xhr ) {

  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

}, undefined, function ( error ) {

	console.error( error );

} );

// Recursive function to animate the Scene
// Without this function the files would not show up on the canvas
function animate() {
  requestAnimationFrame(animate);

  // Animations / Rotations for our torus shape
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate(); // Calling the function