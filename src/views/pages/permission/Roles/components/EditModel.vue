<template>
  <BasicModal
    @register="registerModal"
    :draggable="false"
    :canFullscreen="false"
    :minHeight="100"
    :showCancelBtn="false"
    :showOkBtn="true"
    @ok="save"
    okText="保存"
    @cancel="close"
  >
    <BasicForm @register="registerForm" @submit="handleSubmit">
      <template #customResource="{ model, field }">
        <BasicTree
          :treeData="treeDataResource"
          :checkable="true"
          v-model:checkedKeys="model[field]"
        />
      </template>
      <template #customMenu="{ model, field }">
        <BasicTree :treeData="treeDataMenu" :checkable="true" v-model:checkedKeys="model[field]" />
      </template>
    </BasicForm>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicTree } from '/@/components/Tree/index';
  import { BasicForm, useForm } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getModalFormConfig, ModalStatuEnum } from '../config';
  import {
    saveOrUpdateRoleUsingPost,
    listMenuOptionsUsingGet,
    listResourceOptionUsingGet,
  } from '/@/api/apis';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { updateRoleParams, OptionResp } from '../types';
  import { TreeItem } from '/@/components/Tree/index';
  import { ref, onMounted } from 'vue';
  import { isArray } from '/@/utils/is';

  const optionType = ref<ModalStatuEnum>(ModalStatuEnum.RESOURCE);

  const treeDataMenu = ref<TreeItem[]>([]);
  const treeDataResource = ref<TreeItem[]>([]);

  const { createMessage } = useMessage();

  const [registerModal, { closeModal, changeLoading }] = useModalInner(async (data) => {
    if (data) {
      optionType.value = data.type;
      setFieldsValue(data);
    }
  });

  const [registerForm, { setFieldsValue, resetFields, validate, submit }] = useForm(
    getModalFormConfig(),
  );

  async function handleSubmit(value: updateRoleParams['requestBody']) {
    try {
      await validate();
      await saveOrUpdateRoleUsingPost({ requestBody: value });
      createMessage.success('保存成功');
    } catch (error) {}
  }

  async function loadTreeData() {
    changeLoading(true);

    const res = await Promise.all([
      listMenuOptionsUsingGet(undefined),
      listResourceOptionUsingGet(undefined),
    ]);

    if (isArray(res[0]) && isArray(res[1])) {
      treeDataMenu.value = turntoTreeData(res[0]);
      treeDataResource.value = turntoTreeData(res[1]);
    }
    changeLoading(false);
  }

  const turntoTreeData = (arr: OptionResp) => {
    let treeArr: TreeItem[] = [];
    arr.forEach((obj) => {
      const children = obj.children ? turntoTreeData(obj.children) : [];
      treeArr.push({ title: obj.label, key: obj.id ?? -1, children });
    });
    return treeArr;
  };
  const close = () => {
    resetFields();
    closeModal();
  };
  const save = async () => {
    await submit();
  };
  onMounted(() => {
    loadTreeData();
  });
</script>

<style lang="less" scoped></style>
