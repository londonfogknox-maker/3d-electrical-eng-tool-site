/**
 * Project Alpha: Obsidian Visualizer
 * Core Three.js Logic
 */

const initDemo = () => {
    const container = document.getElementById('demo-canvas-container');
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75, 
        container.clientWidth / container.clientHeight, 
        0.1, 
        1000
    );
    camera.position.z = 5;

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // 3. Lights
    const mainLight = new THREE.PointLight(0xd67d5c, 1.5, 100);
    mainLight.position.set(10, 10, 10);
    scene.add(mainLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // 4. Geometry & Material (Earthy Placeholder)
    const geometry = new THREE.IcosahedronGeometry(2, 2);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0xd67d5c, 
        wireframe: true,
        transparent: true,
        opacity: 0.8,
        shininess: 100
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 5. Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);
        
        // Subtle organic rotation
        mesh.rotation.x += 0.003;
        mesh.rotation.y += 0.002;
        
        // Slight pulse effect
        const time = Date.now() * 0.001;
        mesh.scale.setScalar(1 + Math.sin(time) * 0.05);
        
        renderer.render(scene, camera);
    };

    // 6. Handle Window Resize
    const handleResize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Remove loading text once initialized
    const loadingText = document.getElementById('loading-text');
    if (loadingText) loadingText.style.display = 'none';

    // Start Animation
    animate();
};

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', initDemo);
