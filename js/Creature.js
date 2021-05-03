import Squeebs from './Squeebs';
import BlobBase from './BlobBase';

const getRandomIntInclusive = (min, max) => {
  const ceilMin = Math.ceil(min);
  const ceilMax = Math.floor(max);
  const randInt = Math.floor(Math.random() * (ceilMax - ceilMin + 1) + ceilMin);
  return Math.random() < 0.5 ? randInt * -1 : randInt;
};

const rgbToHex = ([r, g, b]) => {
  if (r > 255 || g > 255 || b > 255) {
    throw 'Invalid color component';
  }
  const intermediary = ((r << 16) | (g << 8) | b).toString(16);
  return "#" + ("000000" + intermediary).slice(-6);
};

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
    console.log('111',this.blob)
    this.blob.canvas = this.canvas
    this.blob.radius = 50
    this.blob.color = '#f24649'
    this.blob.numPoints = Math.ceil(Math.random() * 4)
    // this.blob.numPoints = 3
    console.log('222',this.blob)
    this.blob.init()
    this.blob.render()
  }

  draw() {
    const points = this.blob.points

console.log('blob', this.blob)
    for(let i = 0; i < points.length; i++) {
      // const position = points[i].position

      // Generate bit anchor point based on farthest bezier curve point
      const position = {
        x: this.blob.center.x + getRandomIntInclusive(0, this.blob.farthestDiffX),
        y: this.blob.center.y + getRandomIntInclusive(0, this.blob.farthestDiffY),
      };

      // Determine canvas color at point
      // NOTE: Below calculation ONLY WORKS for 1x1 pixels. However, checking a 1x1 pixel is NOT ENOUGH to catch
      // EDGE POINTS. We need to expand rgbToHex() to check all points obtained by getImageData() to do that.
      const canvasDataAtPoint = this.context.getImageData(position.x, position.y, 1, 1).data;
      const hexNumAtPoint = rgbToHex(canvasDataAtPoint);
      let insideBit = false;
      if (hexNumAtPoint === this.blob.color) {
        insideBit = true;
      }
      // console.log('DATA', canvasDataAtPoint);
      console.log('hexNumAtPoint', hexNumAtPoint, insideBit);


      const imageIndex = Math.floor(Object.keys(Squeebs).length * Math.random())
      const image = document.createElement('img')

      this.context.fillStyle = 'black'
      // this.context.fillRect(position.x, position.y, 4, 4)

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
        if (Math.random() < 0.5) {
          this.context.drawImage(image, position.x - width / 2, position.y - height / 2, width, height)
        }

        this.context.restore()
      }
    }
  }
}
