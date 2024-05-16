<template>
    <div class="container mt-3">
        <div class="mb-5">
            <h2 class="catetitle mb-2">{{ category }}</h2>
            <div class="row m-0" style="justify-content: center;">
                <div class="col-md-8">
                    <RouterLink v-for="(article, i) in articles" :to="'/article/' + article.id" :class="{ 'px-2': ismd }"
                style="color: black !important; text-decoration: none !important; display: block;">
                <div class="row newsitem">
                    <div class="col-4 py-2 border-3 border-top border-start" style="align-items: center;"
                        :class="{ 'border-bottom': i == articles.length - 1 }">
                        <img :src="article.thumbnail" class="newsthumbnail rounded-2 border">
                    </div>
                    <div class="col-8 py-2 border-3 border-end border-top newsinfo"
                        :class="{ 'border-bottom': i == articles.length - 1 }">
                        <div>
                            <h4 class="newstitle" :class="{ 'h6': ismd }"><span class="badge text-bg-danger"
                                    v-if="article.arttype == 'breaking'">속보</span><span class="badge text-bg-primary"
                                    v-if="article.arttype == 'deep'">심층</span><span class="badge text-bg-danger"
                                    v-if="article.arttype == 'real'">현장</span> {{
                                        article.arttitle }}
                            </h4>
                            <small class="text-muted newsdes mt-3" v-show="!ismd">{{ article.artbody }}</small>
                        </div>
                        <h6 class="text-secondary" :class="{ 'mdsmall': ismd, 'mt-1': ismd }">{{ article.editdate
                            }}</h6>
                    </div>
                </div>
            </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mdsmall {
    font-size: small;
}

.mdxmall {
    font-size: x-small;
}

.catetitle {
    font-family: 'NanumGothicBold';
    font-weight: bold;
    color: rgba(221, 27, 118, .8);
}

.catetitle::after {
    content: '';
    width: 100%;
    height: 3px;
    background: rgba(221, 27, 118, .8);
    display: block;
    border-radius: 5px;
}

.newsthumbnail {
    width: 100%;
}

.newsitem {
    justify-content: center;
}

.newstitle {
    word-break: keep-all;
    font-family: NanumGothicBold;
    font-weight: bold;
    margin: 0;
}

.newsdes {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;
}

.newsinfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>

<script>
import { RouterLink } from 'vue-router'

export default {
    data() {
        return {
            category: this.$route.params.name,
            articles: [],
            ismd: false,
            islg: false,
            issm: false
        }
    },
    methods: {
        async checkcategory() {
            let response = await fetch('https://www.wpnews.kro.kr/api/article/category')
            let res = await response.json()
            if (res.includes(this.category)) return
            alert('카테고리가 없습니다.')
            this.$router.push('/category')
        },
        async checkarticle() {
            let response = await fetch('https://www.wpnews.kro.kr/api/article/list')
            let res = await response.json()

            let pubarticle = res.filter(e => e.ifpublic == true && e.artcategory == this.category).reverse()
            pubarticle.forEach(element => {
                element.artbody = element.artbody.replaceAll('\n', '')
                let editdate = new Date(element.editdate)
                let editmonth = editdate.getMonth() + 1
                let editday = editdate.getDate()
                let edithour = editdate.getHours()
                let editminute = editdate.getMinutes()
                let editsecond = editdate.getSeconds()

                if (editmonth < 10) editmonth = '0' + editmonth
                if (editday < 10) editday = '0' + editday
                if (edithour < 10) edithour = '0' + edithour
                if (editminute < 10) editminute = '0' + editminute
                if (editsecond < 10) editsecond = '0' + editsecond
                element.editdate = editdate.getFullYear() + '-' + editmonth + '-' + editday + ' ' + edithour + ':' + editminute + ':' + editsecond
            });
            this.articles = pubarticle
        },
        checkwidth() {
            if (window.innerWidth < 768) {
                this.ismd = true
            } else {
                this.ismd = false
            }
        },
    },
    async mounted() {
        this.checkwidth()
        await this.checkcategory()
        await this.checkarticle()
        window.addEventListener('resize', () => this.checkwidth())
        // console.log(this.categories)
        // console.log(this.articles)
    }
}
</script>