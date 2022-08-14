'use strict';

const cubeModule = (function () {
  const scene = new THREE.Scene();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const renderer = new THREE.WebGLRenderer();
  const boxGeometry = new THREE.BoxGeometry();
  const frameSphereGeometry = new THREE.SphereGeometry(6, 32, 16);
  const sphereGeometry = new THREE.SphereGeometry(5.5, 32, 16);
  const light = new THREE.DirectionalLight(0xffffff);
  let camera;
  let cubeA;
  let cubeB;
  let cubeC;
  let cubeD;
  let frameSphere;
  let sphere;
  let animationFrame;
  let inputFrame;
  let cubePosX = 0;
  let cubePosY = 0;
  let cubPosZ = 0;
  let cameraPosX = 0;
  let cameraPosY = 0;
  let cameraPosZ = 6;
  let cameraRotY = 0;
  let cameraRotX = 0;
  let cameraRotZ = 0;
  let prevPageX = 0;
  let prevPageY = 0;
  let mouseMovingUp = false;
  let mouseMovingDown = false;
  let mouseMovingLeft = false;
  let mouseMovingRight = false;
  let mouseIsDown = false;
  let rotateFrameSphere = true;

  function setup() {
    scene.background = new THREE.Color(0x222222);
    scene.name = 'lmwd-cube-scene';

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    for (let i = 0; i < boxGeometry.groups.length; i++) {
      switch (i) {
        case 0:
          // right
          boxGeometry.groups[i].materialIndex = 1;
          break;
        case 1:
          // left
          boxGeometry.groups[i].materialIndex = 1;
          break;
        case 2:
          // top
          boxGeometry.groups[i].materialIndex = 2;
          break;
        case 3:
          // bottom
          boxGeometry.groups[i].materialIndex = 2;
          break;
        case 4:
          // front
          boxGeometry.groups[i].materialIndex = 0;
          break;
        case 5:
          // back
          boxGeometry.groups[i].materialIndex = 0;
          break;
        default:
      }
    }

    const lightMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x6225fa),
    });
    const darkMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x361a7d),
    });
    const accentMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x101357),
    });

    cubeA = new THREE.Mesh(boxGeometry, [
      lightMaterial,
      darkMaterial,
      accentMaterial,
    ]);
    cubeA.name = 'cube-a';
    cubeB = cubeA.clone();
    cubeB.name = 'cube-b';
    cubeC = cubeA.clone();
    cubeC.name = 'cube-c';
    cubeD = cubeA.clone();
    cubeD.name = 'cube-d';
    cubeA.position.x = 2;
    cubeA.position.y = 2;
    cubeB.position.x = -2;
    cubeB.position.y = 2;
    cubeC.position.x = 4;
    cubeC.position.y = 2;
    cubeD.position.x = -4;
    cubeD.position.y = 2;

    scene.add(cubeA, cubeB, cubeC, cubeD);

    const frameSphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    frameSphere = new THREE.Mesh(frameSphereGeometry, frameSphereMaterial);
    frameSphere.name = 'frame-sphere';

    frameSphere.position.y = -4;
    frameSphere.position.z = -7;

    scene.add(frameSphere);

    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00b2ca });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.name = 'solid-sphere';

    sphere.position.y = -4;
    sphere.position.z = -7;

    scene.add(sphere);

    document.querySelector('#cubes-app').appendChild(renderer.domElement);

    addEventListener('mousemove', handleMouseMove);
    addEventListener('mousedown', handleMouseDown);
    addEventListener('mouseup', handleMouseUp);
    addEventListener('keydown', handleKeyPress);

    return true;
  }

  function animate() {
    cubeA.rotation.x += 0.01;
    cubeB.rotation.z -= 0.015;
    cubeB.rotation.y += 0.01;
    cubeC.rotation.z += 0.015;
    cubeC.rotation.y += 0.01;
    cubeD.rotation.x -= 0.01;

    if (rotateFrameSphere) {
      frameSphere.rotation.z += 0.005;
    }

    cubeA.position.x = cubePosX - 3;
    cubeB.position.x = cubePosX - 1;
    cubeC.position.x = cubePosX + 1;
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

  function handleKeyPress(keypress) {
    inputFrame = window.requestAnimationFrame(function () {
      switch (keypress?.keyCode) {
        // ----- cubes
        case 37:
          // left
          cubePosX -= 0.01;
          break;
        case 38:
          // up
          cubePosY += 0.01;
          break;
        case 39:
          // right
          cubePosX += 0.01;
          break;
        case 40:
          // down
          cubePosY -= 0.01;
          break;
        case 32:
          // space
          cameraPosZ -= 0.01;
          break;
        case 8:
          // delete
          cameraPosZ += 0.01;
          break;
        // ---- camera
        case 87:
          // w - up
          cameraRotX += 0.01;
          break;
        case 65:
          // a - left
          cameraRotY += 0.01;
          break;
        case 68:
          // d - right
          cameraRotY -= 0.01;
          break;
        case 83:
          // s - down
          cameraRotX -= 0.01;
          break;
      }
    });
  }

  function calculateMouseMoveDirection(mousemove) {
    if (mousemove.pageX < prevPageX) {
      mouseMovingLeft = true;
      mouseMovingRight = false;
    } else {
      mouseMovingLeft = false;
      mouseMovingRight = true;
    }
    if (mousemove.pageY < prevPageY) {
      mouseMovingUp = true;
      mouseMovingDown = false;
    } else {
      mouseMovingUp = false;
      mouseMovingDown = true;
    }
  }

  function handleMouseMove(mousemove) {
    const app = document.querySelector('#cubes-app');
    calculateMouseMoveDirection(mousemove);
    pointer.x = (mousemove.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(mousemove.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
      // console.log(intersects[i]);
    }
    prevPageX = mousemove.pageX;
    prevPageY = mousemove.pageY;
  }

  function handleMouseDown(mousedown) {
    mouseIsDown = true;
    const app = document.querySelector('#cubes-app');
    calculateMouseMoveDirection(mousedown);
    pointer.x = (mousedown.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(mousedown.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
      switch (intersects[i].object.name) {
        case 'solid-sphere':
          intersects[i].object.material.color.set(0xff5d73);
          function scaleSphere() {
            if (intersects[i].object.scale.z > 0.1) {
              intersects[i].object.scale.z -= 0.2;
              requestAnimationFrame(scaleSphere);
            }
          }
          requestAnimationFrame(scaleSphere);
          break;
        case 'frame-sphere':
          console.log(intersects[i]);
          intersects[i];
          break;
      }
    }
  }

  function handleMouseUp(mouseup) {
    mouseIsDown = false;
    const app = document.querySelector('#cubes-app');
    calculateMouseMoveDirection(mouseup);
    pointer.x = (mouseup.clientX / app.offsetWidth) * 2 - 1;
    pointer.y = -(mouseup.clientY / app.offsetHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
      switch (intersects[i].object.name) {
        case 'solid-sphere':
          function scaleSphere() {
            intersects[i].object.material.color.set(0x00b2ca);
            if (intersects[i].object.scale.z < 1) {
              intersects[i].object.scale.z += 0.2;
              requestAnimationFrame(scaleSphere);
            }
          }
          requestAnimationFrame(scaleSphere);
          break;
      }
    }
  }

  function initIntersectionObserver() {
    function disableWindowScrollOnKeyPress(keypress) {
      const targets = [32, 37, 38, 39, 40];
      if (targets.includes(parseInt(keypress.keyCode, 10))) {
        keypress.preventDefault();
        return false;
      }
    }
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.9,
    };
    let observer = new IntersectionObserver(triggerKeyPressDisable, options);
    let target = document.querySelector('#cubes-app');
    observer.observe(target);
    function triggerKeyPressDisable(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          addEventListener('keydown', disableWindowScrollOnKeyPress);
        } else {
          removeEventListener('keydown', disableWindowScrollOnKeyPress);
        }
      });
    }
    return observer;
  }

  return {
    setup: setup(),
    animating: animate(),
    cubesObserver: initIntersectionObserver(),
    scene,
    renderer,
    camera,
    inputFrame,
    animationFrame,
  };
})();
