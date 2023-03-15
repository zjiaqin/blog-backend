<template>
  <div class="clearfix">
    <Upload
      v-model:file-list="fileList"
      :customRequest="upload"
      list-type="picture-card"
      :beforeUpload="beforeUpload"
      @preview="handlePreview"
      :max-count="1"
      @remove="remove"
    >
      <div>
        <plus-outlined />
        <div style="margin-top: 8px">Upload</div>
      </div>
    </Upload>
    <Modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </Modal>
  </div>
</template>
<script lang="ts" setup>
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { Upload, Modal } from 'ant-design-vue';
  import { ref, watch } from 'vue';
  import type { UploadProps } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { saveArticleImagesUsingPost } from '/@/api/apis';
  const props = defineProps<{
    value?: string;
  }>();

  const emits = defineEmits(['change']);
  const { createMessage } = useMessage();
  async function upload(e) {
    const formData = new FormData();
    formData.append('file', e.file);
    try {
      const res = await saveArticleImagesUsingPost({ requestBody: formData as any });
      emits('change', res);
      e.onSuccess(res, e);
    } catch (err) {
      e.onError(err);
    }
  }
  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const previewVisible = ref(false);
  const previewImage = ref('');
  const previewTitle = ref('');

  const fileList = ref<NonNullable<UploadProps['fileList']>>([]);

  const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
  };
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj)) as string;
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
  };

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    // 检查图片类型
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isBMP = file.type === 'image/bmp';
    const isGIF = file.type === 'image/gif';
    const isWEBP = file.type === 'image/webp';
    const isSVG = file.type === 'image/svg+xml';

    const isPic = isJPG || isPNG || isBMP || isGIF || isWEBP || isSVG;
    if (!isPic) {
      createMessage.error('请上传图片');
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      createMessage.error('上传图片必须小于 2MB!');
      return Upload.LIST_IGNORE;
    }
    return isPic && isLt2M;
  };
  const remove = () => {
    emits('change', '');
  };
  watch(
    () => props.value,
    () => {
      if (props?.value) {
        fileList.value = [{ name: 'oldPic', uid: '0', url: props.value }];
      } else {
        fileList.value = [];
      }
    },
  );
</script>
<style scoped lang="less">
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
