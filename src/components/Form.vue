<template>
  <div>
    <input type="text" placeholder="Название товара" v-model="name" />
    <input type="text" placeholder="Цена товара" v-model="price" />
    <Button @mySuperEvent="send">Создать товар!</Button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Button from './Button.vue'

export default {
  components: {
    Button,
  },
  data () {
    return {
      name: '',
      price: '',
    }
  },
  methods: {
    ...mapActions('goods', [
      'addItem'
    ]),
    send () {
      const { name, price } = this
      this.addItem({ name, price })
    }
  }
}
</script>

<style>

</style>
