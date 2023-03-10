import IndividualEntry from "./IndividualEntry.vue";

export default {
  title: "IndividualEntry",
  component: IndividualEntry,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => ({
  components: { IndividualEntry },
  setup() {
    return { ...args };
  },
  template: `
  <table width="100%">
    <individual-entry
      :name="name"
      :organization="organization"
      :email="email"
      :sources="sources"
      :is-expanded="isExpanded"
      :is-locked="isLocked"
      :is-bot="isBot"
      :uuid="uuid"
      :is-highlighted="isHighlighted"
    />
  </table>
  `,
});

export const Default = Template.bind({});
Default.args = {
  name: "Tom Marvolo Riddle",
  organization: "Slytherin",
  email: "triddle@example.com",
  sources: [{ name: "git", icon: "mdi-git", count: 2 }],
  isLocked: false,
  isBot: false,
  uuid: "03b3428ee",
  isExpanded: false,
  isHighlighted: false,
};

export const Locked = Template.bind({});
Locked.args = {
  name: "Tom Marvolo Riddle",
  organization: "Slytherin",
  email: "triddle@example.com",
  sources: [{ name: "git", icon: "mdi-git", count: 2 }],
  isLocked: true,
  isBot: false,
  uuid: "03b3428ee",
  isExpanded: false,
  isHighlighted: false,
};

export const Bot = Template.bind({});
Bot.args = {
  name: "Tom Marvolo Riddle",
  organization: "Slytherin",
  email: "triddle@example.com",
  sources: [{ name: "git", icon: "mdi-git", count: 2 }],
  isLocked: false,
  isBot: true,
  uuid: "03b3428ee",
  isExpanded: false,
  isHighlighted: false,
};

export const BotAndLocked = Template.bind({});
BotAndLocked.args = {
  name: "Tom Marvolo Riddle",
  organization: "Slytherin",
  email: "triddle@example.com",
  sources: [{ name: "git", icon: "mdi-git", count: 2 }],
  isLocked: true,
  isBot: true,
  uuid: "03b3428ee",
  isExpanded: false,
  isHighlighted: false,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  name: "Tom Marvolo Riddle",
  organization: "Slytherin",
  email: "triddle@example.com",
  sources: [{ name: "git", icon: "mdi-git", count: 2 }],
  isLocked: false,
  isBot: false,
  uuid: "03b3428ee",
  isExpanded: false,
  isHighlighted: true,
};

export const Gravatar = Template.bind({});
Gravatar.args = {
  name: "Santiago Dueñas",
  email: "sduenas@bitergia.com",
  sources: [{ name: "git", icon: "mdi-git", count: 2 }],
  isLocked: false,
  isBot: false,
  uuid: "03b3428ee",
  isExpanded: false,
  isHighlighted: false,
};
