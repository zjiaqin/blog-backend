<template>
  <BasicModal
    @register="registerModal"
    :draggable="false"
    :canFullscreen="false"
    :minHeight="100"
    okText="保存"
    :showCancelBtn="false"
    :showOkBtn="false"
  >
    <BasicForm @register="registerForm" />
    <button @click="test"> test</button>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getModalFormConfig } from '../config';

  const [registerModal, { closeModal, changeOkLoading }] = useModalInner((data) => {
    if (data) {
      setFieldsValue(data);
    }
  });

  const [registerForm, { setFieldsValue, submit, resetFields, validate, getFieldsValue }] = useForm(
    getModalFormConfig(),
  );

  const test = () => {
    console.log(getFieldsValue());
  };
</script>

<style lang="less" scoped></style>
