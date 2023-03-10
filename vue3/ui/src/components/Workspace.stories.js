import WorkSpace from "./WorkSpace.vue";

export default {
  title: "WorkSpace",
  component: WorkSpace,
  parameters: {
    layout: "padded",
  },
};

const Template = (args) => ({
  components: { WorkSpace },
  setup() {
    return { ...args };
  },
  template: `
  <work-space
    :individuals="individuals"
    :merge-items="mergeItems"
    :move-item="moveItem"
    :enroll="() => {}"
  />
  `,
  data: () => ({
    individuals: [
      {
        name: "Tom Marvolo Riddle",
        uuid: "164e41c60c23",
        id: "1",
        email: "triddle@example.com",
        isBot: false,
        isLocked: false,
        organization: "Slytherin",
        isSelected: false,
        sources: [
          { name: "git", icon: "mdi-git" },
          { name: "github", icon: "mdi-github" },
          { name: "gitlab", icon: "mdi-gitlab" },
        ],
        identities: [
          {
            name: "GitLab",
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
      },
      {
        name: "Harry Potter",
        uuid: "164e41c60c28",
        id: "2",
        email: "hpotter@example.com",
        isLocked: false,
        isSelected: false,
        organization: "Griffyndor",
        sources: [
          { name: "git", icon: "mdi-git" },
          { name: "github", icon: "mdi-github" },
          { name: "Other sources", icon: "mdi-account-multiple" },
        ],
        identities: [
          {
            name: "GitHub",
            identities: [
              {
                name: "Harry Potter",
                source: "GitHub",
                email: "hpotter@example.net",
                uuid: "03b3428ee",
                username: "-",
              },
            ],
          },
          {
            name: "git",
            identities: [
              {
                uuid: "4ce562",
                name: "H. Potter",
                email: "hpotter@example.net",
                username: "potter",
                source: "git",
              },
            ],
          },
          {
            name: "others",
            identities: [
              {
                uuid: "4ce562",
                name: "Harry Potter",
                email: "hpotter@example.net",
                username: "-",
                source: "gerrit",
              },
            ],
          },
        ],
        enrollments: [
          {
            group: {
              name: "Griffyndor",
              id: "2",
            },
            start: "1991-09-01",
            end: "1997-06-02T00:00:00+00:00",
          },
          {
            group: {
              name: "Hogwarts School of Witchcraft and Wizardry",
              id: "1",
            },
            start: "1991-09-01",
            end: "1997-06-02T00:00:00+00:00",
          },
        ],
      },
    ],
  }),
  methods: {
    mergeItems() {
      this.individuals.pop();
    },
    moveItem() {
      return true;
    },
  },
});

export const Default = Template.bind({});
export const Empty = Template.bind({});
Empty.args = {
  individuals: [],
};
