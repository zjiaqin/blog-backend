<template>
  <CollapseContainer :title="ModalStatuEnum.ADD" :canExpan="false">
    <BasicForm @register="register">
      <template #customSlot>
        <AButton type="primary" @click="openPopup">{{ ModalStatuEnum.ADD }}</AButton>
      </template>
    </BasicForm>
    <MyTag @toAdd="add" color="pink" />
    <FromSubmit @register="registerModal" />
  </CollapseContainer>
</template>

<script setup lang="ts">
  import { CollapseContainer } from '/@/components/Container/index';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getFormConfig, ModalStatuEnum } from '../config';
  import { FromSubmit } from '../components';
  import { useModal } from '/@/components/Modal';
  import { MyTag } from '/@/components/Tag';
  const [register, { validate, getFieldsValue }] = useForm(getFormConfig());

  const [registerModal, { openModal, setModalProps }] = useModal();

  // 修改分类（新增或编辑）
  async function openPopup() {
    try {
      await validate();
      setModalProps({ title: ModalStatuEnum.ADD });
      openModal(true, getFieldsValue());
    } catch {}
  }

  const add = () => {
    console.log(999);
  };
</script>

<style lang="less" scoped></style>
