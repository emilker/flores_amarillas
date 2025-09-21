// ESCENA Y CÁMARA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// LUZ
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// FLORES
const flowers = [];
const geometryFlower = new THREE.SphereGeometry(0.8, 16, 16);
const materialFlower = new THREE.MeshStandardMaterial({ color: 0xFFDD00 });

for (let i = 0; i < 50; i++) {
  const flower = new THREE.Mesh(geometryFlower, materialFlower);
  flower.position.set(
    (Math.random() - 0.5) * 15,
    Math.random() * 10,
    (Math.random() - 0.5) * 15
  );
  scene.add(flower);
  flowers.push(flower);
}

// MENSAJE 3D
const canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 256;
const ctx = canvas.getContext("2d");

// Fondo transparente
ctx.fillStyle = "rgba(0,0,0,0)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Texto
ctx.fillStyle = "#e6b800";
ctx.font = "bold 40px Segoe UI";
ctx.textAlign = "center";
ctx.fillText("💛 Feliz Día de las Flores Amarillas 💛", canvas.width/2, 100);
ctx.fillText("Siempre contigo aunque estemos lejos", canvas.width/2, 180);

const textTexture = new THREE.CanvasTexture(canvas);
const geometryText = new THREE.PlaneGeometry(12, 6);
const materialText = new THREE.MeshBasicMaterial({ map: textTexture, transparent: true });
const textMesh = new THREE.Mesh(geometryText, materialText);
textMesh.position.set(0, 0, 0);
scene.add(textMesh);

camera.position.z = 20;

// ANIMACIÓN
function animate() {
  requestAnimationFrame(animate);

  flowers.forEach(f => {
    f.position.y -= 0.05;
    f.rotation.x += 0.01;
    f.rotation.y += 0.01;
    if (f.position.y < -10) f.position.y = 10;
  });

  textMesh.position.y = Math.sin(Date.now() * 0.002) * 2;
  textMesh.rotation.y += 0.005;

  renderer.render(scene, camera);
}
animate();

// AJUSTE AL CAMBIAR TAMAÑO DE VENTANA
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
