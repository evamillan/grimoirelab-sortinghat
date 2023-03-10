<template>
  <v-row class="d-flex align-center text-body-2" no-gutters>
    <v-col cols="2" class="uuid d-flex align-center">
      <v-tooltip open-delay="100" location="bottom">
        <template v-slot:activator="{ props }">
          <v-chip
            append-icon="mdi-content-copy"
            class="text-center"
            v-bind="props"
            variant="outlined"
            size="small"
            @click="copy(uuid)"
            @mouseenter="resetCopyText"
          >
            <span class="clip">{{ uuid }}</span>
          </v-chip>
        </template>
        <span>{{ tooltip }}</span>
      </v-tooltip>
      <v-tooltip v-if="isMain" location="bottom">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props" color="secondary" size="small">
            mdi-star
          </v-icon>
        </template>
        <span>Main identity</span>
      </v-tooltip>
    </v-col>
    <v-col cols="3" class="text-center">
      <span>{{ name }}</span>
    </v-col>
    <v-col cols="3" class="text-center">
      <span>{{ email }}</span>
    </v-col>
    <v-col cols="2" class="text-center">
      <span>{{ username }}</span>
    </v-col>
    <v-col cols="2" class="text-center">
      <span>{{ source }}</span>
    </v-col>
  </v-row>
</template>

<script>
const defaultCopyText = "Copy full UUID";
const successCopyText = "Copied";

export default {
  name: "identity",
  props: {
    uuid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    source: {
      type: String,
      required: false,
      default: null,
    },
    isMain: {
      type: Boolean,
      required: false,
    },
  },
  data: () => ({
    tooltip: defaultCopyText,
  }),
  methods: {
    copy(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.tooltip = successCopyText;
      });
    },
    resetCopyText() {
      this.tooltip = defaultCopyText;
    },
  },
};
</script>
<style lang="scss" scoped>
.clip {
  max-width: 7ch;
  overflow: hidden;
  text-overflow: clip;
  font-family: monospace;
}

.v-tooltip__content {
  font-size: 12px;
}
</style>
