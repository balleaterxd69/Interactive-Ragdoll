document.addEventListener('DOMContentLoaded', function () {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('game-container').appendChild(renderer.domElement);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
  const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
  const broadphase = new Ammo.btDbvtBroadphase();
  const solver = new Ammo.btSequentialImpulseConstraintSolver();
  const physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
  physicsWorld.setGravity(new Ammo.btVector3(0, -9.82, 0));

  // ... Initialize your scene, create the ground, lights, and other necessary components

  // ... Create a complex ragdoll model and connect body parts with joints
  // This part will depend on your specific ragdoll implementation

  camera.position.z = 10;

  function animate() {
    requestAnimationFrame(animate);
    physicsWorld.stepSimulation(1 / 60, 10);

    // Update Three.js objects based on physics
    // ...

    // Render the scene
    renderer.render(scene, camera);
  }

  document.addEventListener('mousemove', function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      applyForceToRagdoll(intersectedObject);
    }
  });

  function applyForceToRagdoll(intersectedObject) {
    // You need to implement logic to obtain the corresponding Ammo.js body
    // For simplicity, let's assume there's a function `getAmmoBody` that returns the Ammo.js body
    const body = getAmmoBody(intersectedObject);

    if (body) {
      const force = new Ammo.btVector3(0, 10, 0); // Adjust the force as needed
      const position = new Ammo.btVector3(0, 0, 0); // Adjust the position of force application as needed

      body.applyForce(force, position);
    }
  }

  animate();
});
