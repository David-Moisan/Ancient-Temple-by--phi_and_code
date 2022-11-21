import * as THREE from 'three'
import Experience from '../Experience'

export default class Roof
{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Methods
        this.setGeometry()
        this.setTextures()
        this.setMaterials()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(15,15)
        this.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(this.geometry.attributes.uv.array, 2))
    }

    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items.wallColorTexture
        this.textures.ambientOcclusion = this.resources.items.wallAOTexture
        this.textures.height = this.resources.items.wallHeightTexture
        this.textures.normal = this.resources.items.wallNormalTexture
        this.textures.roughness = this.resources.items.wallRoughnessTexture
    }

    setMaterials()
    {
        this.material = new THREE.MeshStandardMaterial({
            side: THREE.DoubleSide,
            map: this.textures.color,
            aoMap: this.textures.ambientOcclusion,
            displacementMap: this.textures.height,
            displacementScale: 0.1,
            normalMap: this.textures.normal,
            roughnessMap: this.textures.roughness
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.castShadow = true
        this.mesh.rotation.x = Math.PI * 0.5
        this.mesh.position.y = 9.184

        this.scene.add(this.mesh)
    }
}