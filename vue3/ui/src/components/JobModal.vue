<template>
  <v-dialog :model-value="isOpen" max-width="550px" @click:outside="onClose">
    <v-card class="section">
      <v-card-title class="header title">New job</v-card-title>
      <v-card-text class="mt-3">
        <v-row>
          <v-col>
            <v-select
              v-model="selected"
              :items="types"
              :menu-props="{ offsetY: true, maxWidth: 500 }"
              item-props
              label="Type"
              id="type"
              density="compact"
              variant="outlined"
              hide-details
            >
              <template v-slot:item="{ props }">
                <v-list-item v-bind="props">
                  <v-list-item-subtitle>
                    {{ props.description }}
                  </v-list-item-subtitle>
                </v-list-item>
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row v-if="selected === 'genderize'">
          <v-col>
            <v-checkbox
              v-model="forms.genderize.exclude"
              label="Exclude individuals in RecommenderExclusionTerm list"
              id="genderize_exclude"
            />
            <v-checkbox
              v-model="forms.genderize.noStrictMatching"
              label="Disable strict name validation"
              id="genderize_noStrictMatching"
            />
          </v-col>
        </v-row>
        <v-row v-if="selected === 'unify'">
          <v-col>
            <v-select
              v-model="forms.unify.criteria"
              :items="['name', 'email', 'username']"
              :menu-props="{ bottom: true, offsetY: true }"
              label="Criteria"
              dense
              hide-details
              multiple
              outlined
            />
            <v-checkbox
              v-model="forms.unify.exclude"
              label="Exclude individuals in RecommenderExclusionTerm list"
              id="unify_exclude"
            />
          </v-col>
        </v-row>
        <v-row v-if="selected === 'recommendMatches'">
          <v-col>
            <v-select
              v-model="forms.recommendMatches.criteria"
              :items="['name', 'email', 'username']"
              :menu-props="{ bottom: true, offsetY: true }"
              label="Criteria"
              dense
              hide-details
              multiple
              outlined
            />
            <v-checkbox
              v-model="forms.recommendMatches.exclude"
              label="Exclude individuals in RecommenderExclusionTerm list"
              id="recommend_exclude"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" variant="text" @click="onClose">
          Cancel
        </v-btn>
        <v-btn
          :disabled="!selected"
          color="primary"
          id="confirm"
          variant="flat"
          @click="onSave"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const jobTypes = [
  {
    title: "Affiliate",
    value: "affiliate",
    description:
      "Affiliate individuals to organizations using recommendations.",
  },
  {
    title: "Genderize",
    value: "genderize",
    description:
      "Autocomplete the gender information of individuals using genderize.io recommendations. ",
  },
  {
    title: "Unify",
    value: "unify",
    description: "Merge individuals by using matching recommendations.",
  },
  {
    title: "Recommend matches",
    value: "recommendMatches",
    description: "Recommend identity matches for individuals.",
  },
];
const defaultForms = {
  genderize: {
    exclude: true,
    noStrictMatching: false,
  },
  unify: {
    criteria: ["name", "email", "username"],
    exclude: true,
  },
  recommendMatches: {
    criteria: ["name", "email", "username"],
    exclude: true,
  },
};

export default {
  name: "JobModal",
  emits: ["update:is-open"],
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    types: {
      type: Array,
      required: false,
      default: () => jobTypes,
    },
  },
  data() {
    return {
      selected: null,
      forms: defaultForms,
    };
  },
  methods: {
    onClose() {
      this.$emit("update:is-open", false);
      this.selected = null;
      this.forms = Object.assign({}, this.forms, defaultForms);
    },
    onSave() {
      this.$emit(this.selected, this.forms[this.selected]);
      this.onClose();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

.v-list-item .v-list-item__subtitle {
  max-width: 490px;
  overflow: visible;
  white-space: normal;
}
</style>
