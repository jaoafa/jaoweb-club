<template>
  <div class="Popups">
    <div
      class="Popups__Item"
      v-for="( popup, index ) in popups"
      :class="'_'+popup.type"
      :key="'popup_'+popup.id">
      <button
        class="Popups__Remove"
        @click="removePopup(index)">
        <i class="fas fa-times-circle"></i>
      </button>
      <span class="Popups__Heading">{{ popup.title }}</span>
      <p class="Popups__Body">{{ popup.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    popups: {
      type: Array,
      required: true
    }
  },
  methods: {
    removePopup( index ) {
      this.$emit( 'removePopup', index );
    }
  }
}
</script>

<style lang="scss" scoped>
.Popups {
  width: $size-base*38;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  gap: $size-base*2;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 120;

  &__Item {
    width: 100%;
    padding: $size-base*5 $size-base*2 $size-base*2;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat( 2, auto );
    gap: $size-base*1;
    position: relative;
    color: $color-white;
    border-radius: $size-base*1;
    box-shadow: $size-base*1/4 $size-base*1/4 $size-base*1 $color-shadow;
    transition-duration: $transition-duration-base*2;
    animation: slidein .3s 0s ease-out forwards;

    &:hover {
      box-shadow: 0 0 0 $color-shadow;;
    }
    &._error {
      background: $color-red;
    }
    &._success {
      background: $color-green;
    }
  }
  &__Remove {
    position: absolute;
    top: $size-base*1;
    right: $size-base*2;
  }
  &__Heading {
    font-size: $font-size-l1;
    line-height: 1.25;
  }
  &__Body {
    font-size: $font-size-s2;
  }
}
@keyframes slidein {
  0% {
    transform: translateY($size-base*(0)) translateX($size-base*2);
    opacity: 0;
  }
  100% {
    transform: translateY($size-base*2) translateX($size-base*(-2));
    opacity: .7;
  }
}
</style>