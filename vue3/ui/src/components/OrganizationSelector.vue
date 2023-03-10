<template>
  <v-autocomplete
    v-model="inputValue"
    v-model:search="search"
    :items="organizations"
    :label="label"
    item-title="name"
    item-value="name"
    density="compact"
    variant="outlined"
    clearable
    hide-selected
    hide-no-data
  ></v-autocomplete>
</template>

<script>
export default {
  name: "OrganizationSelector",
  emits: ["update:modelValue"],
  data() {
    return {
      inputValue: this.modelValue,
      organizations: [],
      search: this.modelValue,
    };
  },
  props: {
    modelValue: {
      type: String,
      required: false,
    },
    fetchOrganizations: {
      type: Function,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: "Organization",
    },
  },
  methods: {
    async getSelectorItems(value) {
      const response = await this.fetchOrganizations(1, 10, { term: value });
      if (response) {
        this.organizations = response.entities;
      }
    },
  },
  watch: {
    search(value) {
      if (value && value.length > 2) {
        this.getSelectorItems(value);
      }
    },
    modelValue(value) {
      this.inputValue = value;
    },
    inputValue() {
      this.$emit("update:modelValue", this.inputValue);
    },
  },
  mounted() {
    if (this.modelValue) {
      this.getSelectorItems(this.modelValue);
    }
  },
};
</script>
