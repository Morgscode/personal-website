import {
  Scene,
  Raycaster,
  Vector2,
  Clock,
  WebGLRenderer,
  BoxGeometry,
  SphereGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
} from './three/three.mjs';
import { OrbitControls } from './three/OrbitControls.mjs';

const cubeModule = (function () {
  const scene = new Scene();
  const raycaster = new Raycaster();
  const pointer = new Vector2();
  const renderer = new WebGLRenderer();
  const boxGeometry = new BoxGeometry();
  const frameSphereGeometry = new SphereGeometry(6, 32, 16);
  const sphereGeometry = new SphereGeometry(5.5, 32, 16);
  const clock = new Clock();
  let cubePosX = 0;
  let cubePosY = 0;
  let cameraPosX = 0;
  let cameraPosY = 0;
  let cameraPosZ = 6;
  let cameraRotY = 0;
  let cameraRotX = 0;
  let prevPageX = 0;
  let prevPageY = 0;
  let mouseMovingUp = false;
  let mouseMovingDown = false;
  let mouseMovingLeft = false;
  let mouseMovingRight = false;
  let mouseIsDown = false;
  let rotateFrameSphere = true;
  let rotateCubes = true;
  let camera;
  let orbitControls;
  let animationFrame;
  let inputFrame;
  let cubeA;
  let cubeB;
  let cubeC;
  let cubeD;
  let frameSphere;
  let sphere;

  function setup() {
    clock.start();
    scene.background = new Color(0x000000);
    scene.name = 'lmwd-cube-scene';

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio( window.devicePixelRatio );

    camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera.position.set(cameraPosX, cameraPosY, cameraPosZ);

    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enablePan = true;
    orbitControls.enableZoom = true;

    document.querySelector('#cubes-app').appendChild(renderer.domElement);

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

    const lightMaterial = new MeshBasicMaterial({
      color: new Color(0x111111),
    });
    const darkMaterial = new MeshBasicMaterial({
      color: new Color(0x222222),
    });
    const accentMaterial = new MeshBasicMaterial({
      color: new Color(0x333333),
    });

    cubeA = new Mesh(boxGeometry, [
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
    cubeA.position.set(2, 2);
    cubeB.position.set(-2, 2);
    cubeC.position.set(4, 2);
    cubeD.position.set(-4, 2);
    scene.add(cubeA, cubeB, cubeC, cubeD);

    const frameSphereMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    frameSphere = new Mesh(frameSphereGeometry, frameSphereMaterial);
    frameSphere.name = 'frame-sphere';
    frameSphere.position.set(0, -4, -7); 
    scene.add(frameSphere);

    const sphereMaterial = new MeshBasicMaterial({color: 0x00b2ca});
    sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.name = 'solid-sphere';
    sphere.position.set(0, -4, -7);  
    scene.add(sphere);

    return true;
  }

  function animate() {

    if (rotateCubes) {
      cubeA.rotation.x += 0.01;
      cubeA.rotation.y += 0.01;
      cubeB.rotation.x += 0.01;
      cubeB.rotation.y += 0.01;
      cubeC.rotation.x += 0.01;
      cubeC.rotation.y += 0.01;
      cubeD.rotation.x += 0.01;
      cubeD.rotation.y += 0.01;
    }

    if (rotateFrameSphere) {
      frameSphere.rotation.z += 0.005;
    }

    cubeA.position.set(cubePosX - 3, cubePosY);
    cubeB.position.set(cubePosX - 1, -cubePosY);
    cubeC.position.set(cubePosX + 1, cubePosY);
    cubeD.position.set(cubePosX + 3, -cubePosY);

    if (!mouseIsDown) {
      camera.rotation.x = cameraRotX;
      camera.rotation.y = cameraRotY;
      camera.position.set(cameraPosX, cameraPosY, cameraPosZ);
    }

    if (orbitControls) {
      orbitControls.update();
    }
  
    renderer.render(scene, camera);

    animationFrame = window.requestAnimationFrame(animate);
    return true;
  }

  function disableWindowScrollOnKeyPress(keypress) {
    const targets = [32, 37, 38, 39, 40];
    if (targets.includes(parseInt(keypress.keyCode, 10))) {
      keypress.preventDefault();
      return false;
    }
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

  function handleKeyPress(keypress) {
    inputFrame = window.requestAnimationFrame(function () {
      let target;
      switch (keypress?.keyCode) {
        // ----- cubes
        case 37:
          // left
          target = cubePosX - 0.01;
          do {
            cubePosX -= 0.001;
          } while (cubePosX > target);
          break;
        case 38:
          // up
          target = cubePosY - 0.01;
          do {
            cubePosY -= 0.001;
          } while (cubePosY > target);
          break;
        case 39:
          // right
          target = cubePosX + 0.01;
          do {
            cubePosX += 0.001;
          } while (cubePosX < target);
          break;
        case 40:
          // down
          target = cubePosY + 0.01;
          do {
            cubePosY += 0.001;
          } while (cubePosY < target);
          break;
      }
    });
  }

  function handleMouseMove(mousemove) {
    calculateMouseMoveDirection(mousemove);
    pointer.x = (mousemove.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(mousemove.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.name.startsWith('cube')) {
      function rotateCube() {
          rotateCubes = false;
          if (mouseMovingUp) {
            const target = intersects[i].object.rotation.y - 0.1;
            do {
              intersects[i].object.rotation.y -= 0.001;
            } while (intersects[i].object.rotation.y > target);
          }
          if (mouseMovingDown) {
            const target = intersects[i].object.rotation.y + 0.1;
            do {
              intersects[i].object.rotation.y += 0.001;
            } while (intersects[i].object.rotation.y < target);
          }
          if (mouseMovingLeft) {
            const target = intersects[i].object.rotation.x - 0.1;
            do {
              intersects[i].object.rotation.x -= 0.001;
            } while (intersects[i].object.rotation.x > target);
          }
          if (mouseMovingRight) {
            const target = intersects[i].object.rotation.x + 0.1;
            do {
              intersects[i].object.rotation.x += 0.001;
            } while (intersects[i].object.rotation.x < target);
          }
          rotateCubes = true;
        }
        requestAnimationFrame(rotateCube);
      }  
    }
    prevPageX = mousemove.pageX;
    prevPageY = mousemove.pageY;
  }

  function handleMouseDown(mousedown) {
    if (mousedown.which === 1) {
      mouseIsDown = true;
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
              if (intersects[i].object.scale.z > 0.2) {
                intersects[i].object.scale.x -= 0.02;
                intersects[i].object.scale.y -= 0.02;
                intersects[i].object.scale.z -= 0.02;
                requestAnimationFrame(scaleSphere);
              }
            }
            requestAnimationFrame(scaleSphere);
            break;
          case 'frame-sphere':
            orbitControls.target.set(0, -5, -7);
            intersects[i];
            break;
        }
      }
    }
  }

  function handleMouseUp(mouseup) {
      mouseIsDown = false;
      calculateMouseMoveDirection(mouseup);
      pointer.x = (mouseup.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(mouseup.clientY / window.innerHeight) * 2 + 1;
      sphere.material.color.set(0x00b2ca);
      function scaleSphere() {
        if (sphere.scale.z < 1) {
          sphere.scale.x += 0.02;
          sphere.scale.y += 0.02;
          sphere.scale.z += 0.02;
          requestAnimationFrame(scaleSphere);
        }
      }
      requestAnimationFrame(scaleSphere);
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      for (let i = 0; i < intersects.length; i++) {
        switch (intersects[i].object.name) {
          case 'solid-sphere':
            // console.log(intersects[i]);
            intersects[i];
            break;
          case 'frame-sphere':
            // console.log(intersects[i]);
            intersects[i];
            break;
        }
      }
  }

  function handleEventListeners(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        addEventListener('keydown', disableWindowScrollOnKeyPress);
        addEventListener('mousemove', handleMouseMove);
        addEventListener('mousedown', handleMouseDown);
        addEventListener('mouseup', handleMouseUp);
        addEventListener('keydown', handleKeyPress);
      } else {
        removeEventListener('keydown', disableWindowScrollOnKeyPress);
        removeEventListener('mousemove', handleMouseMove);
        removeEventListener('mousedown', handleMouseDown);
        removeEventListener('mouseup', handleMouseUp);
        removeEventListener('keydown', handleKeyPress);
      }
    });
  }

  function initIntersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.9,
    };
    let observer = new IntersectionObserver(handleEventListeners, options);
    let target = document.querySelector('#cubes-app');
    observer.observe(target);
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
    clock,
  };
})();

export { cubeModule };
