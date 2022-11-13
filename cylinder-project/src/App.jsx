import { useEffect } from 'react';

import { GUI } from 'dat.gui';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

import * as THREE from 'three';

import Init from './lib/Init';

function App() {
  useEffect(() => {
    const threejs = new Init('myThreeJsCanvas');
    threejs.initialize();
    threejs.animate();

    
    const geometryCylinder = new THREE.CylinderGeometry(5, 5, 10, 8, 1, false, 0, 6.283185307179586);
    const materialCylinder = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const cylinder = new THREE.Mesh(geometryCylinder, materialCylinder);
    cylinder.position.x = 20;
    threejs.scene.add(cylinder);

    const geometryCapsule = new THREE.CapsuleGeometry(5, 5, 10, 20);
    const materialCapsule = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const capsule = new THREE.Mesh(geometryCapsule, materialCapsule);
    capsule.position.x = 40;
    threejs.scene.add(capsule);

    const geometryRoundedBox = new RoundedBoxGeometry(8, 8, 8, 2, 0.4);
    const materialRoundedBox = new THREE.MeshNormalMaterial({ wireframe: true });
    const roundedBox = new THREE.Mesh(geometryRoundedBox, materialRoundedBox);
    roundedBox.position.x = 0;
    threejs.scene.add(roundedBox);

    const geometryTeapot = new TeapotGeometry(5, 8);
    const materialTeapot = new THREE.MeshNormalMaterial({ wireframe: true });
    const teapot = new THREE.Mesh(geometryTeapot, materialTeapot);
    teapot.position.x = -20;
    threejs.scene.add(teapot);

    const gui = new GUI();

    const cylinderFolder = gui.addFolder('Cylinder');
    const geometryCylinderFolder = cylinderFolder.addFolder('Mesh Geometry');
    cylinderFolder.open();
    
    const positionCylinderFolder = geometryCylinderFolder.addFolder('Position');
    positionCylinderFolder.add(cylinder.position, 'x', -100, 100).name('Change X Axis');
    positionCylinderFolder.add(cylinder.position, 'y', -100, 100).name('Change Y Axis');
    positionCylinderFolder.add(cylinder.position, 'z', -100, 100).name('Change Z Axis');

    const rotationCylinderFolder = geometryCylinderFolder.addFolder('Rotation');
    rotationCylinderFolder.add(cylinder.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    rotationCylinderFolder.add(cylinder.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    rotationCylinderFolder.add(cylinder.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');

    const scaleCylinderFolder = geometryCylinderFolder.addFolder('Scale');
    scaleCylinderFolder.add(cylinder.scale, 'x', 0, 2).name('Scale X Axis');
    scaleCylinderFolder.add(cylinder.scale, 'y', 0, 2).name('Scale Y Axis');
    scaleCylinderFolder.add(cylinder.scale, 'z', 0, 2).name('Scale Z Axis');
    scaleCylinderFolder.open();

    const materialCylinderFolder = cylinderFolder.addFolder('Mesh Material');
    const materialCylinderParams = {
      cylinderColor: cylinder.material.color.getHex(),
    };
    materialCylinderFolder.add(cylinder.material, 'wireframe');
    materialCylinderFolder
      .addColor(materialCylinderParams, 'cylinderColor')
      .onChange((value) => cylinder.material.color.set(value));

    const capsuleFolder = gui.addFolder('Capsule');
    const geometryCapsuleFolder = capsuleFolder.addFolder('Mesh Geometry');
    geometryCapsuleFolder.open();
    
    const positionCapsuleFolder = geometryCapsuleFolder.addFolder('Position');
    positionCapsuleFolder.add(capsule.position, 'x', -100, 100).name('Change X Axis');
    positionCapsuleFolder.add(capsule.position, 'y', -100, 100).name('Change Y Axis');
    positionCapsuleFolder.add(capsule.position, 'z', -100, 100).name('Change Z Axis');

    const rotationCapsuleFolder = geometryCapsuleFolder.addFolder('Rotation');
    rotationCapsuleFolder.add(capsule.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    rotationCapsuleFolder.add(capsule.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    rotationCapsuleFolder.add(capsule.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');

    const scaleCapsuleFolder = geometryCapsuleFolder.addFolder('Scale');
    scaleCapsuleFolder.add(capsule.scale, 'x', 0, 2).name('Scale X Axis');
    scaleCapsuleFolder.add(capsule.scale, 'y', 0, 2).name('Scale Y Axis');
    scaleCapsuleFolder.add(capsule.scale, 'z', 0, 2).name('Scale Z Axis');
    scaleCapsuleFolder.open();

    const materialCapsuleFolder = capsuleFolder.addFolder('Mesh Material');
    const materialCapsuleParams = {
      capsuleColor: capsule.material.color.getHex(),
    };
    materialCapsuleFolder.add(capsule.material, 'wireframe');
    materialCapsuleFolder
      .addColor(materialCapsuleParams, 'capsuleColor')
      .onChange((value) => capsule.material.color.set(value));
    
    return () => {
      gui.destroy();
    };
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App
