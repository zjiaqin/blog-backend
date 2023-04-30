<template>
  <BasicModal
    @register="registerModal"
    :draggable="false"
    :canFullscreen="false"
    :minHeight="100"
    :showCancelBtn="false"
    title="修改账户密码"
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
  import { getModalPasswordFormConfig } from '../config';
  import { updateAdminPasswordUsingPut } from '/@/api/apis';
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
    getModalPasswordFormConfig(),
  );

  async function handleSubmit(value) {
    try {
      await validate();
      await updateAdminPasswordUsingPut({ requestBody: value });
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

<style lang="less" scoped></style>
