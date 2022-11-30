<template>
  <app-container :percept="percept">
    <app-navbar title="首页" :show-left="false"></app-navbar>


    <app-safearea :cushion-height="140"></app-safearea>
  </app-container>
</template>

<script>
  export default {
    name: "TheHome",
    props: {
      percept: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>

</style>
