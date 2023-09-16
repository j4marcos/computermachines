const placa = document.querySelector(".placa")
const rodas = document.querySelectorAll(".raios")
var girando = false
var mouse 

document.addEventListener('mousemove', (e) => {mouse = e})
document.addEventListener('mouseup', () => {girando = false})
placa.addEventListener('click', () => {placa.classList.toggle("abaixada")})

rodas.forEach(roda => {
    roda.addEventListener('mousedown', () => {
        girando = true
        girar(roda)
    })
    
});


function girar(roda) {
    
    setTimeout(() => {
        const posicaoRoda = roda.getBoundingClientRect()
        const mouseX = mouse.clientX - posicaoRoda.left - posicaoRoda.width / 2
        const mouseY = mouse.clientY - posicaoRoda.top - posicaoRoda.height / 2

        const rotacao = Math.atan2(mouseY,mouseX)
        roda.style.transform = `rotate(${rotacao}rad)`

        if (girando) girar(roda)
    }, 10);
   
        
    }
