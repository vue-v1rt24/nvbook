<script setup lang="ts">
const route = useRoute();
const theme = useTheme();

//
const paths = [
  '/comanda',
  '/branding',
  '/foto-video',
  '/products',
  '/vacancies',
  '/privacy',
  '/success',
];

//
useSeoMeta({
  titleTemplate(titleChunk) {
    return titleChunk ? titleChunk : 'Прана айти';
  },
});

//
watchEffect(() => {
  if (paths.includes(route.path)) {
    theme.value = 'dark';
  } else {
    theme.value = 'light';
  }
});
</script>

<template>
  <div>
    <Cursor />
    <Header />
    <NuxtPage />
    <Contacts />
    <Footer />
  </div>
</template>

<style lang="css">
/* Анимация с размытием */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

/* Анимация с поворотом */
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}
.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}

/* Анимация с прозрачностью */
.pageopacity-enter-active,
.pageopacity-leave-active {
  transition: opacity 0.5s ease;
}
.pageopacity-enter-from,
.pageopacity-leave-to {
  opacity: 0;
}
</style>
