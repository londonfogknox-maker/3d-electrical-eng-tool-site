document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 15); // Position camera to look at the scene

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const sceneContainer = document.getElementById('scene-container');
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);

    // Add camera controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // --- 2. BATTERY GEOMETRY & MATERIALS ---
    const cellGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 16); // Radius, height, segments
    const cellMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Default gray

    // A group to hold the entire battery pack
    let batteryPackGroup = new THREE.Group();
    scene.add(batteryPackGroup);

    // --- 3. SLIDER CONTROLS ---
    const modulesSlider = document.getElementById('modules-slider');
    const cellsSlider = document.getElementById('cells-slider');
    const socSlider = document.getElementById('soc-slider');
    
    const modulesValue = document.getElementById('modules-value');
    const cellsValue = document.getElementById('cells-value');
    const socValue = document.getElementById('soc-value');

    function updateLabels() {
        modulesValue.textContent = modulesSlider.value;
        cellsValue.textContent = cellsSlider.value;
        socValue.textContent = socSlider.value;
    }

    // --- 4. BATTERY GENERATION FUNCTION ---
    function generateBatteryPack() {
        // Clear the old battery pack
        while (batteryPackGroup.children.length > 0) {
            batteryPackGroup.remove(batteryPackGroup.children[0]);
        }

        const numModules = parseInt(modulesSlider.value);
        const numCells = parseInt(cellsSlider.value);
        const initialSoC = parseInt(socSlider.value) / 100; // Convert to 0-1 range

        const moduleSpacing = 5; // Space between modules
        const packWidth = (numModules - 1) * moduleSpacing;

        for (let i = 0; i < numModules; i++) {
            const moduleGroup = new THREE.Group();
            
            // Create cells within the module
            for (let j = 0; j < numCells; j++) {
                // For simplicity, arrange cells in a line
                const cell = new THREE.Mesh(cellGeometry, cellMaterial.clone());
                cell.position.x = j * 1.2 - ((numCells - 1) * 1.2) / 2; // Center the line of cells
                
                // Set cell color based on SoC
                // We'll use a simple random variation around the initial SoC for visual interest
                const cellSoC = initialSoC + (Math.random() - 0.5) * 0.1; // +/- 5% variation
                cell.material.color.setHSL(0.33 * cellSoC, 0.7, 0.5); // HSL: Hue (Green*SoC), Saturation, Lightness

                moduleGroup.add(cell);
            }

            // Position the module within the pack
            moduleGroup.position.x = i * moduleSpacing - packWidth / 2;
            batteryPackGroup.add(moduleGroup);
        }
    }

    // --- 5. EVENT LISTENERS & ANIMATION LOOP ---
    modulesSlider.addEventListener('input', () => { updateLabels(); generateBatteryPack(); });
    cellsSlider.addEventListener('input', () => { updateLabels(); generateBatteryPack(); });
    socSlider.addEventListener('input', () => { updateLabels(); generateBatteryPack(); });

    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // Update camera controls
        renderer.render(scene, camera);
    }

    // Initial setup
    updateLabels();
    generateBatteryPack();
    animate();

    // Handle window resizing
    window.addEventListener('resize', () => {
        camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    });
});
