import * as THREE from 'three';
import threeOrbitControls from 'three-orbit-controls';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';

const OrbitControls = threeOrbitControls(THREE);
var OutlineShader = {
  uniforms: {
    offset: { type: 'f', value: 0.3 },
    color: { type: 'v3', value: new THREE.Color('#000000') },
    alpha: { type: 'f', value: 1.0 }
  },
  vertexShader: [
    "uniform float offset;",
    "void main() {",
    "  vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );",
    "  gl_Position = projectionMatrix * pos;",
    "}"
  ].join('\n'),
  fragmentShader: [
    "uniform vec3 color;",
    "uniform float alpha;",
    "void main() {",
    "  gl_FragColor = vec4( color, alpha );",
    "}"
  ].join('\n')
};

var controls;
var rocketGroup;
var fire;
var fire2;
var stars;
var rocketTarget;
var plane;
var camera;
var cameraTarget;
var renderer;
var scene;
var targetSphere;

export function init() {
  var container = document.getElementById('container');
  
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  renderer.domElement.style.cursor = 'pointer';
  // camera
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .1, 100000);
  camera.position.set(0, -6, 3);
  // controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.y = 1;
  controls.enableDamping = true;
  controls.enabled = false;
  // scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x01374b);
  scene.fog = new THREE.Fog(scene.background, 10, 20);
  // lights
  var aLight = new THREE.AmbientLight(0x555555);
  scene.add(aLight);
  
  var dLight1 = new THREE.DirectionalLight(0xffffff, 0.4);
  dLight1.position.set(0.7, 1, 1);
  scene.add(dLight1);

  // -------------------------------------------
  rocketGroup = new THREE.Group();
  scene.add(rocketGroup);
  
  var rocket = new THREE.Group();
  rocket.position.y = -1.5; // vertically center
  rocketGroup.add(rocket);
  // -------------------------------------------

  // body
  var points = [];
  points.push(new THREE.Vector2(0, 0)); // bottom
  for (var i = 0; i < 11; i++) {
    var point = new THREE.Vector2(
        Math.cos(i * 0.227 - 0.75) * 8,
        i * 4.0
    );
    points.push(point);
  }
  
  points.push(new THREE.Vector2(0, 40)); // tip
  
  var rocketGeo = new THREE.LatheGeometry(points, 32);
  
  var rocketMat = new THREE.MeshToonMaterial({
    color: 0xcccccc,
    shininess: 1
  });
  
  var rocketOutlineMat = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(OutlineShader.uniforms),
    vertexShader: OutlineShader.vertexShader,
    fragmentShader: OutlineShader.fragmentShader,
    side: THREE.BackSide,
  });
  
  var rocketObj = SceneUtils.createMultiMaterialObject(
    rocketGeo, [rocketMat, rocketOutlineMat]
  );
  rocketObj.scale.setScalar(0.1);
  rocket.add(rocketObj);
  
  // window
  var portalGeo = new THREE.CylinderBufferGeometry(0.26, 0.26, 1.6, 32);
  var portalMat = new THREE.MeshToonMaterial({ color: 0x90dcff });
  var portalOutlineMat = rocketOutlineMat.clone();
  portalOutlineMat.uniforms.offset.value = 0.03;
  var portal = SceneUtils.createMultiMaterialObject(
    portalGeo, [portalMat, portalOutlineMat]
  );
  portal.position.y = 2;
  portal.rotation.x = Math.PI / 2;
  rocket.add(portal);
  // ------------
  
  var circle = new THREE.Shape();
  circle.absarc(0, 0, 3.5, 0, Math.PI * 2);
  
  var hole = new THREE.Path();
  hole.absarc(0, 0, 3, 0, Math.PI * 2);
  circle.holes.push(hole);
  
  var tubeExtrudeSettings = {
    amount: 17,
    steps: 1,
    bevelEnabled: false
  };
  var tubeGeo = new THREE.ExtrudeGeometry(circle, tubeExtrudeSettings);
  tubeGeo.computeVertexNormals();
  tubeGeo.center();
  var tubeMat = new THREE.MeshToonMaterial({
    color: 0xff0000,
    shininess: 1
  });
  var tubeOutlineMat = rocketOutlineMat.clone();
  tubeOutlineMat.uniforms.offset.value = 0.2;
  var tube = SceneUtils.createMultiMaterialObject(
    tubeGeo, [tubeMat, tubeOutlineMat]
  );
  tube.position.y = 2;
  tube.scale.setScalar(0.1);
  rocket.add(tube);
  // -------------------------------------------
  
  // wing
  
  var shape = new THREE.Shape();
  
  shape.moveTo(3, 0);
  shape.quadraticCurveTo(25, -8, 15, -37);
  shape.quadraticCurveTo(13, -21, 0, -20);
  shape.lineTo(3, 0);
  
  var extrudeSettings = {
    steps: 1,
    amount: 4,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 2,
    bevelSegments: 5
  };
  
  var wingGroup = new THREE.Group();
  rocket.add(wingGroup);
  
  var wingGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  wingGeo.computeVertexNormals();
  var wingMat = new THREE.MeshToonMaterial({
    color: 0xff0000,
    shininess: 1,
  });
  var wingOutlineMat = rocketOutlineMat.clone();
  wingOutlineMat.uniforms.offset.value = 1;
  var wing = SceneUtils.createMultiMaterialObject(
    wingGeo, [wingMat, wingOutlineMat]
  );
  wing.scale.setScalar(0.03);
  wing.position.set(.6, 0.9, 0);
  wingGroup.add(wing);
  
  var wing2 = wingGroup.clone();
  wing2.rotation.y = Math.PI;
  rocket.add(wing2);
  
  var wing3 = wingGroup.clone();
  wing3.rotation.y = Math.PI / 2;
  rocket.add(wing3);
  
  var wing4 = wingGroup.clone();
  wing4.rotation.y = -Math.PI / 2;
  rocket.add(wing4);
  
  // -------------------------------------------

  // fire and stars particles
  // orange
  fire = new Particles({
    color: 0xff5a00,
    size: 0.4,
    rangeH: 0.8,
    rangeV: 2.5,
    pointCount: 50
  });
  rocket.add(fire);

  // yellow
  fire2 = new Particles({
    color: 0xffc000,
    size: 0.6,
    rangeH: 0.5
  });
  rocket.add(fire2);

  // stars
  stars = new Particles({
    color: 0xffffff,
    size: 0.6,
    rangeH: 20,
    rangeV: 20,
    pointCount: 400,
    // size: 0.2,
    speed: 0.1
  });

  stars.points.position.y = 0;
  scene.add(stars);

  // input
  plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  // var helper = new THREE.PlaneHelper( plane, 5, 0xffff00 );
  // scene.add( helper );

  rocketTarget = new THREE.Vector3();

  cameraTarget = new THREE.Vector3();
  cameraTarget.copy(camera.position);

  targetSphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry( 0.2 ),
    new THREE.MeshPhongMaterial({ color: 0x00ff00 })
  );
  
  scene.add(targetSphere);

  // bind event
  renderer.domElement.addEventListener('mousemove', mousemove, false);
  renderer.domElement.addEventListener('touchmove', touchmove, false);
  window.addEventListener('resize', resize, false);
}

// https://aerotwist.com/tutorials/creating-particles-with-three-js/
// https://aerotwist.com/static/tutorials/creating-particles-with-three-js/demo/
// downloads/paul-lewis-aerotwist/particles-r88

var Particles = function (options) {

  var color = this.color = options.color || 0x333333;
  var size = this.size = options.size || 0.4;

  var pointCount = this.pointCount = options.pointCount || 40; // 1800
  var rangeV = this.rangeV = options.rangeV || 2; // 600
  var rangeH = this.rangeH = options.rangeH || 1;

  var speed = this.speed = this.speedTarget = options.speed || 0.0005;

  THREE.Group.call(this);

  // circle texture

  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  var ctx = canvas.getContext('2d');

  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var radius = canvas.width / 3;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#fff';
  ctx.fill();

  var texture = new THREE.Texture(canvas);
  texture.premultiplyAlpha = true;
  texture.needsUpdate = true;

  //

  var pointsGeo = new THREE.Geometry();
  var pointsMat = new THREE.PointsMaterial({
      color: color,
      size: size,
      map: texture,
      transparent: true,
      depthWrite: false
  });

  for (var p = 0; p < pointCount; p++) {

      var point = new THREE.Vector3(
          THREE.Math.randFloatSpread(rangeH),
          THREE.Math.randFloatSpread(rangeV),
          THREE.Math.randFloatSpread(rangeH)
      );

      point.velocity = new THREE.Vector3(0, -Math.random() * speed * 100, 0);

      pointsGeo.vertices.push(point);
  }

  var points = this.points = new THREE.Points(pointsGeo, pointsMat);
  points.position.y = -rangeV / 2;
  points.sortParticles = true;

  this.add(points);

}

Particles.prototype = Object.create(THREE.Group.prototype);
Particles.prototype.constructor = Particles;

Particles.prototype.update = function () {
  // this.points.rotation.y -= 0.01; // 0.01

  var pCount = this.pointCount;
  while (pCount--) {

      var point = this.points.geometry.vertices[pCount];

      // check if we need to reset
      if (point.y < -this.rangeV / 2) {
          point.y = this.rangeV / 2;
          point.velocity.y = 0;
      }

      // update the velocity
      point.velocity.y -= Math.random() * this.speed; // .1

      // and the position
      point.add(point.velocity);
  }

  this.points.geometry.verticesNeedUpdate = true;
}

Particles.prototype.updateConstant = function () {
  var pCount = this.pointCount;
  while (pCount--) {

      var point = this.points.geometry.vertices[pCount];

      // check if we need to reset
      if (point.y < -this.rangeV / 2) {
          point.y = this.rangeV / 2;
      }

      point.y -= this.speed;
  }

  this.points.geometry.verticesNeedUpdate = true;
}

// var box = new THREE.BoxHelper( fire.points );
// fire.add( box );

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function mousemove(e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  cameraTarget.x = -mouse.x * 1;
  cameraTarget.z = 3 + mouse.y * 1;

  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, rocketTarget);
  targetSphere.position.copy( rocketTarget );
}

function touchmove(e) {
  const { changedTouches } = e;
  const [touch] = changedTouches;
  const { clientX, clientY } = touch;

  mouse.x = (clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(clientY / window.innerHeight) * 2 + 1;

  cameraTarget.x = -mouse.x * 1;
  cameraTarget.z = 3 + mouse.y * 1;

  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, rocketTarget);
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 循环动画
var clock = new THREE.Clock();
var time = 0;
var angle = THREE.Math.degToRad(3);

export function loop() {
  requestAnimationFrame(loop);
  // TWEEN.update();
  controls.update();

  time += clock.getDelta();

  rocketGroup.rotation.y = Math.cos(time * 8) * angle;

  fire.update();
  fire2.update();

  stars.updateConstant();

  lerp(rocketGroup.position, 'y', rocketTarget.y);
  lerp(rocketGroup.position, 'x', rocketTarget.x);

  lerp(camera.position, 'x', cameraTarget.x);
  lerp(camera.position, 'z', cameraTarget.z);

  lerp(stars, 'speed', stars.speedTarget);

  renderer.render(scene, camera);
}

function lerp(object, prop, destination) {
  if (object && object[prop] !== destination) {
    object[prop] += (destination - object[prop]) * 0.1;

    if (Math.abs(destination - object[prop]) < 0.01) {
      object[prop] = destination;
    }
  }
}

export default {
  init,
  loop,
}