const beads5 = document.querySelectorAll(".unit5")
const beads1 = document.querySelectorAll(".unit1")
const rodContainer = document.querySelector(".rod-cotainer")
const comecar = document.querySelector(".popup .comecar")
const line = document.querySelector(".line")
const senha = document.querySelector(".senha")
const verificar = document.querySelector(".verificar")
const rotulos = document.querySelectorAll(".unidade")
var lineWidth = 99
var secret = true
var verificando = false
var pontos

setInterval(() => {
        if (lineWidth > 0 && !secret && !verificando) {
            lineWidth -= 0.06 + pontos/100
            if (lineWidth.toFixed(1) == 33.0 || lineWidth.toFixed(1) == 66.0) reset()
        }
        if (lineWidth < 33) {
            pontos = 1
        } else if (lineWidth < 66) {
            pontos = 2
        } else if (lineWidth < 100) {
            pontos = 3
        } else {
            lineWidth = 100
            document.querySelector(".popup.venceu").classList.add("ativo")
    }

        if (secret) {
            senha.innerHTML = Math.floor(Math.random() * 900000) + 100000
        }
        
    if (lineWidth < 0) lineWidth = 0
    line.style.width = `${lineWidth}%`

}, 100);

function reset() {
verificando = true 
secret =true
document.body.classList.add("verificando")

setTimeout(() => {
    document.body.classList.remove("verificando")
    secret = false
    verificando = false
    
}, 1000);
}

verificar.addEventListener('click', () => {
    if (!verificando) {
        verificando = true
        line.classList.add("verificando")
        document.body.classList.add("verificando")
        conferirNumeros(0)

        setTimeout(() => {
            line.classList.remove("verificando")
            document.body.classList.remove("verificando")
            senha.classList.remove("errado")
            if  (lineWidth < 100) {
            senha.classList.remove("certo")
            secret = false
            verificando = false
            }
            
            for (j = 0; j < 6; j++) {
                rotulos[j].style.display = "none"
            }
        }, 5000);

    }
})

function conferirNumeros(i) {
    setTimeout(() => {
        rotulos[i].classList.remove("certo")
        rotulos[i].classList.remove("errado")
        rotulos[i].style.display = "block"
        if (rotulos[i].innerText == senha.innerText[i]) {
            rotulos[i].classList.add("certo")
        } else {
            rotulos[i].classList.add("errado")
        }
        i++
        if (i == 6 ) {
            var valores = ""
            rotulos.forEach(rotulo => {
                valores += rotulo.innerText
            })

            if (valores == senha.innerText) { 
                senha.classList.add("certo")
                setTimeout(() => {
                    secret = true
                    lineWidth = (pontos * 32) + 32
                }, 1000);
            } else {
                senha.classList.add("errado")
                setTimeout(() => {
                    secret = true
                    lineWidth =  (pontos -1)*(32)
                }, 1000);
            }
        }
        if (i < 6) conferirNumeros(i)
    }, 400);
}


comecar.addEventListener("click", () => {
    document.querySelector(".popup").classList.add("desativo")
    lineWidth = 33
    secret = false
})

beads5.forEach(bead5 => {
    bead5.addEventListener('click', () => {
        bead5.classList.toggle('active');

        if (bead5.classList.contains("active")) { baseNumber(bead5, 5) }
        else { baseNumber(bead5, -5) }
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
            baseNumberBottom(bead1, 4 - elementsAbove.length)
        }
        else {
            baseNumberBottom(bead1, 0)
        }

    }

    )
}
);

function baseNumber(element, number = 0) {

    pilha = element.parentElement.querySelector(".pilha")
    pilha.innerHTML = Number(pilha.innerHTML) + number

    atualizarBase(element)
}

function baseNumberBottom(element, number = 0) {

    pilha = element.parentElement.querySelector(".pilha")
    pilha.innerHTML = + number

    atualizarBase(element)
}


function atualizarBase(element) {
    pilhaTop = element.parentElement.parentElement.querySelector(".top").innerHTML

    pilhaBottom = element.parentElement.parentElement.querySelector(".bottom").innerHTML

    label = element.parentElement.parentElement.querySelector(".base").querySelector(".unidade")

    label.innerHTML = Number(pilhaTop) + Number(pilhaBottom)
}