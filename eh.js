const p = document.getElementById('texty')
const lotzOfCrap = [
  'empty sides in a circle',
  'the meeting place',
  'we met at a strange time',
]
p.innerText = lotzOfCrap[Math.floor(Math.random() * 10) % lotzOfCrap.length]
