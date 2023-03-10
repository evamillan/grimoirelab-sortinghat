<template>
  <section class="section">
    <v-row class="header">
      <h3 class="title">
        <v-icon color="black" size="small" start> mdi-account </v-icon>
        Individuals
        <v-chip
          pill
          density="compact"
          class="ml-2"
          data-cy="individual-counter"
        >
          {{ totalResults }}
        </v-chip>
      </h3>
      <div>
        <recommendations @updateTable="queryIndividuals" />
        <v-btn
          height="34"
          color="secondary"
          class="black--text"
          size="small"
          variant="flat"
          data-cy="individual-add"
          @click.stop="openModal = true"
        >
          Add
        </v-btn>
      </div>
    </v-row>

    <v-row class="actions">
      <!-- <v-checkbox
        v-model="allSelected"
        value
        class="mt-0"
        :indeterminate="isIndeterminate"
        :label="
          selectedIndividuals.length === 0
            ? 'Select all'
            : `${selectedIndividuals.length} selected`
        "
        @change="selectAll($event)"
      >
      </v-checkbox> -->
      <search
        class="pa-0 flex-grow-1"
        @search="filterSearch"
        filter-selector
        order-selector
        :order-options="[
          {
            text: 'Last updated',
            value: 'lastModified',
          },
          {
            text: 'Created date',
            value: 'createdAt',
          },
          {
            text: 'Name',
            value: 'profile__name',
          },
          {
            text: 'Identities',
            value: 'identitiesCount',
          },
        ]"
        :set-filters="setFilters"
      />
      <v-btn
        size="small"
        variant="outlined"
        height="34"
        class="mr-4 ml-4 order-2"
        data-cy="merge-button"
        :disabled="disabledMerge"
        @click="mergeSelected(selected)"
      >
        <v-icon size="small" start>mdi-call-merge</v-icon>
        Merge
      </v-btn>
      <v-btn
        size="small"
        variant="outlined"
        class="order-3"
        height="34"
        data-cy="delete-button"
        :disabled="disabledActions"
        @click="confirmDelete(selected)"
      >
        <v-icon size="small" start>mdi-delete</v-icon>
        Delete
      </v-btn>
    </v-row>

    <v-data-table-server
      v-model="selected"
      :expanded="expandedItems"
      :headers="headers"
      :items="individuals"
      :items-length="totalResults"
      :items-per-page="options.itemsPerPage"
      :page="options.page"
      item-key="uuid"
      item-props
      return-object
      show-select
      @update:expanded="($event) => (expandedItems = $event)"
      @update:options="options = $event"
    >
      <template
        v-slot:item="{
          item,
          isExpanded,
          toggleExpand,
          isSelected,
          toggleSelect,
        }"
      >
        <individual-entry
          draggable="true"
          :name="item.props.name"
          :organization="item.props.organization"
          :email="item.props.email"
          :username="item.props.username"
          :sources="item.props.sources"
          :uuid="item.props.uuid"
          :is-expanded="isExpanded(item)"
          :is-locked="item.props.isLocked"
          :is-bot="item.props.isBot"
          :is-selected="isSelected([item])"
          :is-highlighted="item.props.uuid === highlightIndividual"
          @dblclick="toggleExpand(item)"
          @expand="toggleExpand(item)"
          @edit="updateProfileInfo($event, item.props.uuid)"
          @saveIndividuals="$emit('saveIndividuals', [item.props])"
          @dragstart="startDrag(item, isSelected, toggleSelect, $event)"
          @dragend="removeClass(item, $event)"
          @select="toggleSelect(item)"
          @delete="confirmDelete([item.props])"
          @merge="mergeSelected([item.props.uuid, ...$event])"
          @move="move($event)"
          @highlight="$emit('highlight', item.props)"
          @stopHighlight="$emit('stopHighlight', item.props)"
          @lock="handleLock(item.props.uuid, $event)"
          @enroll="confirmEnroll(item.props.uuid, $event)"
        />
      </template>
      <template v-slot:expanded-row="{ item }">
        <expanded-individual
          :uuid="item.props.uuid"
          :gender="item.props.gender"
          :country="item.props.country"
          :is-bot="item.props.isBot"
          :is-locked="item.props.isLocked"
          :enrollments="item.props.enrollments"
          :identities="item.props.identities"
          :get-countries="getCountries"
          class="pl-8 pt-1 pr-8 pb-1"
          @edit="updateProfileInfo($event, item.uuid)"
          @unmerge="unmerge($event)"
          @withdraw="removeAffiliation($event, item.uuid)"
          @updateEnrollment="updateEnrollmentDate"
          @openEnrollmentModal="confirmEnroll"
          @openTeamModal="openTeamModal"
        />
      </template>
    </v-data-table-server>

    <!-- <div class="d-flex align-baseline text-center pt-2">
      <v-col cols="8" class="ml-auto">
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="7"
          @input="queryIndividuals($event)"
        ></v-pagination>
      </v-col>
      <v-col cols="2">
        <v-text-field
          :value="itemsPerPage"
          class="mr-3"
          label="Items per page"
          type="number"
          min="1"
          :max="totalResults"
          @change="changeItemsPerPage($event)"
        ></v-text-field>
      </v-col>
    </div> -->

    <!-- TODO date-input -->
    <v-dialog v-model="dialog.open" max-width="500px">
      <v-card class="pa-3">
        <v-card-title class="headline">{{ dialog.title }}</v-card-title>
        <v-card-text>
          <p v-if="dialog.text" class="pt-2 pb-2 text-body-2">
            {{ dialog.text }}
          </p>
          <div v-if="dialog.showDates">
            <h6 class="subheader">Enrollment dates (optional)</h6>
            <v-row>
              <v-col cols="6">
                <!-- <date-input
                  v-model="dialog.dateFrom"
                  label="Date from"
                  outlined
                /> -->
              </v-col>
              <v-col cols="6">
                <!-- <date-input v-model="dialog.dateTo" label="Date to" outlined /> -->
              </v-col>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions v-if="dialog.action">
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog"> Cancel </v-btn>
          <v-btn
            color="primary"
            id="confirm"
            variant="flat"
            @click.stop="dialog.action"
          >
            Confirm
          </v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="closeDialog"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <profile-modal
      v-model:is-open="openModal"
      :add-identity="addIdentity"
      :updateProfile="updateProfile"
      :enroll="enroll"
      :get-countries="getCountries"
      :fetch-organizations="fetchOrganizations"
      @updateTable="queryIndividuals"
      @updateOrganizations="$emit('updateOrganizations')"
    />

    <!-- <enroll-modal
      :is-open="enrollmentModal.open"
      :title="enrollmentModal.title"
      :text="enrollmentModal.text"
      :organization="enrollmentModal.organization"
      :uuid="enrollmentModal.uuid"
      :enroll="enrollIndividual"
      :fetch-organizations="fetchOrganizations"
    />

    <team-enroll-modal
      v-if="teamModal.isOpen"
      :is-open="teamModal.isOpen"
      :organization="teamModal.organization"
      :uuid="teamModal.uuid"
      :enroll="enroll"
      @updateTable="queryIndividuals"
    /> -->

    <v-card class="dragged-item pa-2" color="primary" dark>
      <v-card-subtitle>
        Moving
        {{ selected.length }}
        {{ this.selected.length > 1 ? "individuals" : "individual" }}
      </v-card-subtitle>
    </v-card>
  </section>
</template>

<script>
import {
  mergeIndividuals,
  moveIdentity,
  formatIndividuals,
} from "../utils/actions";
import { enrollMixin } from "../mixins/enroll";
import IndividualEntry from "./IndividualEntry.vue";
import ExpandedIndividual from "./ExpandedIndividual.vue";
import ProfileModal from "./ProfileModal.vue";
import Search from "./Search.vue";
// import EnrollModal from "./EnrollModal.vue";
// import TeamEnrollModal from "./TeamEnrollModal.vue";
import Recommendations from "./Recommendations.vue";
import { nextTick } from "vue";

export default {
  name: "IndividualsTable",
  components: {
    IndividualEntry,
    ExpandedIndividual,
    ProfileModal,
    Search,
    // EnrollModal,
    // TeamEnrollModal,
    Recommendations,
  },
  mixins: [enrollMixin],
  props: {
    fetchPage: {
      type: Function,
      required: true,
    },
    deleteItem: {
      type: Function,
      required: true,
    },
    mergeItems: {
      type: Function,
      required: true,
    },
    unmergeItems: {
      type: Function,
      required: true,
    },
    highlightIndividual: {
      type: String,
      required: false,
    },
    moveItem: {
      type: Function,
      required: true,
    },
    addIdentity: {
      type: Function,
      required: true,
    },
    updateProfile: {
      type: Function,
      required: true,
    },
    enroll: {
      type: Function,
      required: true,
    },
    getCountries: {
      type: Function,
      required: true,
    },
    lockIndividual: {
      type: Function,
      required: true,
    },
    unlockIndividual: {
      type: Function,
      required: true,
    },
    updateEnrollment: {
      type: Function,
      required: true,
    },
    withdraw: {
      type: Function,
      required: true,
    },
    setFilters: {
      type: String,
      required: false,
    },
    fetchOrganizations: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      filters: {},
      headers: [
        { value: "name" },
        { value: "email" },
        { value: "sources" },
        { value: "actions" },
      ],
      individuals: [],
      expandedItems: [],
      pageCount: 0,
      dialog: {
        open: false,
        title: "",
        text: "",
        action: "",
      },
      openModal: false,
      totalResults: 0,
      allSelected: false,
      orderBy: null,
      teamModal: {
        isOpen: false,
        organization: null,
        uuid: null,
      },
      selected: [],
      options: {
        page: 1,
        itemsPerPage: 10,
      },
    };
  },
  computed: {
    disabledActions() {
      return (
        this.selected.filter((individual) => !individual.isLocked).length === 0
      );
    },
    disabledMerge() {
      return (
        this.selected.filter((individual) => !individual.isLocked).length < 2
      );
    },
    // selectedIndividuals() {
    //   return this.individuals.filter((individual) => individual.isSelected);
    // },
    // isIndeterminate() {
    //   return (
    //     this.selectedIndividuals.length < this.individuals.length &&
    //     this.selectedIndividuals.length !== 0
    //   );
    // },
  },
  created() {
    // this.queryIndividuals(1);
  },
  methods: {
    async queryIndividuals(
      page = this.options.page,
      itemsPerPage = this.options.itemsPerPage,
      filters = this.filters,
      orderBy = this.orderBy
    ) {
      if (this.disabledSearch) return;
      let response = await this.fetchPage(page, itemsPerPage, filters, orderBy);
      if (response) {
        this.individuals = formatIndividuals(
          response.data.individuals.entities
        );
        this.pageCount = response.data.individuals.pageInfo.numPages;
        // this.page = response.data.individuals.pageInfo.page;
        this.totalResults = response.data.individuals.pageInfo.totalResults;
        this.allSelected = false;
        this.$emit("updateIndividuals", this.individuals);
      }
    },
    async startDrag(item, isSelected, toggleSelect, event) {
      if (!isSelected([item])) {
        await toggleSelect(item);
      }
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData("individuals", JSON.stringify(this.selected));
      const dragImage = document.querySelector(".dragged-item");
      event.dataTransfer.setDragImage(dragImage, 0, 0);
      const lockedIndividuals = this.selected.filter(
        (individual) => individual.isLocked
      );
      if (lockedIndividuals.length === this.selected.length) {
        event.dataTransfer.setData("lockActions", true);
      }
    },
    removeClass(item, event) {
      event.target.classList.remove("dragging");
    },
    async selectIndividual(toggleSelect, individual) {
      await toggleSelect(individual);
      await nextTick();
      // individual.isSelected = !individual.isSelected;
      // this.allSelected =
      //   this.selectedIndividuals.length === this.individuals.length;
    },
    deselectIndividuals() {
      this.individuals.forEach((individual) => (individual.isSelected = false));
      this.allSelected = false;
    },
    async deleteIndividuals(individuals) {
      const response = await Promise.all(
        individuals.map((individual) => this.deleteItem(individual.uuid))
      );
      if (response) {
        this.$logger.debug(
          "Deleted individuals",
          individuals.map((individual) => individual.uuid)
        );
        this.$emit("updateWorkspace", {
          remove: individuals.map((individual) => individual.uuid),
        });
        this.queryIndividuals(this.page);
        this.dialog.open = false;
      }
    },
    confirmDelete(individuals) {
      individuals = individuals.filter((individual) => !individual.isLocked);
      const names = individuals.map((individual) => individual.name).join(", ");
      Object.assign(this.dialog, {
        open: true,
        title: "Delete the selected individuals?",
        text: names,
        action: () => this.deleteIndividuals(individuals),
      });
    },
    async merge(fromUuids, toUuid) {
      try {
        const response = await this.mergeItems(fromUuids, toUuid);
        if (response) {
          this.queryIndividuals(this.page);
          this.dialog.open = false;
          this.$emit("updateWorkspace", {
            update: formatIndividuals([response.data.merge.individual]),
            remove: fromUuids,
          });
          this.$logger.debug("Merged individuals", { fromUuids, toUuid });
        }
      } catch (error) {
        Object.assign(this.dialog, {
          open: true,
          title: "Error",
          text: this.$getErrorMessage(error),
          action: null,
        });
        this.$logger.error(`Error merging individuals: ${error}`, {
          fromUuids,
          toUuid,
        });
      }
    },
    mergeSelected(individuals) {
      if (individuals.length > 1) {
        mergeIndividuals(individuals, this.merge, this.dialog);
      }
    },
    async unmerge(uuids) {
      try {
        const response = await this.unmergeItems(uuids);
        if (response && response.data) {
          const unmergedItems = formatIndividuals(
            response.data.unmergeIdentities.individuals
          );
          this.$emit("saveIndividuals", unmergedItems, true);
          this.$emit("updateWorkspace", {
            update: formatIndividuals(
              response.data.unmergeIdentities.individuals
            ),
          });
          this.queryIndividuals(this.page);
          this.$logger.debug("Unmerged individuals", uuids);
        }
      } catch (error) {
        Object.assign(this.dialog, {
          open: true,
          title: "Error",
          text: this.$getErrorMessage(error),
          action: null,
        });
        this.$logger.error(`Error unmerging individuals ${uuids}: ${error}`);
      }
    },
    move(event) {
      moveIdentity(event.fromUuid, event.toUuid, this.moveAction, this.dialog);
    },
    async moveAction(fromUuid, toUuid) {
      this.dialog.open = false;
      try {
        const response = await this.moveItem(fromUuid, toUuid);
        if (response) {
          this.queryIndividuals(this.options.page);
          this.$emit("updateWorkspace", {
            update: formatIndividuals([response.data.moveIdentity.individual]),
          });
          this.$logger.debug("Moved identity", { fromUuid, toUuid });
        }
      } catch (error) {
        Object.assign(this.dialog, {
          open: true,
          title: "Error",
          text: this.$getErrorMessage(error),
          action: null,
        });
        this.$logger.error(`Error moving ${fromUuid} to ${toUuid}: ${error}`);
      }
    },
    async updateProfileInfo(data, uuid) {
      try {
        const response = await this.updateProfile(data, uuid);
        if (response && response.data.updateProfile) {
          this.queryIndividuals();
          this.$emit("updateWorkspace", {
            update: formatIndividuals([response.data.updateProfile.individual]),
          });
          this.$logger.debug(`Updated profile ${uuid}`, data);
        }
      } catch (error) {
        Object.assign(this.dialog, {
          open: true,
          title: "Error",
          text: this.$getErrorMessage(error),
          action: null,
        });
        this.$logger.error(`Error updating profile: ${error}`, data);
      }
    },
    async handleLock(uuid, lock) {
      if (lock) {
        try {
          const response = await this.lockIndividual(uuid);
          if (response) {
            this.queryIndividuals();
            this.$logger.debug(`Locked individual ${uuid}`);
          }
        } catch (error) {
          Object.assign(this.dialog, {
            open: true,
            title: "Error",
            text: this.$getErrorMessage(error),
            action: null,
          });
          this.$logger.error(`Error locking individual ${uuid}: ${error}`);
        }
      } else {
        try {
          const response = await this.unlockIndividual(uuid);
          if (response) {
            this.queryIndividuals();
            this.$logger.debug(`Unlocked individual ${uuid}`);
          }
        } catch (error) {
          Object.assign(this.dialog, {
            open: true,
            title: "Error",
            text: this.$getErrorMessage(error),
            action: null,
          });
          this.$logger.error(`Error unlocking individual ${uuid}: ${error}`);
        }
      }
    },
    async removeAffiliation(group, uuid) {
      try {
        const response = await this.withdraw(
          uuid,
          group.name,
          group.fromDate,
          group.toDate,
          group.parentOrg
        );
        if (response && response.data.withdraw) {
          this.queryIndividuals();
          this.$emit("updateWorkspace", {
            update: formatIndividuals([response.data.withdraw.individual]),
          });
          this.$logger.debug("Removed affiliation", { uuid, ...group });
          if (!group.parentOrg) {
            this.$emit("updateOrganizations");
          }
        }
      } catch (error) {
        Object.assign(this.dialog, {
          open: true,
          title: "Error",
          text: this.$getErrorMessage(error),
          action: null,
        });
        this.$logger.error(`Error removing affiliation: ${error}`, {
          uuid,
          ...group,
        });
      }
    },
    async updateEnrollmentDate(data) {
      try {
        const response = await this.updateEnrollment(data);
        if (response && response.data.updateEnrollment) {
          this.$emit("updateWorkspace", {
            update: formatIndividuals([
              response.data.updateEnrollment.individual,
            ]),
          });
          this.queryIndividuals();
          this.$logger.debug("Updated enrollment", data);
        }
      } catch (error) {
        Object.assign(this.dialog, {
          open: true,
          title: "Error",
          text: this.$getErrorMessage(error),
          action: null,
        });
        this.$logger.error(`Error updating enrollment: ${error}`, data);
      }
    },
    filterSearch(filters, orderBy) {
      this.filters = filters;
      this.orderBy = orderBy;
      this.queryIndividuals(1);
    },
    selectAll(value) {
      this.individuals.forEach((individual) => (individual.isSelected = value));
    },
    changeItemsPerPage(value) {
      if (value) {
        this.itemsPerPage = parseInt(value, 10);
        this.queryIndividuals(1);
      }
    },
    closeDialog() {
      Object.assign(this.dialog, {
        open: false,
        title: "",
        text: "",
        action: "",
        showDates: false,
        dateFrom: null,
        dateTo: null,
      });
    },
    openTeamModal(data) {
      const { organization, uuid } = data;
      Object.assign(this.teamModal, {
        isOpen: true,
        organization,
        uuid,
      });
    },
  },
  watch: {
    options: {
      handler() {
        this.queryIndividuals();
        this.selected = [];
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../styles/index.scss";
::v-deep .v-data-table__wrapper {
  overflow-x: hidden;
}
.actions {
  // ::v-deep .v-label {
  //   font-size: 0.9rem;
  // }

  ::v-deep .v-input--checkbox {
    padding-top: 6px;
    margin-left: -1px;
  }

  .search-box {
    margin-left: 32px;
  }

  // Breakpoint for Material Design medium laptop missing on Vuetify
  @media only screen and (max-width: 1439px) {
    .v-input--checkbox {
      order: 1;
      margin-right: auto;
    }

    .search-box {
      margin: 0;
      flex-basis: 100%;
    }
  }
}
.dragged-item {
  max-width: 300px;
  position: absolute;
  top: -300px;
}

:deep(.v-data-table-footer__items-per-page) {
  display: none;
}
</style>
