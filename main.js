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
camera.position.set(0, 1.8, 5);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(3,3,3);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

function createGeometry(cfg){
  switch(cfg.geometry){
    case 'box':      return new THREE.BoxGeometry(...cfg.size);
    case 'sphere':   return new THREE.SphereGeometry(cfg.size[0], 32, 32);
    case 'cone':     return new THREE.ConeGeometry(cfg.size[0], cfg.size[1], 32);
    case 'cylinder': return new THREE.CylinderGeometry(cfg.size[0], cfg.size[1], cfg.size[2], 32);
    default:         return new THREE.BoxGeometry(1,1,1);
  }
}

function loadStage(){
  fetch(`data/${currentPet}_${stages[currentStageIndex]}.json`)
    .then(r=>r.json())
    .then(cfg=>{
      if(mesh){
        scene.remove(mesh);
        mesh.traverse?.(n=>{ if(n.isMesh){ n.geometry.dispose(); n.material.dispose(); }});
      }

      if(cfg.parts){
        const group = new THREE.Group();
        cfg.parts.forEach(p=>{
          const geom = createGeometry(p);
          const mat  = new THREE.MeshStandardMaterial({color: p.color});
          const m    = new THREE.Mesh(geom, mat);
          if(p.position) m.position.set(...p.position);
          if(p.rotation) m.rotation.set(...p.rotation);
          group.add(m);
        });
        mesh = group;
      } else {
        const geom = createGeometry(cfg);
        const mat  = new THREE.MeshStandardMaterial({color: cfg.color});
        mesh = new THREE.Mesh(geom, mat);
        mesh.position.y = cfg.positionY || 0;
      }

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
  if(mesh) mesh.rotation.y += 0.003;
  renderer.render(scene, camera);
}
loadStage();
animate();
