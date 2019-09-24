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

const opcoesPokemon = document.querySelectorAll('.card-body a')
opcoesPokemon.forEach(mostrar)

function mostrar(elemento) {
    console.log(elemento.getAttribute('value'))
}

/* == POKEQUIZ == */


function gerarNumeros() {
    let pokemonID = []

    for (let i = 0; i < 40; i++) {
        let n = Math.ceil(Math.random() * 151)

        if (pokemonID.indexOf(n) == -1) {
            pokemonID.push(n)
        } else {
            i--
        }
    }

    pokemonID.sort(sortfunction)

    return pokemonID
}

function sortfunction(a, b) {
    return (a - b) //faz com que o array seja ordenado numericamente e de ordem crescente.
}

/* function gatilhoQuiz() {
    let pokemonsID = gerarNumeros()
    getPokemonSorteado(pokemonsID)

} */

let pokemonsNaoAparecidos = gerarNumeros()
let pokemonsAparecidos = []


function apareceuPokemon(id) {
    return (pokemonsNaoAparecidos.indexOf(id) == -1) ? true : false
}

async function getPokemonSorteado() {
    let id = Math.ceil(Math.random() * 40)
    let elemento = await reqPokemon(pokemonsNaoAparecidos[id])
    return elemento
}


function setarPokemonCorreto(pokemon) {
    let $img = document.getElementById('pokemonSorteado')
    let indice = Math.ceil((Math.random() * 4))
    let $opCorreta = document.getElementById(`op${indice}`)

    $img.src = pokemon.imagem
    $opCorreta.innerHTML = pokemon.nome
}

function reqPokemon(id) {
    const pokemonSorteado = fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(function (response) {
            if (response.status == 200) {
                return response.json()
            }
        })
        .then(function (data) {
            const obj = {
                nome: data.name,
                imagem: data.sprites.front_default
            }
            return obj
        })
        .catch(function (erro) {
            console.log('Erro na requisição: ' + erro)
        })

    return pokemonSorteado
}

