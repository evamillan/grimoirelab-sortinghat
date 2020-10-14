import { shallowMount, mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import IndividualsTable from "@/components/IndividualsTable";
import * as Mutations from "@/apollo/mutations";

Vue.use(Vuetify);

const deleteResponse = {
  data: {
    deleteIdentity: {
      uuid: "5f06473815dc415c9861680de8101813d9eb18e8",
      __typename: "DeleteIdentity"
    }
  }
};

describe("IndividualsTable", () => {
  test("Mock query for deleteIdentity", async () => {
    const mutate = jest.fn(() => Promise.resolve(deleteResponse));
    const wrapper = shallowMount(IndividualsTable, {
      Vue,
      mocks: {
        $apollo: {
          mutate
        }
      },
      propsData: {
        deleteItem: mutate,
        fetchPage: () => {}
      }
    });
    const response = await Mutations.deleteIdentity(wrapper.vm.$apollo, "5f06473815dc415c9861680de8101813d9eb18e8");

    expect(mutate).toBeCalled();
    expect(wrapper.element).toMatchSnapshot();
  })
});
