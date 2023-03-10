import Search from "./Search.vue";

export default {
  title: "Search",
  component: Search,
  parameters: {
    layout: "padded",
  },
};

const Template = (args) => ({
  components: { Search },
  setup() {
    return { ...args };
  },
  template: `
    <search
      :valid-filters="validFilters"
      :filter-selector="filterSelector"
      :order-selector="orderSelector"
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  validFilters: [],
  filterSelector: false,
  orderSelector: false,
};

export const FilterSelector = Template.bind({});
FilterSelector.args = {
  validFilters: [
    {
      filter: "country",
      type: "string",
    },
    {
      filter: "isBot",
      type: "boolean",
    },
  ],
  filterSelector: true,
  orderSelector: false,
};

export const OrderSelector = Template.bind({});
OrderSelector.args = {
  validFilters: [],
  filterSelector: false,
  orderSelector: true,
};
