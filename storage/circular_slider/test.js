// EXPRESSION
let circle = document.querySelectorAll(".circle");
let slider = document.querySelectorAll(".circle img");
let button = document.querySelectorAll("button");
let subTitleText = document.querySelectorAll(".subTitle h2");
let sLength = slider.length;
let rotate = 0;
let transition = 1000;

// AUTO REFRESH FUNCTION
(() => {
  for (let i = 0; i < sLength; i++) {
    circle[i].style.transition = `${transition / 2}ms ease`;

    if (i === 0) {
      setTimeout(() => {
        circle[i].style.transform = `translate(-50%, -50%) rotate(-10deg)`;
      }, transition / 2);
      setTimeout(() => {
        circle[i].style.transform = `translate(-50%, -50%) rotate(5deg)`;
        titleShow(i);
      }, transition);
      setTimeout(() => {
        circle[i].style.transform = `translate(-50%, -50%) rotate(0deg)`;
      }, transition * 1.5);
    }
  }
})();
// END AUTO REFRESH FUNCTION

// NEXT PREV BUTTON
const [next, prev] = button;

function titleShow(x) {
  subTitleText[x].style.opacity = 1;
  subTitleText[x].style.top = "0%";
}

function titleFade(x) {
  subTitleText[x].style.opacity = 0;
  subTitleText[x].style.top = "100%";
}

next.addEventListener("click", nextSlider);
prev.addEventListener("click", prevSlider);
// END NEXT PREV BUTTON

// FUNCTION NEXT PREV BUTTON
function nextSlider() {
  let x = rotate;
  if (x === sLength - 1) {
    // animation
    circle[x].style.transform = `translate(-50%, -50%) rotate(5deg)`;

    setTimeout(() => {
      circle[x].style.transform = `translate(-50%, -50%) rotate(-2.5deg)`;
    }, transition / 2);

    setTimeout(() => {
      circle[x].style.transform = `translate(-50%, -50%) rotate(0deg)`;
    }, transition);
    // end animation
  } else {
    circle[x].style.transform = `translate(-50%, -50%) rotate(-90deg)`;
    // animation
    setTimeout(() => {
      circle[x + 1].style.transform = `translate(-50%, -50%) rotate(-5deg)`;
      titleFade(x);
    }, transition / 2);
    setTimeout(() => {
      circle[x + 1].style.transform = `translate(-50%, -50%) rotate(2.5deg)`;
      titleShow(x + 1);
    }, transition);
    setTimeout(() => {
      circle[x + 1].style.transform = `translate(-50%, -50%) rotate(0deg)`;
      rotate = x + 1;
    }, transition * 1.5);
    // end animation
  }
}

function prevSlider() {
  let x = rotate;
  if (x === 0) {
    // animation
    circle[x].style.transform = `translate(-50%, -50%) rotate(-5deg)`;

    setTimeout(() => {
      circle[x].style.transform = `translate(-50%, -50%) rotate(2.5deg)`;
    }, transition / 2);
    setTimeout(() => {
      circle[x].style.transform = `translate(-50%, -50%) rotate(0deg)`;
    }, transition);
    // end animation
  } else {
    circle[x].style.transform = `translate(-50%, -50%) rotate(90deg)`;

    // animation
    setTimeout(() => {
      circle[x - 1].style.transform = `translate(-50%, -50%) rotate(5deg)`;
      titleFade(x);
    }, transition / 2);
    setTimeout(() => {
      circle[x - 1].style.transform = `translate(-50%, -50%) rotate(-2.5deg)`;
      titleShow(x - 1);
    }, transition);
    setTimeout(() => {
      circle[x - 1].style.transform = `translate(-50%, -50%) rotate(0deg)`;
      rotate = x - 1;
    }, transition * 1.5);
    // end animation
  }
}
// END FUNCTION NEXT PREV BUTTON

// // SWIPE CODES
// slider.forEach((e, i) => {
//   // touch start
//   slider[i].addEventListener("touchstart", (e) => {
//     startX = Math.ceil(e.touches[0].clientX);
//   });

//   // touch move
//   slider[i].addEventListener("touchmove", (e) => {
//     walk = Math.ceil(e.touches[0].clientX) - startX;
//     circle[i].style.transition = `${transition * 0}ms linear`;
//     circle[i].style.transform = `translate(-50%, -50%) rotate(${walk / 20}deg)`;
//     walkEndPos = walk;
//   });

//   // touch end
//   slider[i].addEventListener("touchend", (e) => {
//     endPos = Math.ceil(e.changedTouches[0].clientX + walk);
//     circle[i].style.transition = `${transition / 2}ms ease-in-out`;

//     if (endPos < startX) {
//       nextSlider();
//     } else {
//       prevSlider();
//     }
//   });
// });
