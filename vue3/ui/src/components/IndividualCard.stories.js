import IndividualCard from "./IndividualCard.vue";

export default {
  title: "IndividualCard",
  component: IndividualCard,
  parameters: {
    layout: "padded",
  },
};

const Template = (args) => ({
  components: { IndividualCard },
  setup() {
    return { ...args };
  },
  template: `
    <individual-card
      :name="name"
      :email="email"
      :sources="sources"
      :uuid="uuid"
      :identities="identities"
      :enrollments="enrollments"
      :is-highlighted="isHighlighted"
      :is-locked="isLocked"
      :closable="closable"
      :selectable="selectable"
      :is-selected="isSelected"
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  name: "Tom Marvolo Riddle",
  sources: [],
  isLocked: false,
  uuid: "10f546",
  email: "triddle@example.net",
  identities: [],
  enrollments: [],
  isHighlighted: false,
  closable: false,
  selectable: false,
  isSelected: false,
};

export const SingleInitial = Template.bind({});
SingleInitial.args = {
  name: "Voldemort",
  sources: [],
  isLocked: false,
  uuid: "10f546",
  email: "voldemort@example.net",
  identities: [],
  enrollments: [],
  isHighlighted: false,
  closable: false,
  selectable: false,
  isSelected: false,
};

export const NoName = Template.bind({});
NoName.args = {
  name: "",
  sources: [],
  isLocked: false,
  uuid: "10f546",
  email: "triddle@example.net",
  identities: [
    {
      name: "GitLab",
      icon: "mdi-gitlab",
      identities: [
        {
          name: "",
          source: "GitLab",
          email: "triddle@example.net",
          uuid: "03b3428ee",
          username: "triddle",
        },
      ],
    },
  ],
  enrollments: [],
  isHighlighted: false,
  closable: false,
  selectable: false,
  isSelected: false,
};

export const Sources = Template.bind({});
Sources.args = {
  name: "Tom Marvolo Riddle",
  sources: [
    { name: "git", icon: "mdi-git" },
    { name: "github", icon: "mdi-github" },
    { name: "gitlab", icon: "mdi-gitlab" },
    { name: "Other sources", icon: "mdi-account-multiple" },
  ],
  isLocked: false,
  uuid: "10f546",
  email: "triddle@example.net",
  identities: [
    {
      name: "GitLab",
      icon: "mdi-gitlab",
      identities: [
        {
          name: "Tom Marvolo Riddle",
          source: "GitLab",
          email: "triddle@example.net",
          uuid: "03b3428ee",
          username: "triddle",
        },
      ],
    },
    {
      name: "GitHub",
      icon: "mdi-github",
      identities: [
        {
          uuid: "808b18",
          name: "Voldemort",
          email: "-",
          username: "voldemort",
          source: "github",
        },
      ],
    },
    {
      name: "git",
      icon: "mdi-git",
      identities: [
        {
          uuid: "006afa",
          name: "Tom Marvolo Riddle",
          email: "triddle@example.net",
          username: "triddle",
          source: "git",
        },
        {
          uuid: "abce32",
          name: "voldemort",
          email: "voldemort@example.net",
          username: "-",
          source: "git",
        },
      ],
    },
  ],
  enrollments: [],
  isHighlighted: false,
  closable: false,
  selectable: false,
  isSelected: false,
};

export const Organization = Template.bind({});
Organization.args = {
  name: "Tom Marvolo Riddle",
  sources: [],
  isLocked: false,
  uuid: "10f546",
  email: "triddle@example.net",
  identities: [],
  enrollments: [
    {
      group: {
        name: "Slytherin",
        id: "2",
      },
      start: "1938-09-01T00:00:00+00:00",
      end: "1998-05-02T00:00:00+00:00",
    },
    {
      group: {
        name: "Hogwarts School of Witchcraft and Wizardry",
        id: "1",
      },
      start: "1938-09-01",
      end: "1945-06-02T00:00:00+00:00",
    },
  ],
  isHighlighted: false,
  closable: false,
  selectable: false,
  isSelected: false,
};

export const SourcesAndOrganization = Template.bind({});
SourcesAndOrganization.args = {
  name: "Tom Marvolo Riddle",
  sources: [
    { name: "git", icon: "mdi-git" },
    { name: "github", icon: "mdi-github" },
    { name: "gitlab", icon: "mdi-gitlab" },
    { name: "Other sources", icon: "mdi-account-multiple" },
  ],
  isLocked: false,
  uuid: "10f546",
  email: "triddle@example.net",
  identities: [
    {
      name: "GitLab",
      icon: "mdi-gitlab",
      identities: [
        {
          name: "Tom Marvolo Riddle",
          source: "GitLab",
          email: "triddle@example.net",
          uuid: "03b3428ee",
          username: "triddle",
        },
      ],
    },
    {
      name: "GitHub",
      icon: "mdi-github",
      identities: [
        {
          uuid: "808b18",
          name: "Voldemort",
          email: "-",
          username: "voldemort",
          source: "github",
        },
      ],
    },
    {
      name: "git",
      icon: "mdi-git",
      identities: [
        {
          uuid: "006afa",
          name: "Tom Marvolo Riddle",
          email: "triddle@example.net",
          username: "triddle",
          source: "git",
        },
        {
          uuid: "abce32",
          name: "voldemort",
          email: "voldemort@example.net",
          username: "-",
          source: "git",
        },
      ],
    },
  ],
  enrollments: [
    {
      group: {
        name: "Slytherin",
        id: "2",
      },
      start: "1938-09-01T00:00:00+00:00",
      end: "1998-05-02T00:00:00+00:00",
    },
    {
      group: {
        name: "Hogwarts School of Witchcraft and Wizardry",
        id: "1",
      },
      start: "1938-09-01",
      end: "1945-06-02T00:00:00+00:00",
    },
  ],
  isHighlighted: false,
  closable: false,
  selectable: false,
  isSelected: false,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  name: "Tom Marvolo Riddle",
  sources: [],
  isLocked: false,
  uuid: "10f546",
  email: "triddle@example.net",
  identities: [],
  enrollments: [],
  isHighlighted: true,
  closable: false,
  selectable: false,
  isSelected: false,
};

export const Gravatar = Template.bind({});
Gravatar.args = {
  name: "Santiago Dueñas",
  sources: [],
  isLocked: false,
  uuid: "10f546",
  email: "sduenas@bitergia.com",
  identities: [],
  enrollments: [],
  isHighlighted: false,
  closable: false,
  selectable: false,
  isSelected: false,
};

export const Closable = Template.bind({});
Closable.args = {
  name: "Tom Marvolo Riddle",
  sources: [],
  isLocked: false,
  uuid: "10f546",
  email: "triddle@example.net",
  identities: [],
  enrollments: [],
  isHighlighted: false,
  closable: true,
  selectable: false,
  isSelected: false,
};

export const Selectable = Template.bind({});
Selectable.args = {
  name: "Tom Marvolo Riddle",
  sources: [],
  isLocked: false,
  uuid: "10f546",
  email: "triddle@example.net",
  identities: [],
  enrollments: [],
  isHighlighted: false,
  closable: false,
  selectable: true,
  isSelected: false,
};

export const Selected = Template.bind({});
Selected.args = {
  name: "Tom Marvolo Riddle",
  sources: [],
  isLocked: false,
  uuid: "10f546",
  email: "triddle@example.net",
  identities: [],
  enrollments: [],
  isHighlighted: false,
  closable: false,
  selectable: true,
  isSelected: true,
};
