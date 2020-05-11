<template>
  <div class="InputCorners">
    <template v-if="label">
      <div class="InputCorners__Header">
        <label class="InputCorners__Label">
          {{ label }}
          <template v-if="required">
            <abbr class="InputCorners__Required" title="(必須)">*</abbr>
          </template>
        </label>
      </div>
    </template>

    <ul class="InputCorners__Body">
      <li
        class="InputCorners__PointContainer"
        v-for="( point, index ) in inputValue"
        :key="'point_'+point.id">
        <label class="InputCorners__PointLabel">#</label>
        <input-point
          :error="point.error"
          :initValue="point"
          @value="updatePoint" />
        <button
          class="InputCorners__Remove"
          aria-label="座標を削除する"
          @click="removePoint( index )">
          <i class="fas fa-times-circle"></i>
        </button>
        <p class="InputCorners__Error" v-show="point.error">
          <i class="fas fa-exclamation-triangle"></i>
          <span>{{ point.error }}</span>
        </p>
      </li>
    </ul>

    <div class="InputCorners__Footer">
      <span
        class="InputCorners__Loading"
        v-show="loading"></span>
      <span
        class="InputCorners__Counter"
        :class="{'_over': count > 250000}">
        {{ count.toLocaleString() }} Blocks
      </span>
      <button
        class="InputCorners__Add"
        type="button"
        @click="addPoint('0','0')">
        <i class="fas fa-plus-circle"></i>
        <span>座標を追加する</span>
      </button>
    </div>
  </div>
</template>

<script>
// Components
import InputPoint from '@/vue/components/Common/InputPoint';

import throttle   from 'lodash/throttle';

export default {
  data() {
    return {
      count: 0,
      inputValue: [],
      loading: false
    }
  },
  model: {
    prop: 'initValue',
    event: 'corners'
  },
  props: {
    initValue: {
      // 初期値
      type: Array,
      required: true,
      default: []
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
  methods: {
    addPoint( x, z ) {
      let max = this.inputValue.reduce( ( a, b ) => {
        return a.id > b.id ? a : b;
      }, { id: 0 } );
      this.inputValue.push({
        error: '',
        id: ( max.id + 1 ),
        x: x,
        z: z
      });
    },
    removePoint( index ) {
      this.inputValue.splice( index, 1 );
    },
    updatePoint( value ) {
      let index = this.inputValue.findIndex( ( point ) => ( point.id === value.id ) );
      this.inputValue.splice( index, 1, value );
    },
    countBlocks( value, validate ) {
      let count = 0;
      let size  = 0;
      let side  = 0;
      if( validate ) {
        value.reduce( ( a, b ) => {
          size += ( (a.x-0) * (b.z-0) ) - ( (b.x-0) * (a.z-0) );
          side += Math.abs( (a.x-0) - (b.x-0) ) + Math.abs( (a.z-0) - (b.z-0) );
          return b;
        }, value.slice(-1)[0] );
        count = Math.abs( size / 2 ) + ( side / 2 ) + 1;
      }
      return count;
    },
    validateInputs( value ) {
      let corners = JSON.parse( JSON.stringify( value ) );
      let result = true;
      let rotation = true;
      const message = {
        inputTypeError: '数値以外の文字が入力されているか、座標が入力されていません。',
        rotationError: '時計回りもしくは反時計回りとなるように座標を入力してください。',
        samePointError: '同じ座標が入力されています。'
      };
      if( corners.length < 4 ) {
        // 座標の数が 4 未満
        result = false;
      }
      else if( corners.length % 2 !== 0 ) {
        // 座標の数が奇数
        result = false;
      }
      corners.reduce( ( prev, current, index ) => {
        if( ( current.x.search(/^[-]?([1-9]\d*|0)$/) < 0 ) || 
            ( current.z.search(/^[-]?([1-9]\d*|0)$/) < 0 ) ) {
          // 数値以外の文字が入力されている もしくは 何も入力されていない
          corners[index].error = message.inputTypeError;
          result = false;
        }
        else if( index > 0 ) {
          if( ( prev.x === current.x ) && ( prev.z === current.z ) ) {
            // 同じ座標が入力されている
            corners[index].error = message.samePointError;
            result = false;
          }
          else if( ( prev.x !== current.x ) && ( prev.z !== current.z ) ) {
            // X, Z の両方が異なっている
            corners[index].error = message.rotationError;
            result = false;
          }
          else {
            if( index === 1 ) {
              rotation = ( prev.x === current.x ) ? false : true;
              corners[index].error = '';
            }
            else if(( !rotation && ( prev.x !== current.x ) ) ||
                    (  rotation && ( prev.z !== current.z ) )) {
              // 時計回りもしくは反時計回りではない
              corners[index].error = message.rotationError;
              result = false;
            }
            else if(( corners.length >= 4 ) &&
                    ( corners.length % 2 === 0 ) &&
                    ( index + 1 === corners.length ) &&
                    ( (  rotation && ( current.x !== corners[0].x ) ) ||
                      ( !rotation && ( current.z !== corners[0].z ) ) ) ) {
              // 時計回りもしくは反時計回りではない
              corners[index].error = message.rotationError;
              result = false;
            }
            else {
              corners[index].error = '';
            }
          }
        }
        else {
          corners[index].error = '';
        }
        rotation = !rotation;
        return current;
      }, { id: 0, x: '0', z: '0' });
      return {
        value: corners,
        result: result
      };
    }
  },
  watch: {
    initValue: {
      handler( newValue, oldValue ) {
        let inputValue = JSON.stringify( this.inputValue );
        if( inputValue !== JSON.stringify( newValue ) ) {
          inputValue = JSON.parse( inputValue );
          newValue.forEach( ( item ) => {
            let index = inputValue.findIndex( ( point ) => ( point.id === item.id ) );
            if( index < 0 ) {
              this.addPoint( ( item.x + '' ), ( item.z + '' ) );
            }
            else {
              this.updatePoint( item );
            }
          });
        }
        this.loading = false;
      },
      deep: true,
      immediate: true
    },
    inputValue: {
      handler: throttle( function( newValue, oldValue ) {
        if( !this.loading ) {
          this.loading = true;
          let validate = this.validateInputs( newValue );
          this.$emit( 'corners', validate.value );
          let count   = this.countBlocks( validate.value, validate.result );
          this.count  = count;
          this.$emit( 'count', count );
        }
      }, 500 ),
      deep: true
    }
  },
  components: {
    InputPoint
  }
}
</script>

<style lang="scss" scoped>
.InputCorners {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  gap: $size-base*1;

  &__Label {
    font-size: $font-size-s2;
  }

  &__Body {
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    gap: $size-base*1;
    list-style: none;
    counter-reset: corners-count;
  }

  &__Footer {
    padding: $size-base*1 $size-base*2;
    display: grid;
    grid-template-columns: repeat( 3, auto ) 1fr;
    grid-template-rows: auto;
    gap: $size-base*2;
    align-items: center;
    color: $color-gray-3;
    background: $color-gray-6;
    border: solid 1px $color-gray-5;
    border-radius: $size-border-radius-base;
    font-size: $font-size-s1;
  }

  &__PointContainer {
    display: grid;
    grid-template-columns: $size-base*5 $size-base*43 $size-base*2 1fr;
    grid-template-rows: $size-base*7 auto;
    gap: 0 $size-base*3;
    align-items: center;
    counter-increment: regionPoint;
  }

  &__PointLabel {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $color-gray-5;
    font-size: $font-size-s2;

    &::after {
      content: counter( regionPoint );
    }
  }

  &__Add {
    padding: $size-base*1/2 $size-base*2;
    display: flex;
    align-items: baseline;
    color: $color-gray-3;
    background: $color-white;
    font-size: $font-size-s2;
    border: solid 1px $color-gray-4;
    border-radius: $size-border-radius-base;
    transition-duration: $transition-duration-base;

    &:hover {
      border-color: $color-gray-3;
    }

    span {
      padding-left: $size-base*1;
    }
  }

  &__Remove {
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

  &__Counter {
    &._over {
      color: $color-error;
    }
  }

  &__Loading {
    width: $size-base*2;
    height: $size-base*2;
    display: block;
    border: solid 2px $color-gray-3;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: loading .75s 0s linear infinite;
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
</style>