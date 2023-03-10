import Identity from "./Identity.vue";

export default {
  title: "Identity",
  component: Identity,
  parameters: {
    layout: "padded",
  },
};

const Template = (args) => ({
  components: { Identity },
  setup() {
    return { ...args };
  },
  template:
    '<identity :uuid="uuid" :name="name" :email="email" :username="username" :source="source" :is-main="isMain"/>',
});

export const Default = Template.bind({});
Default.args = {
  uuid: "1f1a9e56dedb45f5969413eeb4442d982e33f0f6",
  name: "Tom Marvolo Riddle",
  email: "triddle@example.net",
  username: "triddle",
  source: null,
  isMain: false,
};

export const Source = Template.bind({});
Source.args = {
  uuid: "1f1a9e56dedb45f5969413eeb4442d982e33f0f6",
  name: "Tom Marvolo Riddle",
  email: "triddle@example.net",
  username: "triddle",
  source: "git",
  isMain: false,
};

export const MainIdentity = Template.bind({});
MainIdentity.args = {
  uuid: "1f1a9e56dedb45f5969413eeb4442d982e33f0f6",
  name: "Tom Marvolo Riddle",
  email: "triddle@example.net",
  username: "triddle",
  source: "git",
  isMain: true,
};
