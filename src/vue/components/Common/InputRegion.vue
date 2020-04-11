<template>
  <div class="InputRegion">
    <label class="InputRegion__Label">{{ label }}
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
          <!-- <p class="InputRegion__Error">
            <i class="fas fa-exclamation-triangle"></i>
            <span>エラーメッセージ</span>
          </p> -->
        </li>
      </template>
    </ul>
    <div class="InputRegion__Footer">
      <span class="InputRegion__Counter">{{ blocksCount }} Blocks</span>
      <!-- <template v-if="points.length > 4"> -->
        <button
          class="InputRegion__AddButton"
          type="button"
          @click="addPoint('0','0')">
          <i class="fas fa-plus-circle"></i>
          <span>座標を追加する</span>
        </button>
      <!-- </template> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blocksCount: 0,
      points: [
        { id: 1, x: '0', z: '0' }
      ]
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
    }
  },
  methods: {
    addPoint( x, z ) {
      let max = this.points.reduce( ( a, b ) => {
        return a.id > b.id ? a : b;
      });
      this.points.push({
        id: ( max.id + 1 ),
        x: x,
        z: z
      })
    },
    removePoint( index ) {
      this.points.splice( index, 1 );
    },
    countBlocks() {
      if( this.points.length < 4 ) {
        this.blocksCount = 0;
      }
      else {
        let size = 0;
        let side = 0;
        this.points.reduce( ( a, b ) => {
          let x1 = parseInt( a.x, 10 );
          let x2 = parseInt( b.x, 10 );
          let z1 = parseInt( a.z, 10 );
          let z2 = parseInt( b.z, 10 );
          size += ( x1 * z2 ) - ( x2 * z1 );
          side += Math.abs( x1 - x2 ) + Math.abs( z1 - z2 );
          return b;
        }, this.points.slice(-1)[0]);
        this.blocksCount = Math.abs( size / 2 ) + ( side / 2 ) + 1;
      }
    }
  },
  watch: {
    points: {
      handler( newPoints, oldValues ) {
        this.countBlocks();
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
    font-size: $font-size-s1;
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
    grid-template-columns: $size-base*4 repeat( 2, $size-base*20 ) $size-base*2;
    grid-template-rows: repeat( 2, auto );
    gap: 0 $size-base*3;
    align-items: center;
    counter-increment: regionPoint;
  }
  &__PointLabel {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    width: 100%;
    height: 100%;
    min-height: $size-base*6;
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
    border-radius: $size-base*1;

    &:focus-within,&:active {
      border-color: $color-blue;
    }
    &._error {
      border-color: $color-red;
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
    padding: $size-base*1/2 $size-base*1;
    display: block;
    outline: none;
    font-size: $font-size-s2;
  }
  &__RemoveButton {
    color: $color-gray-4;
    font-size: $font-size-s1;
    transition-duration: $transition-duration-base;

    &:hover {
      color: $color-red;
    }
  }
  &__AddButton {
    display: grid;
    grid-template-columns: repeat( 2, auto );
    grid-template-rows: auto;
    gap: $size-base*1;
    align-items: center;
    padding: $size-base*1/2 $size-base*2;
    color: $color-gray-3;
    background: $color-white;
    font-size: $font-size-s2;
    border: solid 1px $color-gray-4;
    border-radius: $size-base*1;
    transition-duration: $transition-duration-base;

    &:hover {
      border-color: $color-gray-3;
    }
  }
  &__Error {
    grid-column: 2 / 5;
    grid-row: 2 / 3;
    margin-top: $size-base*1;
    display: grid;
    grid-template-columns: $size-base*2 1fr;
    grid-template-rows: auto;
    gap: $size-base*1;
    align-items: center;
    color: $color-red;
    font-size: $font-size-s2;
  }
  &__Footer {
    padding: $size-base*1 $size-base*2;
    display: grid;
    grid-template-columns: repeat( 2, auto ) 1fr;
    grid-template-rows: auto;
    gap: $size-base*2;
    align-items: center;
    background: $color-gray-6;
    border: solid 1px $color-gray-5;
    border-radius: $size-base*1;
  }
  &__Counter {
    color: $color-gray-3;
    font-size: $font-size-s1;
  }
}
</style>