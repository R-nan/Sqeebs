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
      image.onload = () => {
        const ratio = image.width / image.height
        const width = this.canvas.width * Math.random() / 3
        const height = width * ratio

        this.context.drawImage(image, position.x - width / 2, position.y - height / 2, width, height)
      }
    }
  }
}