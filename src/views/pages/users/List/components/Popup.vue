<template>
  <BasicModal
    @register="registerModal"
    :draggable="false"
    :canFullscreen="false"
    title="编辑用户"
    :minHeight="100"
    okText="保存"
    @ok="save"
    :closeFunc="cancel"
  >
    <BasicForm @register="registerForm" @submit="handleSubmit" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getModalFormConfig } from '../config';
  import { updateUserRoleUsingPut } from '/@/api/apis';

  import { useMessage } from '/@/hooks/web/useMessage';
  const emit = defineEmits(['register', 'update']);
  const closeable = ref(true);
  const { createMessage } = useMessage();
  const [registerModal, { closeModal, changeOkLoading }] = useModalInner((detail) => {
    if (detail) {
      detail.roleIds = detail.roles.map((item) => item.id);
      setFieldsValue(detail);
    }
  });

  const [registerForm, { setFieldsValue, submit, resetFields, validate }] = useForm(
    getModalFormConfig(),
  );

  const handleSubmit = async (values) => {
    closeable.value = false;
    changeOkLoading(true);
    try {
      await updateUserRoleUsingPut({ requestBody: values });
      emit('update');
      createMessage.success('操作成功');
      close();
    } catch {}
    changeOkLoading(false);
    closeable.value = true;
  };
  const cancel = async () => {
    resetFields();
    return closeable.value;
  };
  const save = async () => {
    try {
      await validate();
      await submit();
    } catch {}
  };
  const close = () => {
    changeOkLoading(false);
    closeable.value = true;
    resetFields();
    closeModal();
  };
</script>

<style lang="less" scoped></style>
