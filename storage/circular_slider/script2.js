document.addEventListener("DOMContentLoaded", start, false);

function start() {
  let area = document.querySelector(".container");
  let descTitleText = document.querySelectorAll(".description p");
  let subTitleText = document.querySelectorAll(".subTitle h2");
  let rotate = document.querySelectorAll(".circle");
  let slide = document.querySelectorAll("img");
  let button = document.querySelectorAll("button");
  startX,
    walk,
    endPos,
    result,
    walkLastPos,
    (degree = 0),
    (rotPoint = 0),
    (transition = 1000),
    (delay = transition / 4);

  const [prev, next] = button;

  function titleShow(x) {
    subTitleText[x].style.opacity = 1;
    subTitleText[x].style.top = "50%";
  }

  function titleFade(x) {
    subTitleText[x - 1].style.opacity = 0;
    subTitleText[x - 1].style.top = "100%";
  }

  (() => {
    for (let i = 0; i < slide.length; i++) {
      rotate[i].style.transition = `${transition / 2}ms ease-in-out`;
      subTitleText[i].style.transition = `${transition}ms ease-in-out`;
      descTitleText[
        i
      ].style.transition = `${transition}ms ease-in-out ${delay}ms`;
    }
    picAnimPrev();
  })();

  function picAnimPrev() {
    let x = rotPoint,
      walk = 0;

    rotate[x].style.transform = `translate(-50%, -50%) rotate(${walk - 10}deg)`;
    slide[x].style.transform = `translate(-50%, -50%) rotate(${walk}deg)`;

    setTimeout(() => {
      rotate[x].style.transform = `translate(-50%, -50%) rotate(${
        walk + 5
      }deg)`;
      titleShow(x);
    }, transition / 2);
    setTimeout(() => {
      rotate[x].style.transform = `translate(-50%, -50%) rotate(${walk}deg)`;
      rotPoint = x;
    }, transition);
  }

  function picAnimNext() {
    let x = rotPoint - 1,
      walk = 0;

    rotate[x].style.transform = `translate(-50%, -50%) rotate(${walk + 10}deg)`;
    slide[x].style.transform = `translate(-50%, -50%) rotate(${walk}deg)`;

    setTimeout(() => {
      rotate[x].style.transform = `translate(-50%, -50%) rotate(${
        walk - 5
      }deg)`;
      titleShow(x);
    }, transition / 2);
    setTimeout(() => {
      rotate[x].style.transform = `translate(-50%, -50%) rotate(${walk}deg)`;
      rotPoint = x;
    }, transition);
  }

  next.addEventListener("click", fNext);
  prev.addEventListener("click", fPrev);

  function fPrev() {
    let x = rotPoint,
      walk = 0;

    for (let x = 0; x < slide.length; x++) {
      slide[x].classList.remove(".pic-big");
      descTitleText[x].style.marginTop = "-20px";
      descTitleText[x].style.opacity = 0;
    }
    if (x === 0) {
      picAnimPrev();
      return x;
    } else {
      slide[x - 1].style.transform = `translate(-50%, -50%) rotate(${walk}deg)`;
      slide[x].style.transform = `translate(-50%, -50%) rotate(${walk}deg)`;
      slide[x].style.transform = `translate(-50%, -50%) rotate(${
        walk + 90
      }deg)`;
      slide[x - 1].style.transform = `translate(-50%, -50%) rotate(${walk}deg)`;
      titleFade(x + 1);

      setTimeout(() => {
        rotate[x - 1].style.transfrom = `translate(-50%, -50%) rotate(${
          walk - 10
        }deg)`;
        titleShow(x - 1);
      }, transition / 2);
      setTimeout(() => {
        rotate[x - 1].style.transform = `translate(-50%, -50%) rotate(${
          walk + 5
        }deg)`;
      }, transition);
      setTimeout(() => {
        rotate[
          x - 1
        ].style.transform = `translate(-50%, -50%) rotate(${walk}deg)`;
        rotPoint = x - 1;
      }, transition * 1.5);
    }
    console.log(rotPoint);
  }

  function fNext() {
    let x = rotPoint,
      walk = 0;

    for (let x = 0; x < slide.length; x++) {
      slide[x].classList.remove(".pic-big");
      descTitleText[x].style.marginTop = "-20px";
      descTitleText[x].style.opacity = 0;
    }
    if (x === slide.length - 1) {
      picAnimNext();
      return;
    } else {
      slide[x].style.transform = `translate(-50%, -50%) rotate(${walk}deg)`;
      slide[x].style.transform = `translate(-50%, -50%) rotate(${
        walk - 90
      }deg)`;
      slide[x + 1].style.transform = `translate(-50%, -50%) rotate(${walk}deg)`;
      slide[x + 1].style.transform = `translate(-50%, -50%) rotate(${
        walk - 6
      }deg)`;
      titleFade(x + 1);

      setTimeout(() => {
        rotate[x + 1].style.transfrom = `translate(-50%, -50%) rotate(${
          walk + 10
        }deg)`;
        titleShow(x + 1);
      }, transition / 2);
      setTimeout(() => {
        rotate[x + 1].style.transform = `translate(-50%, -50%) rotate(${
          walk + 10
        }deg)`;
        titleShow(x + 1);
      }, transition / 2);
      setTimeout(() => {
        rotate[x + 1].style.transform = `translate(-50%, -50%) rotate(${
          walk - 3
        }deg)`;
      }, transition);
      setTimeout(() => {
        rotate[
          x + 1
        ].style.transform = `translate(-50%, -50%) rotate(${walk}deg)`;
        rotPoint = x + 1;
      }, transition * 1.5);
    }
    console.log(rotPoint);
  }


  slide.forEach((e,i) => {
      slide[i].addEventListener('touchstart', (e) => {
          startX = Math.floor(e.touches[0].clientX);
          walk=0;
      }, {passive: true});
      slide[i].addEventListener('touchmove', (e) => {
          walk = Math.floor(e.touches[0].clientX) - startX;
          rotate[i].style.transition = `${transition*0}ms ease-in-out`;
          rotate[i].style.transform = `translate(-50%, -50%) rotate(%{degree + (walk/20)}deg)`;
          walkLastPos = walk;
          console.log(`Walk: ${walk}`);
      }, {passive: true});

      slide[i].addEventListener('touchend', (e)=> {
          endPos = Math.floor((e.changedTouches[0].clientX + walk));
          walkLastPos = endPos - startX;
          if(walkLastPos === walk) {
              const target = e.target;
              target.style.transition = `${transition/2}ms ease-in`;
              descTitleText[i].style.top = `0px`;
              descTitleText[i].style.opacity = 1;

              if (degree===0) {
                  target.classList.add('pic-big');
                  descTitleText[i].style.top = `0px`;
                  descTitleText[i].style.opacity = 1;
              }
              console.log(`walk nol`);
          }

          else if (endPos < startX) {
              rotate[i].style.transition = `${transition/2}ms ease-in-out`;
              fNext();
          } else {
              rotate[i].style.transition = `${transition/2}ms ease-in-out`;
              fPrev();
          }
      }, {passive: true});
});
