<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="article_full_share">
    <WidgetShareAddBookmark />
    <WidgetShareSoc :title />
  </div>
</template>

<style lang="css" scoped></style>
