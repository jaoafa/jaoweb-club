<template>
  <div class="InputText">
    <label class="InputText__Label">{{ label }}
      <template v-if="required">
        <abbr class="InputText__Required" title="(必須)">*</abbr>
      </template>
    </label>
    <template v-if="textarea">
      <textarea
        class="InputText__Input InputText__Textarea"
        :class="{'_error': error}"
        :placeholder="placeholder"
        v-model="inputValue"></textarea>
    </template>
    <template v-else>
      <input
        class="InputText__Input"
        type="text"
        :class="{'_error': error}"
        :placeholder="placeholder"
        v-model="inputValue" />
    </template>
    <template v-if="error">
      <p class="InputText__Error">
        <i class="fas fa-exclamation-triangle"></i>
        <span>{{ errorMessage }}</span>
      </p>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false
    }
  },
  props: {
    errorMessage: {
      type: String,
      required: false,
      default: '入力内容に誤りがあります。'
    },
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    pattern: {
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    required: {
      type: Boolean,
      required: true
    },
    textarea: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set( value ) {
        this.validateValue( value );
        this.$emit( 'change', {
          error: this.error,
          name: this.name,
          value: value
        });
      }
    }
  },
  methods: {
    validateValue( value ) {
      if( this.pattern !== '' ) {
        if( value.match( this.pattern ) === null ) {
          this.error = true;
        }
        else {
          this.error = false;
        }
      }
      else {
        if( this.required && ( value === '' ) ) {
          this.error = true;
        }
        else {
          this.error = false;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.InputText {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  gap: $size-base*1;

  &__Label {
    font-size: $font-size-s1;
  }
  &__Input {
    width: 100%;
    padding: $size-base*1/2 $size-base*1;
    display: block;
    border: solid 1px $color-gray-4;
    border-radius: $size-base*1;
    outline: none;
    font-size: $font-size-s2;

    &::placeholder {
      color: $color-gray-3;
    }
    &:focus,&:active {
      border-color: $color-focus;
      &::placeholder {
        color: transparent;
      }
    }
    &._error {
      border-color: $color-error;
    }
  }
  &__Textarea {
    height: $size-base*10;
    resize: none;
  }
  &__Error {
    display: grid;
    grid-template-columns: $size-base*2 1fr;
    grid-template-rows: auto;
    gap: $size-base*1;
    align-items: center;
    color: $color-error;
    font-size: $font-size-s2;
  }
}
</style>