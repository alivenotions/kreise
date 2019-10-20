function onScroll() {
  document.querySelector('.container').style.setProperty('--god-var', `${window.scrollY * 0.1}`)
}

window.addEventListener('scroll', onScroll, {capture: false, passive: true})
