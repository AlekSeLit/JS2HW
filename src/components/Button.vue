<template>
  <button :class="[$style.btn]" @click="onBtnClicked">
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    onBtnClicked() {
      this.$emit("mySuperEvent");
    },
  },
};
</script>

<style module lang="scss">
.btn {
  font-family: "BebasNeue";
  padding: 10px;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  background-color: #468fe2;
  border: 0px solid;
  border-radius: 5px;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background: rgb(36, 46, 123);
  }
}
</style>
