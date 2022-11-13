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
// scene.add(axeHelper);
//posisi kamera, statis
camera.position.set(1,10,5); //x,y,z


var DIM = 100;
var SEG = 200;
const geometry = new THREE.PlaneGeometry( DIM, DIM, SEG, SEG );
const material = new THREE.MeshBasicMaterial( {
     color: 0xffff00,
    wireframe : true,
    // side : THREE.DoubleSide
    } );
var plane = new THREE.Mesh( geometry, material );
plane.rotation.x += -0.5 * Math.PI;
scene.add( plane );


var freeze = false;
function wave(time){
    const count = geometry.attributes.position.count;
    const decrease_speed = 400;
    // for(let i = 0; i < count; i++){
    //     const x = geometry.attributes.position.getX(i);
    //     const y = geometry.attributes.position.getY(i);
    //     const xsin = Math.sin(x + time / decrease_speed);
    //     const zsin = Math.sin(y + time / decrease_speed);
    //     geometry.attributes.position.setZ(i, xsin + zsin);
    // }
    var max_height = 3;
    var freq = 0.25;
    var a = 2;
    var b = 2;
    for(let i = 0; i < count; i++){
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);
        const z = max_height*Math.cos(freq*Math.sqrt(a*x*x  + b*y*y) - time / decrease_speed)
        geometry.attributes.position.setZ(i, z);
    }
    geometry.attributes.position.needsUpdate = true;

}

function main_animation(time){
    if(!freeze){
        // wave(time);
    }
    renderer.render(scene,camera);
    
}

// Add event listener on keydown
document.addEventListener("keydown", (event) => {
    var name = event.key;
    var code = event.code;
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
    else if(name == "d") plane.position.x += 1;
    else if(name == "a") plane.position.x += -1;
    else if(name == "w") plane.position.y += 1;
    else if(name == "s") plane.position.y += -1;
    else if(name == "e") plane.position.z += 1;
    else if(name == "q") plane.position.z += -1;
    else if(name == "r") camera.position.set(1,1,5);

  }, false);


renderer.setAnimationLoop(main_animation);


