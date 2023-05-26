<template>
  <!--  {{ userList }}-->
  <a-table
    :columns="columns"
    :data-source="userList"
    :pagination="pagination"
    @change="handleTableChange"
  >
    <template
      #filterDropdown="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        column,
      }"
    >
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          size="small"
          style="width: 90px; margin-right: 8px"
          type="primary"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon>
            <SearchOutlined />
          </template>
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
    </template>
    <template #filterIcon="filtered">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #customRender="{ text, column }">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <template v-else>
        {{ text }}
      </template>
    </template>
  </a-table>
</template>

<script>
import { SearchOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, toRefs } from "vue";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    role: "student",
    mail: "XXXXXXXXXX@mail.com",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    role: "student",
    mail: "XXXXXXXXXX@mail.com",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    role: "student",
    mail: "XXXXXXXXXX@mail.com",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    role: "student",
    mail: "XXXXXXXXXX@mail.com",
  },
];

export default defineComponent({
  components: {
    SearchOutlined,
  },
  props: {
    userList: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const state = reactive({
      searchText: "",
      searchedColumn: "",
    });

    const searchInput = ref();

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        slots: {
          filterDropdown: "filterDropdown",
          filterIcon: "filterIcon",
          customRender: "customRender",
        },
        onFilter: (value, record) =>
          record.id.toString().toLowerCase().includes(value.toLowerCase()),
        // onFilter: (value, record) =>
        //   record.name?.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              console.log(searchInput.value);
              searchInput.value.focus();
            }, 100);
          }
        },
      },
      {
        title: "Name",
        dataIndex: "userName",
        key: "userName",
        slots: {
          filterDropdown: "filterDropdown",
          filterIcon: "filterIcon",
          customRender: "customRender",
        },
        onFilter: (value, record) =>
          record.userName
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              console.log(searchInput.value);
              searchInput.value.focus();
            }, 100);
          }
        },
      },
      {
        title: "角色",
        dataIndex: "userRole",
        key: "userRole",
        slots: {
          filterDropdown: "filterDropdown",
          filterIcon: "filterIcon",
          customRender: "customRender",
        },
        onFilter: (value, record) =>
          record.userRole
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
      },
      {
        title: "简介",
        dataIndex: "userProfile",
        key: "userProfile",
        slots: {
          filterDropdown: "filterDropdown",
          filterIcon: "filterIcon",
          customRender: "customRender",
        },
        onFilter: (value, record) =>
          record.userProfile
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
      },
    ];

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };

    const handleReset = (clearFilters) => {
      clearFilters();
      state.searchText = "";
    };

    return {
      data,
      columns,
      handleSearch,
      handleReset,
      searchInput,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
