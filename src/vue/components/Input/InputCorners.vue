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
      <input-corners-item
        v-for="( point, index ) in inputValue"
        :error="error[index]"
        :index="index"
        :point="point"
        :key="'point_'+point.id"
        @update="updatePoint"
        @remove="removePoint" />
    </ul>

    <div class="InputCorners__Footer">
      <div class="InputCorners__FooterMain">
        <span
          :class="{'_error': ( count > 250000 ) || ( count <= 0 )}">
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
      <p
        class="InputCorners__Error"
        v-show="error.some(( item ) => { return item })">
        <i class="fas fa-exclamation-triangle"></i>
        <span>時計回りもしくは反時計回りとなるように座標を入力してください。</span>
      </p>
    </div>
  </div>
</template>

<script>
// Components
import InputCornersItem from '@/vue/components/Input/InputCornersItem';

import throttle   from 'lodash/throttle';

export default {
  data() {
    return {
      count: 0,
      error: [],
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
      let inputValue = JSON.parse( JSON.stringify( this.inputValue ) );
      let max = inputValue.reduce( ( a, b ) => {
        return a.id > b.id ? a : b;
      }, { id: 0 } );
      this.inputValue.push({
        id: ( max.id + 1 ),
        x: x,
        z: z
      });
    },
    removePoint( index ) {
      this.inputValue.splice( index, 1 );
    },
    updatePoint( value ) {
      let inputValue = JSON.parse( JSON.stringify( this.inputValue ) );
      let index = inputValue.findIndex( ( point ) => ( point.id === value.id ) );
      this.inputValue.splice( index, 1, JSON.parse( JSON.stringify( value ) ) );
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
      let error = [];
      if( corners.length < 4 ) {
        // 座標の数が 4 未満
        result = false;
      }
      corners.reduce( ( prev, current, index ) => {
        error.push( false );
        if( ( current.x === '' ) || ( current.z === '' ) ) {
          // 数値以外の文字が入力されている もしくは 何も入力されていない
          result = false;
        }
        else if( index > 0 ) {
          if( ( prev.x === current.x ) && ( prev.z === current.z ) ) {
            // 同じ座標が入力されている
            error[index] = true;
            result = false;
          }
          else if( ( prev.x !== current.x ) && ( prev.z !== current.z ) ) {
            // X, Z の両方が異なっている
            error[index] = true;
            result = false;
          }
          else {
            if( index === 1 ) {
              rotation = ( prev.x === current.x ) ? false : true;
            }
            else if(( !rotation && ( prev.x !== current.x ) ) ||
                    (  rotation && ( prev.z !== current.z ) )) {
              // 時計回りもしくは反時計回りではない
              error[index] = true;
              result = false;
            }
            else if(( corners.length >= 4 ) &&
                    ( corners.length % 2 === 0 ) &&
                    ( index + 1 === corners.length ) &&
                    ( (  rotation && ( current.x !== corners[0].x ) ) ||
                      ( !rotation && ( current.z !== corners[0].z ) ) ) ) {
              // 時計回りもしくは反時計回りではない
              error[index] = true;
              result = false;
            }
          }
        }
        rotation = !rotation;
        return current;
      }, { id: 0, x: '0', z: '0' });
      this.error = error;
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
              this.inputValue[index].error = item.error;
            }
          });
        }
        this.loading = false;
      },
      deep: true,
      immediate: true
    },
    inputValue: {
      handler( newValue, oldValue ) {
        if( !this.loading ) {
          this.loading = true;
          let validate = this.validateInputs( newValue );
          this.$emit( 'corners', validate.value );
          let count   = this.countBlocks( validate.value, validate.result );
          this.count  = count;
          this.$emit( 'count', count );
        }
      },
      deep: true
    }
  },
  components: {
    InputCornersItem
  }
}
</script>

<style lang="scss" scoped>
.InputCorners {
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
    grid-template-columns: 100%;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    gap: $size-base*1;
    list-style: none;
    counter-reset: corners-count;
  }

  &__Footer {
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    gap: $size-base*2;
  }

  &__FooterMain {
    padding: $size-base*1 $size-base*2;
    display: grid;
    grid-template-columns: repeat( 2, auto ) 1fr;
    grid-template-rows: auto;
    gap: $size-base*2;
    align-items: center;
    color: $color-gray-3;
    background: $color-gray-6;
    border: solid 1px $color-gray-5;
    border-radius: $size-border-radius-base;
    font-size: $font-size-s1;

    span {
      &._error {
        color: $color-error;
      }
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