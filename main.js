const topLayer = document.getElementsByClassName('top')[0]
const topLayerContent = document.querySelector('.top p')
function transitionTopLayer () {
  topLayer.style = 'transform: translateY(-100%)'
  topLayerContent.style = 'transform: translateY(2500%)'
}
