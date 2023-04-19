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
    <BasicForm @register="registerForm" @submit="handleSubmit" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getModalFormConfig } from '../config';
  import { saveOrUpdateFriendLinkUsingPost } from '/@/api/apis';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { ref } from 'vue';

  import { UpdateParams } from '../types';

  const { createMessage } = useMessage();
  const type = ref();

  const [registerModal, { closeModal }] = useModalInner((data) => {
    if (data) {
      setFieldsValue(data);
      type.value = data?.typle;
    }
  });

  const [registerForm, { setFieldsValue, resetFields, validate, submit }] = useForm(
    getModalFormConfig(),
  );

  async function handleSubmit(value: UpdateParams['requestBody']) {
    try {
      await validate();
      await saveOrUpdateFriendLinkUsingPost({ requestBody: value });

      createMessage.success('保存成功');
    } catch (error) {}
  }

  const close = () => {
    resetFields();
    closeModal();
  };
  const save = async () => {
    await submit();
    close();
  };
</script>

<style lang="less" scoped></style>
