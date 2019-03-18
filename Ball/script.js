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


function initPlane() {
    container = new THREE.Object3D();

    let geometry = new THREE.PlaneGeometry(15, 15, 1);
    let material = new THREE.MeshPhongMaterial({ color: 0xb24d4d, side: THREE.DoubleSide });
    let planeX = new THREE.Mesh(geometry, material.clone());
    planeX.material.color.set(0xff8888);
    let wall_geo = new THREE.BoxGeometry(17, 0.25, 3.25);
    let wall_geo2 = new THREE.BoxGeometry(0.25, 17, 3.25);
    let thin_geo = new THREE.BoxGeometry(4.5, 0.25, 3.25)
    let thin_geo2 = new THREE.BoxGeometry(0.25, 10, 3.25);
    let wallUp = new THREE.Mesh(wall_geo, material.clone());
    let wallDown = new THREE.Mesh(wall_geo, material.clone());
    let wallLeft = new THREE.Mesh(wall_geo2, material);
    let wallRight = new THREE.Mesh(wall_geo2, material);
    let wall1 = new THREE.Mesh(thin_geo, material);
    let wall2 = new THREE.Mesh(thin_geo, material);
    let wall3 = new THREE.Mesh(thin_geo2, material);
    let sphere_geo = new THREE.SphereGeometry(0.9, 16, 16);
    let sphere_mat = new THREE.MeshLambertMaterial({ color: 0xCC0000 });
    sphere = new THREE.Mesh(sphere_geo, sphere_mat)

    wallUp.position.z = 0.25;
    wallUp.position.y = 7.5;
    wallDown.position.z = 0.25;
    wallDown.position.y = -7.5;
    wallLeft.position.z = 0.25;
    wallLeft.position.x = -7.5;
    wallRight.position.z = 0.25;
    wallRight.position.x = 7.5;

    wall1.position.z = 0.25;
    wall1.position.y = 4.75;
    wall1.position.x = -5.25;
    wall2.position.z = 0.25;
    wall2.position.y = 4.75;
    wall2.position.x = 5.25;
    wall3.position.z = 0.25;
    wall3.position.y = 2.5;

    sphere.position.z = 0.8;
    sphere.position.y = 6;
    sphere.position.x = -5.5;

    container.add(wall1);
    container.add(wall2)
    container.add(wall3);

    container.add(wallRight)
    container.add(wallLeft)
    container.add(wallUp);
    container.add(wallDown)
    container.add(planeX);
    scene.add(sphere)

    collidable = container.children.slice();
    collidable.pop();

    // scene.add(wallHor)
    scene.add(container);

    Bsphere = new THREE.Sphere().setFromPoints(sphere.geometry.vertices);
    console.log(sphere.position.x, sphere.position.y)


}

function toRadians(angl) {
    return (angl * Math.PI) / 180;
}

function render() {

    let sphereBox = new THREE.Box3().setFromObject(sphere);
    cx = -camera.position.x / 100;
    cy = -camera.position.y / 65;
    let collide = Collid();

    //console.log(sphere.position.x, sphere.position.y)

    if (!collide) {
        sphere.position.x += cx;
        sphere.position.y += cy;
    }
    else {
        console.log(sphereBox.min, sphereBox.max)
        console.log(box.min, box.max)
        // if (sphereBox.max.x > box.min.x) {
        //     sphere.position.y += cy;
        //     sphere.position.x = Good_sphere_pos.x + cx;
        // }
        if (sphereBox.max.x > box.max.x + Bsphere.radius && sphereBox.max.y > box.max.y + Bsphere.radius && sphereBox.min.x < box.max.x && sphereBox.min.y < box.max.y) {
            sphere.position.x += cx +cx;
            sphere.position.y += Math.abs(cy) + cy;
        }
        else if (sphereBox.min.y <= box.max.y && sphereBox.max.y > box.max.y + Bsphere.radius && sphereBox.min.x <= box.max.x && sphereBox.max.x >= box.min.x) {
            sphere.position.y = box.max.y + Bsphere.radius + cy;
            sphere.position.x += cx;
            bool1 = true
        }
        else if (sphereBox.max.y >= box.min.y && sphereBox.min.y < box.min.y - Bsphere.radius && sphereBox.min.x <= box.max.x && sphereBox.max.x >= box.min.x) {
            sphere.position.y = box.min.y - Bsphere.radius + cy;
            sphere.position.x += cx;
        }
        else if (sphereBox.min.x <= box.max.x && sphereBox.max.x > box.max.x + Bsphere.radius && sphereBox.min.y <= box.max.y && sphereBox.max.y >= box.min.y) {
            sphere.position.x = box.max.x + Bsphere.radius + cx;
            sphere.position.y += cy;
        }
        else if (sphereBox.max.x >= box.min.x && sphereBox.min.x < box.min.x - Bsphere.radius && sphereBox.min.y <= box.max.y && sphereBox.max.y >= box.min.y) {
            sphere.position.x = box.min.x - Bsphere.radius + cx;
            sphere.position.y += cy;
        }
    }

    collide = false;
    bool = false;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};


window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);


function onMouseDown(e) {
    dragging = true;
}
function onMouseUp(e) {
    dragging = false;
}

function onMouseMove() {
    if (dragging == true) {
    }
}
function Level1() {

}
function Collid() {
    for (let i = 0; i < collidable.length; i++) {
        //     console.log(i, collidable[i])
        if (!bool) {
            box = new THREE.Box3().setFromObject(collidable[i]);
        }
        let x = Math.max(box.min.x, Math.min(sphere.position.x, box.max.x));
        let y = Math.max(box.min.y, Math.min(sphere.position.y, box.max.y));
        let z = Math.max(box.min.z, Math.min(sphere.position.z, box.max.z));

        let distance = Math.sqrt((x - sphere.position.x) * (x - sphere.position.x) +
            (y - sphere.position.y) * (y - sphere.position.y) +
            (z - sphere.position.z) * (z - sphere.position.z));
        bool = distance < Bsphere.radius;
        if (!bool) {
            Good_sphere_pos = {
                'x': sphere.position.x,
                'y': sphere.position.y
            }
        }
        if (bool) {
            return bool;
        }
    }
}



