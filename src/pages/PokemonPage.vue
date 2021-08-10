<template>
  <h1 v-if="!pokemon">Espero por favor</h1>
  <div v-else>
    <h1>¿Quién es este pokémon?</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOption :pokemons="pokemonsArr" @selection="checkAnswer($event)" />
    <template v-if="showAnser">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">Nuevo Juego</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture.vue";
import PokemonOption from "@/components/PokemonOption.vue";
import getPokemonOptions from "@/helpers/getPokemonOptions";

export default {
  components: {
    PokemonPicture,
    PokemonOption,
  },
  data() {
    return {
      message: "",
      pokemon: null,
      pokemonsArr: [],
      showAnser: false,
      showPokemon: false,
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonsArr = await getPokemonOptions();
      const rnd = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonsArr[rnd];
    },
    checkAnswer(selectedPokemonId) {
      this.showPokemon = true;
      this.showAnser = true;
      if (this.pokemon.id === selectedPokemonId) {
        this.message = `Correcto, es ${this.pokemon.name}`;
      } else {
        this.message = `Ooops, era ${this.pokemon.name}`;
      }
    },
    newGame() {
      this.pokemon = null;
      this.showPokemon = false;
      this.showAnser = false;
      this.pokemonsArr = [];
      this.mixPokemonArray();
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>

<style></style>
