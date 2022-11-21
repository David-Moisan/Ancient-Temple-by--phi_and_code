import Experience from "../Experience"
import Column from "./Column"
import Coridor from "./Coridor"
import Environment from "./Environment"
import Floor from "./Floor"
import Roof from "./Roof"
import Wall from "./Wall"

export default class World
{
    constructor() {
        
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.floor = new Floor()
            this.environment = new Environment()
            this.walls = new Wall()
            this.roof = new Roof()
            this.columns = new Column()
            this.coridor = new Coridor()
        })
    }

    update()
    {
        if(this.walls) {
            this.walls.update()
        }
    }
}