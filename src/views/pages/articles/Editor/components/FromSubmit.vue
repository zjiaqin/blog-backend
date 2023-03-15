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
    <BasicForm
      @register="registerForm"
      @submit="handleSubmit"
      @reset="setFieldsValue(initialValue)"
    />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getModalFormConfig } from '../config';
  import { saveOrUpdateArticleUsingPost } from '/@/api/apis';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ref } from 'vue';

  const { createMessage } = useMessage();
  const initialValue = ref(); //初始值，包括文章、标题及编辑模式下的所有参数
  const [registerModal, { closeModal }] = useModalInner((data) => {
    if (data) {
      initialValue.value = data;
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
