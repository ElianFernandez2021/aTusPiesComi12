let button= document.querySelector('.continue');
let popUp= document.querySelector('.pay');
let btnClose = document.querySelector('h2');


button.addEventListener('click', function(){
    popUp.style.display= "flex";
})

btnClose.addEventListener('click',function(){
    popUp.style.display="none";
})

function pago(){
    let metodoPago=document.section.method.length;
    let pop=document.section.card
    for(let i=0; i<metodoPago;i++){
        if(metodoPago[i].checked){
            pop=pop[i]
            pop.style.display="flex"
            break;
        }
    }
}
