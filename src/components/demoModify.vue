<template>
  <a-button
    class="editable-add-btn"
    style="margin-bottom: 8px"
    @click="handleAdd"
    >Add
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
    <template #userAvatar="{ text, record }">
      <img :src="record.userAvatar" alt="avatar" style="width: 50px" />
    </template>
    <template #userRole="{ text, record }">
      <a-tag :color="text === 'admin' ? 'red' : 'green'">{{ text }}</a-tag>
    </template>
    <template #operation="{ record }">
      <a-popconfirm
        v-if="dataSource.length"
        title="Sure to delete?"
        @confirm="onDelete(record.id)"
      >
        <a>Delete</a>
      </a-popconfirm>
    </template>
  </a-table>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, Ref, ref, UnwrapRef } from "vue";
import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";
import { cloneDeep } from "lodash-es";

interface UserItem {
  id: string;
  userName: string;
  userAvatar: string;
  userProfile: string;
  userRole: string;
  createTime: string;
}

export default defineComponent({
  components: { CheckOutlined, EditOutlined },
  setup() {
    const columns = [
      {
        title: "User Name",
        dataIndex: "userName",
        width: "30%",
        slots: { customRender: "userName" },
      },
      {
        title: "User Avatar",
        dataIndex: "userAvatar",
        slots: { customRender: "userAvatar" },
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
    const dataSource: Ref<UserItem[]> = ref([
      {
        id: "0",
        userName: "Alice",
        userAvatar: "https://i.pravatar.cc/150?img=1",
        userProfile: "Software Engineer",
        userRole: "admin",
        createTime: "2022-01-01 12:00:00",
      },
      {
        id: "1",
        userName: "Bob",
        userAvatar: "https://i.pravatar.cc/150?img=2",
        userProfile: "Product Manager",
        userRole: "user",
        createTime: "2022-01-02 12:00:00",
      },
    ]);
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
