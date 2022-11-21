import * as THREE from 'three'

import Size from "./Utils/Size"
import Time from "./Utils/Time"
import Camera from "./Camera"
import Renderer from './Renderer'
import Resource from './Utils/Resource'

import sources from './sources'
import World from './World/World'
import Debug from './Utils/Debug'

let instance = null

export default class Experience
{
    constructor(canvas)
    {
        // Singleton
        if(instance) {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Size()
        this.times = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resource(sources)
        this.world = new World()

        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time event
        this.times.on('tick', () => {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.reisze()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
}