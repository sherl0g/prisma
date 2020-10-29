<template>
  <div class="item-inner">
    <div class="d-flex event" style="min-height: 50px">
      <div class="p-2 flex-shrink-1 border-right" style="min-width: 170px">{{ source.datetime }}</div>
      <div class="p-2 w-100">{{ source.event }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'infinite-loading-item',
  props: {
    source: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
