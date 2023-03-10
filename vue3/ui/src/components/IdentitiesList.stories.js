import IdentitiesList from "./IdentitiesList.vue";

export default {
  title: "IdentitiesList",
  component: IdentitiesList,
  parameters: {
    layout: "padded",
  },
};

const Template = (args) => ({
  components: { IdentitiesList },
  setup() {
    return { ...args };
  },
  template: `
  <identities-list
    :compact="compact"
    :identities="identities"
    :draggable="true"
    uuid="164e41c60c28698ac30b0d17176d3e720e036918"
  />`,
});

const identities = [
  {
    name: "GitHub",
    icon: "mdi-github",
    identities: [
      {
        uuid: "06e6903c91180835b6ee91dd56782c6ca72bc562",
        name: "Tom Marvolo Riddle",
        email: "triddle@example.net",
        username: "triddle",
        source: "GitHub",
      },
      {
        uuid: "164e41c60c28698ac30b0d17176d3e720e036918",
        name: "Voldemort",
        email: "-",
        username: "voldemort",
        source: "GitHub",
      },
    ],
  },
  {
    name: "Git",
    icon: "mdi-git",
    identities: [
      {
        uuid: "10982379421b80e13266db011d6e5131dd519016",
        name: "voldemort",
        email: "voldemort@example.net",
        username: "-",
        source: "git",
      },
    ],
  },
  {
    name: "Others",
    icon: "mdi-account-multiple",
    identities: [
      {
        uuid: "1f1a9e56dedb45f5969413eeb4442d982e33f0f6",
        name: "-",
        email: "-",
        username: "voldemort",
        source: "irc",
      },
    ],
  },
];

export const Default = Template.bind({});
Default.args = {
  identities: identities,
  compact: false,
};

export const Compact = Template.bind({});
Compact.args = {
  identities: identities,
  compact: true,
};
