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

let pokemonsIDs
let contador
let valueCerto
let acertos


function iniciarGame() {
    pokemonsIDs = gerarNumeros()
    contador = 0
    valueCerto = 0
    acertos = 0
}

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

function getPokemonsOptions() {
    let option = []
    let index = 0
    contador++

    if (contador > 9) {
        for (let i in pokemonsIDs) {
            if (pokemonsIDs[i] != -1) {
                option.push(pokemonsIDs[i])
            }
        }
    } else {
        for (let i = 0; i < 4; i++) {
            do {
                index = Math.ceil(Math.random() * 39)
            } while (pokemonsIDs[index] < 0)

            option.push(index)
            pokemonsIDs[index] = -1
        }

    }

    return option
}


async function opcoes(array) {
    let index = Math.ceil(Math.random() * 4) - 1
    for (let i = 0; i < 4; i++) {
        let $op = document.getElementById(`op${i + 1}`)
        if (i == index) {
            //console.log('Op certa: ' + array[index])
            let pokemon = await getPokemonQuiz(array[index])
            let $img = document.getElementById('pokemonSorteado')

            console.log(pokemon.sprites)
            $op.setAttribute('value', array[index])
            $op.innerHTML = pokemon.name
            $img.src = pokemon.sprites.front_default
            valueCerto = array[index]
        } else {
            let pokemonWrong = await getPokemonQuiz(array[i])
            $op.setAttribute('value', array[i])
            $op.innerHTML = pokemonWrong.name
        }
    }

}

function gerarRodada() {
    let op = getPokemonsOptions()
    opcoes(op)
}


async function getPokemonQuiz(id) {
    const n = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(function (result) {
            if (result.status == 200) {
                return result.json()
            }
        })
        .then(function (pokemon) {
            return pokemon
        })

    return n
}


class PokemonQuiz {
    constructor(id, nome, foto) {
        this.id = id
        this.nome = nome
        this.foto = foto
    }
}


const opcoesPokemons = document.querySelectorAll('.card-body a')
opcoesPokemon.forEach(adicionarEvento)

function adicionarEvento(elemento) {
    elemento.addEventListener('click', mostrarValue)
}

function mostrarValue(event) {
    event.preventDefault()
    let alvo = event.target
    let value = alvo.getAttribute('value')

    if (verificarAcerto(value)) {
        acertos++
        console.log('acertou ' + acertos)
    } else {
        console.log('errou')
    }
    let $rodadas = document.getElementById('rodadas')
    let $pontuacao = document.getElementById('pontuacao')

    $rodadas.innerHTML =  `Rodadas ${contador}/10`
    $pontuacao.innerHTML = `Pontuação ${acertos}/10`

    gerarRodada()
    finalizarGame(contador)
}

function verificarAcerto(value) {
    return value == valueCerto ? true : false
}

function finalizarGame(rodada){
    if(rodada >= 11){
        alert('acabou')
    }
}

iniciarGame()
gerarRodada()