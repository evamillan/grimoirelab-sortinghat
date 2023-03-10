import OrganizationSelector from "./OrganizationSelector.vue";

export default {
  title: "OrganizationSelector",
  component: OrganizationSelector,
  parameters: {
    layout: "padded",
  },
};

const Template = (args) => ({
  components: { OrganizationSelector },
  setup() {
    return { ...args };
  },
  data() {
    return {
      model: "Institute of Muggle Studies",
      organizations: organizations,
    };
  },
  template: `
  <organization-selector
    v-model="model"
    :fetch-organizations="fetchOrganizations"
  />
  `,
});

const organizations = {
  entities: [
    { name: "Hogwarts School of Witchcraft and Wizardry" },
    { name: "Advocates to the Wizarding World" },
    { name: "Agency for the Protection of Wizarding Secrecy" },
    { name: "Azkaban Security Officials" },
    { name: "British Wizard Duelling Association" },
    { name: "Celestial Ball decorating committee" },
    { name: "Enchanted Feather Co." },
    { name: "Dark Arts Civil Protection Council" },
    { name: "Dark Force Defence League" },
    { name: "East Coast Wizards" },
    { name: "Egyptian Owl Union" },
    { name: "French Magical Department" },
    { name: "Herbology High Commission" },
    { name: "Institute of Muggle Studies" },
    { name: "Potions Associations" },
    { name: "Salem Witches' Institute" },
  ],
};

export const Default = Template.bind({});
Default.args = {
  fetchOrganizations(page, items, filters) {
    const results = JSON.parse(JSON.stringify(organizations));
    if (filters.term) {
      results.entities = results.entities.filter((organization) =>
        organization.name.toUpperCase().includes(filters.term.toUpperCase())
      );
    }
    return results;
  },
};
