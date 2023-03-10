<template>
  <div class="article-list-table">
    <BasicTable @register="registerTable" title=" " />
  </div>
</template>

<script setup lang="ts">
  import { BasicTable, useTable } from '/@/components/Table';
  import { listArticlesAdminUsingGet } from '/@/api/apis';
  import {
    getBasicColumns,
    getFormConfig,
    getModalFormConfig,
    ModalStatuEnum,
    setOption,
  } from '../configs';
  const [registerTable] = useTable({
    api: listArticlesAdminUsingGet,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getFormConfig(),
    showIndexColumn: false,
    pagination: {
      position: ['bottomCenter'],
    },
  });
  console.log(setOption());
</script>

<style lang="less" scoped></style>
