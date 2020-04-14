<template>
  <div class="SubmitButton">
    <button
      class="SubmitButton__Button"
      :class="{
        '_disabled': disabled,
        '_loading': loading,
        '_success': success
      }"
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
      required: true
    },
    success: {
      type: Boolean,
      required: true
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
    z-index: 0;
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

      &::before {
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
        z-index: 10;
        border: solid 2px $color-white;
        border-bottom-color: transparent;
        border-radius: 50%;
        opacity: 1;
        animation: loading .75s 0s linear infinite;
      }
      &::after {
        opacity: 0;
      }
    }
    &._success {
      cursor: not-allowed;
      color: transparent;
      background: $color-primary;
      border-color: $color-primary;

      &::before {
        opacity: 0;
      }
      &::after {
        content: "";
        width: $size-base*3;
        height: $size-base*2;
        margin: auto;
        display: block;
        position: absolute;
        top: 0;
        bottom: $size-base*2/3;
        left: 0;
        right: 0;
        z-index: 20;
        border-bottom: solid 4px $color-white;
        border-left: solid 4px $color-white;
        opacity: 1;
        animation: success .3s 0s linear forwards;
      }
    }
  }
}
@keyframes loading {
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
@keyframes success {
  0% {
    transform: rotate(0) scale(.8);
  }
  40% {
    transform: rotate(180deg) scale(.8);
  }
  100% {
    transform: rotate(305deg) scale(1);
  }
}
</style>