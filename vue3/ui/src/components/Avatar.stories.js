import Avatar from "./Avatar.vue";

export default {
  title: "Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
};

const Template = (args) => ({
  components: { Avatar },
  setup() {
    return { ...args };
  },
  template: '<avatar :name="name" :email="email" />',
});

export const Default = Template.bind({});
Default.args = {
  name: "Tom Marvolo Riddle",
  email: null,
};

export const SingleInitial = Template.bind({});
SingleInitial.args = {
  name: "Voldemort",
  email: null,
};

export const Gravatar = Template.bind({});
Gravatar.args = {
  name: "Santiago Dueñas",
  email: "sduenas@bitergia.com",
};
