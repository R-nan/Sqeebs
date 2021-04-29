import Squeebs from './Squeebs';
import BlobBase from './BlobBase';

export default class Creature {
  constructor(canvas, context) {
    this.canvas = canvas
    this.context = context
    this.pointsArray = []

    this.size = Math.ceil(Math.random() * 50)
    this.blob = null;
    this.init()
    this.draw()
  }

  init() {
    this.blob = new BlobBase()
    this.blob.canvas = this.canvas
    this.blob.radius = 50
    this.blob.color = '#f24649'
    this.blob.numPoints = Math.ceil(Math.random() * 4)
    // this.blob.numPoints = 3
    this.blob.init()
    this.blob.render()
  }

  draw() {
    const points = this.blob.points

    for(let i = 0; i < points.length; i++) {
      const position = points[i].position
      const imageIndex = Math.floor(Object.keys(Squeebs).length * Math.random())
      const image = document.createElement('img')

      this.context.fillStyle = 'black'
      this.context.fillRect(position.x, position.y, 4, 4)

      image.src = Squeebs[Object.keys(Squeebs)[imageIndex]]
      const randomNumber = Math.random() // used to keep random consistent during asynchronous image loading

      image.onload = () => {
        const ratio = image.width / image.height
        const width = randomNumber * this.canvas.width / 3
        const height = width * ratio
        this.context.save()
        // this.context.moveTo(position.x, position.y)
        // this.context.rotate(Math.sin(Math.random()) / 10)
        // this.context.drawImage(image, 0 - width / 2, 0 - height / 2, width, height)
        this.context.drawImage(image, position.x - width / 2, position.y - height / 2, width, height)

        this.context.restore()
      }
    }
  }
}