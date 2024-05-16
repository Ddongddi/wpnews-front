<script setup>
import loginvue from '@/components/login/login.vue';
import logoutvue from '@/components/login/logout.vue';
</script>

<template>
    <loginvue v-if="islogin"/>
    <logoutvue v-if="islogout"/>
</template>

<script>
export default {
    data() {
        return {
            islogin: false,
            islogout: false,
        }
    },
    methods: {
        async logincheck() {
            let sessid = this.$cookies.get('ssesid')
            if (!sessid) {
                this.islogin = true
                this.islogout = false
                return
            }
            let response = await fetch('https://www.wpnews.kro.kr/api/session?id=' + sessid)
            if (response.status == 404) {
                this.islogout = false
                this.islogin = true
                return
            }
            response = await response.json()
            if (response.message == 'Session Found!') {
                this.islogout = true
                this.islogin = false
                return
            }
        }
    },
    async mounted() {
        await this.logincheck()
    }
}
</script>