<template>
  <div>
    <h4 class="d-flex justify-space-between align-baseline">
      <span class="v-list-subheader"> Identities ({{ identitiesCount }}) </span>
      <v-btn
        v-if="!compact"
        size="small"
        variant="outlined"
        prepend-icon="mdi-call-split"
        :disabled="identitiesCount === 1 || isLocked"
        @click="splitAll"
      >
        Split all
      </v-btn>
    </h4>
    <v-table v-if="compact" density="compact" class="text-caption">
      <thead v-if="identitiesCount > 0">
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Username</th>
          <th class="text-left">Source</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in flatIdentities" :key="item.uuid">
          <td>{{ item.name || "-" }}</td>
          <td>{{ item.email || "-" }}</td>
          <td>{{ item.username || "-" }}</td>
          <td>
            <v-tooltip :text="item.source.toLowerCase()">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" size="small">
                  {{ item.icon }}
                </v-icon>
              </template>
            </v-tooltip>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-list
      v-else
      v-for="(source, sourceIndex) in identities"
      :key="source.name"
      :class="{
        'row-border': sourceIndex !== identities.length - 1,
      }"
      density="compact"
    >
      <v-list-item
        v-for="(identity, index) in sortSources(source.identities, 'source')"
        :class="{ draggable: draggable && identity.uuid !== uuid }"
        :key="identity.uuid"
        :draggable="draggable && !isLocked && identity.uuid !== uuid"
        class="pa-2 pl-0 pr-0"
        @dragstart="startDrag(identity, $event)"
        @dragend="dragEnd($event)"
      >
        <template v-slot:prepend>
          <v-tooltip :text="source.name" v-if="index === 0">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" size="small" class="mr-2">
                {{ source.icon }}
              </v-icon>
            </template>
          </v-tooltip>
          <v-spacer v-else class="mr-7" />
        </template>

        <identity
          :uuid="identity.uuid"
          :name="identity.name"
          :email="identity.email"
          :username="identity.username"
          :source="identity.source || source.name"
          :is-main="identity.uuid === uuid"
        />

        <template v-slot:append>
          <v-tooltip text="Split identity">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-call-split"
                size="x-small"
                variant="outlined"
                :disabled="identity.uuid === uuid || isLocked"
                @click="$emit('unmerge', [identity.uuid, uuid])"
              >
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Move identity">
            <template v-slot:activator="{ props }">
              <v-icon
                v-if="draggable"
                :disabled="identity.uuid === uuid || isLocked"
                v-bind="props"
                class="ml-2"
                size="x-small"
              >
                mdi-drag-vertical
              </v-icon>
            </template>
          </v-tooltip>
        </template>
      </v-list-item>
    </v-list>
    <v-card class="dragged-identity" color="primary">
      <v-card-item>
        <v-card-subtitle> Moving 1 identity</v-card-subtitle>
      </v-card-item>
    </v-card>
  </div>
</template>

<script>
import Identity from "./Identity.vue";

export default {
  name: "IdentitiesList",
  components: {
    Identity,
  },
  props: {
    identities: {
      type: Array,
      required: true,
    },
    isLocked: {
      type: Boolean,
      required: false,
      default: false,
    },
    compact: {
      type: Boolean,
      required: false,
      default: false,
    },
    uuid: {
      type: String,
      required: true,
    },
    draggable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    sortSources(identities, property) {
      return identities.slice().sort((a, b) => {
        const sourceA = a[property].toLowerCase();
        const sourceB = b[property].toLowerCase();

        return sourceA.localeCompare(sourceB);
      });
    },
    startDrag(identity, event) {
      const dragImage = document.querySelector(".dragged-identity");
      event.dataTransfer.setDragImage(dragImage, 0, 0);
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("type", "move");
      event.dataTransfer.setData("uuid", identity.uuid);
      event.target.classList.add("dragging");
    },
    dragEnd(event) {
      event.target.classList.remove("dragging");
    },
    splitAll() {
      const uuids = this.flatIdentities.map((identity) => identity.uuid);
      this.$emit("unmerge", uuids);
    },
  },
  computed: {
    identitiesCount() {
      return this.identities.reduce((a, b) => a + b.identities.length, 0);
    },
    sources() {
      return this.identities.map((identity) => identity.name);
    },
    flatIdentities() {
      return this.identities
        .map((source) =>
          source.identities.map((identity) =>
            Object.assign({ icon: source.icon }, identity)
          )
        )
        .flat();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

.draggable {
  cursor: grab;

  &:hover {
    background: #eeeeee;
  }
}

.dragged-identity {
  max-width: 300px;
  position: absolute;
  top: -3000px;
  left: -3000px;
}

.v-btn--icon {
  border-radius: 4px;
}
</style>
