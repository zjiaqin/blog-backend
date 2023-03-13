<template>
  <div class="container">
    <template v-for="(tag, index) in tags" :key="tag">
      <Tag
        :style="{ fontSize: fontSize + 'px' }"
        :color="color"
        :closable="true"
        @close="deleteTag(index)"
      >
        {{ tag }}
      </Tag>
    </template>
    <AButton :size="size" preIcon="ion:add-outline" @click="toDO()" />
  </div>
</template>

<script setup lang="ts">
  import { Tag } from 'ant-design-vue';
  import { ref } from 'vue';

  export interface Props {
    color?:
      | string
      | 'default'
      | 'blue'
      | 'cyan'
      | 'gold'
      | 'green'
      | 'lime'
      | 'magenta'
      | 'orange'
      | 'pink'
      | 'purple'
      | 'red'
      | 'yellow'
      | 'error'
      | 'success'
      | 'warning'
      | 'processing'
      | 'geekblue'
      | 'volcano';
    size: 'large' | 'middle' | 'small';
  }

  withDefaults(defineProps<Props>(), {
    color: 'orange',
    size: 'small',
  });
  const emit = defineEmits(['toAdd']);

  const tags = ref<string[] | number[]>([1, 2]);
  const deleteTag = (index: number) => {
    tags.value.splice(index, 1);
  };
  const addTag = (tag: string | number) => {
    tags.value.push(tag as never);
  };
  const setTags = (arr: []) => {
    tags.value = arr;
    return tags;
  };
  const getTags = () => {
    return tags;
  };

  const toDO = () => {
    emit('toAdd');
  };
  defineExpose({
    setTags,
    getTags,
    addTag,
    deleteTag,
  });
</script>

<style lang="less" scoped></style>
