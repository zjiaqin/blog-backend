<template>
  <div class="card-talk">
    <Card hoverable>
      <CardMeta title="Card title" description="This is the description">
        <template #avatar>
          <Avatar
            alt="9"
            src="https://i2.hdslb.com/bfs/face/14460244e43a8e9ca8fdc5048752eb533cae795f.jpg@160w_160h_1c_1s.webp"
          />
        </template>
      </CardMeta>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import { Card, CardMeta, Avatar } from 'ant-design-vue';
</script>

<style lang="less" scoped></style>
