<template>
    <div class="container-md mt-3">
        <div class="row" style="justify-content: center;">
            <div class="col-md-10">
                <div class="row">
                    <div class="col-lg-3" v-for="articles in marticles" :class="{ 'border-bottom': (islg || ismd || issm), 'mb-3': (islg || ismd || issm) }">
                        <!-- <div class="row"> -->
                        <RouterLink v-for="(article, index) in articles" :class="{ 'border-top': (index != 0) }"
                            class="morenews" :to="'/article/' + article.id">
                            <img :src="article.thumbnail" class="rounded-2 border w-100" v-if="index == 0">
                            <p class="morenewstitle"
                                :class="{ 'h5': ((ismd || islg) && index != 0), 'h6': (issm && index != 0), 'sfont': !(ismd || issm || islg), 'h3': (islg && (index == 0)), 'h4': ((ismd || issm) && (index == 0)), 'my-2': ((ismd || islg || issm) && index == 0), 'mb-1': (!(islg || ismd || issm) && index == 0), 'mt-1': (!(islg || ismd || issm) && index == 0), 'm-0': ((islg || ismd || issm) && index != 0), 'py-2': ((ismd || issm || islg) && index != 0), 'mdnewstitle': ((ismd || islg || issm) && (index == 0)) }">
                                <span class="badge text-bg-danger" v-if="article.arttype == 'breaking'">속보</span><span
                                    class="badge text-bg-primary" v-if="article.arttype == 'deep'">심층</span><span
                                    class="badge text-bg-success" v-if="article.arttype == 'real'">현장</span> {{
                                article.arttitle }}</p>
                        </RouterLink>
                        <!-- </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.morenews {
    display: block;
    text-decoration: none !important;
    color: #000;
}

.mdnewstitle {
    font-family: NanumGothicBold !important;
    font-weight: bold;
}

.sfont {
    font-size: small;
}

.morenewstitle {
    text-decoration: none;
    color: #000;
    margin: 0;
}
</style>

<script>
export default {
    props: ['article'],
    data() {
        return {
            marticles: [[{}], [{}], [{}], [{}]],
            ismd: false,
            islg: false,
            issm: false,
        }
    },
    methods: {
        async getarticle() {
            this.article.forEach(async (e, i) => {
                e.forEach(async (element, index) => {
                    let res = await fetch('https://www.wpnews.kro.kr/api/article/find?id=' + element.artid)
                    res = await res.json()
                    this.marticles[i][index] = res
                });
            });
        },
        checkwidth() {
            if (window.innerWidth < 992 && 768 <= window.innerWidth) {
                this.islg = true
                this.ismd = false
                this.issm = false
            }
            else if (576 <= window.innerWidth && window.innerWidth < 768) {
                this.islg = false
                this.ismd = true
                this.issm = false
            } else if (window.innerWidth < 576) {
                this.islg = false
                this.ismd = false
                this.issm = true
            } else {
                this.islg = false
                this.ismd = false
                this.issm = false
            }
        },
    },
    async mounted() {
        this.checkwidth()
        await this.getarticle()
        window.addEventListener('resize', () => this.checkwidth())
    }
}
</script>