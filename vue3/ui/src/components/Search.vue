<template>
  <div class="d-flex">
    <v-text-field
      v-model.trim="inputValue"
      prepend-inner-icon="mdi-magnify"
      class="search pa-0 flex-grow-0"
      :error-messages="errorMessage"
      clearable
      label="Search"
      type="text"
      hint=" "
      density="compact"
      variant="outlined"
      persistent-hint
      single-line
      @click:prepend-inner="search"
      @click:clear="clear"
      @keyup.enter="search"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <template v-slot:prepend v-if="filterSelector">
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="text-body-1"
              variant="flat"
              color="white"
              height="30"
            >
              Filters
              <v-icon small right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list density="compact" class="mt-1">
            <v-list-item
              v-for="(item, i) in validFilters"
              :key="i"
              @click="setFilter(item)"
            >
              <v-list-item-title>
                {{ item.filter }}
              </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item to="/search-help" target="_blank">
              <v-list-item-title>
                <v-icon small left>mdi-open-in-new</v-icon>
                View search syntax
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-text-field>
    <v-select
      v-if="orderSelector"
      v-model="order.value"
      :items="orderOptions"
      :menu-props="{ offsetY: true, bottom: true, nudgeTop: 8 }"
      item-title="text"
      item-value="value"
      label="Order by"
      class="select"
      density="compact"
      variant="outlined"
      attach
      single-line
      ref="orderSelector"
      @update:modelValue="search"
    >
      <template v-slot:prepend>
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="text-body-1"
              variant="flat"
              color="white"
              height="30"
              @click="changeOrder"
            >
              <v-icon small>
                {{
                  order.descending
                    ? "mdi-sort-descending"
                    : "mdi-sort-ascending"
                }}
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ order.descending ? "Descending " : "Ascending " }} order
          </span>
        </v-tooltip>
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    filterSelector: {
      type: Boolean,
      required: false,
      default: false,
    },
    orderSelector: {
      type: Boolean,
      required: false,
      default: false,
    },
    setFilters: {
      type: String,
      required: false,
    },
    validFilters: {
      type: Array,
      required: false,
      default: () => [
        {
          filter: "country",
          type: "string",
        },
        {
          filter: "isBot",
          type: "boolean",
        },
        {
          filter: "isLocked",
          type: "boolean",
        },
        {
          filter: "gender",
          type: "string",
        },
        {
          filter: "lastUpdated",
          type: "date",
        },
        {
          filter: "source",
          type: "string",
        },
        {
          filter: "enrollment",
          type: "string",
        },
        {
          filter: "enrollmentParentOrg",
          type: "string",
        },
        {
          filter: "enrollmentDate",
          type: "date",
        },
        {
          filter: "isEnrolled",
          type: "boolean",
        },
      ],
    },
    orderOptions: {
      type: Array,
      required: false,
      default: () => [
        {
          text: "Last updated",
          value: "lastModified",
        },
      ],
    },
  },
  data() {
    return {
      inputValue: "",
      filters: {},
      isFocused: false,
      errorMessage: undefined,
      dialog: false,
      order: {
        value: undefined,
        descending: true,
      },
    };
  },
  methods: {
    search() {
      this.parseFilters();
      if (this.errorMessage) return;
      const order = this.getOrder();
      this.$emit("search", this.filters, order);
    },
    parseFilters() {
      const terms = [];
      this.filters = {};
      this.errorMessage = undefined;

      if (!this.inputValue) return;

      const input = this.parseQuotes(this.inputValue);
      input.split(" ").forEach((value) => {
        if (value.includes(":")) {
          const [filter, text] = value.split(":");
          if (
            this.validFilters.length === 0 ||
            !this.validFilters.find((vfilter) => vfilter.filter === filter)
          ) {
            this.errorMessage = `Invalid filter "${filter}"`;
          } else if (this.isDateFilter(filter)) {
            this.parseDateFilter(text, filter);
          } else if (this.isBooleanFilter(filter)) {
            this.parseBooleanFilter(filter, text);
          } else {
            this.filters[filter] = text;
          }
        } else {
          terms.push(value);
        }
      });

      if (terms.length > 0) {
        this.filters.term = terms.join(" ").trim();
      }
    },
    parseDateFilter(inputValue, filter) {
      const operator = ["<=", ">=", "<", ">", ".."].find((value) =>
        inputValue.includes(value)
      );

      if (!operator) {
        return (this.errorMessage = "Invalid operator");
      }

      const values = inputValue.replace(operator, ` ${operator} `).split(" ");

      try {
        this.filters[filter] = values
          .map((value) => {
            if (value) {
              return value === operator
                ? operator
                : new Date(value).toISOString();
            }
          })
          .join("");
      } catch (error) {
        this.errorMessage = "Invalid date";
      }
    },
    parseBooleanFilter(filter, value) {
      if (value === "true") {
        this.filters[filter] = true;
      } else if (value === "false") {
        this.filters[filter] = false;
      } else {
        this.errorMessage = "Accepted values are true and false";
      }
    },
    parseQuotes(input) {
      const regexp = /(\w*):"(.*?)"/gm;
      const matches = [...input.matchAll(regexp)];

      matches.forEach((match) => {
        const filter = match[1];
        const value = match[2];
        if (this.validFilters.find((vfilter) => vfilter.filter === filter)) {
          if (this.isDateFilter(filter)) {
            this.parseDateFilter(value, filter);
          } else if (this.isBooleanFilter(filter)) {
            this.parseBooleanFilter(filter, value);
          } else {
            this.filters[filter] = value;
          }
          input = input.replace(match[0], "");
        } else {
          this.errorMessage = `Invalid filter "${filter}"`;
        }
      });

      return input;
    },
    clear() {
      const order = this.getOrder();
      this.inputValue = "";
      this.filters = {};
      this.errorMessage = undefined;
      this.$emit("search", {}, order);
    },
    isBooleanFilter(filter) {
      const validFilter = this.validFilters.find(
        (vfilter) => vfilter.filter === filter
      );
      return validFilter.type === "boolean";
    },
    isDateFilter(filter) {
      const validFilter = this.validFilters.find(
        (vfilter) => vfilter.filter === filter
      );
      return validFilter.type === "date";
    },
    setFilter(item) {
      if (this.inputValue && !this.inputValue.endsWith(" ")) {
        this.inputValue += " ";
      } else if (!this.inputValue) {
        this.inputValue = "";
      }
      if (this.isDateFilter(item.filter)) {
        const [month, day, year] = new Date()
          .toLocaleDateString("en-US")
          .split("/");
        this.inputValue += `${item.filter}:>=${year}-${month}-${day} `;
      } else if (this.isBooleanFilter(item.filter)) {
        this.inputValue += `${item.filter}:true `;
      } else {
        this.inputValue += `${item.filter}:"search value" `;
      }
    },
    getOrder() {
      let order;
      if (this.order.value) {
        order = `${this.order.descending ? "-" : ""}${this.order.value}`;
      }
      return order;
    },
    changeOrder() {
      this.order.descending = !this.order.descending;
      if (this.order.value) {
        this.search();
      }
    },
  },
  watch: {
    setFilters(value) {
      this.inputValue = value;
      this.search();
    },
  },
};
</script>
<style lang="scss" scoped>
.search,
.select {
  height: 32px;
  width: 100%;
  margin-top: 2px;
  font-size: 0.9rem;

  :deep(fieldset) {
    height: 37px;
  }
  :deep(.v-label) {
    font-size: 0.9rem;
    line-height: 16px;
  }
  :deep(.v-field__input) {
    min-height: 32px;
    padding-top: 3px;
    padding-bottom: 2px;
    font-size: 0.9rem;
  }

  .v-input--density-compact {
    --v-input-control-height: 30px;
  }
}
:deep(.v-input--density-compact) {
  .v-input__prepend {
    border: solid rgba(0, 0, 0, 0.38);
    border-width: 1px 0 1px 1px;
    border-radius: 4px 0 0 4px;
    margin: 0;
    padding: 0;

    .v-btn {
      border-radius: 4px 0 0 4px;
      span {
        font-size: 0.9rem;
        text-transform: capitalize;
        letter-spacing: normal;
      }
    }
  }
  :deep(.v-input__append-inner),
  :deep(.v-input__append-outer),
  :deep(.v-input__prepend-inner) {
    margin-top: 4px;
  }

  :deep(.v-icon.v-icon) {
    font-size: 1.1rem;
  }
}

.select {
  max-width: 12rem;
  margin-left: 1rem;

  .v-select__selection {
    margin-top: 0;
    height: 37px;
  }

  :deep(.v-select__slot) {
    height: 30px;
  }

  .v-input__prepend-outer > .v-btn {
    padding: 0 8px;
    min-width: 40px;
  }
}

:deep(.v-field__prepend-inner),
:deep(.v-field__clearable) {
  .v-icon {
    font-size: 1.1rem;
  }
}

:deep(.v-field__append-inner) {
  padding-top: 4px;
}

:deep(.v-input__prepend) + .v-input__control .v-field__outline__start {
  border-radius: 0;
}
</style>
