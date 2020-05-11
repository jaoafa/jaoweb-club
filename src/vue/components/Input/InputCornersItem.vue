<template>
  <li class="InputCornersItem">
    <label class="InputCornersItem__Label">#{{ index + 1 }}</label>
    <input-point
      :error="point.error"
      :initValue="point"
      @value="updatePoint" />
    <button
      class="InputCornersItem__Button"
      aria-label="座標を削除する"
      @click="removePoint( index )">
      <i class="fas fa-times-circle"></i>
    </button>
    <p class="InputCornersItem__Error" v-show="point.error">
      <i class="fas fa-exclamation-triangle"></i>
      <span>{{ point.error }}</span>
    </p>
  </li>
</template>

<script>
// Components
import InputPoint from '@/vue/components/Input/InputPoint';

export default {
  props: {
    index: {
      // インデックス
      type: Number,
      required: true,
      default: 0
    },
    point: {
      // 座標
      type: Object,
      required: true,
      default: () => ({
        x: 0,
        z: 0
      }),
      validator( value ) {
        let keys = Object.keys( value );
        let result = true;
        [ 'id', 'x', 'z' ].forEach( ( key ) => {
          result = result && keys.includes( key );
        });
        return result;
      }
    },
  },
  methods: {
    updatePoint( value ) {
      this.$emit( 'update', value );
    },
    removePoint( value ) {
      this.$emit( 'remove', value );
    }
  },
  components: {
    InputPoint
  }
}
</script>

<style lang="scss" scoped>
.InputCornersItem {
  display: grid;
  grid-template-columns: $size-base*5 $size-base*43 $size-base*2 1fr;
  grid-template-rows: $size-base*7 auto;
  gap: 0 $size-base*3;
  align-items: center;

  &__Label {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $color-gray-5;
    font-size: $font-size-s2;
  }

  &__Button {
    color: $color-gray-4;
    font-size: $font-size-s1;
    transition-duration: $transition-duration-base;

    &:hover {
      color: $color-error;
    }
  }

  &__Error {
    grid-column: 2 / 5;
    grid-row: 2 / 3;
    display: grid;
    grid-template-columns: $size-base*2 1fr;
    grid-template-rows: auto;
    gap: $size-base*1;
    align-items: baseline;
    color: $color-error;
    font-size: $font-size-s2;
  }
}
</style>