<template>
  <CollapseContainer :title="model" :showHeader="true" :canExpan="false">
    <BasicForm @register="register" @submit="handleSubmit">
      <template #customSlot> <span class="placeholder">1</span> </template>
    </BasicForm>
  </CollapseContainer>
</template>

<script setup lang="ts">
  import { CollapseContainer } from '/@/components/Container/index';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getFormConfig, ModalStatuEnum } from '../config';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { getBackTalkByIdUsingGet, saveOrUpdateTalkUsingPost } from '/@/api/apis';
  import type { TalkByIdResp, TalkByIdParams } from '../types';

  const { createMessage } = useMessage();
  const route = useRoute();

  const model = ref<ModalStatuEnum>(ModalStatuEnum.ADD);
  const loading = ref(false);

  const formData = ref<TalkByIdResp>();

  const [register, { validate, setFieldsValue }] = useForm(getFormConfig());

  const initFont = async (talkId: TalkByIdParams['talkId']) => {
    if (!talkId) return;
    // model.value = articleId ? ModalStatuEnum.EDIT : ModalStatuEnum.ADD;
    model.value = ModalStatuEnum.EDIT;
    loading.value = true;
    try {
      const res = await getBackTalkByIdUsingGet({ talkId });
      loading.value = false;

      formData.value = res;
      setFieldsValue(res);
    } catch (error) {}
    loading.value = false;
  };

  async function handleSubmit(value) {
    try {
      await validate();
      await saveOrUpdateTalkUsingPost({ requestBody: value });
      createMessage.success('文章发布成功');
    } catch (error) {}
  }

  onMounted(() => {
    initFont(route.query.id as string);
  });
</script>

<style lang="less" scoped>
  :deep(.ant-form .ant-form-item .ant-form-item-label) {
    flex: none !important;
    margin-right: 8px;
  }

  :deep(.ant-form .ant-form-item .ant-form-item-control) {
    flex: none !important;
  }

  .placeholder {
    max-width: 1px;
    margin-right: auto;
    flex: 1 !important;
    visibility: hidden;
  }
</style>
