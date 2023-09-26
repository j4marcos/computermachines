const placa = document.querySelector(".placa")
const rodas = document.querySelectorAll(".raios")
const comecar = document.querySelector(".popup .comecar")
const line = document.querySelector(".line")
const senha = document.querySelector(".senha")
const verificar = document.querySelector(".verificar")
const rotulosSoma = document.querySelectorAll(".numero.soma")
const rotulosSubtracao = document.querySelectorAll(".numero.subtracao")
var lineWidth = 99
var secret = true
var verificando = false
var pontos

setInterval(() => {
        if (lineWidth > 0 && !secret && !verificando) {
            lineWidth -= 0.06
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
            document.querySelector(".venceu").classList.add("ativo")
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
            for(i = 0 ; i< 6 ; i++) {
                rotulosSoma[i].classList.remove("certo")
                rotulosSoma[i].classList.remove("errado")
                rotulosSubtracao[i].classList.remove("certo")
                rotulosSubtracao[i].classList.remove("errado")
            }
            console.log(123)
        }, 5000)

    }
})

function conferirNumeros(i) {
    setTimeout(() => {
        if (placa.classList.contains("abaixada")) {
            rotulos = rotulosSubtracao
        } else {
            rotulos = rotulosSoma
        }
        
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


placa.addEventListener('click', () => {placa.classList.toggle("abaixada")})

rodas.forEach(roda => {
    roda.addEventListener('mousedown', () => {
        girando = true
        girar(roda)
    })
});


function girar(roda) {
    anguloInicial = Number(roda.querySelector(".notacaoAngulo").innerText)
    mover1 = 360 / 10
    rotacao = anguloInicial + mover1
        
    roda.style.transform = `rotate(${rotacao}deg)`;
    roda.querySelector(".notacaoAngulo").innerText = rotacao

    mudarNumeros(roda)
    }

    function mudarNumeros(roda) {
        const numeroSomaInicial = Number(roda.parentElement.parentElement.querySelector(".soma").innerText)
        const numeroSubtracaoInicial = Number(roda.parentElement.parentElement.querySelector(".subtracao").innerText)
        var numeroSoma = roda.parentElement.parentElement.querySelector(".soma").querySelector(".rotulo")
        var numeroSubtracao = roda.parentElement.parentElement.querySelector(".subtracao").querySelector(".rotulo")

        animacaoNumero(roda)
    
        if (numeroSomaInicial == 9) {
            numeroSoma.innerText = 0
            mudarNumeros(roda.parentElement.parentElement.previousElementSibling.querySelector(".raios"))
            
        } else {
            numeroSoma.innerText = numeroSomaInicial + 1
        }

        if (numeroSubtracaoInicial == 0) {
            numeroSubtracao.innerText = 9
        } else {
            numeroSubtracao.innerText = numeroSubtracaoInicial - 1
        }

    }

    function animacaoNumero(roda) {
        rotulos = roda.parentElement.parentElement.querySelectorAll(".rotulo")
        rotulos.forEach(rotulo => {
            rotulo.classList.add("changed")
            setTimeout(() => {
            rotulo.classList.remove("changed")
            }, 300);
        })

        
    }