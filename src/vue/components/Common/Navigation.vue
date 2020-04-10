<template>
  <nav class="Navigation">
    <ul class="Navigation__Container">
      <template v-for="( route ) in routes">
        <li
          class="Navigation__Item"
          :key="route.name">
          <router-link
            class="Navigation__Link"
            :to="route.to">{{ route.label }}</router-link>
          <template v-if="route.children.length > 0">
            <ul class="Navigation__ChildContainer">
              <template v-for="( item ) in route.children">
                <li
                  class="Navigation__ChildItem" 
                  :key="item.name">
                  <router-link
                    class="Navigation__Link"
                    :to="item.to">{{ item.label }}</router-link>
                </li>
              </template>
            </ul>
          </template>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    routes() {
      let routes = ( this.$router.options.routes ).map( ( route ) => {
        return {
          label: route.meta.label,
          name: route.name,
          path: route.path.split('/').filter( ( item ) => { return ( item !== '' ) }),
          to: route.path
        };
      }).filter( ( route ) => {
        return ( route.path.length > 0 );
      });
      return routes.filter( ( route ) => {
        return ( route.path.length === 1 );
      }).map( ( route ) => {
        let children = routes.filter( ( item ) => {
          return ( ( item.path.some( ( path ) => {
            return ( route.name === path );
          })) && ( item.path.length >= 2 ) );
        }).map( ( item ) => {
          return {
            label: item.label,
            name: item.name,
            to: item.to
          }
        });
        return {
          children: children,
          label: route.label,
          name: route.name,
          to: route.to
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.Navigation {
  position: sticky;
  top: $size-base*13;
  overflow: hidden;
  border: solid 1px $color-gray-4;
  border-radius: $size-base*1;

  &__Container {
    position: relative;
    list-style: none;
  }
  &__ChildContainer {
    list-style: none;
  }
  &__Item {
    background: $color-white;

    &:not(:first-child) {
      border-top: solid 1px $color-gray-4;
    }
  }
  &__ChildItem {
    background: $color-gray-5;
    border-top: solid 1px $color-gray-4;
  }
  &__Link {
    padding: $size-base*1 $size-base*2;
    display: block;
    color: inherit;
    font-size: $font-size-s1;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>