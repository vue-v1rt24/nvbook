<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const props = defineProps<{
  howWorkCards: {
    howWorkCardRepeatTitle: string;
    howWorkCardRepeatDesc: string;
    howworkcardrepeatimg: {
      node: {
        mediaItemUrl: string;
      };
    };
  }[];
}>();

const countCard = computed(() => props.howWorkCards.length);
gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();
const nodeScrollTrigger = ref<ScrollTrigger | null>(null);
const cardsBx = ref<HTMLDivElement | null>(null);
const arcAngle = Math.PI * 0.4;
const startAngle = Math.PI / 2 - arcAngle / 20;

const getRadius = () => {
  let radius = 3072;

  mm.add('(min-width: 1601px', () => {
    radius = window.innerWidth * 1.6;
  });

  mm.add('(max-width: 1600px', () => {
    radius = 3000;
  });

  return radius;
};

onMounted(() => {
  const stickyHeight =
    document.querySelector<HTMLDivElement>('.how_work_bx')!.offsetHeight *
    cardsBx.value!.children.length;

  const cards = [...cardsBx.value!.children] as HTMLElement[];

  const totalCards = cards.length;

  const positionCards = (progress: number = 0) => {
    const radius = getRadius();
    const totalTravel = 1 + totalCards / 75;
    const adjustedProgress = (progress * totalTravel - 1) * 0.75;

    cards.forEach((card, i) => {
      const normalizedProgress = (totalCards - 1 - i) / totalCards;
      const cardProgress = normalizedProgress + adjustedProgress;
      const angle = startAngle + arcAngle * cardProgress;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotation = (angle - Math.PI / 2) * (300 / Math.PI);

      gsap.set(card, {
        x: x,
        y: -y + radius,
        rotation: -rotation,
        transformOrigin: 'center center',
      });

      const centerWindow = window.innerWidth / 2;
      const cardPosition = card.getBoundingClientRect();

      if (
        centerWindow >= cardPosition.left &&
        centerWindow < cardPosition.left + card.offsetWidth
      ) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  };

  nodeScrollTrigger.value = ScrollTrigger.create({
    trigger: '.how_work_bx',
    start: 'top top',
    end: `+=${stickyHeight}`,
    pin: true,
    pinSpacing: true,
    onUpdate(self) {
      positionCards(self.progress);
    },
  });

  gsap.to('.card_last', {
    y: () => document.querySelector<HTMLDivElement>('.how_work_bx')!.offsetHeight - 84,
    rotation: 90,
    scale: 0,
    autoAlpha: 0,
    scrollTrigger: {
      trigger: '.how_work_clients',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  positionCards(0);

  window.addEventListener('resize', () => {
    positionCards(0);
  });
});

//
onUnmounted(() => {
  mm.kill(true);

  //
  if (nodeScrollTrigger.value?.kill) {
    nodeScrollTrigger.value.kill();
  }
});
</script>

<template>
  <div class="cards" ref="cardsBx">
    <PageHomeHowWorkCard
      v-for="(card, idx) in howWorkCards"
      :key="card.howWorkCardRepeatTitle"
      :idx="idx + 1"
      :cart-all="countCard"
      :title="card.howWorkCardRepeatTitle"
      :desc="card.howWorkCardRepeatDesc"
      :img-folder="card.howworkcardrepeatimg.node.mediaItemUrl"
      :class="{ card_last: idx + 1 === countCard }"
    />
  </div>
</template>

<style lang="css" scoped>
.cards {
  position: absolute;
  top: 240px;
  left: 50%;
  transform: translateX(-50%);
  height: 550px;
  will-change: transform;

  /*  */
  @media (max-height: 870px) {
    top: 180px;
  }

  @media (max-height: 788px) {
    top: 160px;
  }

  @media (max-height: 768px) {
    top: 140px;
  }
}
</style>
