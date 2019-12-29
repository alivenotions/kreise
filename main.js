const topLayer = document.getElementsByClassName('content--first')[0]
const topLayerContent = document.querySelector('.content--first div')
function transitionTopLayer () {
  topLayer.style = 'transform: translateY(-100vh)'
  topLayerContent.style = 'transform: translateY(70vh)'
}
