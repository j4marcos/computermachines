const placa = document.querySelector(".placa")
const rodas = document.querySelectorAll(".raios")

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

        console.log(numeroSoma)
        
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