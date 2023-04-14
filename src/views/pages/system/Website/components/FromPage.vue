<template>
  <div class="wrapper">
    <BasicForm @register="register" @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getFormConfig } from '../config';
  import { updateWebsiteConfigUsingPut } from '/@/api/apis';
  import { useMessage } from '/@/hooks/web/useMessage';
  import type { GetconfigResp } from '../types';
  const { createMessage } = useMessage();

  const [register, { validate, setFieldsValue }] = useForm(getFormConfig());
  const handleSubmit = async (value) => {
    console.log(999);

    try {
      validate();
      await updateWebsiteConfigUsingPut({ requestBody: value });
      createMessage.success('设置修改成功');
    } catch (error) {}
  };

  const init = (value: GetconfigResp) => {
    setFieldsValue(value);
  };
  defineExpose({
    init,
  });
</script>

<style lang="less" scoped></style>
