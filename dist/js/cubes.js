'use strict';

const cubeModule = (function () {
  let scene;
  let renderer;
  let camera;
  let geometry;
  let cubePosX = 0;
  let cubePosY = 0;
  let cameraPosX = 0;
  let cameraPosY = 0;
  let cameraRotY = 0;
  let cameraRotX = 0;
  let cameraPosZ = 4;
  let cubeA;
  let cubeB;
  let cubeC;
  let cubeD;
  let animationFrame;
  let inputFrame;

  function setup() {
    scene = new THREE.Scene();
    // console.log('scene - ', scene);
    scene.background = new THREE.Color(0x222222);
    scene.name = 'lmwd-cube-scene';
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // console.log('camera - ', camera);
    renderer = new THREE.WebGLRenderer();
    // console.log('renderer - ', renderer);
    renderer.setSize(window.innerWidth, window.innerHeight);
    geometry = new THREE.BoxGeometry();
    // console.log('geometry - ', geometry);

    for (let i = 0; i < geometry.groups.length; i++) {
      switch (i) {
        case 0:
          // right
          geometry.groups[i].materialIndex = 1;
          break;
        case 1:
          // left
          geometry.groups[i].materialIndex = 1;
          break;
        case 2:
          // top
          geometry.groups[i].materialIndex = 2;
          break;
        case 3:
          // bottom
          geometry.groups[i].materialIndex = 2;
          break;
        case 4:
          // front
          geometry.groups[i].materialIndex = 0;
          break;
        case 5:
          // back (not visible in current rotation)
          geometry.groups[i].materialIndex = 0;
          break;
        default:
      }
    }

    const lightMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x6225fa),
    });
    // console.log('Light material - ', lightMaterial);
    const darkMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x361a7d),
    });
    // console.log('dark material - ', darkMaterial);
    const accentMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x101357),
    });
    // console.log('accent material - ', accentMaterial);
    cubeA = new THREE.Mesh(geometry, [
      lightMaterial,
      darkMaterial,
      accentMaterial,
    ]);
    // console.log('cube - ', cubeA);
    cubeB = cubeA.clone();
    cubeC = cubeA.clone();
    cubeD = cubeA.clone();

    cubeA.position.x = 2;
    cubeA.position.y = 2;
    cubeB.position.x = -2;
    cubeB.position.y = 2;
    cubeC.position.x = 4;
    cubeC.position.y = 2;
    cubeD.position.x = -4;
    cubeD.position.y = 2;

    scene.add(cubeA, cubeB, cubeC, cubeD);

    document.querySelector('#app').appendChild(renderer.domElement);
    window.addEventListener('keydown', handleInput);
    window.addEventListener('mousemove', handleMouseMove);
    return true;
  }

  function animate() {
    cubeA.rotation.x += 0.0125;
    cubeB.rotation.z -= 0.025;
    cubeB.rotation.y += 0.0125;
    cubeC.rotation.z += 0.025;
    cubeC.rotation.y += 0.0125;
    cubeD.rotation.x -= 0.0125;

    cubeA.position.x = cubePosX - 3;
    cubeB.position.x = cubePosX - 1;
    cubeB.position.z = -cubePosX + 1;
    cubeC.position.x = cubePosX + 1;
    cubeB.position.z = cubePosX + 1;
    cubeD.position.x = cubePosX + 3;

    cubeA.position.y = cubePosY;
    cubeB.position.y = -cubePosY;
    cubeC.position.y = cubePosY;
    cubeD.position.y = -cubePosY;

    camera.position.x = cameraPosX;
    camera.position.y = cameraPosY;
    camera.rotation.x = cameraRotX;
    camera.rotation.y = cameraRotY;

    camera.position.z = cameraPosZ;

    animationFrame = window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
    return true;
  }

  function handleInput(event) {
      inputFrame = window.requestAnimationFrame(function () {
        switch (event?.keyCode) {
          // ----- cubes
          case 37:
            // left
            cubePosX -= 0.015;
            break;
          case 38:
            // up
            cubePosY += 0.015;
            break;
          case 39:
            // right
            cubePosX += 0.015;
            break;
          case 40:
            // down
            cubePosY -= 0.015;
            break;
          case 32:
            // space
            cameraPosZ -= 0.045;
            break;
          case 8:
            // delete
            cameraPosZ += 0.045;
            break;
          // ---- camera
          case 87:
            // w - up
            cameraRotX += 0.175;
            break;
          case 65:
            // a - left
            cameraRotY += 0.175;
            break;
          case 68:
            // d - right
            cameraRotY -= 0.175;
            break;
          case 83:
            // s - down
            cameraRotX -= 0.175;
            break;
        }
      });
  }

  function handleMouseMove(e) {
    // console.log(e);
  }

  return { setup: setup(), animating: animate(), scene, renderer, camera, geometry, inputFrame, animationFrame };
})();
