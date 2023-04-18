<template>
  <BasicModal
    :width="800"
    @register="registerModal"
    :draggable="false"
    :canFullscreen="false"
    :minHeight="100"
    :loading="loading"
    title="任务详情"
    :showCancelBtn="false"
    :showOkBtn="true"
    okText="保存"
    @cancel="close"
  >
    <Description
      v-if="descData"
      :column="{ md: 2, sm: 1, xs: 1 }"
      :data="descData"
      :schema="schema"
    />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { schema } from '../config';
  import { Description } from '/@/components/Description/index';
  import { getJobByIdUsingGet } from '/@/api/apis';

  import { ref } from 'vue';

  const descData = ref();

  const loading = ref(false);
  const [registerModal, { closeModal }] = useModalInner((data) => {
    data?.id && init(data.id);
  });

  const init = async (id) => {
    loading.value = true;
    descData.value = await getJobByIdUsingGet({ id });
    loading.value = false;
  };

  const close = () => {
    closeModal();
  };
</script>

<style lang="less" scoped></style>
