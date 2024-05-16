<template>
    <footer class="border-top my-5">
        <div class="container mt-2">
            <!-- <div class="container-sm"> -->
            <img src="/logo.png" v-on:click="gotourl()">
            <div id="comdes">
                <small class="text-secondary">디지털 언론의 선도주자가 되겠습니다.</small>
                <small class="text-secondary">(가칭) WP NEWS</small>
                <small class="text-secondary">서버책임자: 유정호 | 보도책임자: 유정호</small>
            </div>
            <!-- </div> -->
        </div>
    </footer>
</template>

<style scoped>
/* footer {
    position: absolute;
    bottom: 0;
    left: 0;
} */

#comdes {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

/* footer {
    width: 100vw;
} */

footer > div {
    display: flex;
    justify-content: space-between;
}

footer > div > img {
    width: 150px;
    height: fit-content;
}

@media (max-width: 1199.98px) {
    footer > div > img {
        width: 100px;
    }

    #comdes {
        font-size: x-small;
    }
}
</style>

<script>
export default {
    data() {
        return {
            gologo: 0
        }
    },
    methods: {
        gotourl() {
            this.gologo++
            if (this.gologo >= 5) return this.$router.push('/login')
        }
    }
}
</script>