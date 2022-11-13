import * as THREE from 'three';
import {OrbitControls} from './src/OrbitControls.js';
console.log("test");
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight); 
//Taruh renderer ke page
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
 );
 var camera_pos = new THREE.Vector3();
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update(); //akan selalu dipanggil setiap camera berpindah
//sekarang camera telah menjadi dinamis

 //garis helper x y nya 
const axeHelper = new THREE.AxesHelper(5);//parameter = length
scene.add(axeHelper);
//posisi kamera, statis
camera.position.set(1,1,5); //x,y,z

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color : 0xFFFFFF}); 
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(1,1,1);
scene.add(box);

function rotate_box(time){
    var div = 2000;
    box.rotation.set(
        time / div,
        time / div,
        time / div
    );
    renderer.render(scene,camera);
}

// Add event listener on keydown
document.addEventListener("keydown", (event) => {
    var name = event.key;
    var code = event.code;
    camera_pos = camera.position.clone();
    // alert(`${name}`);
    // alert(`${camera.position.x}`);
    if(name == "ArrowUp"){
        camera.position.y += 1;
    }
    else if(name == "ArrowDown"){
        camera.position.y += -1;
    }
    else if(name == "ArrowRight"){
        camera.position.x += 1;
    }
    else if(name == "ArrowLeft"){
        camera.position.x += -1;
    }
    else if(name == "d") box.position.x += 1;
    else if(name == "a") box.position.x += -1;
    else if(name == "w") box.position.y += 1;
    else if(name == "s") box.position.y += -1;
    else if(name == "e") box.position.z += 1;
    else if(name == "q") box.position.z += -1;
    else if(name == "r") camera.position.set(1,1,5);

  }, false);


renderer.setAnimationLoop(rotate_box);


