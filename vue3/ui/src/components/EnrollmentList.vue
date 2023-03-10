<template>
  <div>
    <h4 class="d-flex justify-space-between align-baseline">
      <span class="v-list-subheader">
        Organizations ({{ Object.keys(items).length }})
      </span>
      <div v-if="!compact">
        <v-btn
          size="small"
          variant="outlined"
          prepend-icon="mdi-plus"
          class="mr-2"
          :disabled="isLocked"
          @click="$emit('openEnrollmentModal')"
        >
          Add
        </v-btn>
        <v-btn
          size="small"
          variant="outlined"
          prepend-icon="mdi-delete"
          :disabled="enrollments.length < 1 || isLocked"
          @click="withdrawAll"
        >
          Remove all
        </v-btn>
      </div>
    </h4>
    <v-table v-if="compact" density="compact" class="text-caption">
      <thead v-if="enrollments.length > 0">
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">From</th>
          <th class="text-left">To</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="enrollment in enrollments" :key="enrollment.name">
          <td>{{ enrollment.group.name }}</td>
          <td>{{ formatDate(enrollment.start) }}</td>
          <td>{{ formatDate(enrollment.end) }}</td>
        </tr>
      </tbody>
    </v-table>
    <div
      v-else
      v-for="(item, name) in items"
      :key="name"
      class="mt-4 mb-4 text-body-2"
    >
      <div
        v-for="(enrollment, index) in item.enrollments"
        :key="index"
        class="mb-2 d-flex justify-space-between align-center"
      >
        <div>
          <span class="font-weight-medium">{{ name }}</span>

          <v-menu>
            <template v-slot:activator="{ props }">
              <button
                :disabled="isLocked"
                v-bind="props"
                class="v-small-dialog__activator"
              >
                <span class="ml-6">
                  {{ formatDate(enrollment.start) }}
                </span>
                <v-icon size="small" end> mdi-lead-pencil </v-icon>
              </button>
            </template>
            <p>TODO: date picker</p>
          </v-menu>

          <!-- <v-menu
            v-model="enrollment.form.fromDateMenu"
            :close-on-content-click="false"
            :return-value="enrollment.form.fromDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <button
                :disabled="isLocked"
                v-on="on"
                class="v-small-dialog__activator"
              >
                <span class="grey--text text--darken-2 ml-6">
                  {{ formatDate(enrollment.start) }}
                </span>
                <v-icon small right> mdi-lead-pencil </v-icon>
              </button>
            </template>
            <v-date-picker
              v-model="enrollment.form.fromDate"
              :max="enrollment.end"
              color="primary"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="enrollment.form.fromDateMenu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="
                  $emit('updateEnrollment', {
                    fromDate: enrollment.start,
                    toDate: enrollment.end,
                    newFromDate: new Date(
                      enrollment.form.fromDate
                    ).toISOString(),
                    group: enrollment.group.name,
                  });
                  enrollment.form.fromDateMenu = false;
                "
              >
                Save
              </v-btn>
            </v-date-picker>
          </v-menu> -->
          -
          <v-menu>
            <template v-slot:activator="{ props }">
              <button
                :disabled="isLocked"
                v-bind="props"
                class="v-small-dialog__activator"
              >
                <span class="ml-6">
                  {{ formatDate(enrollment.end) }}
                </span>
                <v-icon size="small" end> mdi-lead-pencil </v-icon>
              </button>
            </template>
            <p>TODO: date picker</p>
          </v-menu>
          <!-- <v-menu
            v-model="enrollment.form.toDateMenu"
            :close-on-content-click="false"
            :return-value="enrollment.form.toDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <button
                :disabled="isLocked"
                v-on="on"
                class="v-small-dialog__activator ml-5"
              >
                <span class="grey--text text--darken-2 ml-2">
                  {{ formatDate(enrollment.end) }}
                </span>
                <v-icon small right> mdi-lead-pencil </v-icon>
              </button>
            </template>
            <v-date-picker
              v-model="enrollment.form.toDate"
              :min="enrollment.start"
              color="primary"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="enrollment.form.toDateMenu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="
                  $emit('updateEnrollment', {
                    fromDate: enrollment.start,
                    toDate: enrollment.end,
                    newToDate: new Date(enrollment.form.toDate).toISOString(),
                    group: enrollment.group.name,
                  });
                  enrollment.form.toDateMenu = false;
                "
              >
                Save
              </v-btn>
            </v-date-picker>
          </v-menu> -->
        </div>
        <div>
          <v-btn
            :disabled="isLocked"
            size="small"
            variant="outlined"
            prepend-icon="mdi-account-multiple-plus"
            class="mr-2"
            @click="$emit('openTeamModal', enrollment.group.name)"
          >
            Add team
          </v-btn>
          <v-btn
            :disabled="isLocked"
            size="x-small"
            variant="outlined"
            icon="mdi-delete"
            @click="
              $emit('withdraw', {
                name: enrollment.group.name,
                fromDate: enrollment.start,
                toDate: enrollment.end,
              })
            "
          >
          </v-btn>
        </div>
      </div>

      <ul class="ma-2 mr-0">
        <li
          v-for="team in item.teams"
          :key="team.group.name"
          class="d-flex justify-space-between pr-0"
        >
          <div class="d-flex align-center">
            <span class="ml-3 mr-4 font-weight-medium">{{
              team.group.name
            }}</span>

            <v-menu>
              <template v-slot:activator="{ props }">
                <button
                  :disabled="isLocked"
                  v-bind="props"
                  class="v-small-dialog__activator"
                >
                  <span class="ml-6">
                    {{ formatDate(team.start) }}
                  </span>
                  <v-icon size="small" end> mdi-lead-pencil </v-icon>
                </button>
              </template>
              <p>TODO: date picker</p>
            </v-menu>

            <!-- <v-menu
              v-model="team.form.fromDateMenu"
              :close-on-content-click="false"
              :return-value="team.form.fromDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <button
                  :disabled="isLocked"
                  v-on="on"
                  class="v-small-dialog__activator"
                >
                  <span class="grey--text text--darken-2 ml-6">
                    {{ formatDate(team.start) }}
                  </span>
                  <v-icon small right> mdi-lead-pencil </v-icon>
                </button>
              </template>
              <v-date-picker
                v-model="team.form.fromDate"
                :max="team.end"
                color="primary"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="team.form.fromDateMenu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="
                    $emit('updateEnrollment', {
                      fromDate: team.start,
                      toDate: team.end,
                      newFromDate: new Date(team.form.fromDate).toISOString(),
                      group: team.group.name,
                      parentOrg: team.group.parentOrg.name,
                    });
                    team.form.fromDateMenu = false;
                  "
                >
                  Save
                </v-btn>
              </v-date-picker>
            </v-menu> -->
            -
            <v-menu>
              <template v-slot:activator="{ props }">
                <button
                  :disabled="isLocked"
                  v-bind="props"
                  class="v-small-dialog__activator"
                >
                  <span class="ml-2">
                    {{ formatDate(team.end) }}
                  </span>
                  <v-icon size="small" end> mdi-lead-pencil </v-icon>
                </button>
              </template>
              <p>TODO: date picker</p>
            </v-menu>
            <!-- <v-menu
              v-model="team.form.toDateMenu"
              :close-on-content-click="false"
              :return-value="team.form.toDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <button
                  :disabled="isLocked"
                  v-on="on"
                  class="v-small-dialog__activator ml-5"
                >
                  <span class="grey--text text--darken-2 ml-2">
                    {{ formatDate(team.end) }}
                  </span>
                  <v-icon small right> mdi-lead-pencil </v-icon>
                </button>
              </template>
              <v-date-picker
                v-model="team.form.toDate"
                :min="team.start"
                color="primary"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="team.form.toDateMenu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="
                    $emit('updateEnrollment', {
                      fromDate: team.start,
                      toDate: team.end,
                      newToDate: new Date(team.form.toDate).toISOString(),
                      group: team.group.name,
                      parentOrg: team.group.parentOrg.name,
                    });
                    team.form.toDateMenu = false;
                  "
                >
                  Save
                </v-btn>
              </v-date-picker>
            </v-menu> -->
          </div>

          <v-btn
            :disabled="isLocked"
            icon="mdi-delete"
            size="x-small"
            @click="
              $emit('withdraw', {
                name: team.group.name,
                fromDate: team.start,
                toDate: team.end,
                parentOrg: team.group.parentOrg.name,
              })
            "
          >
          </v-btn>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "EnrollmentList",
  props: {
    enrollments: {
      type: Array,
      required: true,
    },
    compact: {
      type: Boolean,
      required: false,
      default: false,
    },
    isLocked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      items: {},
    };
  },
  methods: {
    formatDate(dateTime) {
      return dateTime.split("T")[0];
    },
    groupEnrollments(enrollments) {
      return enrollments.reduce(function (acc, obj) {
        const form = {
          fromDate: obj.start.split("T")[0],
          fromDateMenu: false,
          toDate: obj.end.split("T")[0],
          toDateMenu: false,
        };

        if (obj.group.parentOrg) {
          const parent = obj.group.parentOrg.name;
          if (!acc[parent]) {
            acc[parent] = {
              enrollments: [],
              teams: [],
            };
          }
          obj = Object.assign({}, obj, { form: form });
          acc[parent].teams.push(obj);
        } else {
          const key = obj.group.name;
          if (!acc[key]) {
            acc[key] = {
              enrollments: [],
              teams: [],
            };
          }
          obj = Object.assign({}, obj, { form: form });
          acc[key].enrollments.push(obj);
        }
        return acc;
      }, {});
    },
    withdrawAll() {
      this.enrollments.forEach((enrollment) => {
        this.$emit("withdraw", {
          name: enrollment.group.name,
          fromDate: enrollment.start,
          toDate: enrollment.end,
          parentOrg: enrollment.group.parentOrg
            ? enrollment.group.parentOrg.name
            : null,
        });
      });
    },
  },
  watch: {
    enrollments(value) {
      this.items = this.groupEnrollments(value);
    },
  },
  created() {
    this.items = this.groupEnrollments(this.enrollments);
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";
.indented {
  margin-left: 56px;
  margin-right: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
  }
}

.v-small-dialog__activator {
  .v-icon {
    opacity: 0;
    padding-bottom: 2px;
  }

  &:hover {
    .v-icon {
      opacity: 1;
    }
  }
}
.v-small-dialog,
::v-deep .v-small-dialog__activator {
  display: inline-block;
}

ul {
  position: relative;

  &::before {
    content: "";
    display: block;
    width: 0;
    position: absolute;
    top: 0;
    bottom: 24px;
    left: 4px;
    border-left: thin solid $border-color;
  }

  li {
    position: relative;
    list-style-type: none;
    padding: 8px 16px;

    &::before {
      content: "";
      display: block;
      width: 12px;
      height: 0;
      border-top: thin solid $border-color;
      position: absolute;
      top: 50%;
      left: 4px;
    }
  }
}

.v-btn--icon {
  border-radius: 4px;
}
</style>
