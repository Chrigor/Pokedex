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
            let indicePokemon = pokemon.game_indices[0].game_index
            let stats = pokemon.stats // array dos atributos
            let sprites = pokemon.sprites // Objeto com atbr de imagens
            let type = pokemon.types // array (há alguns de uma posição só)

            let p = new Pokemon(nomePokemon, indicePokemon, stats, type, sprites)

            setarInformacoes(p)
        })
        .catch(function (error) {
            console.log('error')
            alert('Pokemon não detectado em nossa pokedex')
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

    $nomePokemonTexto.innerHTML = pokemonObj.nome

    $img.src = pokemonObj.imagens.front_default

    $speed.innerHTML = pokemonObj.estatisticas[0].base_stat
    $defesaEspecial.innerHTML = pokemonObj.estatisticas[1].base_stat
    $ataqueEspecial.innerHTML = pokemonObj.estatisticas[2].base_stat
    $defesa.innerHTML = pokemonObj.estatisticas[3].base_stat
    $ataque.innerHTML = pokemonObj.estatisticas[4].base_stat
    $hp.innerHTML = pokemonObj.estatisticas[5].base_stat
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