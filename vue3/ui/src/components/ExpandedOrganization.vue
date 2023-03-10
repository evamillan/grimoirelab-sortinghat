<template>
  <td colspan="3">
    <v-list v-if="!isGroup" density="compact">
      <v-list-subheader>Domains ({{ domains.length }})</v-list-subheader>
      <v-list-item v-for="(item, index) in domains" :key="index">
        <v-list-item-title class="text-subtitle-2">{{
          item.domain
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-list density="compact">
      <v-list-subheader>
        Teams ({{ teams.length }}<span v-if="hasSubteams">+</span>)
        <v-btn variant="text" size="small" height="34" @click.stop="openModal">
          View all
        </v-btn>
      </v-list-subheader>
      <v-list-item v-for="(item, index) in teams" :key="index">
        <v-list-item-title class="team text-subtitle-2">
          <span class="team__name">{{ item.name }}</span>
          <v-tooltip bottom transition="expand-y-transition" open-delay="200">
            <template v-slot:activator="{ props }">
              <v-btn
                size="small"
                variant="text"
                v-bind="props"
                @click.stop="
                  $emit('getEnrollments', {
                    enrollment: item.name,
                    parentOrg: organization,
                  })
                "
              >
                {{ getEnrolledIndividuals(item.enrollments) }}
                <v-icon size="small" end> mdi-account-multiple </v-icon>
              </v-btn>
            </template>
            <span>Enrollments</span>
          </v-tooltip>
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <team-modal
      v-model:is-open="modal.open"
      :parent="organization"
      :is-group="isGroup"
      :add-team="addTeam"
      :delete-team="deleteTeam"
      :fetch-teams="fetchTeams"
      @updateTeams="getTeams"
    />
  </td>
</template>

<script>
import TeamModal from "./TeamModal.vue";

export default {
  name: "ExpandedOrganization",
  components: {
    TeamModal,
  },
  props: {
    domains: {
      type: Array,
      required: false,
    },
    organization: {
      type: String,
      required: true,
    },
    addTeam: {
      type: Function,
      required: true,
    },
    deleteTeam: {
      type: Function,
      required: true,
    },
    fetchTeams: {
      type: Function,
      required: true,
    },
    isGroup: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      teams: [],
      modal: {
        open: false,
      },
    };
  },
  computed: {
    hasSubteams() {
      return this.teams.some((team) => team.numchild > 0);
    },
  },
  methods: {
    openModal() {
      Object.assign(this.modal, { open: true });
    },
    async getTeams() {
      let filters = { organization: this.organization };
      if (this.isGroup) {
        filters = { parent: this.organization };
      }
      const response = await this.fetchTeams(filters);
      this.teams = response.data.teams.entities;
    },
    getEnrolledIndividuals(enrollments) {
      if (!enrollments) {
        return 0;
      }
      const uniqueIndividuals = new Set(
        enrollments.map((item) => item.individual.mk)
      );

      return uniqueIndividuals.size;
    },
  },
  async created() {
    await this.getTeams();
  },
};
</script>
<style lang="scss" scoped>
.team {
  display: flex;
  align-items: center;

  &__name {
    width: 44%;
    white-space: break-spaces;
  }
}
</style>
