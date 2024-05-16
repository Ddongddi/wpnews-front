<script setup>
import mainnews from '@/components/home/mainnews.vue';
import morenews from '@/components/home/morenews.vue';
</script>

<template>
  <main>
    <mainnews :article="mainarticle" v-if="!(mainarticle.length == 0)"/>
    <morenews :article="morearticle" v-if="!(morearticle.length == 0)" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      mainarticle: [],
      morearticle: []
    }
  },
  methods: {
    async getarticle() {
      let parts = await fetch('https://www.wpnews.kro.kr/api/parts/list')
      parts = await parts.json()
      this.mainarticle = parts[0]
      this.morearticle = parts.slice(1, 5)
    }
  },
  async mounted() {
    await this.getarticle()
  }
}
</script>