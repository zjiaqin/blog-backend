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
    <BasicForm @register="registerForm" @submit="handleSubmit">
      <template #customSlot="{ model, field }">
        <Input v-model:value="model[field]">
          <template #addonAfter> <calendar-outlined @click="pickCron" /> </template
        ></Input>
      </template>
    </BasicForm>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getModalFormConfig } from '../config';
  import { updateJobUsingPut } from '/@/api/apis';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Input } from 'ant-design-vue';
  import { CalendarOutlined } from '@ant-design/icons-vue';

  import { UpdateMenuParams } from '../types';

  const { createMessage } = useMessage();

  const [registerModal, { closeModal }] = useModalInner((data) => {
    if (data) {
      setFieldsValue(data);
    }
  });

  const [registerForm, { setFieldsValue, resetFields, validate, submit }] = useForm(
    getModalFormConfig(),
  );

  async function handleSubmit(value: UpdateMenuParams['requestBody']) {
    try {
      await validate();
      await updateJobUsingPut({ requestBody: value });
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

  const pickCron = () => {};
</script>

<style lang="less" scoped></style>
