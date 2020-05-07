<template>
  <div class="InputPoint">
    <template v-if="label">
      <div class="InputPoint__Header">
        <label class="InputPoint__Label">
          {{ label }}
          <template v-if="required">
            <abbr class="InputString__Required" title="(必須)">*</abbr>
          </template>
        </label>
      </div>
    </template>

    <div class="InputPoint__Body">
      <span
        class="InputPoint__InputGroup"
        :class="{'_error': error!==''}">
        <span class="InputPoint__InputLabel">X</span>
        <input
          class="InputPoint__Input"
          type="number"
          v-model="inputValue.x" />
      </span>
      <span
        class="InputPoint__InputGroup"
        :class="{'_error': error!==''}">
        <span class="InputPoint__InputLabel">Z</span>
        <input
          class="InputPoint__Input"
          type="number"
          v-model="inputValue.z" />
      </span>
    </div>

    <template v-if="error !== '' && label !== ''">
      <div class="InputPoint__Footer">
        <p class="InputPoint__Error">
          <i class="fas fa-exclamation-triangle"></i>
          <span>{{ error }}</span>
        </p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'initValue',
    event: 'value'
  },
  props: {
    error: {
      // エラーメッセージ
      type: String,
      required: false,
      default: ''
    },
    initValue: {
      // 初期値
      type: Object,
      required: true,
      default: () => ({
        x: 0,
        z: 0
      }),
      validator( value ) {
        let keys = Object.keys( value );
        let result = true;
        [ 'x', 'z' ].forEach( ( key ) => {
          result = result && keys.includes( key );
        });
        return result;
      }
    },
    label: {
      // 入力欄上に表示するラベル
      type: String,
      required: false,
      default: ''
    },
    required: {
      // 必須
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    inputValue: {
      get() {
        return this.initValue;
      },
      set( value ) {
        this.$emit( 'value', value );
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.InputPoint {
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  gap: $size-base*1;

  &__Label {
    font-size: $font-size-s2;
  }

  &__Body {
    display: grid;
    grid-template-columns: repeat( 2, 1fr );
    grid-template-rows: auto;
    gap: $size-base*3;
  }

  &__InputGroup {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
    overflow: hidden;
    border: solid 1px $color-gray-4;
    border-radius: $size-border-radius-base;

    &._error {
      border-color: $color-error;
    }
    &:focus-within, &:active {
      border-color: $color-focus;
    }
  }

  &__InputLabel {
    padding: 0 $size-base*2;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $color-gray-5;
    font-size: $font-size-s2;
    border-right: solid 1px $color-gray-4;
  }

  &__Input {
    width: 100%;
    padding: $size-base*1 $size-base*2;
    display: block;
    outline: none;
    font-size: $font-size-s2;
    line-height: $font-size-s2 * $font-line-height-base;
  }

  &__Error {
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