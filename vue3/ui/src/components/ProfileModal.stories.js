import ProfileModal from "./ProfileModal.vue";

export default {
  title: "ProfileModal",
  component: ProfileModal,
  parameters: {
    layout: "padded",
  },
};

const Template = (args) => ({
  components: { ProfileModal },
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
    <v-btn color="primary" dark @click="isOpen = true">
      Open Dialog
    </v-btn>
    <profile-modal
      v-model:is-open="isOpen"
      :add-identity="mockFunction"
      :update-profile="mockFunction"
      :enroll="mockFunction"
      :fetch-organizations="mockFunction"
      :get-countries="getCountries.bind(this)"
    />
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  countries: [
    { code: "AD", name: "Andorra" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "AF", name: "Afghanistan" },
    { code: "AG", name: "Antigua and Barbuda" },
    { code: "AI", name: "Anguilla" },
    { code: "AL", name: "Albania" },
    { code: "AM", name: "Armenia" },
  ],
  mockFunction() {
    return true;
  },
  getCountries() {
    return this.countries;
  },
};
