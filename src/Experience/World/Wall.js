import * as THREE from 'three'
import Experience from '../Experience'

export default class Wall
{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.times
        this.debug = this.experience.debug

        if(this.debug.active) {
            this.debugFolder = this.debug.gui.addFolder('Wall')
        }

        // Methods
        this.setGroup()
        this.setGeometry()
        this.setTextures()
        this.setMaterials()
        this.setMesh()
    }

    setGroup()
    {
        this.walls = new THREE.Group()
        this.scene.add(this.walls)
    }

    setGeometry()
    {
        this.backWall = new THREE.PlaneGeometry(5, 15)
        this.backWall.setAttribute('uv2', new THREE.Float32BufferAttribute(this.backWall.attributes.uv.array, 2))
        this.backWall2 = new THREE.PlaneGeometry(5, 15)
        this.backWall2.setAttribute('uv2', new THREE.Float32BufferAttribute(this.backWall2.attributes.uv.array, 2))
        this.backWall3 = new THREE.PlaneGeometry(5, 15)
        this.backWall3.setAttribute('uv2', new THREE.Float32BufferAttribute(this.backWall3.attributes.uv.array, 2))
        this.rightWall = new THREE.PlaneGeometry(15,15)
        this.rightWall.setAttribute('uv2', new THREE.Float32BufferAttribute(this.rightWall.attributes.uv.array, 2))

    }

    setTextures()
    {
        this.textures = {}

        // AO
        this.textures.ambientOcclusion = this.resources.items.wallAOTexture
        this.textures.ambientOcclusion2 = this.resources.items.wallAOTexture
        this.textures.ambientOcclusion2.wrapS = THREE.RepeatWrapping
        this.textures.ambientOcclusion2.wrapT = THREE.RepeatWrapping
        this.textures.ambientOcclusion2.repeat.set(1.2, 1.2)
        // Color
        this.textures.color = this.resources.items.wallColorTexture
        this.textures.color2 = this.resources.items.wallColorTexture
        this.textures.color2.encoding = THREE.sRGBEncoding
        this.textures.color2.wrapS = THREE.RepeatWrapping
        this.textures.color2.wrapT = THREE.RepeatWrapping
        this.textures.color2.repeat.set(1.2, 1.2)
        // Height
        this.textures.height = this.resources.items.wallHeightTexture
        this.textures.height2 = this.resources.items.wallHeightTexture
        this.textures.height2.wrapS = THREE.RepeatWrapping
        this.textures.height2.wrapT = THREE.RepeatWrapping
        this.textures.height2.repeat.set(1.2, 1.2)
        // Normal
        this.textures.normal = this.resources.items.wallNormalTexture
        this.textures.normal2 = this.resources.items.wallNormalTexture
        this.textures.normal2.wrapS = THREE.RepeatWrapping
        this.textures.normal2.wrapT = THREE.RepeatWrapping
        this.textures.normal2.repeat.set(1.2, 1.2)
        // Roughness
        this.textures.roughness = this.resources.items.wallRoughnessTexture
        this.textures.roughness2 = this.resources.items.wallRoughnessTexture
        this.textures.roughness2.wrapS = THREE.RepeatWrapping
        this.textures.roughness2.wrapT = THREE.RepeatWrapping
        this.textures.roughness2.repeat.set(1.2, 1.2)
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

        this.otherMaterial = new THREE.MeshStandardMaterial({
            map: this.textures.color2,
            aoMap: this.textures.ambientOcclusion2,
            displacementMap: this.textures.height2,
            displacementScale: 0.1,
            normalMap: this.textures.normal2,
            roughnessMap: this.textures.roughness2
        })
    }

    setMesh()
    {
        this.rightMesh = new THREE.Mesh(this.rightWall, this.material)
        this.rightMesh.position.set(5.251, 4.267, 0)
        this.rightMesh.rotation.y = Math.PI * 0.5
        this.rightMesh.castShadow = true
        this.rightMesh.receiveShadow = true


        this.backMesh = new THREE.Mesh(this.backWall, this.otherMaterial)
        this.backMesh.position.set(0, 10.396, -5.074)
        this.backMesh.castShadow = true
        this.backMesh.receiveShadow = true

        this.backMesh2 = new THREE.Mesh(this.backWall2, this.otherMaterial)
        this.backMesh2.position.set(4.235, 5.742, -5.074)
        this.backMesh2.castShadow = true
        this.backMesh2.receiveShadow = true

        this.backMesh3 = new THREE.Mesh(this.backWall3, this.otherMaterial)
        this.backMesh3.position.set(-4.726, 5.742, -5.074)
        this.backMesh3.castShadow = true
        this.backMesh3.receiveShadow = true
        
        this.walls.add(this.rightMesh, this.backMesh, this.backMesh2, this.backMesh3)

        // Debug
        if(this.debug.active) {
            this.debugFolder
                .add(this.rightMesh.position, 'x')
                .name('Right Wall position X')
                .min(-20)
                .max(20)
                .step(0.001)
                
                this.debugFolder
                .add(this.rightMesh.position, 'y')
                .name('Right Wall position Y')
                .min(-20)
                .max(20)
                .step(0.001)

                this.debugFolder
                .add(this.rightMesh.position, 'z')
                .name('Right Wall position Z')
                .min(-20)
                .max(20)
                .step(0.001)
                
                this.debugFolder
                .add(this.backMesh.position, 'x')
                .name('First Back Wall position X')
                .min(-20)
                .max(20)
                .step(0.001)
                
                this.debugFolder
                .add(this.backMesh.position, 'y')
                .name('First Back Wall position Y')
                .min(-20)
                .max(20)
                .step(0.001)

                this.debugFolder
                .add(this.backMesh.position, 'z')
                .name('First Back Wall position Z')
                .min(-20)
                .max(20)
                .step(0.001)

                this.debugFolder
                .add(this.backMesh2.position, 'x')
                .name('Second Back Wall position X')
                .min(-20)
                .max(20)
                .step(0.001)
                
                this.debugFolder
                .add(this.backMesh2.position, 'y')
                .name('Second Back Wall position Y')
                .min(-20)
                .max(20)
                .step(0.001)

                this.debugFolder
                .add(this.backMesh2.position, 'z')
                .name('Second Back Wall position Z')
                .min(-20)
                .max(20)
                .step(0.001)

                this.debugFolder
                .add(this.backMesh3.position, 'x')
                .name('Third Back Wall position X')
                .min(-20)
                .max(20)
                .step(0.001)
                
                this.debugFolder
                .add(this.backMesh3.position, 'y')
                .name('Third Back Wall position Y')
                .min(-20)
                .max(20)
                .step(0.001)

                this.debugFolder
                .add(this.backMesh3.position, 'z')
                .name('Third Back Wall position Z')
                .min(-20)
                .max(20)
                .step(0.001)
        }
    }

    update()
    {
        
        this.backMesh.position.y -= 0.01 * (this.time.delta * 0.001)
    }
}