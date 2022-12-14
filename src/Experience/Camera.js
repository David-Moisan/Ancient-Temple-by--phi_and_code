import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Experience from "./Experience"

export default class Camera 
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        // Methods
        this.setInstance()
        this.setOrbitControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(89, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(4.592, 1.396, 6.804)
        this.scene.add(this.instance)
    }

    setOrbitControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enablePan = false
        this.controls.enableZoom = false
        this.controls.maxPolarAngle = Math.PI * 0.4469
        this.controls.minAzimuthAngle = Math.PI * 1.3732
        this.controls.maxAzimuthAngle = Math.PI * 2.1931
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}