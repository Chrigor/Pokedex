window.addEventListener('load', () => {
    setTimeout(tirarLoading, 1000)
})

function tirarLoading() {
    let $a = document.getElementsByClassName('a')[0]
    $a.style.display = "none"
}

let $pesquisarNome = document.getElementById('buscarNome')
let $pesquisarID = document.getElementById('buscarID')

$pesquisarNome.addEventListener('click', main)
$pesquisarID.addEventListener('click', main)

function main() {
    let nomePokemon = getPokemonName()

    if (validarInput(nomePokemon)) {
        nomePokemon = tratarNomePokemon(nomePokemon)
        getPokemon(nomePokemon)
    } else {
        alert('error')
    }

}


function getPokemonName() {
    let $campoNomePokemon = document.getElementById('nomePokemon')
    return $campoNomePokemon.value
}

function getPokemon(pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
        .then(function (response) {
            if (response.status == 200) {
                return response.json()
            } else {
                throw new Error('Error: Pokémon não encontrado.')
            }
        })
        .then(function (pokemon) {

            let nomePokemon = pokemon.forms[0].name
            let indicePokemon = pokemon.id
            let stats = pokemon.stats // array dos atributos
            let sprites = pokemon.sprites // Objeto com atbr de imagens
            let type = pokemon.types // array (há alguns de uma posição só)
            let p = new Pokemon(nomePokemon, indicePokemon, stats, type, sprites)

            setarInformacoes(p)

        })
        .catch(function (error) {
            console.log('error')
            alert('Pokemon não detectado em nossa pokedex:' + error)
        })
}

function tratarNomePokemon(string) {
    return string.trim().toLowerCase()
}

function validarInput(string) {
    return string.length > 0 ? true : false
}

function setarInformacoes(pokemonObj) {
    let $hp = document.getElementById('hp')
    let $ataque = document.getElementById('ataque')
    let $defesa = document.getElementById('defesa')
    let $speed = document.getElementById('velocidade')
    let $defesaEspecial = document.getElementById('especial-defesa')
    let $ataqueEspecial = document.getElementById('especial-ataque')
    let $img = document.getElementById('pokemonImagem')
    let $nomePokemonTexto = document.getElementById('nomePokemonTexto')

    let tipos = createTypes(pokemonObj.tipo)


    $nomePokemonTexto.innerHTML = `${pokemonObj.nome} # ${pokemonObj.indice}`
    $img.src = pokemonObj.imagens.front_default
    $speed.innerHTML = pokemonObj.estatisticas[0].base_stat
    $defesaEspecial.innerHTML = pokemonObj.estatisticas[1].base_stat
    $ataqueEspecial.innerHTML = pokemonObj.estatisticas[2].base_stat
    $defesa.innerHTML = pokemonObj.estatisticas[3].base_stat
    $ataque.innerHTML = pokemonObj.estatisticas[4].base_stat
    $hp.innerHTML = pokemonObj.estatisticas[5].base_stat

    removeTipos()
    addTypes(tipos)
}

function createTypes(types) {
    let arrayTipos = []

    for (let i in types) {
        let tipo = document.createElement('a')
        tipo.setAttribute('href', '')
        tipo.setAttribute('class', 'btn-sm btn-danger m-1 tipoPokemon')
        tipo.innerHTML = types[i].type.name
        tipo.style.textDecoration = "none"
        tipo.style.background = getColorType(types[i].type.name)
        console.log(getColorType(types[i].type.name))
        arrayTipos.push(tipo)
    }

    return arrayTipos
}

function addTypes(types) {
    let $tipos = document.getElementById('tipos')
    for (let i in types) {
        $tipos.appendChild(types[i])
    }
}

function removeTipos() {
    let $tipos = document.querySelectorAll('.tipoPokemon')
    let tipo = document.getElementById('tipos')

    console.log(tipo)
    if ($tipos.length > 0) {
        for (let i = 0; i < $tipos.length; i++) {
            tipo.removeChild($tipos[i])
        }
    }

}

function getColorType(tipo) {
    if (tipo != 'undefined') {
        switch (tipo) {
            case 'bug': cor = 'rgb(2, 100, 2)'; break;
            case 'dark': cor = 'black'; break;
            case 'dragon': cor = 'rgba(38, 104, 247, 0.767)'; break;
            case 'electric': cor = 'yellow'; break;
            case 'fairy': cor = 'pink'; break;
            case 'fighting': cor = 'orange'; break;
            case 'fire': cor = 'red'; break;
            case 'flying': cor = 'rgb(55, 103, 127)'; break;
            case 'ghost': cor = 'rgb(48, 48, 109)'; break;
            case 'grass': cor = 'green'; break;
            case 'ground': cor = 'rgb(186, 113, 34)'; break;
            case 'ice': cor = 'rgb(80, 211, 247)'; break;
            case 'normal': cor = 'rgb(129, 81, 92)'; break;
            case 'poison': cor = 'purple'; break;
            case 'psychic': cor = 'rgb(192, 37, 110)'; break;
            case 'rock': cor = 'rgb(82, 18, 4)'; break;
            case 'steel': cor = 'rgb(85, 18, 110)'; break;
            case 'water': cor = 'blue'; break;

            default: cor = ''; console.log("erro ao vincular cor do pokemon"); break;
        }

        return cor
    }

}
class Pokemon {
    constructor(nome, indice, estatisticas, tipo, imagens) {
        this.nome = nome
        this.indice = indice
        this.estatisticas = estatisticas
        this.tipo = tipo
        this.imagens = imagens
    }
}