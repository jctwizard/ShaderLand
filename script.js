var container;

var camera, scene, renderer;
var mesh;

var uniforms;

init();
animate();

function init() 
{
	container = document.getElementById('container');

	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000);
	//camera = new THREE.Camera();
	camera.position.z = 4;

	scene = new THREE.Scene();
	var geometry = new THREE.SphereGeometry(0.1, 32, 32);
	//var geometry = new THREE.PlaneBufferGeometry(2, 2);

	uniforms = 
	{
		time: { type: "f", value: 1.0 },
		resolution: { type: "v2", value: new THREE.Vector2() },
		noiseTex: {type: "t", value: null}
	};

	var material = new THREE.ShaderMaterial( 
	{
		uniforms: uniforms,
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent
	});

	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	uniforms.noiseTex.value = THREE.ImageUtils.loadTexture("textures/wrappingNoise.png");

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild(renderer.domElement);

	onWindowResize();
	window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize(event) 
{
	renderer.setSize(window.innerWidth, window.innerHeight);
	uniforms.resolution.value.x = renderer.domElement.width;
	uniforms.resolution.value.y = renderer.domElement.height;
}

function animate () 
{
	requestAnimationFrame(animate);
	render();
}

function render () 
{
	mesh.rotation.x += 0.01;
  	mesh.rotation.y += 0.01;
  	
  	uniforms.time.value += 0.05;
  	
	renderer.render(scene, camera);
}