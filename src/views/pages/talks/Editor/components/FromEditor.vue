<template>
  <CollapseContainer :title="model" :canExpan="false">
    <BasicForm @register="register">
      <template #customSlot>
        <AButton type="primary" @click="openPopup">{{ model }}</AButton>
      </template>
    </BasicForm>
    <FromSubmit @register="registerModal" />
  </CollapseContainer>
</template>

<script setup lang="ts">
  import { CollapseContainer } from '/@/components/Container/index';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getFormConfig, ModalStatuEnum } from '../config';
  import { FromSubmit } from '../components';
  import { useModal } from '/@/components/Modal';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { getArticleBackByIdUsingGet } from '/@/api/apis';
  import { deepMerge } from '/@/utils';
  import type { ArticleByIdResp, ArticleByIdParams } from '../types';

  const route = useRoute();

  const model = ref<ModalStatuEnum>(ModalStatuEnum.ADD);
  const loading = ref(false);

  const formData = ref<ArticleByIdResp>();

  const [register, { validate, getFieldsValue, setFieldsValue }] = useForm(getFormConfig());

  const [registerModal, { openModal, setModalProps }] = useModal();

  // 修改分类（新增或编辑）
  async function openPopup() {
    try {
      await validate();
      setModalProps({ title: model.value });
      openModal(true, deepMerge(formData.value, getFieldsValue()));
    } catch {}
  }

  const initFont = async (articleId: ArticleByIdParams['articleId']) => {
    if (!articleId) return;
    // model.value = articleId ? ModalStatuEnum.EDIT : ModalStatuEnum.ADD;
    model.value = ModalStatuEnum.EDIT;
    loading.value = true;
    try {
      const res = await getArticleBackByIdUsingGet({ articleId });
      loading.value = false;

      formData.value = res;
      setFieldsValue(res);
    } catch (error) {}
    loading.value = false;
  };

  onMounted(() => {
    initFont(route.query.id as string);
  });
</script>

<style lang="less" scoped></style>
