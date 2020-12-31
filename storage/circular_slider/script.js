let circle = document.querySelectorAll('.circle'),
    slider = document.querySelectorAll('.circle img'),
    button = document.querySelectorAll('button'),
    startX, walk, walkEndPos, endPos, degree,
    sLength = slider.length,
    rotate = 0,
    transition = 1100;


    // AUTO REFRESH FUNCTION
    (() => {
        for (let i = 0; i < sLength; i++) {
            circle[i].style.transition = `${transition/2}ms ease`;

            if (i === 0) {
                setTimeout(
                () => {
                    circle[i].style.transform = `translate(-50%, -50%) rotate(-10deg)`;},(transition/2));
                setTimeout(
                () => {
                    circle[i].style.transform = `translate(-50%, -50%) rotate(5deg)`;},(transition));
                setTimeout(
                () => {
                    circle[i].style.transform = `translate(-50%, -50%) rotate(0deg)`;},(transition*1.5));

            }
        }
    })();
    // END AUTO REFRESH FUNCTION
    


    // NEXT PREV BUTTON
    const [next, prev] = button;

    next.addEventListener("click", nextSlider);
    prev.addEventListener("click", prevSlider);
    // END NEXT PREV BUTTON


    // FUNCTION NEXT PREV BUTTON
    function nextSlider() {
        let x = rotate;
        if (x === sLength-1) {
            // animation
            circle[x].style.transform = `translate(-50%, -50%) rotate(5deg)`;

            setTimeout(
                () => {
                    circle[x].style.transform = `translate(-50%, -50%) rotate(-2.5deg)`;
                }, (transition/2));
            setTimeout(
                () => {
                    circle[x].style.transform = `translate(-50%, -50%) rotate(0deg)`;
                }, (transition));
                // end animation
        } else {
            circle[x].style.transform = `translate(-50%, -50%) rotate(-90deg)`;
            // animation
            setTimeout(
                () => {
                    circle[x+1].style.transform = `translate(-50%, -50%) rotate(-5deg)`;
                }, (transition/2));
            setTimeout(
                () => {
                    circle[x+1].style.transform = `translate(-50%, -50%) rotate(2.5deg)`;
                }, (transition));
            setTimeout(
                () => {
                    circle[x+1].style.transform = `translate(-50%, -50%) rotate(0deg)`;
                    rotate = x + 1;
                }, (transition*1.5));
            // end animation
        }
    }

    function prevSlider() {
        let x = rotate;
        if (x === 0) {
            // animation
            circle[x].style.transform = `translate(-50%, -50%) rotate(-5deg)`;

            setTimeout(
                () => {
                    circle[x].style.transform = `translate(-50%, -50%) rotate(2.5deg)`;
                }, (transition/2));
            setTimeout(
                () => {
                    circle[x].style.transform = `translate(-50%, -50%) rotate(0deg)`;
                }, (transition));
                // end animation
        } else {
            circle[x].style.transform = `translate(-50%, -50%) rotate(90deg)`;

            // animation
            setTimeout(
                () => {
                    circle[x-1].style.transform = `translate(-50%, -50%) rotate(5deg)`;
                }, (transition/2));
            setTimeout(
                () => {
                    circle[x-1].style.transform = `translate(-50%, -50%) rotate(-2.5deg)`;
                }, (transition));
            setTimeout(
                () => {
                    circle[x-1].style.transform = `translate(-50%, -50%) rotate(0deg)`;
                    rotate = x - 1;
                }, (transition*1.5));
            // end animation
        }
        
    }
    // END FUNCTION NEXT PREV BUTTON


    // SWIPE CODES 
    slider.forEach(
        (e,i) => {

            // touch start
            slider[i].addEventListener('touchstart', e => {
                startX = Math.ceil(e.touches[0].clientX);
            });
            
            // touch move
            slider[i].addEventListener('touchmove', e => {
                walk = Math.ceil(e.touches[0].clientX) - startX;
                circle[i].style.transition = `${transition*0}ms linear`;
                circle[i].style.transform = `translate(-50%, -50%) rotate(${walk/20}deg)`;
            });

            // touch end
            slider[i].addEventListener('touchend', e => {
                endPos = Math.ceil(e.changedTouches[0].clientX + walk);

                if (endPos < startX) {
                    circle[i].style.transition = `${transition/2}ms ease`;
                    nextSlider();
                } else {
                    circle[i].style.transition = `${transition/2}ms ease`;
                    prevSlider();
                }
            });
        }
        );