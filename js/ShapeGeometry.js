const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const x = 0, y = 0;

const heartShape = new THREE.Shape();

// Gambar SegiEnam Shape
heartShape.moveTo(0, -5);
heartShape.lineTo(5, 0);
heartShape.lineTo(5, 5);
heartShape.lineTo(0, 5);
heartShape.lineTo(-5, 0);
heartShape.lineTo(-5, -5);

// heartShape.moveTo( x + 5, y + 5 );
// heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
// heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
// heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
// heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
// heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
// heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

const geometry = new THREE.ShapeGeometry( heartShape );
const material = new THREE.MeshNormalMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material ) ;
scene.add( mesh );


camera.position.z = 30;
renderer.render( scene, camera );

function animate() {
requestAnimationFrame( animate );

mesh.rotation.x += 0.01;
mesh.rotation.y += 0.01;

renderer.render( scene, camera );
};

animate();