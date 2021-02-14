'use strict';

        let toggle1 = document.querySelector("#toggle1");
        let toggle2 = document.querySelector("#toggle2");
        let nested1 = document.querySelector("#nested1");
        let nested2 = document.querySelector("#nested2");
        let nested3 = document.querySelector("#nested3");
        let nested4 = document.querySelector("#nested4");
        let nested5 = document.querySelector("#nested5");
        let arrow1 = document.querySelector("#arrow1");
        let arrow2 = document.querySelector("#arrow2");
        
        toggle1.addEventListener('click', ()=> {
            if(nested1.style.display == "block" || nested2.style.display == "block" ||  nested3.style.display == "block") {
                nested1.style.display = "none";
                nested2.style.display = "none";
                nested3.style.display = "none";
                arrow1.style.transform = "rotate(360deg)";
            }
            else {
                nested1.style.display = "block";
                nested2.style.display = "block";
                nested3.style.display = "block";
                arrow1.style.transform = "rotate(180deg)";
            }    
        });
        
        toggle2.addEventListener('click', ()=> {
            if(nested4.style.display == "block" || nested5.style.display == "block") {
                nested4.style.display = "none";
                nested5.style.display = "none";
                arrow2.style.transform = "rotate(360deg)";
            }
            else {
                nested4.style.display = "block";
                nested5.style.display = "block";
                arrow2.style.transform = "rotate(180deg)";
            }    
        });