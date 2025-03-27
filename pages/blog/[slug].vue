<script setup lang="ts">
import { useQueryOne } from '~/composables/blog/useQueryOne';
import { dateFormat } from '@/utils/utils';

import '@/assets/css/video.css';

//
const route = useRoute();

const { isOpenModal } = useOutsideModal();

const { article } = await useQueryOne(route.params.slug);

if (!article) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Статья не найдена',
  });
}

//
useSeoMeta({
  title: article?.metaTitle,
  description: article?.metaDesc,
});

const catVideo = computed(() => article?.categories[0].name === 'Видео');
</script>

<template>
  <section class="article_full_bx">
    <div class="container container_blog">
      <div class="content_bx">
        <div class="article_full">
          <NuxtLink to="/blog" class="parent_page">
            <svg width="14px" height="14px" class="arrow_back">
              <use xlink:href="/public/img/sprite.svg#arrow_back"></use>
            </svg>

            <span>Вернуться назад</span>
          </NuxtLink>

          <!--  -->
          <div class="article_full_top">
            <div class="article_full_tag">
              <div v-for="cat in article?.categories" :key="cat.name">
                <span class="works__tag_hash">#</span>
                <span>{{ cat.name }}</span>
              </div>
            </div>

            <div v-if="article?.date" class="article_full_data">{{ dateFormat(article.date) }}</div>

            <View
              v-if="article?.id"
              :id="article.id"
              :count="article?.countView || 0"
              name-field="blog_kolichestvo_prosmotrov_stati"
              keyStorage="view"
            />

            <PageBlogViewLike />
          </div>

          <h1 class="article_full_h1">{{ article?.title }}</h1>

          <PageBlogArticleOutput
            v-if="!catVideo && article?.id"
            :id="article.id"
            :title="article.title"
            :content="article.content"
            :blog-bylo-polezno="article.blogByloPolezno || 0"
          />

          <PageBlogVideoOutput
            v-if="catVideo && article?.id"
            :id="article.id"
            :title="article.title"
            :content-redactor="article.content"
            :content="article.contentVideo"
            :blog-bylo-polezno="article.blogByloPolezno || 0"
          />
        </div>

        <div class="content_article__widgets">
          <div class="widgetContent1920">
            <PageBlogWidgetContent />
          </div>

          <div class="discuss_roject_1920 article_full__task">
            <div class="article_full__task__title">
              Есть задача? <br />
              Давайте обсудим!
            </div>

            <UiButton title="Обсудить проект" @click-btn="isOpenModal().value = true"></UiButton>
          </div>
        </div>
      </div>
    </div>

    <div class="article_interesting">
      <div class="container container_blog">
        <h2 class="article_interesting__title">Ещё много интересного</h2>
      </div>

      <BlogSlider :id="article?.id" />
    </div>
  </section>
</template>

<style lang="css" scoped>
.content_bx {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  /*  */
  @media (max-width: 1500px) {
    display: contents;
  }
}

/*  */
.content_article__widgets {
  position: sticky;
  top: 20px;
  margin-top: 100px;

  /*  */
  @media (max-width: 1500px) {
    display: none;
  }
}

/*  */
.discuss_roject_1920.article_full__task {
  position: static;
}
</style>
