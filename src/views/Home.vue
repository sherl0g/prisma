<template>
  <div class="home">
    <Dashboard/>
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/components/dashboard/Dashboard.vue';

export default {
  name: 'Home',
  components: {
    Dashboard,
  },
};
</script>
