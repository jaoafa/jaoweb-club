<template>
  <div class="InputString">
    <label class="InputString__Label">
      {{ label }}
      <template v-if="required">
        <abbr class="InputString__Required" title="(必須)">*</abbr>
      </template>
    </label>

    <template v-if="type==='textarea'">
      <textarea
        class="InputString__Input InputString__Input--Textarea"
        :class="{'_error': error!==''}"
        :placeholder="placeholder"
        v-model="inputValue"></textarea>
    </template>
    <template v-else>
      <input
        class="InputString__Input InputString__Input--Text"
        :class="{'_error': error!==''}"
        :placeholder="placeholder"
        :type="type"
        v-model="inputValue" />
    </template>

    <template v-if="error!==''">
      <p class="InputString__Error">
        <i class="fas fa-exclamation-triangle"></i>
        <span>{{ error }}</span>
      </p>
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
    label: {
      // 入力欄上に表示するラベル
      type: String,
      required: true,
      default: ''
    },
    placeholder: {
      // プレースホルダ
      type: String,
      required: false,
      default: ''
    },
    required: {
      // 必須
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      // 入力の種類
      type: String,
      required: true,
      default: 'text',
      validator: ( ( value ) => {
        return [ 'text', 'textarea', 'number', 'password' ].indexOf( value ) !== -1;
      })
    },
    initValue: {
      // 初期値
      type: String,
      required: true,
      default: ''
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
.InputString {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  gap: $size-base*1;

  &__Label {
    font-size: $font-size-s2;
  }

  &__Input {
    width: 100%;
    padding: $size-base*1 $size-base*2;
    display: block;
    border: solid 1px $color-gray-4;
    border-radius: $size-border-radius-base;
    outline: none;
    font-size: $font-size-s2;
    line-height: $font-size-s2 * $font-line-height-base;

    &::placeholder {
      color: $color-gray-3;
    }
    &:focus, &:active {
      border-color: $color-focus;

      &::placeholder {
        color: transparent;
      }
    }
    &._error {
      border-color: $color-error;
    }
    &[type='password'] {
      font-size: $font-size-s4;
      letter-spacing: 2.0pt;
    }

    &--Textarea {
      height: $size-base*10;
      resize: none;
    }
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