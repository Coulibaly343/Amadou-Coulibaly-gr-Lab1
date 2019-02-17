let renderer;
let scene;
let camera;
let sphere;
let container;
let plane;
let Bsphere;
let box;
let camVal = 3;
let prevCoords;
let collidable = [];
let dragging = false;
let bool = false;
let axisBool;
let cx;
let cy;
let Good_sphere_pos;
let bool1 = false;
let bool2 = false;
let bool3 = false;
let bool4 = false;

init();
render();

function init() {

    renderer = new THREE.WebGLRenderer({ antialias: false });
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 500);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    let pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.set(50, 10, 250);
    scene.add(pointLight);
    initPlane();

    let geometry = new THREE.SphereGeometry(0.02, 32, 32);
    let material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    camera.position.z = 14;
    controls.target = new THREE.Vector3();
    controls.minPolarAngle = 1.15;
    controls.maxPolarAngle = 1.95;
    controls.minAzimuthAngle = -0.5;
    controls.maxAzimuthAngle = 0.5;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xEEEEEE, 1);
    document.body.appendChild(renderer.domElement);


    planeShifter = new PlaneShifter.PlaneShifter(container, camera, { controls: controls });
    planeShifter.setBoundingBox(new THREE.Box3(
        new THREE.Vector3(-10, -10, -10),  // min
        new THREE.Vector3(10, 10, 10)      // max
    ))

    prevCoords = {
        x: 0,
        y: 0
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
}






