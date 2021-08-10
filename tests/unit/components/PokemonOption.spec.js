import { shallowMount } from "@vue/test-utils";
import PokemonOption from "@/components/PokemonOption";
import { pokemonsMock } from "../mocks/pokemons.mock";

describe("PokemonOption", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(PokemonOption, {
      props: {
        pokemons: pokemonsMock,
      },
    });
  });

  test("debe hacer match con el snapshot del component", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe mostrar las 4 opciones correctamente", () => {
    const liTags = wrapper.findAll("li");
    expect(liTags.length).toBe(4);
    expect(liTags[0].text()).toBe("pikachu");
    expect(liTags[1].text()).toBe("charmander");
    expect(liTags[2].text()).toBe("venusaur");
    expect(liTags[3].text()).toBe("new");
  });

  test('debe de emitir "selection" con sus respectivos parametros al hacr click', () => {
    const [li1, li2, li3, li4] = wrapper.findAll("li");
    li1.trigger("click");
    li2.trigger("click");
    li3.trigger("click");
    li4.trigger("click");

    expect(wrapper.emitted("selection").length).toBe(4);
    // NOTE validar que los parametros de la seleccion sean correctos
    expect(wrapper.emitted("selection")[0]).toEqual([3]);
    expect(wrapper.emitted("selection")[1]).toEqual([100]);
    expect(wrapper.emitted("selection")[2]).toEqual([234]);
    expect(wrapper.emitted("selection")[3]).toEqual([210]);
  });
});
