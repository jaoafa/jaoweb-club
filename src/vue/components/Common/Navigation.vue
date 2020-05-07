<template>
  <nav class="Navigation">
    <ul class="Navigation__Container">
      <template v-for="( route ) in routes">
        <li
          class="Navigation__Item"
          :key="route.name">
          <router-link
            class="Navigation__Link"
            :class="{'_current': currentPath[0] === route.group}"
            :to="'/'+route.to">
            <i class="Navigation__Icon fas" :class="'fa-'+route.icon"></i>
            <span class="Navigation__Text">{{ route.label }}</span>
          </router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    routes() {
      let routes = ( this.$router.options.routes ).filter( ( route ) => {
        return ( route.path === '/' );
      })[0].children.map( ( route ) => {
        return {
          group: route.meta.group,
          icon: route.meta.icon,
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
            group: item.group,
            label: item.label,
            name: item.name,
            to: item.to
          }
        });
        return {
          children: children,
          group: route.group,
          icon: route.icon,
          label: route.label,
          name: route.name,
          to: route.to
        }
      });
    },
    currentPath() {
      return this.$route.path.split('/').filter( ( item ) => { return ( item !== '' ) });
    }
  }
}
</script>

<style lang="scss" scoped>
.Navigation {
  height: calc( 100vh - #{$size-base}*8 );
  padding: $size-base*4 0;
  position: sticky;
  top: $size-base*8;
  background: $color-white;
  box-shadow: 0 0 $size-base*1 $color-shadow;

  &__Container {
    list-style: none;
  }

  &__ChildContainer {
    list-style: none;
  }

  &__Item {
    background: transparent;
  }

  &__ChildItem {
    background: $color-gray-5;
  }

  &__Link {
    padding: 0 $size-base*1 0 $size-base*5;
    display: block;
    color: $color-gray-4;
    background: transparent;
    font-size: $font-size-s1;
    text-decoration: none;
    line-height: $size-base*6;
    border-left: solid 4px transparent;
    transition-duration: $transition-duration-base;

    &:hover {
      color: $color-primary;
      background: $color-gray-6;
    }
    &._current {
      color: $color-primary;
      border-color: $color-primary;
    }
  }

  &__Icon {
    padding-right: $size-base*3;
    text-align: center;
  }

  &__Text {
    color: $color-gray-1;
  }
}
</style>