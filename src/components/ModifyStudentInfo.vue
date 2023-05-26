<template>
  <!--  {{ userList }}-->
  <a-button
    class="editable-add-btn"
    style="margin-bottom: 8px"
    @click="handleAdd"
    >增加
  </a-button>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #userName="{ text, record }">
      <div class="editable-cell">
        <div v-if="editableData[record.id]" class="editable-cell-input-wrapper">
          <a-input
            v-model:value="editableData[record.id].userName"
            @pressEnter="save(record.id)"
          />
          <check-outlined
            class="editable-cell-icon-check"
            @click="save(record.id)"
          />
        </div>
        <div v-else class="editable-cell-text-wrapper">
          {{ text || " " }}
          <edit-outlined class="editable-cell-icon" @click="edit(record.id)" />
        </div>
      </div>
    </template>
    <template #userRole="{ text }">
      <a-tag :color="text === 'admin' ? 'red' : 'green'">{{ text }}</a-tag>
    </template>
    <template #operation="{ record }">
      <a-popconfirm
        v-if="dataSource.length"
        title="Sure to delete?"
        @confirm="onDelete(record.key)"
      >
        <a>Delete</a>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  Ref,
  ref,
  UnwrapRef,
} from "vue";

import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";
import { cloneDeep } from "lodash-es";

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface UserItem {
  id: string;
  userName: string;
  userAvatar: string;
  userProfile: string;
  userRole: string;
  createTime: string;
}

export default defineComponent({
  components: {
    CheckOutlined,
    EditOutlined,
  },
  props: {
    userList: {
      type: Array as PropType<UserItem[]>,
      required: true,
    },
  },
  setup(props) {
    const columns = [
      {
        title: "User Name",
        dataIndex: "userName",
        width: "30%",
        slots: { customRender: "userName" },
      },
      {
        title: "User Role",
        dataIndex: "userRole",
        slots: { customRender: "userRole" },
      },
      { title: "Create Time", dataIndex: "createTime" },
      {
        title: "Operation",
        dataIndex: "operation",
        slots: { customRender: "operation" },
      },
    ];
    // const dataSource: Ref<UserItem[]> = ref(props.userList);
    const dataSource: Ref<UserItem[]> = ref(
      props.userList || [
        [
          {
            key: "0",
            name: "Edward King 0",
            age: 32,
            address: "London, Park Lane no. 0",
          },
          {
            key: "1",
            name: "Edward King 1",
            age: 32,
            address: "London, Park Lane no. 1",
          },
        ],
      ]
    );

    //     ref([
    //   {
    //     key: "0",
    //     name: "Edward King 0",
    //     age: 32,
    //     address: "London, Park Lane no. 0",
    //   },
    //   {
    //     key: "1",
    //     name: "Edward King 1",
    //     age: 32,
    //     address: "London, Park Lane no. 1",
    //   },
    // ]);
    const count = computed(() => dataSource.value.length + 1);
    const editableData: UnwrapRef<Record<string, UserItem>> = reactive({});
    const edit = (id: string) => {
      editableData[id] = cloneDeep(
        dataSource.value.filter((item) => id === item.id)[0]
      );
    };
    const save = (id: string) => {
      Object.assign(
        dataSource.value.filter((item) => id === item.id)[0],
        editableData[id]
      );
      delete editableData[id];
    };
    const onDelete = (id: string) => {
      dataSource.value = dataSource.value.filter((item) => item.id !== id);
    };
    const handleAdd = () => {
      const newData = {
        id: `${count.value}`,
        userName: `New User ${count.value}`,
        userAvatar: "https://i.pravatar.cc/150?img=3",
        userProfile: "",
        userRole: "user",
        createTime: new Date().toLocaleString(),
      };
      dataSource.value.push(newData);
    };
    return {
      columns,
      onDelete,
      handleAdd,
      dataSource,
      editableData,
      count,
      edit,
      save,
    };
  },
});
</script>
<style lang="less">
.editable-cell {
  position: relative;

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
