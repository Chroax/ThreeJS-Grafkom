import * as THREE from 'three';
import {OrbitControls} from './src/OrbitControls.js';


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
//posisi kamera awal

camera.position.set(0,5,20); //x,y,z

 //garis helper x y nya 
 const axeHelper = new THREE.AxesHelper(5);//parameter = length
 scene.add(axeHelper);

var s_geometry = new THREE.SphereGeometry( 1, 1, 1);
var s_material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( s_geometry, s_material );
sphere.position.y = 1;
scene.add( sphere );

var DIM = 100;
var SEG = 200;
var move = DIM / SEG;
var movement = DIM / SEG; //jalankan pointer
var border = DIM >> 1;
var radius = 0;
var radius_x = 0, radius_z = 0;
var geometry = new THREE.PlaneGeometry(DIM,DIM,SEG,SEG);
var material = new THREE.MeshBasicMaterial({
    color : 0x00FF00,
    wireframe : true
});
var plane = new THREE.Mesh(geometry, material);
plane.rotation.x += -0.5 * Math.PI; //agar rata, vektor normalnya adalah z
scene.add(plane);


var freeze = false;
function main_animation(time){
    if(!freeze)
        sphere.rotation.y = time/1000;
    renderer.render(scene,camera);
}

function editHeight(height){
    var index = 0;
    for(var i = sphere.position.x - radius_x; i <= sphere.position.x + radius_x; i += move){
        for(var j = sphere.position.z - radius_z; j <= sphere.position.z + radius_z; j += move){
            if(i < -border || i > border || j < -border || j > border) continue;
            index = translateCoordinate(DIM, SEG, i, j);
            geometry.attributes.position.array[index + 2] += height;
            geometry.attributes.position.needsUpdate = true;
        }
    }
}

// Add event listener on keydown

document.addEventListener("keydown", (event) => {
    var name = event.key;
    var code = event.code;
    camera_pos = camera.position.clone();
    // alert(`${name}`);
    // console.log(`${name}`)
    if(name == "i"){
        camera.position.z += -move;
    }
    else if(name == "k"){
        camera.position.z += move;
    }
    else if(name == "j"){
        camera.position.x += -move;
    }
    else if(name == "l"){
        camera.position.x += move;
    }
    else if(name == "u"){
        camera.position.y -= move;
    }
    else if(name == "o"){
        camera.position.y += move;
    }
    else if(name == "a"){
        if(sphere.position.x - movement >= -border ) sphere.position.x += -movement;
        else sphere.position.x = -border;
    }
    else if(name == "d"){
        if(sphere.position.x + movement <= border ) sphere.position.x += movement;
        else sphere.position.x = border;
    }
    else if(name == "w"){
        if(sphere.position.z - movement >= -border ) sphere.position.z += -movement;
        else sphere.position.z = -border;
    }
    else if(name == "s"){
        if(sphere.position.z + movement <= border ) sphere.position.z += movement;
        else sphere.position.z = border;
    }
    else if(name == "q"){
        if(movement > 1) movement -= move;
    }
    else if(name == "e"){
        movement += move;
    }
    else if(name == "]"){
        radius_z += 1;
    }
    else if(name == "["){
        if(radius_z > 0) radius_z -= 1;
    }
    else if(name == "="){
        radius_x += 1;
    }
    else if(name == "-"){
        if(radius_x > 0) radius_x -= 1;
    }
    else if(name == "0"){
        if(radius_x > radius_z) radius_z = radius_x;
        else radius_x = radius_z;
    }
    else if(name == "9"){
        radius_x = 1;
        radius_z = 1;
    }
    else if(name == "\\"){
        radius_x += 1;
        radius_z += 1;
    }
    else if(name == "p"){
        if(radius_x > 0) radius_x -= 1;
        if(radius_z > 0) radius_z -= 1;
    }
    else if(name == "\'"){
        editHeight(1);
    }
    else if(name == ";"){
        editHeight(-1);
    }
    else if(name == " ") freeze = !freeze

    //Update the y position of the pointer
    sphere.position.y = geometry.attributes.position.array[translateCoordinate(DIM, SEG, sphere.position.x, sphere.position.z) + 2] + 1;
    //end of event listener
  }, false);



renderer.setAnimationLoop(main_animation);


