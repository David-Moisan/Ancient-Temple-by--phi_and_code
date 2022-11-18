import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { inject } from '@vercel/analytics'

inject()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog(0xc2b280, 2, 21)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

//Floor Displacements
const heightMapTexture = textureLoader.load('heightmap/heightmap.jpg')
heightMapTexture.wrapS = THREE.RepeatWrapping
heightMapTexture.wrapT  = THREE.RepeatWrapping

//Sand Textures
const sandAmbientOcclusionTexture = textureLoader.load('textures/sand/ao.jpg')
const sandColorTexture = textureLoader.load('textures/sand/color.jpg')
const sandNormalTexture = textureLoader.load('textures/sand/normal.jpg')
const sandRoughnessTexture = textureLoader.load('textures/sand/roughness.jpg')

sandAmbientOcclusionTexture.repeat.set(1,1)
sandColorTexture.repeat.set(1,1)
sandNormalTexture.repeat.set(1,1)
sandRoughnessTexture.repeat.set(1,1)

sandAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
sandAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
sandColorTexture.wrapS = THREE.RepeatWrapping
sandColorTexture.wrapT = THREE.RepeatWrapping
sandNormalTexture.wrapS = THREE.RepeatWrapping
sandNormalTexture.wrapT = THREE.RepeatWrapping
sandRoughnessTexture.wrapS = THREE.RepeatWrapping
sandRoughnessTexture.wrapT = THREE.RepeatWrapping


// Ancient Wall
const ancientWallAOTexture = textureLoader.load('ancient-walls/ancient-wall-1/ao.jpg')
const ancientWallColorTexture = textureLoader.load('ancient-walls/ancient-wall-1/color.jpg')
const ancientWallHeightTexture = textureLoader.load('ancient-walls/ancient-wall-1/height.jpg')
const ancientWallNormalTexture = textureLoader.load('ancient-walls/ancient-wall-1/normal.jpg')
const ancientWallRoughnessTexture = textureLoader.load('ancient-walls/ancient-wall-1/roughness.jpg')

ancientWallAOTexture.repeat.set(3,3)
ancientWallColorTexture.repeat.set(3,3)
ancientWallHeightTexture.repeat.set(3,3)
ancientWallNormalTexture.repeat.set(3,3)
ancientWallRoughnessTexture.repeat.set(3,3)

ancientWallAOTexture.wrapS = THREE.RepeatWrapping
ancientWallAOTexture.wrapT = THREE.RepeatWrapping
ancientWallColorTexture.wrapS = THREE.RepeatWrapping
ancientWallColorTexture.wrapT = THREE.RepeatWrapping
ancientWallHeightTexture.wrapS = THREE.RepeatWrapping
ancientWallHeightTexture.wrapT = THREE.RepeatWrapping
ancientWallNormalTexture.wrapS = THREE.RepeatWrapping
ancientWallNormalTexture.wrapT = THREE.RepeatWrapping
ancientWallRoughnessTexture.wrapS = THREE.RepeatWrapping
ancientWallRoughnessTexture.wrapT = THREE.RepeatWrapping

// Walls Texture
const wallAOTexture = textureLoader.load('textures/floor/ao.jpg')
const wallColorTexture = textureLoader.load('textures/floor/color.jpg')
const wallHeightTexture = textureLoader.load('textures/floor/height.jpg')
const wallNormalTexture = textureLoader.load('textures/floor/normal.jpg')
const wallRoughnessTexture = textureLoader.load('textures/floor/roughness.jpg')

const wallAOTexture2 = textureLoader.load('textures/floor/ao.jpg')
const wallColorTexture2 = textureLoader.load('textures/floor/color.jpg')
const wallHeightTexture2 = textureLoader.load('textures/floor/height.jpg')
const wallNormalTexture2 = textureLoader.load('textures/floor/normal.jpg')
const wallRoughnessTexture2 = textureLoader.load('textures/floor/roughness.jpg')

wallAOTexture2.wrapS = THREE.RepeatWrapping
wallAOTexture2.wrapT = THREE.RepeatWrapping
wallColorTexture2.wrapS = THREE.RepeatWrapping
wallColorTexture2.wrapT = THREE.RepeatWrapping
wallHeightTexture2.wrapS = THREE.RepeatWrapping
wallHeightTexture2.wrapT = THREE.RepeatWrapping
wallNormalTexture2.wrapS = THREE.RepeatWrapping
wallNormalTexture2.wrapT = THREE.RepeatWrapping
wallRoughnessTexture2.wrapS = THREE.RepeatWrapping
wallRoughnessTexture2.wrapT = THREE.RepeatWrapping

wallAOTexture2.repeat.set(1.2,1.2)
wallColorTexture2.repeat.set(1.2,1.2)
wallHeightTexture2.repeat.set(1.2,1.2)
wallNormalTexture2.repeat.set(1.2,1.2)
wallRoughnessTexture2.repeat.set(1.2,1.2)

// Door Texture
const doorAlphaTexture = textureLoader.load('textures/apeture/alpha.jpg')

doorAlphaTexture.wrapS = THREE.RepeatWrapping
doorAlphaTexture.wrapT = THREE.RepeatWrapping

/** Columns */
const columns = new THREE.Group()
scene.add(columns)

const columGeometry = new THREE.CylinderGeometry(5,5,21,32)
const columnMaterial = new THREE.MeshStandardMaterial({
    map: ancientWallColorTexture,
    aoMap: ancientWallAOTexture,
    displacementMap: ancientWallHeightTexture,
    displacementScale: 0.1,
    normalMap: ancientWallNormalTexture,
    roughnessMap: ancientWallRoughnessTexture
})
columGeometry.setAttribute('uv2', new THREE.Float32BufferAttribute(columGeometry.attributes.uv.array, 2))

const column1 = new THREE.Mesh(columGeometry, columnMaterial)
column1.scale.set(0.25,0.5,0.25)
column1.position.set(-3.973, 5, 5)
column1.castShadow = true


const column2 = new THREE.Mesh(columGeometry, columnMaterial)
column2.scale.set(0.25, 0.5, 0.25)
column2.position.set(-3.973, 5, 1.313)
column2.castShadow = true


const column3 = new THREE.Mesh(columGeometry, columnMaterial)
column3.scale.set(0.25, 0.5, 0.25)
column3.position.set(-3.973, 5, -2.498)
column3.castShadow = true

column1.castShadow = true
column2.castShadow = true
column3.castShadow = true
columns.add(column1, column2, column3)


// Walls
const walls = new THREE.Group()
scene.add(walls)

const bigBackWall = new THREE.Mesh(
    new THREE.PlaneGeometry(5,15),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture2,
        aoMap: wallAOTexture2,
        displacementMap: wallHeightTexture2,
        displacementScale: 0.1,
        normalMap: wallNormalTexture2,
        roughnessMap: wallRoughnessTexture2
    })
)
bigBackWall.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(bigBackWall.geometry.attributes.uv.array, 2))
bigBackWall.position.set(0, 11.15, -5.074)


const bigBackWall2 = new THREE.Mesh(
    new THREE.PlaneGeometry(5,15),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture2,
        aoMap: wallAOTexture2,
        displacementMap: wallHeightTexture2,
        displacementScale: 0.1,
        normalMap: wallNormalTexture2,
        roughnessMap: wallRoughnessTexture2
    })
)
bigBackWall2.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(bigBackWall.geometry.attributes.uv.array, 2))
bigBackWall2.position.set(4.99, 5.742, -5.074)

const bigBackWall3 = new THREE.Mesh(
    new THREE.PlaneGeometry(5,15),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture2,
        aoMap: wallAOTexture2,
        displacementMap: wallHeightTexture2,
        displacementScale: 0.1,
        normalMap: wallNormalTexture2,
        roughnessMap: wallRoughnessTexture2
    })
)
bigBackWall3.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(bigBackWall.geometry.attributes.uv.array, 2))
bigBackWall3.position.set(-4.99, 5.742, -5.074)
bigBackWall.castShadow = true
bigBackWall2.castShadow = true
bigBackWall3.castShadow = true
walls.add(bigBackWall, bigBackWall2, bigBackWall3)


// Coridor
const material1 = new THREE.MeshStandardMaterial({ color: 0x0f0f0f, side: THREE.DoubleSide })
const material2 = new THREE.MeshStandardMaterial({ color: 0x0f0f0f, side: THREE.DoubleSide })
const material3 = new THREE.MeshStandardMaterial({ color: 0x0f0f0f, side: THREE.DoubleSide })

const transparentMaterial = new THREE.MeshStandardMaterial({ 
    transparent: true, 
    alphaMap: doorAlphaTexture, 
    side: THREE.DoubleSide,
    map: wallColorTexture
})
const coridorGeometry = new THREE.BoxGeometry(4, 4, 5)

let coridorMaterials = [material1, transparentMaterial, material2, material2, material3, material3]
const coridor = new THREE.Mesh(coridorGeometry, coridorMaterials)
coridor.castShadow = true
coridor.rotation.y = Math.PI * 0.5
coridor.position.set(0, 1.809, -7.041)
walls.add(coridor)


// Right Wall
const bigRightWall = new THREE.Mesh(
    new THREE.PlaneGeometry(15,15),
    new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: wallColorTexture,
        aoMap: wallAOTexture,
        displacementMap: wallHeightTexture,
        displacementScale: 0.1,
        normalMap: wallNormalTexture,
        roughnessMap: wallRoughnessTexture
    })
)
bigRightWall.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(bigRightWall.geometry.attributes.uv.array, 2))
bigRightWall.castShadow = true
bigRightWall.rotation.y = Math.PI * 0.5
bigRightWall.position.set(5.251, 4.267, 0)

walls.add(bigRightWall)

//Roof
const roof = new THREE.Mesh(
    new THREE.PlaneGeometry(15,15),
    new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: wallColorTexture,
        aoMap: wallAOTexture,
        displacementMap: wallHeightTexture,
        displacementScale: 0.1,
        normalMap: wallNormalTexture,
        roughnessMap: wallRoughnessTexture
    })
)
roof.castShadow = true
roof.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(roof.geometry.attributes.uv.array, 2))
roof.rotation.x = Math.PI * 0.5
roof.position.y = 9.184
walls.add(roof)




// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 16, 128, 128),
    new THREE.MeshStandardMaterial({ 
        map: sandColorTexture,
        displacementMap: heightMapTexture,
        displacementScale: 1.618,
        aoMap: sandAmbientOcclusionTexture,
        normalMap: sandNormalTexture,
        roughnessMap: sandRoughnessTexture
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
floor.receiveShadow = true
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.287)
scene.add(ambientLight)


// Spot Light
const spotLight = new THREE.SpotLight(0xfdb813, 1.6814)
spotLight.position.set(-5.566, 1.809, 17.05)
spotLight.angle = 0.3294
spotLight.penumbra = 1
spotLight.decay = 1.299
spotLight.distance = 69.81
spotLight.castShadow = true
spotLight.shadow.mapSize.width = 512
spotLight.shadow.mapSize.height = 512
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 70
spotLight.shadow.camera.focus = 1

scene.add(spotLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(89, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4.592, 1.396, 6.804)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enablePan = false
controls.enableZoom = false
controls.maxPolarAngle = Math.PI * 0.4469
controls.minAzimuthAngle = Math.PI * 1.3732
controls.maxAzimuthAngle = Math.PI * 2.1931
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
})
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0xc2b280)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()