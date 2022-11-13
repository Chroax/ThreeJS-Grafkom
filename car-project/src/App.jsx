import { useEffect } from 'react';
import { GUI } from 'dat.gui';
import * as THREE from 'three';
import Init from './lib/Init';

function App() {
  
  useEffect(() => {
    const threejs = new Init('myThreeJsCanvas');
    threejs.initialize();
    threejs.animate();

    const backWheel = createWheels(12, 12, 33);
    backWheel.position.y = 6;
    backWheel.position.x = -18;
    threejs.scene.add(backWheel);
    
    const frontWheel = createWheels(12, 12, 33);
    frontWheel.position.y = 6;  
    frontWheel.position.x = 18;
    threejs.scene.add(frontWheel);
    
    const body = new THREE.BoxGeometry(60, 15, 30);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const carBody = new THREE.Mesh(body, bodyMaterial);
    carBody.position.y = 12;
    threejs.scene.add(carBody);

    const cabin = new THREE.BoxGeometry(33, 12, 24);
    const cabinMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const cabinBody = new THREE.Mesh(cabin, cabinMaterial);
    cabinBody.position.x = -6;
    cabinBody.position.y = 25.5;
    threejs.scene.add(cabinBody);
    
    const frontGlass = createWheels(12, 12, 24.1);
    frontGlass.position.y = 24;  
    frontGlass.position.x = 3;
    threejs.scene.add(frontGlass);

    const backGlass = createWheels(16, 12, 24.1);
    backGlass.position.y = 24;  
    backGlass.position.x = -13;
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
    const propertiesWheelFolder = wheelFolder.addFolder('Properties');
    
    const materialWheelFolder = wheelFolder.addFolder('Wheel Material');
    var wireframeMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: false })
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
    const propertiesBodyFolder = bodyFolder.addFolder('Properties');
    const materialBodyFolder = bodyFolder.addFolder('Body Material');
    const positionBodyFolder = bodyFolder.addFolder('Position');
    const rotationBodyFolder = bodyFolder.addFolder('Rotation');
    
    const cabinFolder = carPartFolder.addFolder('Cabin');
    const propertiesCabinFolder = cabinFolder.addFolder('Properties');
    const materialCabinFolder = cabinFolder.addFolder('Cabin Material');
    const positionCabinFolder = cabinFolder.addFolder('Position');
    const rotationCabinFolder = cabinFolder.addFolder('Rotation');


    const glassFolder = carPartFolder.addFolder('Glass');
    const propertiesGlassFolder = glassFolder.addFolder('Properties');
    
    const materialGlassFolder = glassFolder.addFolder('Glass Material');
    var wireframeMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: false })
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

function createWheels(width, height, depth) {
  const geometry = new THREE.BoxBufferGeometry(width, height, depth);
  const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
  const wheel = new THREE.Mesh(geometry, material);
  return wheel;
}

export default App