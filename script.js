import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

camera.position.set(0, 30, 80);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

scene.add(new THREE.AmbientLight(0x666));

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 3, 5);
scene.add(light);

const stars = new THREE.BufferGeometry();
const starPos = [];

for (let i = 0; i < 1500; i++) {
  starPos.push(
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000,
  );
}

stars.setAttribute("position", new THREE.Float32BufferAttribute(starPos, 3));
scene.add(
  new THREE.Points(stars, new THREE.PointsMaterial({ color: 0xffffff })),
);

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(12, 64, 64),
  new THREE.MeshLambertMaterial({ color: 0xfad5a5 }),
);

scene.add(saturn);

const ringGeo = new THREE.RingGeometry(18, 35, 64);
const ringMat = new THREE.MeshBasicMaterial({
  color: 0xd4c5a9,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.8,
});
const ring = new THREE.Mesh(ringGeo, ringMat);
ring.rotation.x = Math.PI / 2;
scene.add(ring);

const ring2Geo = new THREE.RingGeometry(36, 42, 64);
const ring2Mat = new THREE.MeshBasicMaterial({
  color: 0xb8a888,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.5,
});
const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
ring2.rotation.x = Math.PI / 2;
scene.add(ring2);

function animate() {
  requestAnimationFrame(animate);

  saturn.rotation.x += 0.01;
  ring.rotation.z += 0.0005;
  ring2.rotation.z += 0.0003;

  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});