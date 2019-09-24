const menuItems = document.querySelectorAll('.nav-link') // filtro [Links internos]

const buttonNome = document.getElementById('buscarNome')
const buttonId = document.getElementById('buscarID')

buttonNome.addEventListener('click', scrollButton)
buttonId.addEventListener('click', scrollButton)

menuItems.forEach(item => {
    item.addEventListener('click', scrollToIdOnClick); // adiciona pra cada item
})

function scrollToIdOnClick(evento) { // param padrão
    evento.preventDefault(); // retira padrão [aquela parte de cima]

    const element = (event.target) // retorna o alvo(elemento completo)
    const id = element.getAttribute('href')
    const to = document.querySelector(id).offsetTop;

    scrollToPosition(to);
}

function scrollButton(evento) {
    evento.preventDefault(); // retira padrão [aquela parte de cima]

    const element = (event.target) // retorna o alvo(elemento completo)
    const id = element.getAttribute('local')
    const to = document.querySelector(id).offsetTop;

    scrollToPosition(to);
}

function scrollToPosition(to) {

    window.scroll({
        top: to,
        behavior: "smooth" // parte que deixa a rolagem suave!
    })
}