import ExpandedIndividual from "./ExpandedIndividual.vue";

export default {
  title: "ExpandedIndividual",
  component: ExpandedIndividual,
  parameters: {
    layout: "padded",
  },
};

const Template = (args) => ({
  components: { ExpandedIndividual },
  setup() {
    return { ...args };
  },
  template: `
  <expanded-individual
    :enrollments="enrollments"
    :identities="identities"
    :compact="compact"
    :uuid="uuid"
    :get-countries="getCountries.bind(this)"
  />`,
});

export const Default = Template.bind({});
Default.args = {
  uuid: "06e6903c91180835b6ee91dd56782c6ca72bc562",
  compact: false,
  name: "Tom Marvolo Riddle",
  identities: [
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
  ],
  enrollments: [
    {
      group: {
        name: "Hogwarts School of Witchcraft and Wizardry",
        id: "1",
      },
      start: "1938-09-01",
      end: "1945-06-02T00:00:00+00:00",
    },
    {
      start: "1938-09-01T00:00:00+00:00",
      end: "1945-06-02T00:00:00+00:00",
      group: {
        name: "Slytherin",
        id: "2",
        type: "team",
        parentOrg: { name: "Hogwarts" },
      },
    },
  ],
  getCountries() {
    return this.countries;
  },
};

export const Compact = Template.bind({});
Compact.args = {
  uuid: "06e6903c91180835b6ee91dd56782c6ca72bc562",
  compact: true,
  name: "Tom Marvolo Riddle",
  identities: [
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
  ],
  enrollments: [
    {
      group: {
        name: "Hogwarts School of Witchcraft and Wizardry",
        id: "1",
      },
      start: "1938-09-01",
      end: "1945-06-02T00:00:00+00:00",
    },
    {
      start: "1938-09-01T00:00:00+00:00",
      end: "1945-06-02T00:00:00+00:00",
      group: {
        name: "Slytherin",
        id: "2",
        type: "team",
        parentOrg: { name: "Hogwarts" },
      },
    },
  ],
  getCountries() {
    return this.countries;
  },
};

export const NoOrganizations = Template.bind({});
NoOrganizations.args = {
  uuid: "06e6903c91180835b6ee91dd56782c6ca72bc562",
  compact: false,
  name: "Tom Marvolo Riddle",
  identities: [
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
  ],
  enrollments: [],
  getCountries() {
    return this.countries;
  },
};
