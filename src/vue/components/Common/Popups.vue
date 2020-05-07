<template>
  <transition-group tag="div" class="Popups">
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
      <p class="Popups__Body">{{ popup.text }}</p>
    </div>
  </transition-group>
</template>

<script>
export default {
  computed: {
    popups() {
      return this.$store.getters.popups;
    }
  },
  methods: {
    removePopup( index ) {
      this.$store.dispatch( 'removePopup', {
        index: index
      });
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
  z-index: 140;

  &__Item {
    width: 100%;
    padding: $size-base*5 $size-base*2 $size-base*2;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat( 2, auto );
    gap: $size-base*1;
    position: relative;
    color: $color-white;
    border-radius: $size-border-radius-base;
    box-shadow: 0 0 $size-base*1 $color-shadow;
    transform: translateY($size-base*2) translateX($size-base*(-2));
    transition-duration: $transition-duration-base*2;
    opacity: 1;

    &._error {
      background: $color-error;
    }
    &._warning {
      background: $color-warning;
    }
    &._success {
      background: $color-success;
    }
    &.v-enter, &.v-leave-to {
      transform: translateY($size-base*(0)) translateX($size-base*2);
      opacity: 0;
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
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}
</style>