import * as THREE from 'three'
import Experience from '../Experience'

export default class Coridor
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
        this.geometry = new THREE.BoxGeometry(4, 4, 5)
    }

    setTextures()
    {
        this.textures = {}

        this.textures.alpha = this.resources.items.doorAlphaTexture
        this.textures.alpha.wrapS = THREE.RepeatWrapping
        this.textures.alpha.wrapT = THREE.RepeatWrapping

        this.textures.color = this.resources.items.wallColorTexture
    }

    setMaterials()
    {
        this.material1 = new THREE.MeshStandardMaterial({ color: 0x0f0f0f, side: THREE.DoubleSide })
        this.material2 = new THREE.MeshStandardMaterial({ color: 0x0f0f0f, side: THREE.DoubleSide })
        this.material3 = new THREE.MeshStandardMaterial({ color: 0x0f0f0f, side: THREE.DoubleSide })

        this.transparentMaterial = new THREE.MeshStandardMaterial({
            transparent: true,
            alphaMap: this.textures.alpha,
            side: THREE.DoubleSide,
            map: this.textures.color
        })
    }

    setMesh()
    {
        let coridorMaterials = [this.material1, this.transparentMaterial, this.material2, this.material2, this.material3, this.material3]
        this.mesh = new THREE.Mesh(this.geometry, coridorMaterials)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        this.mesh.rotation.y = Math.PI * 0.5
        this.mesh.position.set(0, 1.809, -7.041)

        this.scene.add(this.mesh)
    }
}