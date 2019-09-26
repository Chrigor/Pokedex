const menuItems = document.querySelectorAll('.nav-link') // filtro [Links internos]

const buttonNome = document.getElementById('buscarNome')
const buttonId = document.getElementById('buscarID')

const buttonRestart = document.getElementsByClassName('btn-tela-finalizar')[0]

buttonRestart.addEventListener('click', startarGame)

buttonNome.addEventListener('click', main)
buttonId.addEventListener('click', main)

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

    let rodadas = document.getElementById('rodadas')
    let pontuacao = document.getElementById('pontuacao')

    rodadas.innerHTML = 'Rodadas 1/10'
    pontuacao.innerHTML = 'Pontuação 0/10'

    rodadas.style.visibility = "visible"
    pontuacao.style.visibility = "visible"
}

function gerarNumeros() {
    let pokemonID = []

    for (let i = 0; i < 40; i++) {
        let n = Math.floor(Math.random() * 151) + 1;

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
            removerCor()
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
    if (contador < 10) {
        let op = getPokemonsOptions()
        opcoes(op)
        resetarColors()
    }

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
    } else {
        alvo.style.background = "red"
    }

    piscarCerto()
    let $rodadas = document.getElementById('rodadas')
    let $pontuacao = document.getElementById('pontuacao')

    $rodadas.innerHTML = `Rodadas ${contador}/10`
    $pontuacao.innerHTML = `Pontuação ${acertos}/10`
    adicionarCor()
    setTimeout(gerarRodada, 1000)

    finalizarGame(contador)

}

function verificarAcerto(value) {
    return value == valueCerto ? true : false
}

function finalizarGame(rodada) {
    if (rodada >= 10) {
        telaFinish()
        console.log('finalizou')
    }
}

function telaFinish() {
    let finalizar = document.querySelector('#finalizarGame')
    let cardJogo = document.getElementById('game-pokemon')
    let $img = document.getElementById('pokemonSorteado')
    $img.src = 'https://fontmeme.com/permalink/190926/8554725ba1863f8fbd3368f6877db2c5.png'

    cardJogo.classList.add('remove')
    finalizar.classList.remove('remove')
    console.log('finalizou')
}

function piscarCerto() {
    const opcoesPokemons = document.querySelectorAll('#game-pokemon a')

    opcoesPokemons.forEach((element) => {

        let value = element.getAttribute('value')

        if (value == valueCerto) {
            element.style.background = "green"
        }
    })
}

function resetarColors() {
    const opcoesPokemons = document.querySelectorAll('#game-pokemon a')

    opcoesPokemons.forEach((element) => {
        element.style.background = "#007BFF"
    })

}


let $buttonIniciar = document.getElementById('btn-iniciar-game')
$buttonIniciar.addEventListener('click', startarGame)

function startarGame(event) {
    event.preventDefault()

    let card = document.querySelector('.remove')
    let cardMenu = document.getElementById('menu-jogo')

    let finalizar = document.querySelector('#finalizarGame')

    finalizar.classList.add('remove')

    cardMenu.classList.remove('d-flex')
    card.classList.remove('d-flex')
    card.classList.remove('remove')

    cardMenu.style.display = "none"

    iniciarGame()
    gerarRodada()
}


function removerCor() {
    let $img = document.getElementById('pokemonSorteado')
    $img.classList.remove('pokemonSorteado-visible')
    $img.classList.add('pokemonSorteado-oculto')
}

function adicionarCor() {
    let $img = document.getElementById('pokemonSorteado')
    $img.classList.remove('pokemonSorteado-oculto')
    $img.classList.add('pokemonSorteado-visibile')
}

function verificarPrimeiraGeracao(id) {
    return id <= 151 ? true : false
}

