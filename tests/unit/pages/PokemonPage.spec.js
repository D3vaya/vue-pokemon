import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage";
import { pokemonsMock } from "../mocks/pokemons.mock";

describe("PokemonPage component", () => {
  let wrapper;
  //let mixPokemonArraySpy;
  beforeEach(() => {
    //mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, "mixPokemonArray");
    wrapper = shallowMount(PokemonPage);
  });
  test("should render PokemonPicture component", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Debe de llamar mixPokemonArray al montar", () => {
    const mixPokemonArraySpy = jest.spyOn(
      PokemonPage.methods,
      "mixPokemonArray"
    );
    const wrapper = shallowMount(PokemonPage);
    expect(mixPokemonArraySpy).toHaveBeenCalled();
  });

  test("debe de hacer match con el snapshot cuando cargan los pokemons", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          message: "",
          showAnser: false,
          showPokemon: false,
          pokemon: pokemonsMock[0],
          pokemonsArr: pokemonsMock,
        };
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de mostrar los componentes PokemonPicture y PokemonOption", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          message: "",
          showAnser: false,
          showPokemon: false,
          pokemon: pokemonsMock[0],
          pokemonsArr: pokemonsMock,
        };
      },
    });
    const picture = wrapper.find("pokemon-picture-stub");
    const option = wrapper.find("pokemon-option-stub");
    // que existan los componentes PokemonPicture y PokemonOption
    expect(picture.exists()).toBe(true);
    expect(option.exists()).toBe(true);
    // que tenga el atributo pokemonId en 5
    expect(wrapper.find("pokemon-picture-stub").attributes("pokemonid")).toBe(
      "3"
    );
    // que existe el atributo pokemons
    expect(
      wrapper.find("pokemon-option-stub").attributes("pokemons")
    ).toBeTruthy();
  });

  test("pruebas de checkAnswer", async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          message: "",
          showAnser: false,
          showPokemon: false,
          pokemon: pokemonsMock[0],
          pokemonsArr: pokemonsMock,
        };
      },
    });
    await wrapper.vm.checkAnswer(3);
    expect(wrapper.find("h2").exists()).toBe(true);
    expect(wrapper.vm.showPokemon).toBe(true);
    expect(wrapper.find("h2").text()).toBe(
      `Correcto, es ${pokemonsMock[0].name}`
    );
    await wrapper.vm.checkAnswer(100);
    expect(wrapper.vm.message).toBe(`Ooops, era ${pokemonsMock[0].name}`);
  });
});
