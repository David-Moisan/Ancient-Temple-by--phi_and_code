import * as THREE from 'three'
import Experience from '../Experience'

export default class Floor
{
    constructor() {
        
        // Setup
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Methods
        this.setGeometry()
        this.setTexture()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(16, 16, 128, 128)
        this.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(this.geometry.attributes.uv.array, 2))
    }

    setTexture()
    {
        this.textures = {}

        // Height Map
        this.textures.height = this.resources.items.heightMapTexture
        this.textures.height.wrapS = THREE.RepeatWrapping
        this.textures.height.wrapT = THREE.RepeatWrapping
        // Color
        this.textures.color = this.resources.items.sandColorTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1,1)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping
        // AO
        this.textures.ambientOcclusion = this.resources.items.sandAmbientOcclusionTexture
        this.textures.ambientOcclusion.repeat.set(1,1)
        this.textures.ambientOcclusion.wrapS = THREE.RepeatWrapping
        this.textures.ambientOcclusion.wrapT = THREE.RepeatWrapping
        // Normal
        this.textures.normal = this.resources.items.sandNormalTexture
        this.textures.normal.repeat.set(1,1)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
        // Roughness
        this.textures.roughness = this.resources.items.sandRoughnessTexture
        this.textures.roughness.repeat.set(1,1)
        this.textures.roughness.wrapS = THREE.RepeatWrapping
        this.textures.roughness.wrapT = THREE.RepeatWrapping
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            displacementMap: this.textures.height,
            displacementScale: 1.618,
            aoMap: this.textures.ambientOcclusion,
            normalMap: this.textures.normal,
            roughnessMap: this.textures.roughness
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.position.y = 0
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true

        this.scene.add(this.mesh)
    }
}