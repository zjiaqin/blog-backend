<template>
  <BasicModal
    @register="registerModal"
    title="详细信息"
    :draggable="false"
    :canFullscreen="false"
    :minHeight="100"
    width="auto"
    :showCancelBtn="false"
    :showOkBtn="true"
    okText="确定"
    @cancel="close"
  >
    <Description @register="registerDesc" :data="descData" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { Description, useDescription } from '/@/components/Description/index';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Descschema } from '../config';
  import { ref } from 'vue';

  const descData = ref();
  const [registerModal, { closeModal }] = useModalInner((data) => {
    if (data) {
      descData.value = data;
    }
  });
  //TODO 需要解决overflow 失效的问题，移动端显示不全
  const [registerDesc] = useDescription({
    labelStyle: { width: '90px', minWidth: '90px', verticalAlign: 'top' },

    column: 1,
    schema: Descschema,
  });

  const close = () => {
    closeModal();
  };
</script>

<style lang="less" scoped></style>
