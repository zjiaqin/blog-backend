<template>
  <div class="article-list-table">
    <BasicTable @register="registerTable" title=" ">
      <template #form-formHeader>
        <Tabs class="tabs" @change="changeTab" v-model:activeKey="activeKey">
          <TabPane v-for="item in tabsMap" :key="item.key" :tab="item.label" />
        </Tabs>
      </template>
      <template #tableTitle>
        <div class="flex w-full">
          <AButton
            type="primary"
            :disabled="!selectedID.length"
            danger
            class="mr-2"
            @click="toDelete()"
            >{{ ModalStatuEnum.BATCHEDELE }}</AButton
          >
          <AButton :disabled="!selectedID.length" type="primary" class="mr-2" @click="toExport()">{{
            ModalStatuEnum.BATCHOUT
          }}</AButton>
          <BasicUpload
            :emptyHidePreview="true"
            :showOkBtn="false"
            :showImg="false"
            :accept="['md']"
            :maxSize="2"
            :maxNumber="10"
            :api="toImport"
            :buttonText="ModalStatuEnum.BATCHIN"
            @reload="reload()"
            class="ml-auto"
          />
        </div>
      </template>
      <template #bodyCell="{ column, record }: { column: any, record: _listResp[0] }">
        <template v-if="column.key === 'avatar'">
          <Image
            :src="record[column.key]"
            fallback="data:image/png;base64,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"
          />
        </template>

        <template v-if="column.key === 'isReview'">
          <Tag :color="record[column.key] === 1 ? 'success' : 'processing'">
            {{ statusMap[record[column.key]] }}
          </Tag>
        </template>

        <template v-if="column.key === 'type'">
          <Tag :color="typeOption.find((obj) => obj.value === record[column.key])?.color">
            {{ typeOption.find((obj) => obj.value === record[column.key])?.label }}
          </Tag>
        </template>

        <template v-if="column.key === 'operate'">
          <AButton
            size="small"
            :style="{ 'font-size': '12px' }"
            type="primary"
            danger
            @click="toDelete(record.id)"
            :loading="btnLoading.btnId === record.id && btnLoading.loading"
            >{{ ModalStatuEnum.DELETE }}</AButton
          >
        </template>
        <template v-if="column.key === 'createTime'">
          <Time :value="record[column.key]" mode="datetime" />
        </template>
      </template>
    </BasicTable>
  </div>
</template>

<script setup lang="ts">
  import { Tag, Image, Tabs, TabPane } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';

  import {
    listCommentBackDtoUsingGet,
    updateArticleTopAndFeaturedUsingPut,
    updateArticleDeleteUsingPut,
    exportArticlesUsingPost,
    importArticlesUsingPost,
  } from '/@/api/apis';
  import { Time } from '/@/components/Time';
  import { typeOption, statusMap, getBasicColumns, getFormConfig, ModalStatuEnum } from '../config';
  import type { listParams, listResp as _listResp } from '../types';
  import { deepMerge } from '/@/utils';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { downloadByUrl } from '/@/utils/file/download';
  import { BasicUpload } from '/@/components/Upload';

  const activeKey = ref(0);

  const router = useRouter();
  const { createMessage } = useMessage();

  const tabsMap = [
    { label: '全部', key: 0, param: { isDelete: 0 } },
    { label: '公开', key: 1, param: { isDelete: 0, status: 1 } },
    { label: '私密', key: 2, param: { isDelete: 0, status: 2 } },
    { label: '草稿', key: 3, param: { isDelete: 0, status: 3 } },
    { label: '回收站', key: 4, param: { isDelete: 1 } },
  ];

  const [registerTable, { reload }] = useTable({
    api: listCommentBackDtoUsingGet,
    rowKey: (record) => {
      return record.id;
    }, //指定每行的key,用于多选框获取待操作的ID
    rowSelection: {
      onChange: (selectedRowKeys: number[]) => {
        selectedID.value = selectedRowKeys;
      }, //配置多选框 ，将选择的 行的ID添加到 多选数组中
    },
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getFormConfig(),
    showIndexColumn: false,
    beforeFetch: (param: listParams) => {
      // const option: listParams = { isDelete: 0 };
      const option = tabsMap.find((obj) => obj.key === activeKey.value)?.param;
      return param.isDelete ? param : deepMerge(param, option);
    },
    pagination: {
      position: ['bottomCenter'],
    },
  });

  // 删除按钮加载控制
  const btnLoading = reactive({
    btnId: -1, //获取具体的按钮ID，避免整列的按钮状态都改变，-1 为批量删除
    loading: false, //删除
    isTop: false,
    isFeatured: false,
  });

  const selectedID = ref<number[]>([]);

  async function toDelete(id: _listResp[number]['id'] = -1) {
    btnLoading.btnId = id;
    btnLoading.loading = true;
    const ids: number[] = id === -1 ? selectedID.value : [id];
    try {
      await updateArticleDeleteUsingPut({ requestBody: { ids, isDelete: 1 } });
      createMessage.success('操作成功');
    } catch {}
    btnLoading.loading = false;
    reload();
  }

  const toEdit = (id: number | undefined) => {
    router.push({ path: '/articles/edit', query: { id } });
  };

  const topAndFeaturedChange = async (record: _listResp[0], method: 'isTop' | 'isFeatured') => {
    const methodMap = { isTop: '置顶', isFeatured: '推荐' };
    btnLoading.btnId = record.id ?? -1;
    btnLoading[method] = true;
    try {
      await updateArticleTopAndFeaturedUsingPut({
        requestBody: { id: record.id, isTop: record.isTop, isFeatured: record.isFeatured },
      });
      createMessage.success(`${methodMap[method]}状态修改成功`);
    } catch (error) {
      record[method] = record[method] ? 0 : 1;
    }
    btnLoading[method] = false;
  };

  const changeTab = () => {
    reload();
  };

  const toExport = async () => {
    try {
      const res = await exportArticlesUsingPost({ requestBody: selectedID.value });
      if (!res) return;
      for (let url of res) {
        console.log(downloadByUrl({ url, target: '_blank', fileName: undefined }));
      }
    } catch (error) {}
  };

  const toImport = async (...args) => {
    const formData = new FormData();
    formData.append('file', args[0]['file']);
    await importArticlesUsingPost({ requestBody: formData as any });
    return { data: { url: '566' } };
  };
</script>

<style lang="less" scoped>
  .tabs {
    flex-basis: 100%;
    padding-left: 10px;
  }
</style>
