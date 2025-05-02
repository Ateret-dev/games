import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';

const stageLabel = document.getElementById('stageLabel');
const feedBtn = document.getElementById('feedBtn');
const petSelect = document.getElementById('petSelect');

const stages = ['egg', 'hatchling', 'teen', 'adult'];
let currentStageIndex = 0;
let currentPet = petSelect.value;
let mesh;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3ff);

const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 100);
camera.position.set(0, 1.5, 4);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(3,3,3);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

function createGeometry(cfg){
  let geom;
  switch(cfg.geometry){
    case 'box':      geom = new THREE.BoxGeometry(...cfg.size); break;
    case 'sphere':   geom = new THREE.SphereGeometry(cfg.size[0], 32, 32); break;
    case 'cone':     geom = new THREE.ConeGeometry(cfg.size[0], cfg.size[1], 32); break;
    case 'cylinder': geom = new THREE.CylinderGeometry(cfg.size[0], cfg.size[1], cfg.size[2], 32); break;
    default: geom = new THREE.BoxGeometry(1,1,1);
  }
  return geom;
}

function loadStage(){
  fetch(`data/${currentPet}_${stages[currentStageIndex]}.json`)
    .then(r=>r.json())
    .then(cfg=>{
      if(mesh){ scene.remove(mesh); mesh.geometry.dispose(); mesh.material.dispose();}
      const geom = createGeometry(cfg);
      const mat = new THREE.MeshStandardMaterial({color: cfg.color});
      mesh = new THREE.Mesh(geom, mat);
      mesh.position.y = cfg.positionY || 0;
      scene.add(mesh);
      stageLabel.textContent = `Stage: ${cfg.stageName}`;
    });
}

feedBtn.addEventListener('click', ()=>{
  if(currentStageIndex < stages.length-1){
    currentStageIndex++;
    loadStage();
  } else {
    alert('Your pet is fully grown!');
  }
});

petSelect.addEventListener('change', ()=>{
  currentPet = petSelect.value;
  currentStageIndex = 0;
  loadStage();
});

window.addEventListener('resize', ()=>{
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

function animate(){
  requestAnimationFrame(animate);
  if(mesh){
    mesh.rotation.y += 0.005;
  }
  renderer.render(scene, camera);
}
loadStage();
animate();
