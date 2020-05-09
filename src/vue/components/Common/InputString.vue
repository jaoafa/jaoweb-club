<template>
  <div class="InputString">
    <template v-if="label">
      <div class="InputString__Header">
        <label class="InputString__Label">
          {{ label }}
          <template v-if="required">
            <abbr class="InputString__Required" title="(必須)">*</abbr>
          </template>
        </label>
        <template v-if="text">
          <p class="InputString__Text">{{ text }}</p>
        </template>
      </div>
    </template>

    <div class="InputString__Body">
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
    </div>

    <template v-if="error!==''">
      <div class="InputString__Footer">
        <p class="InputString__Error">
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
      type: String,
      required: true,
      default: ''
    },
    label: {
      // 入力欄上に表示するラベル
      type: String,
      required: false,
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
    text: {
      // ラベル下に表示するテキスト
      type: String,
      required: false,
      default: ''
    },
    type: {
      // 入力の種類
      type: String,
      required: true,
      default: 'text',
      validator: ( ( value ) => {
        return [ 'text', 'textarea', 'number', 'password' ].indexOf( value ) !== -1;
      })
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
  grid-auto-rows: auto;
  grid-auto-flow: row;
  gap: $size-base*1;

  &__Label {
    font-size: $font-size-s2;
  }

  &__Text {
    color: $color-gray-3;
    font-size: $font-size-s2;
    white-space: pre-wrap;
    word-wrap: break-word;
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

    &._error {
      border-color: $color-error;
    }
    &::placeholder {
      color: $color-gray-3;
    }
    &:focus, &:active {
      border-color: $color-focus;

      &::placeholder {
        color: transparent;
      }
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