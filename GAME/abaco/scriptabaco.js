const beads5 = document.querySelectorAll(".unit5")
const beads1 = document.querySelectorAll(".unit1")
const rodContainer = document.querySelector(".rod-cotainer")
const popupBtn = document.querySelector(".popup .comecar")
const line = document.querySelector(".line")
const senha = document.querySelector(".senha")
var lineWidth = 100
var secret = true

setInterval(() => {
    if(lineWidth > 0) {
    lineWidth -= 0.1
    line.style.width = `${lineWidth}%`
    }
    if (secret) {
        senha.innerHTML = Math.floor(Math.random() * 900000) + 100000
    }

}, 100);

popupBtn.addEventListener("click", () => {
    document.querySelector(".popup").classList.add("desativo")
})

beads5.forEach(bead5 => {
    bead5.addEventListener('click', () => {
        bead5.classList.toggle('active');

        if (bead5.classList.contains("active")) {baseNumber(bead5,5) } 
        else {baseNumber(bead5,-5)}
    })
});


beads1.forEach(bead1 => {
    bead1.addEventListener('click', () => {

        let prevlabel = bead1.parentElement.parentElement.querySelector(".base").querySelector(".unidade").innerHTML
        
        bead1.classList.toggle('active');

       const siblings = bead1.parentElement.children
       const arraySiblings = Array.from(siblings)
       
       arraySiblings.forEach(sibling => {
        if (sibling !== bead1) {
          sibling.classList.remove('active');
        }
    })

            const elementsAbove = [];
            let currentElement = bead1.previousElementSibling;
            
            while (currentElement) {
                elementsAbove.push(currentElement);
                currentElement = currentElement.previousElementSibling;
            }

            if (bead1.classList.contains("active")) {
                baseNumberBottom(bead1,4 - elementsAbove.length) 
            }
            else {
                baseNumberBottom(bead1,  0)}

        }
        
    )}
);

function baseNumber(element,number = 0) {

    pilha = element.parentElement.querySelector(".pilha")
    pilha.innerHTML = Number(pilha.innerHTML) + number

    atualizarBase(element)
}

function baseNumberBottom(element,number = 0) {

    pilha = element.parentElement.querySelector(".pilha")
    pilha.innerHTML = + number

    atualizarBase(element)
}


function atualizarBase(element) {
    pilhaTop = element.parentElement.parentElement.querySelector(".top").innerHTML

    pilhaBottom = element.parentElement.parentElement.querySelector(".bottom").innerHTML

label = element.parentElement.parentElement.querySelector(".base").querySelector(".unidade")

    label.innerHTML=  Number(pilhaTop) + Number(pilhaBottom)
}