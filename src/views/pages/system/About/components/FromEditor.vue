<template>
  <CollapseContainer title="关于我" :canExpan="false" :showHeader="true">
    <BasicForm @register="register" @submit="handlerSubmit" />
  </CollapseContainer>
</template>

<script setup lang="ts">
  import { CollapseContainer } from '/@/components/Container/index';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getFormConfig } from '../config';

  import { onMounted, ref } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getAboutUsingGet, updateAboutUsingPut } from '/@/api/apis';
  // import { UpdateParams } from '../types';
  const { createMessage } = useMessage();
  const loading = ref(false);

  const [register, { validate, setFieldsValue }] = useForm(getFormConfig());

  const initFont = async () => {
    // model.value = articleId ? ModalStatuEnum.EDIT : ModalStatuEnum.ADD;
    loading.value = true;
    try {
      const res = await getAboutUsingGet(undefined);
      setFieldsValue(res);
    } catch (error) {}
    loading.value = false;
  };

  const handlerSubmit = async (value) => {
    await validate();
    await updateAboutUsingPut({ requestBody: value });
    createMessage.success('保存成功');
    initFont();
  };

  onMounted(() => {
    initFont();
  });
</script>

<style lang="less" scoped></style>
