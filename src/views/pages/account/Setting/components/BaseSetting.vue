<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <div class="wrapper">
      <BasicForm @register="register" @submit="updateUserInfo" class="from" />

      <div class="change-avatar">
        <div class="mb-2">头像</div>
        <CropperAvatar
          :uploadApi="upload"
          :value="avatar"
          btnText="更换头像"
          :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
          @change="updateAvatar"
          :width="100"
        />
      </div>
    </div>

    <Button type="primary" @click="handleSubmit"> 更新基本信息 </Button>
  </CollapseContainer>
</template>
<script lang="ts" setup>
  import { Button } from 'ant-design-vue';
  import { computed, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';

  import { useMessage } from '/@/hooks/web/useMessage';

  import headerImg from '/@/assets/images/header.jpg';

  import { getbaseSetFromConfig } from '../config';

  import { useUserStore } from '/@/store/modules/user';
  import { updateUserAvatarUsingPost, updateUserInfoUsingPut } from '/@/api/apis';

  import { blobToFile } from '/@/utils';

  const { createMessage } = useMessage();
  const userStore = useUserStore();

  const [register, { setFieldsValue, submit }] = useForm(getbaseSetFromConfig());

  const upload = async (e) => {
    const formData = new FormData();
    formData.append('file', blobToFile(e));
    try {
      return await updateUserAvatarUsingPost({ requestBody: formData as any });
    } catch (error) {}
  };

  onMounted(async () => {
    setFieldsValue(userStore.userInfo);
  });

  const avatar = computed(() => {
    const { avatar } = userStore.getUserInfo ?? { avatar: headerImg };
    return avatar;
  });

  async function updateAvatar() {
    await userStore.getUserInfoAction();
  }

  const updateUserInfo = async (data) => {
    await updateUserInfoUsingPut({ requestBody: data });
    createMessage.success('信息更新成功');
  };

  const handleSubmit = async () => {
    submit();
  };
</script>

<style lang="less" scoped>
  .wrapper {
    display: grid;
    gap: 20px;
    grid-template-columns: 70% 30%;
    @media (max-width: 992px) {
      grid-template-columns: 1fr;

      .change-avatar {
        grid-column-start: 1;
        grid-row-start: 1;
      }
    }
  }

  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
