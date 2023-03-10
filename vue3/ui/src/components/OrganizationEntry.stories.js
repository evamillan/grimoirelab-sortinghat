import OrganizationEntry from "./OrganizationEntry.vue";

export default {
  title: "OrganizationEntry",
  component: OrganizationEntry,
  parameters: {
    layout: "padded",
  },
};

const Template = (args) => ({
  components: { OrganizationEntry },
  setup() {
    return { ...args };
  },
  template: `
    <organization-entry
      :name="name"
      :enrollments="enrollments"
      :is-editable="isEditable"
      :is-expanded="false"
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  name: "Hogwarts School of Witchcraft and Wizardry",
  enrollments: 280,
  isEditable: true,
};

export const NotEditable = Template.bind({});
NotEditable.args = {
  name: "Hogwarts School of Witchcraft and Wizardry",
  enrollments: 280,
  isEditable: false,
};
