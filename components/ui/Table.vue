<template>
  <table class="border-collapse w-full">
    <client-only>
      <thead>
        <tr>
          <th
            v-for="(col, index) in Object.keys(columns)"
            :key="index"
            class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
          >
            <slot
              name="colTitle"
              v-bind:item="{ data: columns[col], key: col }"
            >
              {{ columns[col] }}
            </slot>
          </th>
          <th
            v-if="actions"
            class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="datas.length > 0">
          <tr
            v-for="(data, index) in datas"
            :key="index"
            class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
          >
            <template v-for="(col, ind) in Object.keys(columns)">
              <td
                :key="ind"
                class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
              >
                <span
                  v-if="columns[col] != ''"
                  class="lg:hidden block top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                >
                  {{ columns[col] }}
                </span>
                <slot
                  name="colValue"
                  v-bind:item="{
                    data: data[col],
                    key: col,
                    index: index,
                    _id: datas[index]._id,
                  }"
                >
                  {{ data[col] }}
                </slot>
              </td>
            </template>

            <td
              v-if="actions"
              class="action__container w-full lg:w-64 p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden block top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
              >
                Action{{ actions.length > 1 ? "s" : "" }}
              </span>
              <div class="action__buttons">
                <Button
                  class="btn-black"
                  v-for="action in actions"
                  :key="action.action"
                  :btnFunc="
                    () =>
                      $emit('action', {
                        type: action.action,
                        value: datas[index]._id || datas[index].id,
                      })
                  "
                >
                  <fa :icon="action.icon" />
                </Button>
              </div>
            </td>
          </tr>
        </template>

        <tr v-else>
          <td
            :colspan="Object.keys(columns).length + 1"
            class="p-3 text-center font-medium no-data"
          >
            Pas de données disponible.
          </td>
        </tr>
      </tbody>
    </client-only>
  </table>
</template>

<script>
export default {
  props: {
    datas: !Array,
    columns: !Object,
    actions: Array,
  },
  data: function () {
    return {
      colEscape: ["_id", "__typename", "__v"],
    };
  },
};
</script>

<style lang="scss" scoped>
table {
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  color: #414141;

  th,
  td {
    background: #fff;
  }

  &.style-2 {
    box-shadow: none;

    th,
    td {
      border: unset;
      text-align: left;
    }

    tbody {
      tr {
        border-bottom: 1px solid var(--gris-2);
      }
    }
    .no-data {
      text-align: center !important;
    }
  }
}

.action {
  &__buttons {
    display: flex;
    flex-direction: row;
    max-width: 300px;

    button {
      flex: 1;
      + button {
        margin-left: 10px;
      }
    }
  }
}
</style>