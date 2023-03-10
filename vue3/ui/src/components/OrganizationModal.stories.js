import OrganizationModal from "./OrganizationModal.vue";

export default {
  title: "OrganizationModal",
  component: OrganizationModal,
  parameters: {
    layout: "centered",
  },
};

const Template = (args) => ({
  components: { OrganizationModal },
  setup() {
    return { ...args };
  },
  data() {
    return {
      isOpen: false,
    };
  },
  template: `
    <div class="ma-auto">
      <v-btn color="primary" dark @click="$event => isOpen = true">
        Open Dialog
      </v-btn>
      <organization-modal
        v-model:is-open="isOpen"
        :add-domain="addDomain"
        :add-organization="addDomain"
        :delete-domain="addDomain"                           l
      />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  addDomain() {
    return true;
  },
};
