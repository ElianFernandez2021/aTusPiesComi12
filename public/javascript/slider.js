const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider__section22");
let sliderSectionLast = sliderSection[sliderSection.length -1];


const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");

slider.insertAdjacentElement("afterbegin", sliderSectionLast);



function Next() {
    let sliderSectionFirst = document.querySelectorAll(".slider__section22")[0];
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 0.5s";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement("beforeend", sliderSectionFirst);
        slider.style.marginLeft = "-100%";
    }, 500);
}

function Prev() {
    let sliderSection = document.querySelectorAll(".slider__section22");
    let sliderSectionLast = sliderSection[sliderSection.length -1];
    slider.style.marginLeft = "0";
    slider.style.transition = "all 0.5s";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement("afterbegin", sliderSectionLast);
        slider.style.marginLeft = "-100%";
    }, 500);
}

btnRight.addEventListener("click", function(){
    Next();
});

btnLeft.addEventListener("click", function(){
    Prev();
});

for(let i =0; i< sliderSection.length; i++){    
    
    if(sliderSection[i].firstElementChild.attributes.type.value == 'video/mp4'){
        setInterval(function(){
            console.log("HAY UN VIDEO")
            Next()
        },5000)
    } else{
        setInterval(function(){
            Next()
        },2000)
    }
}