import * as THREE from 'three'
import Experience from '../Experience'

export default class Environment
{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        if(this.debug.active) {
            this.debugFolder = this.debug.gui.addFolder('Environment')
        }

        // Methods
        this.setFog()
        this.setAmbientLight()
        this.setSunLight()
    }

    setFog()
    {
        this.fog = new THREE.Fog(0xc2b280, 2, 21)
        this.scene.fog = this.fog

        // Debug
        if(this.debug.active) {
            this.debugFolder
                .add(this.fog, 'near')
                .name('Fog near')
                .min(0)
                .max(10)
                .step(0.001)
                
            this.debugFolder
                .add(this.fog, 'far')
                .name('Fog far')
                .min(0)
                .max(100)
                .step(0.01)

        }
    }

    setAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight('#ffffff', 0.287)
        this.scene.add(this.ambientLight)

        // Debug
        if(this.debug.active) {
            this.debugFolder
                .add(this.ambientLight, 'intensity')
                .name('Ambient Light intensity')
                .min(0)
                .max(10)
                .step(0.001)
        }
    }

    setSunLight()
    {
        this.sunLight = new THREE.SpotLight(0xfdb813, 100)
        this.sunLight.position.set(-20, 6.364, 17.05)
        this.sunLight.angle = 0.392
        this.sunLight.penumbra = 1
        this.sunLight.decay = 1.299
        this.sunLight.distance = 69.81
        this.sunLight.castShadow = true
        this.sunLight.shadow.mapSize.set(512, 512)
        this.sunLight.shadow.camera.near = 1
        this.sunLight.shadow.camera.far = 70
        this.sunLight.shadow.camera.focus = 1

        this.scene.add(this.sunLight)

        // Debug
        if(this.debug.active) {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('Sun Light intensity')
                .min(0)
                .max(100)
                .step(0.01)
            
                this.debugFolder
                .add(this.sunLight, 'angle')
                .name('Sun Light angle')
                .min(0)
                .max(10)
                .step(0.001)
                
                this.debugFolder
                .add(this.sunLight, 'penumbra')
                .name('Sun Light penumbra')
                .min(0)
                .max(5)
                .step(0.001)
                
                this.debugFolder
                .add(this.sunLight, 'decay')
                .name('Sun Light decay')
                .min(0)
                .max(5)
                .step(0.001)
                
                this.debugFolder
                .add(this.sunLight, 'distance')
                .name('Sun Light distance')
                .min(0)
                .max(200)
                .step(0.01)

                this.debugFolder
                .add(this.sunLight.shadow.camera, 'near')
                .name('Sun Light Shadow near')
                .min(0)
                .max(5)
                .step(0.001)
                
                this.debugFolder
                .add(this.sunLight.shadow.camera, 'far')
                .name('Sun Light Shadow far')
                .min(0)
                .max(100)
                .step(0.01)
                
                this.debugFolder
                .add(this.sunLight.shadow.camera, 'focus')
                .name('Sun Light Shadow focus')
                .min(0)
                .max(10)
                .step(0.001)
            
                this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('Sun Light position X')
                .min(-20)
                .max(20)
                .step(0.001)
                
                this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('Sun Light position Y')
                .min(-20)
                .max(20)
                .step(0.001)
                
                this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('Sun Light position Z')
                .min(-20)
                .max(20)
                .step(0.001)
        }
    }
}