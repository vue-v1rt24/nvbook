<script setup lang="ts">
import { useQuery } from '~/composables/blog/useQuery';
import '@/assets/css/works.css';

const route = useRoute();

const { blogs } = await useQuery();

useHead({
  title: 'Блог | Статьи и новости компании PRANA IT',
  meta: [
    {
      name: 'description',
      content:
        'Статьи от IT-экспертов, информационные видео, новости компании. Новые материалы каждую неделю.',
    },
  ],
  script: [
    {
      defer: true,
      src: '/libs/mixitup.min.js',
    },
  ],
});

//
const filterJs = ref<HTMLDivElement | null>(null);
const filterInit = ref<any>(null);
const activeClassBtn = ref('all');
const viewSkeleton = ref(true);
const pageBlog = ref<HTMLDivElement | null>(null);

setTimeout(() => {
  viewSkeleton.value = false;
}, 1000);

const changeTag = (tagname: string) => {
  if (filterInit.value) {
    filterInit.value.filter(`.${tagname}`);
    activeClassBtn.value = tagname;

    pageBlog.value?.scrollIntoView({
      behavior: 'smooth',
    });
  }
};

const changeNameBtm = (name: string) => {
  activeClassBtn.value = name;
};

//
onMounted(() => {
  filterInit.value = mixitup(filterJs.value);
});

//
watchEffect(() => {
  if (route.query.cat) {
    changeTag(decodeURI(route.query.cat as string));
  }
});
</script>

<template>
  <div>
    <Breadcrumbs :breadcrumbs="[{ title: 'Блог' }]" />

    <!--  -->
    <div class="blog_particles"></div>

    <!--  -->
    <section class="page_blog" ref="pageBlog">
      <div class="container">
        <h2 class="title_52">Блог</h2>

        <ButtonsTab
          v-if="blogs?.categories"
          v-show="!viewSkeleton"
          :categories="blogs.categories"
          :active-class-btn="activeClassBtn"
          @change-tag="changeNameBtm"
        />
      </div>
    </section>

    <section class="page_blog works_bx">
      <div v-if="viewSkeleton" class="works">
        <PageBlogSkeletonBlog v-for="w in 15" :key="w" />
      </div>

      <div v-show="!viewSkeleton" class="works" ref="filterJs">
        <PageBlogItem v-for="blog in blogs?.blogs" :key="blog.id" :blog @change-tag="changeTag" />
      </div>
    </section>
  </div>
</template>

<style lang="css" scoped>
.page_blog .title_52 {
  font-size: 62px;
  letter-spacing: 0.02em;
  text-align: left;
  margin-bottom: 82px;

  @media (max-width: 768px) {
    font-size: 42px;
  }

  @media (max-width: 576px) {
    font-size: 32px;
    margin-bottom: 42px;
  }
}

.page_blog.works_bx::before {
  bottom: -130px;
}

.blog_particles {
  position: absolute;
  top: 0;
  right: 0;
  width: 1286px;
  height: 711px;
  background-image: url(/img/blog/decor_blog_1.png);
  background-repeat: no-repeat;
  overflow: hidden;
  z-index: -1;

  @media (max-width: 1299px) {
    width: 699px;
    height: 569px;
    background-image: url(/img/blog/decor_blog_2.png);
  }

  @media (max-width: 576px) {
    width: 318px;
    height: 329px;
    background-image: url(/img/blog/decor_blog_3.png);
  }
}

/*  */

@media (max-width: 1199px) {
  .page_blog.works_bx::before {
    bottom: -100px !important;
  }
}
</style>
