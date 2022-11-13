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
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update(); //akan selalu dipanggil setiap camera berpindah
//sekarang camera telah menjadi dinamis

 //garis helper x y nya 
const axeHelper = new THREE.AxesHelper(5);//parameter = length
scene.add(axeHelper);
//posisi kamera, statis
camera.position.set(1,10,5); //x,y,z



var radius = 2;
var detail = 10; //semakin besar jadi bola, coba 10

const geometry = new THREE.OctahedronGeometry( radius,detail );
const material = new THREE.MeshBasicMaterial( {
     color: 0xffff00,
    wireframe : true,
    // side : THREE.DoubleSide
    } );
const octahedron = new THREE.Mesh( geometry, material );

// twist(geometry);
scene.add( octahedron );


var freeze = false;
function main_animation(time){
    var div = 2000;
    if(!freeze){
        // wave(time);
        octahedron.rotation.set(
            0,
            time / div,
            0
        );
    }
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
    else if(name == " ") freeze = !freeze;
    else if(name == "d") octahedron.position.x += 1;
    else if(name == "a") octahedron.position.x += -1;
    else if(name == "w") octahedron.position.y += 1;
    else if(name == "s") octahedron.position.y += -1;
    else if(name == "e") octahedron.position.z += 1;
    else if(name == "q") octahedron.position.z += -1;
    else if(name == "r") camera.position.set(1,1,5);

  }, false);


renderer.setAnimationLoop(main_animation);


