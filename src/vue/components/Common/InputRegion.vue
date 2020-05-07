<template>
  <div class="InputRegion">
    <template v-if="label">
      <div class="InputRegion__Header">
        <label class="InputRegion__Label">
          {{ label }}
          <template v-if="required">
            <abbr class="InputRegion__Required" title="(必須)">*</abbr>
          </template>
        </label>
      </div>
    </template>

    <ul class="InputRegion__Body">
      <li
        class="InputRegion__PointContainer"
        v-for="( point, index ) in inputValue"
        :key="'regionPoint_'+point.id">
        <label class="InputRegion__PointLabel">#</label>
        <input-point
          :initValue="point"
          @value="updatePoint" />
        <button
          class="InputRegion__Remove"
          aria-label="座標を削除する"
          @click="removePoint( index )">
          <i class="fas fa-times-circle"></i>
        </button>
      </li>
    </ul>

    <div class="InputRegion__Footer">
      <span
        class="InputRegion__Counter"
        :class="{'_over': countBlocks() > 250000}">
        {{ countBlocks().toLocaleString() }} Blocks
      </span>
      <button
        class="InputRegion__Add"
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

export default {
  created() {
    if( this.initValue.length === 0 ) {
      this.addPoint( '0', '0' );
      this.addPoint( '0', '0' );
      this.addPoint( '0', '0' );
      this.addPoint( '0', '0' );
    }
  },
  model: {
    prop: 'initValue',
    event: 'points'
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
  computed: {
    inputValue: {
      get() {
        return this.initValue;
      },
      set( value ) {
        this.$emit( 'points', value );
        this.$emit( 'count', this.countBlocks( value ) );
      }
    }
  },
  methods: {
    addPoint( x, z ) {
      let points = this.inputValue.slice();
      let max = points.reduce( ( a, b ) => {
        return a.id > b.id ? a : b;
      }, { id: 0 } );
      points.push({
        id: ( max.id + 1 ),
        x: x,
        z: z
      });
      this.inputValue = points;
    },
    removePoint( index ) {
      let points = this.inputValue.slice();
      points.splice( index, 1 );
      this.inputValue = points;
    },
    updatePoint( value ) {
      let points = this.inputValue.map( ( point ) => {
        if( point.id === value.id ) {
          return value;
        }
        else {
          return point;
        }
      });
      this.inputValue = points;
    },
    countBlocks( points = this.inputValue ) {
      if( !this.validateInputs( points ) ) {
        return 0;
      }
      else {
        let size  = 0;
        let side  = 0;
        points.reduce( ( a, b ) => {
          size += ( (a.x-0) * (b.z-0) ) - ( (b.x-0) * (a.z-0) );
          side += Math.abs( (a.x-0) - (b.x-0) ) + Math.abs( (a.z-0) - (b.z-0) );
          return b;
        }, points.slice(-1)[0] );
        return Math.abs( size / 2 ) + ( side / 2 ) + 1;
      }
    },
    validateInputs( points = this.inputValue ) {
      if( points.length < 4 ) {
        // 座標の数が 4 未満
        return false;
      }
      else if( ( points.length % 2 ) !== 0 ) {
        // 座標の数が奇数個
        return false;
      }
      else {
        return true;
      }
    }
  },
  components: {
    InputPoint
  }
}
</script>

<style lang="scss" scoped>
.InputRegion {
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
    counter-reset: regionPoint;
  }

  &__Footer {
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
  }

  &__PointContainer {
    display: grid;
    grid-template-columns: $size-base*4 $size-base*43 $size-base*2 1fr;
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

  &__Counter {
    &._over {
      color: $color-error;
    }
  }
}
</style>