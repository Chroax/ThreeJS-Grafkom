import { useEffect } from 'react';
import { GUI } from 'dat.gui';
import * as THREE from 'three';
import Init from './lib/Init';

function App() {
  
  useEffect(() => {
    const threejs = new Init('myThreeJsCanvas');
    threejs.initialize();
    threejs.animate();

    const backWheel = createMesh(new THREE.BoxGeometry(12, 12, 33), 
        new THREE.MeshLambertMaterial({ color: 0x333333 }));
    backWheel.position.x = -40;
    threejs.scene.add(backWheel);
    
    const frontWheel = createMesh(new THREE.BoxGeometry(12, 12, 33), 
        new THREE.MeshLambertMaterial({ color: 0x333333 }));
    frontWheel.position.x = -20;
    threejs.scene.add(frontWheel);
    
    const carBody = createMesh(new THREE.BoxGeometry(60, 15, 30), 
        new THREE.MeshLambertMaterial({ color: 0xff0000 }));
    carBody.position.x = 25;
    threejs.scene.add(carBody);

    const cabinBody = createMesh(new THREE.BoxGeometry(33, 12, 24), 
        new THREE.MeshLambertMaterial({ color: 0xffffff }));
    cabinBody.position.x = -20;
    cabinBody.position.y = -20;

    threejs.scene.add(cabinBody);
    
    const frontGlass = createMesh(new THREE.BoxGeometry(12, 12, 24.1), 
        new THREE.MeshLambertMaterial({ color: 0x333333 }));
    frontGlass.position.x = 10;
    frontGlass.position.y = -20;
    threejs.scene.add(frontGlass);

    const backGlass = createMesh(new THREE.BoxGeometry(16, 12, 24.1), 
        new THREE.MeshLambertMaterial({ color: 0x333333 }));
    backGlass.position.x = 30;
    backGlass.position.y = -20;
    threejs.scene.add(backGlass);

    const wheel = new THREE.Group();
    wheel.add(backWheel);
    wheel.add(frontWheel);

    const glass = new THREE.Group();
    glass.add(frontGlass);
    glass.add(backGlass);

    const car = new THREE.Group();
    car.add(wheel);
    car.add(carBody);
    car.add(cabinBody);
    car.add(glass);
    threejs.scene.add(car);
    
    const gui = new GUI();

    const carFolder = gui.addFolder('Car');
    const carPropertiesFolder = carFolder.addFolder('Properties');
    carFolder.open();

    const positionCarFolder = carPropertiesFolder.addFolder('Position');
    positionCarFolder.add(car.position, 'x', -100, 100).name('Change X Axis');
    positionCarFolder.add(car.position, 'y', -100, 100).name('Change Y Axis');
    positionCarFolder.add(car.position, 'z', -100, 100).name('Change Z Axis');
    const scaleCarFolder = carPropertiesFolder.addFolder('Scale');
    scaleCarFolder.add(car.scale, 'x', 0, 2).name('Scale X Axis');
    scaleCarFolder.add(car.scale, 'y', 0, 2).name('Scale Y Axis');
    scaleCarFolder.add(car.scale, 'z', 0, 2).name('Scale Z Axis');

    const carPartFolder = carFolder.addFolder('Parts');

    const wheelFolder = carPartFolder.addFolder('Wheel');

    const materialWheelFolder = wheelFolder.addFolder('Wheel Material');
    var wireframeMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000, wireframe: false })
    const materialWheelParams = {
      wheelColor: backWheel.material.color.getHex(),
      wheelWireframe : wireframeMaterial.wireframe
    };
    materialWheelFolder
      .addColor(materialWheelParams, 'wheelColor')
      .name("Wheel Color")
      .listen()
      .onChange((value) => {
        backWheel.material.color.set(value)
        frontWheel.material.color.set(value)
      });
    materialWheelFolder
    .add(materialWheelParams, 'wheelWireframe')
    .name("Wireframe")
    .listen()
    .onChange((value) => {
      backWheel.material.wireframe = value;
      frontWheel.material.wireframe = value;
    });

    const scaleWheelFolder = wheelFolder.addFolder('Scale');
    scaleWheelFolder.add(wheel.scale, 'x', 0, 2).name('Scale X Axis');
    scaleWheelFolder.add(wheel.scale, 'y', 0, 2).name('Scale Y Axis');
    scaleWheelFolder.add(wheel.scale, 'z', 0, 2).name('Scale Z Axis');

    const frontWheelFolder = wheelFolder.addFolder('Front Wheel');
    const positionFrontWheelFolder = frontWheelFolder.addFolder('Position');
    positionFrontWheelFolder.add(frontWheel.position, 'x', -100, 100).name('Change X Axis');
    positionFrontWheelFolder.add(frontWheel.position, 'y', -100, 100).name('Change Y Axis');
    positionFrontWheelFolder.add(frontWheel.position, 'z', -100, 100).name('Change Z Axis');
    const rotationFrontWheelFolder = frontWheelFolder.addFolder('Rotation');
    rotationFrontWheelFolder.add(frontWheel.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    rotationFrontWheelFolder.add(frontWheel.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    rotationFrontWheelFolder.add(frontWheel.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');

    const backWheelFolder = wheelFolder.addFolder('Back Wheel');
    const positionBackWheelFolder = backWheelFolder.addFolder('Position');
    positionBackWheelFolder.add(backWheel.position, 'x', -100, 100).name('Change X Axis');
    positionBackWheelFolder.add(backWheel.position, 'y', -100, 100).name('Change Y Axis');
    positionBackWheelFolder.add(backWheel.position, 'z', -100, 100).name('Change Z Axis');
    const rotationBackWheelFolder = backWheelFolder.addFolder('Rotation');
    rotationBackWheelFolder.add(backWheel.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    rotationBackWheelFolder.add(backWheel.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    rotationBackWheelFolder.add(backWheel.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');

    const bodyFolder = carPartFolder.addFolder('Body');

    const materialBodyFolder = bodyFolder.addFolder('Body Material');
    const materialBodyParams = {
      carBodyColor: carBody.material.color.getHex(),
      carBodyWireframe : wireframeMaterial.wireframe
    };
    materialBodyFolder
      .addColor(materialBodyParams, 'carBodyColor')
      .name("Body Color")
      .listen()
      .onChange((value) => {
        carBody.material.color.set(value);
      });
    materialBodyFolder
    .add(materialBodyParams, 'carBodyWireframe')
    .name("Wireframe")
    .listen()
    .onChange((value) => {
      carBody.material.wireframe = value;
    });

    const positionCarBodyFolder = bodyFolder.addFolder('Position');
    positionCarBodyFolder.add(carBody.position, 'x', -100, 100).name('Change X Axis');
    positionCarBodyFolder.add(carBody.position, 'y', -100, 100).name('Change Y Axis');
    positionCarBodyFolder.add(carBody.position, 'z', -100, 100).name('Change Z Axis');
    const rotationCarBodyFolder = bodyFolder.addFolder('Rotation');
    rotationCarBodyFolder.add(carBody.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    rotationCarBodyFolder.add(carBody.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    rotationCarBodyFolder.add(carBody.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');

    const cabinFolder = carPartFolder.addFolder('Cabin');

    const materialCabinFolder = cabinFolder.addFolder('Cabin Material');
    const materialCabinParams = {
      cabinColor: cabinBody.material.color.getHex(),
      cabinWireframe : wireframeMaterial.wireframe
    };
    materialCabinFolder
      .addColor(materialCabinParams, 'cabinColor')
      .name("Cabin Color")
      .listen()
      .onChange((value) => {
        cabinBody.material.color.set(value);
      });
    materialCabinFolder
    .add(materialCabinParams, 'cabinWireframe')
    .name("Wireframe")
    .listen()
    .onChange((value) => {
      cabinBody.material.wireframe = value;
    });

    const positionCabinFolder = cabinFolder.addFolder('Position');
    positionCabinFolder.add(cabinBody.position, 'x', -100, 100).name('Change X Axis');
    positionCabinFolder.add(cabinBody.position, 'y', -100, 100).name('Change Y Axis');
    positionCabinFolder.add(cabinBody.position, 'z', -100, 100).name('Change Z Axis');
    const rotationCabinFolder = cabinFolder.addFolder('Rotation');
    rotationCabinFolder.add(cabinBody.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    rotationCabinFolder.add(cabinBody.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    rotationCabinFolder.add(cabinBody.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');

    const glassFolder = carPartFolder.addFolder('Glass');
    
    const materialGlassFolder = glassFolder.addFolder('Glass Material');
    const materialGlassParams = {
      glassColor: backGlass.material.color.getHex(),
      glassWireframe : wireframeMaterial.wireframe
    };
    materialGlassFolder
      .addColor(materialGlassParams, 'glassColor')
      .name("Glass Color")
      .listen()
      .onChange((value) => {
        backGlass.material.color.set(value)
        frontGlass.material.color.set(value)
      });
    materialGlassFolder
    .add(materialGlassParams, 'glassWireframe')
    .name("Wireframe")
    .listen()
    .onChange((value) => {
      backGlass.material.wireframe = value;
      frontGlass.material.wireframe = value;
    });

    const scaleGlassFolder = glassFolder.addFolder('Scale');
    scaleGlassFolder.add(glass.scale, 'x', 0, 2).name('Scale X Axis');
    scaleGlassFolder.add(glass.scale, 'y', 0, 2).name('Scale Y Axis');
    scaleGlassFolder.add(glass.scale, 'z', 0, 2).name('Scale Z Axis');

    const frontGlassFolder = glassFolder.addFolder('Front Glass');
    const positionFrontGlassFolder = frontGlassFolder.addFolder('Position');
    positionFrontGlassFolder.add(frontGlass.position, 'x', -100, 100).name('Change X Axis');
    positionFrontGlassFolder.add(frontGlass.position, 'y', -100, 100).name('Change Y Axis');
    positionFrontGlassFolder.add(frontGlass.position, 'z', -100, 100).name('Change Z Axis');
    const rotationFrontGlassFolder = frontGlassFolder.addFolder('Rotation');
    rotationFrontGlassFolder.add(frontGlass.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    rotationFrontGlassFolder.add(frontGlass.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    rotationFrontGlassFolder.add(frontGlass.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');

    const backGlassFolder = glassFolder.addFolder('Back Glass');
    const positionBackGlassFolder = backGlassFolder.addFolder('Position');
    positionBackGlassFolder.add(backGlass.position, 'x', -100, 100).name('Change X Axis');
    positionBackGlassFolder.add(backGlass.position, 'y', -100, 100).name('Change Y Axis');
    positionBackGlassFolder.add(backGlass.position, 'z', -100, 100).name('Change Z Axis');
    const rotationBackGlassFolder = backGlassFolder.addFolder('Rotation');
    rotationBackGlassFolder.add(backGlass.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    rotationBackGlassFolder.add(backGlass.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    rotationBackGlassFolder.add(backGlass.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');
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

function createMesh(geometry, meshMaterial) {

  var mesh = new THREE.Mesh(geometry, meshMaterial);
  return mesh;
}
export default App
