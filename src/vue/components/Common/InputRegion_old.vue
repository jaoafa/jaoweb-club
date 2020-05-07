<template>
  <div class="InputRegion">
    <label class="InputRegion__Label">
      {{ label }}
      <template v-if="required">
        <abbr class="InputRegion__Required" title="(必須)">*</abbr>
      </template>
    </label>

    <ul class="InputRegion__InputContainer">
      <template v-for="( point, index ) in points">
        <li
          class="InputRegion__Point"
          :key="'regionPoint_'+point.id">
          <label class="InputRegion__PointLabel">#</label>
          <span class="InputRegion__PointItem">
            <span class="InputRegion__PointItemText">X</span>
            <input
              class="InputRegion__PointItemInput"
              type="number"
              v-model="point.x" />
          </span>
          <span class="InputRegion__PointItem">
            <span class="InputRegion__PointItemText">Z</span>
            <input
              class="InputRegion__PointItemInput"
              type="number"
              v-model="point.z" />
          </span>
          <template v-if="index >= 4">
            <button
              class="InputRegion__RemoveButton"
              aria-label="座標を削除する"
              @click="removePoint(index)">
              <i class="fas fa-times-circle"></i>
            </button>
          </template>
          <template v-if="errors[index].error">
            <p class="InputRegion__Error">
              <i class="fas fa-exclamation-triangle"></i>
              <span>{{ errors[index].message }}</span>
            </p>
          </template>
        </li>
      </template>
    </ul>
    <div class="InputRegion__Footer">
      <span
        class="InputRegion__Counter"
        :class="{'_over': blocksCount > 250000}">
        {{ blocksCount }} Blocks
      </span>
      <template v-if="points.length <= 2">
        <span>「#1」と「#2」を入力してください。</span>
      </template>
      <template v-else-if="points.length === 3">
        <span>「#3」を入力してください。</span>
      </template>
      <template v-else>
        <button
          class="InputRegion__AddButton"
          type="button"
          @click="addPoint('0','0')">
          <i class="fas fa-plus-circle"></i>
          <span>座標を追加する</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blocksCount: 0,
      errors: [],
      points: [],
      validating: false
    }
  },
  created() {
    this.points = this.value;
    if( this.points.length === 0 ) {
      this.addPoint( '0', '0' );
      this.addPoint( '0', '0' );
    }
  },
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  computed: {
    error() {
      if( this.errors.length < 4 ) {
        return true;
      }
      else {
        return this.errors.some( ( item ) => {
          return ( item.error === true );
        });
      }
      return false;
    }
  },
  methods: {
    emitData() {
      this.$emit( 'change', {
        error: this.error,
        name: this.name,
        value: this.points,
        count: this.blocksCount
      });
    },
    addPoint( x, z ) {
      let max = this.points.reduce( ( a, b ) => {
        return a.id > b.id ? a : b;
      }, { id: 0 });
      this.points.push({
        id: ( max.id + 1 ),
        x: x,
        z: z
      });
      this.errors.push({
        error: false,
        message: ''
      })
    },
    removePoint( index ) {
      this.points.splice( index, 1 );
      this.errors.splice( index, 1 );
    },
    countBlocks() {
      if( this.points.length < 4 ) {
        this.blocksCount = 0;
      }
      else {
        let size = 0;
        let side = 0;
        this.points.reduce( ( a, b ) => {
          size += ( (a.x-0) * (b.z-0) ) - ( (b.x-0) * (a.z-0) );
          side += Math.abs( (a.x-0) - (b.x-0) ) + Math.abs( (a.z-0) - (b.z-0) );
          return b;
        }, this.points.slice(-1)[0]);
        this.blocksCount = Math.abs( size / 2 ) + ( side / 2 ) + 1;
      }
    },
    validateValue() {
      let rotation = '';
      let length = this.points.length;
      const rotationError = '時計回りもしくは反時計回りとなるように座標を入力してください。';
      const samePointError = '同じ座標が入力されています。';
      this.points.reduce( ( prev, current, index ) => {
        if( !( ( current.x === '0' ) && ( current.z === '0' ) && ( length < 4 ) ) ) {
          if( ( prev.x !== current.x ) && ( prev.z !== current.z ) ) {
            this.errors[index].error = true;
            this.errors[index].message = rotationError;
          }
          else if( ( prev.x === current.x ) && ( prev.z === current.z ) ) {
            this.errors[index].error = true;
            this.errors[index].message = samePointError;
          }
          else {
            if( index === 1 ) {
              if( prev.x === current.x ) {
                rotation = false;
              }
              else {
                rotation = true;
              }
            }
            if( ( rotation === true ) && ( prev.z !== current.z ) ) {
              this.errors[index].error = true;
              this.errors[index].message = rotationError;
            }
            else if( ( rotation === false ) && ( prev.x !== current.x ) ) {
              this.errors[index].error = true;
              this.errors[index].message = rotationError;
            }
            else {
              this.errors[index].error = false;
              this.errors[index].message = '';
              if( ( ( index + 1 ) === length ) && ( length < 4 ) ) {
                this.addPoint( '0', '0' );
              }
            }
          }
        }
        if( rotation !== '' ) {
          rotation = !rotation;
        }
        return current;
      });
    }
  },
  watch: {
    points: {
      handler( newPoints, oldValues ) {
        this.validateValue();
        this.countBlocks();
        this.emitData();
      },
      deep: true
    }
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

  &__InputContainer {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto;
    gap: $size-base*1;
    list-style: none;
    counter-reset: regionPoint;
  }
  &__Point {
    display: grid;
    grid-template-columns: $size-base*4 repeat( 2, $size-base*20 ) $size-base*2 1fr;
    grid-template-rows: repeat( 2, auto );
    gap: 0 $size-base*3;
    align-items: center;
    counter-increment: regionPoint;
  }
  &__PointLabel {
    width: 100%;
    height: 100%;
    min-height: $size-base*7;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $color-gray-5;
    font-size: $font-size-s2;

    &::after {
      content: counter( regionPoint );
    }
  }
  &__PointItem {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
    overflow: hidden;
    border: solid 1px $color-gray-4;
    border-radius: $size-border-radius-base;

    &:focus-within,&:active {
      border-color: $color-focus;
    }
    &._error {
      border-color: $color-error;
    }
  }
  &__PointItemText {
    padding: 0 $size-base*2;
    display:flex;
    justify-content: center;
    align-items: center;
    background: $color-gray-5;
    font-size: $font-size-s2;
    border-right: solid 1px $color-gray-4;
  }
  &__PointItemInput {
    width: 100%;
    padding: $size-base*1 $size-base*1;
    display: block;
    outline: none;
    font-size: $font-size-s2;
  }
  &__RemoveButton {
    color: $color-gray-4;
    font-size: $font-size-s1;
    transition-duration: $transition-duration-base;

    &:hover {
      color: $color-error;
    }
  }
  &__AddButton {
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
    grid-column: 2 / 6;
    grid-row: 2 / 3;
    margin-top: $size-base*1;
    display: grid;
    grid-template-columns: $size-base*2 1fr;
    grid-template-rows: auto;
    gap: $size-base*1;
    align-items: baseline;
    color: $color-error;
    font-size: $font-size-s2;
  }
  &__Footer {
    padding: $size-base*1 $size-base*2;
    margin-top: $size-base*1;
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
  &__Counter {
    &._over {
      color: $color-error;
    }
  }
}
</style>