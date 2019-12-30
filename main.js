{
  function Reveal(elem, options = { angle: 0 }) {
    elem.style.transform = `rotate3d(0,0,1,${options.angle}deg)`

    let innerElement = elem.firstElementChild
    innerElement.style.width = `calc(100vw * ${Math.abs(
      Math.cos((options.angle * Math.PI) / 180)
    )} + 100vh * ${Math.abs(Math.sin((options.angle * Math.PI) / 180))})`
    innerElement.style.height = `calc(100vw * ${Math.abs(
      Math.sin((options.angle * Math.PI) / 180)
    )} + 100vh * ${Math.abs(Math.cos((options.angle * Math.PI) / 180))})`

    const reverseRevealElement = innerElement.querySelector('.content__reverse')
    if (reverseRevealElement) {
      gsap.set(reverseRevealElement, { rotation: -1 * options.angle })
    }

    const DOM = {
      el: elem,
      inner: innerElement,
      reverse: reverseRevealElement,
    }

    return { options, DOM }
  }

  const content = {
    first: document.querySelector('.content--first'),
    second: document.querySelector('.content--second'),
    third: document.querySelector('.content--third'),
  }

  const firstPageContent = {
    img: content.first.querySelector('.intro__img'),
    title: content.first.querySelector('.intro__title'),
    enter: content.first.querySelector('.intro__enter'),
  }

  const secondPageContent = {
    reelImages: content.second.querySelectorAll('.reel > .reel__img'),
  }

  const thirdPageContent = {
    backCtrl: content.third.querySelector('.content__back'),
    text: content.third.querySelector('.content__text'),
    selectElems: content.third.querySelectorAll('.select > *'),
    reelNumbers: content.third.querySelectorAll('.reel > .reel__number'),
  }

  const revealer = Reveal(content.first, { angle: -7 })
  const overlay = Reveal(document.querySelector('.overlay'), { angle: 26 })

  let pageToggleTimeline
  const showNextPage = () => {
    content.first.classList.add('content--hidden')

    const ease = 'expo.inOut'
    const duration = 1.2
    const thirdPageTime = duration * 0.35

    pageToggleTimeline = gsap
      .timeline()
      .to(
        firstPageContent.img,
        duration,
        {
          ease: ease,
          y: -150,
          x: -50,
          rotation: -10,
          opacity: 0,
        },
        0
      )
      .to(
        firstPageContent.enter,
        duration * 0.5,
        {
          ease: ease,
          opacity: 0,
        },
        0
      )

      .to(
        revealer.DOM.inner,
        duration,
        {
          ease: ease,
          y: '-100%',
        },
        0
      )
      .to(
        revealer.DOM.reverse,
        duration,
        {
          ease: ease,
          y: '100%',
        },
        0
      )

      .set(secondPageContent.reelImages, { y: 200 }, 0)
      .staggerTo(
        secondPageContent.reelImages,
        duration * 0.7,
        {
          ease: Expo.easeOut,
          y: 0,
        },
        0.02,
        0.5
      )

      .set(
        [
          thirdPageContent.selectElems,
          thirdPageContent.text,
          thirdPageContent.reelNumbers,
        ],
        { opacity: 0 },
        thirdPageTime
      )
      .to(
        overlay.DOM.inner,
        duration * 1.3,
        {
          ease: ease,
          y: '-100%',
        },
        thirdPageTime
      )

      .to(
        thirdPageContent.text,
        duration * 0.5,
        {
          ease: Cubic.easeOut,
          startAt: { y: 80 },
          opacity: 1,
          y: 0,
        },
        thirdPageTime + 0.6
      )
      .staggerTo(
        thirdPageContent.selectElems,
        duration * 0.5,
        {
          ease: Cubic.easeOut,
          startAt: { y: 50 },
          opacity: 1,
          y: 0,
        },
        0.03,
        thirdPageTime + 0.6
      )
      .staggerTo(
        thirdPageContent.reelNumbers,
        duration * 0.5,
        {
          ease: Expo.easeOut,
          startAt: { scale: 0 },
          scale: 1,
          opacity: 1,
        },
        0.05,
        thirdPageTime + 0.9
      )
  }
  firstPageContent.enter.addEventListener('click', showNextPage)

  const showIntro = () => {
    content.first.classList.remove('content--hidden')
    pageToggleTimeline.reverse()
  }
  thirdPageContent.backCtrl.addEventListener('click', showIntro)
}
