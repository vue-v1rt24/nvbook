<script setup lang="ts">
const cursor = ref<HTMLDivElement | null>(null);
const aura = ref<HTMLDivElement | null>(null);

let posEl = 0;

//
const mousemoveFoo = (evt: any) => {
  const posX = evt.clientX;
  const posY = evt.clientY;

  cursor.value!.style.top = posY + 'px';
  cursor.value!.style.left = posX + 'px';

  posEl = posY;

  aura.value!.animate(
    {
      top: posY + 'px',
      left: posX + 'px',
    },
    {
      duration: 500,
      fill: 'forwards',
    },
  );
};

const mouseoverFoo = (evt: any) => {
  const target = evt.target as HTMLDivElement;

  //
  cursor.value!.classList.remove('hidden');
  aura.value!.classList.remove('hidden');

  if (target.closest('.about_video')) {
    cursor.value!.classList.add('video');
    aura.value!.classList.add('hidden');
    return;
  }

  if (
    target.closest('a') ||
    target.closest('button:not(.btn_gray)') ||
    target.closest('.checkbox') ||
    target.closest('.check') ||
    target.closest('.label_radio') ||
    target.closest('.close_modal') ||
    target.closest('.map') ||
    target.closest('.header__menu_dots') ||
    target.closest('.react')
  ) {
    cursor.value!.classList.add('active');
    aura.value!.classList.add('active');
  }
};

const mouseoutFoo = (evt: any) => {
  const target = evt.target as HTMLDivElement;

  //
  cursor.value!.classList.add('hidden');
  aura.value!.classList.add('hidden');

  if (target.closest('.about_video')) {
    cursor.value!.classList.remove('video');
    aura.value!.classList.remove('hidden');
    return;
  }

  if (
    target.closest('a') ||
    target.closest('button:not(.btn_gray)') ||
    target.closest('.checkbox') ||
    target.closest('.check') ||
    target.closest('.label_radio') ||
    target.closest('.close_modal') ||
    target.closest('.map') ||
    target.closest('.header__menu_dots') ||
    target.closest('.react')
  ) {
    cursor.value!.classList.remove('active');
    aura.value!.classList.remove('active');
  }
};

//
onMounted(() => {
  if (!isMobile()) {
    document.addEventListener('mousemove', mousemoveFoo);
    document.addEventListener('mouseover', mouseoverFoo);
    document.addEventListener('mouseout', mouseoutFoo);
  }
});

//
onUnmounted(() => {
  if (!isMobile()) {
    document.removeEventListener('mousemove', mousemoveFoo);
    document.removeEventListener('mouseover', mouseoverFoo);
    document.removeEventListener('mouseout', mouseoutFoo);

    posEl = 0;
  }
});
</script>

<template>
  <div class="cursor" ref="cursor">
    <button class="about_video_btn">
      <svg class="about_video_btn_play">
        <use xlink:href="/img/sprite.svg#play"></use>
      </svg>
    </button>
  </div>

  <div class="aura" ref="aura"></div>
</template>

<style lang="css" scoped>
:global(*, *::before, *::after) {
  cursor: none;
}

.cursor,
.aura {
  position: fixed;
  top: -100%;
  left: 0;
  z-index: 1000;
  border-radius: 50%;
  pointer-events: none;
  user-select: none;
  transform: translate(-50%, -50%) scale(1);
  transition: var(--transformAnimate);
  z-index: 10000;
}

.cursor {
  width: 24px;
  height: 24px;
  background-color: var(--accentColor);
}

.cursor.active {
  mix-blend-mode: difference;
  transform: translate(-50%, -50%) scale(1.7);
}

.aura {
  width: 40px;
  height: 40px;
  border: 1px solid var(--accentColor);
}

.aura.active {
  transform: translate(-50%, -50%) scale(0);
}

.cursor.hidden,
.aura.hidden {
  transform: translate(-50%, -50%) scale(0.001);
}

.about_video_btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.001);
  width: 92px;
  height: 92px;
  background-color: var(--colorTextWhite);
  border: none;
  border-radius: 50%;
  transition: var(--transformAnimate);
}

.cursor.video .about_video_btn {
  transform: translate(-50%, -50%) scale(1);
}

.about_video_btn_play {
  width: 32px;
  height: 32px;
  fill: var(--accentColor2);
  transform: translate(3px, 2px);
}

@media (hover: none) and (pointer: coarse) {
  *,
  *::before,
  *::after {
    cursor: default;
  }

  .cursor,
  .aura {
    display: none;
  }
}
</style>
