<template>
  <div class="SubmitButton">
    <button
      class="SubmitButton__Button"
      :class="{'_disabled': disabled, '_loading': loading}"
      @click="clickButton">
      <span class="SubmitButton__Label">{{ label }}</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    clickButton() {
      this.$emit( 'click' );
    }
  }
}
</script>

<style lang="scss" scoped>
.SubmitButton {
  &__Button {
    width: $size-base*18;
    padding: $size-base*1 0;
    position: relative;
    background: $color-primary;
    border: solid 1px $color-primary;
    border-radius: $size-base*1;
    font-size: $font-size-s1;
    text-align: center;
    transition-duration: $transition-duration-base;

    &:hover {
      background: $color-primary-light;
      border-color: $color-primary-light;
    }
    &._disabled {
      cursor: not-allowed;
      color: $color-gray-4;
      background: $color-gray-6;
      border-color: $color-gray-4;
    }
    &._loading {
      cursor: not-allowed;
      color: transparent;
      background: $color-primary-light;
      border-color: $color-primary-light;

      &::after {
        content: "";
        width: $size-base*3;
        height: $size-base*3;
        margin: auto;
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: solid 2px $color-white;
        border-bottom-color: transparent;
        border-radius: 50%;
        animation: rotate .75s 0s linear infinite;
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(.8);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}
</style>