// Basic Three.js Scene Setup
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Add a simple geometric shape (Placeholder for your app)
const geometry = new THREE.IcosahedronGeometry(2, 1);
const material = new THREE.MeshNormalMaterial({ wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 5;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.005;
    
    renderer.render(scene, camera);
}

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
