<template>
  <nav class="Breadcrumbs">
    <wrap>
      <ol class="Breadcrumbs__Container">
        <li
          class="Breadcrumbs__Item"
          v-for="(item,index) in items"
          :key="'breadcrumbs_'+index">
          <template v-if="item.path">
            <router-link
              class="Breadcrumbs__Text"
              :to="item.path">{{ item.label }}</router-link>
          </template>
          <template v-else>
            <span
              class="Breadcrumbs__Text">{{ item.label }}</span>
          </template>
        </li>
      </ol>
    </wrap>
  </nav>
</template>

<script>
// Components
import Wrap from '@/vue/components/Common/Wrap';

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    Wrap
  }
}
</script>

<style lang="scss" scoped>
.Breadcrumbs {
  padding: $size-base*1 0 $size-base*1/2;
  background: $color-gray-6;
  border-bottom: solid 1px $color-gray-4;
  font-size: $font-size-s2;

  &__Container {
    overflow: hidden;
    text-overflow: ellipsis;
    list-style: none;
    white-space: nowrap;
  }
  &__Item {
    display: inline;

    &:not(:last-child)::after {
      content: "\f105";
      margin: 0 $size-base*1;
      font-family: $font-family-icon;
      font-weight: $font-weight-icon;
    }
  }
  &__Text {
    color: inherit;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>