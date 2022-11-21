import * as THREE from 'three'
import Experience from '../Experience'

export default class Column 
{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Methods
        this.setGroup()
        this.setGeometry()
        this.setTextures()
        this.setMaterials()
        this.setMesh()
    }

    setGroup()
    {
        this.columns = new THREE.Group()
        this.scene.add(this.columns)
    }

    setGeometry()
    {
        this.geometry = new THREE.CylinderGeometry(5, 5, 21, 32)
        this.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(this.geometry.attributes.uv.array, 2))
    }

    setTextures()
    {
        this.textures = {}

        // AO
        this.textures.ambientOcclusion = this.resources.items.ancientWallAOTexture
        this.textures.ambientOcclusion.wrapS = THREE.RepeatWrapping
        this.textures.ambientOcclusion.wrapT = THREE.RepeatWrapping
        this.textures.ambientOcclusion.repeat.set(3, 3)
        // Color
        this.textures.color = this.resources.items.ancientWallColorTexture
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping
        this.textures.color.repeat.set(3, 3)

        // Height
        this.textures.height = this.resources.items.ancientWallHeightTexture
        this.textures.height.wrapS = THREE.RepeatWrapping
        this.textures.height.wrapT = THREE.RepeatWrapping
        this.textures.height.repeat.set(3, 3)
        // Normal
        this.textures.normal = this.resources.items.ancientWallNormalTexture
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
        this.textures.normal.repeat.set(3, 3)

        // Roughness
        this.textures.roughness = this.resources.items.ancientWallRoughnessTexture
        this.textures.roughness.wrapS = THREE.RepeatWrapping
        this.textures.roughness.wrapT = THREE.RepeatWrapping
        this.textures.roughness.repeat.set(3, 3)
    }

    setMaterials()
    {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            aoMap: this.textures.ambientOcclusion,
            displacementMap: this.textures.height,
            displacementScale: 0.1,
            normalMap: this.textures.normal,
            roughness: this.textures.roughness
        })
    }

    setMesh()
    {
        this.column1 = new THREE.Mesh(this.geometry, this.material)
        this.column1.scale.set(0.25, 0.5, 0.25)
        this.column1.position.set(-3.973, 5, 5)
        this.column1.castShadow = true
        this.column2 = new THREE.Mesh(this.geometry, this.material)
        this.column2.scale.set(0.25, 0.5, 0.25)
        this.column2.position.set(-3.973, 5, 1.313)
        this.column2.castShadow = true
        this.column3 = new THREE.Mesh(this.geometry, this.material)
        this.column3.scale.set(0.25, 0.5, 0.25)
        this.column3.position.set(-3.973, 5, -2.498)
        this.column3.castShadow = true

        this.columns.add(this.column1, this.column2, this.column3)
    }
}