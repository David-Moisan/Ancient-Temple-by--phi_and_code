import * as THREE from 'three'

import EventEmitter from './EventEmitter'
import Experience from '../Experience'

export default class Resource extends EventEmitter
{
    constructor(sources) {
        super()

        // Options
        this.sources = sources

        // Setup
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        // Methods
        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loader = {}
        this.loader.textureLoader = new THREE.TextureLoader()
    }

    startLoading()
    {
        for (const source of this.sources) {
            if(source.type === 'texture') {
                this.loader.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad) {
            this.trigger('ready')
            const loader = document.querySelector('div.loader__box')
            loader.style.display = 'none'
        }
    }
}