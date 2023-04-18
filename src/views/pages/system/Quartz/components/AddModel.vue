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
    <PickerCronModel @register="registerPickModal" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getModalFormConfig, ModalStatuEnum } from '../config';
  import { updateJobUsingPut, saveJobUsingPost } from '/@/api/apis';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Input } from 'ant-design-vue';
  import { CalendarOutlined } from '@ant-design/icons-vue';
  import { useModal } from '/@/components/Modal';
  import { PickerCronModel } from './index';
  import { ref } from 'vue';

  import { UpdateParams } from '../types';

  const { createMessage } = useMessage();
  const type = ref();

  const [registerPickModal, { openModal }] = useModal();

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
      if (type.value === ModalStatuEnum.EDIT) {
        await updateJobUsingPut({ requestBody: value });
      } else {
        await saveJobUsingPost({ requestBody: value });
      }

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

  const pickCron = () => {
    openModal();
  };
</script>

<style lang="less" scoped></style>
