import JobModal from "./JobModal.vue";

export default {
  title: "JobModal",
  component: JobModal,
  parameters: {
    layout: "centered",
  },
};

const Template = (args) => ({
  components: { JobModal },
  setup() {
    return { ...args };
  },
  data() {
    return {
      open: false,
    };
  },
  template: `
  <div class="ma-auto">
    <v-btn color="primary" dark @click="$event => open = true">
      Open Dialog
    </v-btn>
    <job-modal v-model:is-open="open"/>
  </div>
  `,
});

export const Default = Template.bind({});
