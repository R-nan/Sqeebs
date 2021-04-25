import Creature from './Creature';

const App = (code) => {
  Math.seedrandom(code)

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.id = 'canvas'
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
  document.body.appendChild(canvas)

  const creature = new Creature(canvas, context)
}

App()