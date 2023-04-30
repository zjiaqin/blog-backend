<template>
  <BasicModal
    @register="registerModal"
    :draggable="false"
    :canFullscreen="false"
    :minHeight="100"
    :showCancelBtn="false"
    title="修改登录邮箱"
    :showOkBtn="true"
    @ok="save"
    okText="保存"
    @cancel="close"
  >
    <BasicForm @register="registerForm" @submit="handleSubmit" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getModalEmailFormConfig } from '../config';
  import { saveUserEmailUsingPut } from '/@/api/apis';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();

  const { createMessage } = useMessage();

  const [registerModal, { closeModal }] = useModalInner((data) => {
    if (data) {
      setFieldsValue(data);
    }
  });

  const [registerForm, { setFieldsValue, resetFields, validate, submit }] = useForm(
    getModalEmailFormConfig(),
  );

  async function handleSubmit(value) {
    try {
      await validate();
      await saveUserEmailUsingPut({ requestBody: value });
      createMessage.success('保存成功');
    } catch (error) {}
  }

  const close = () => {
    resetFields();
    closeModal();
  };
  const save = async () => {
    await submit();
    userStore.logout();
  };
</script>

<style lang="less" scoped>
  .emali {
    display: flex;

    .input {
      flex: 1;
      margin-right: 10px;
    }
  }
</style>
