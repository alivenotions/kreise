const topLayer = document.getElementsByClassName('top')[0]
const topLayerContent = document.querySelector('.top div')
function transitionTopLayer () {
  topLayer.style = 'transform: translateY(-100vh)'
  topLayerContent.style = 'transform: translateY(75vh)'
}
