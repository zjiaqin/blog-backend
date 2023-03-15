<template>
  <BasicModal
    @register="registerModal"
    :draggable="false"
    :canFullscreen="false"
    :minHeight="100"
    okText="保存"
    :showCancelBtn="false"
    :showOkBtn="false"
    @cancel="close"
  >
<<<<<<< HEAD
    <BasicForm @register="registerForm" @submit="handleSubmit" />
=======
    <BasicForm @register="registerForm" />
>>>>>>> 4e2c221a5d223d2036211929e9dace63d37c6c6a
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getModalFormConfig } from '../config';
  import { saveOrUpdateArticleUsingPost } from '/@/api/apis';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const [registerModal, { closeModal }] = useModalInner((data) => {
    if (data) {
      setFieldsValue(data);
    }
  });

  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm(getModalFormConfig());

  async function handleSubmit(value) {
    try {
      console.log(96999);

      await validate();
      await saveOrUpdateArticleUsingPost({ requestBody: value });
      createMessage.success('文章发布成功');
    } catch (error) {}
  }

  const close = () => {
    resetFields();
    closeModal();
  };
</script>

<style lang="less" scoped></style>
