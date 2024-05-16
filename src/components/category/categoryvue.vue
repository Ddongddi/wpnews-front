<template>
    <div class="container mt-3" v-if="!(articles.length == 0)">
        <div v-for="(category, index) in categories" class="mb-5" v-show="!(articles[index].length == 0 || !articles[index])">
            <RouterLink :to="'/category/' + category"
                style="color: black !important; text-decoration: none !important;">
                <h2 class="catetitle mb-2">{{ category }}</h2>
            </RouterLink>
            <div class="row newsitem px-4" v-if="!(articles[index].length == 0)">
                <div class="col-lg-11 p-0">
                    <div class="row border">
                        <RouterLink :to="'/article/' + articles[index][0].id" class="col-5 col-md-3 p-2" style="text-decoration: none; color: black;">
                            <img :src="articles[index][0].thumbnail" class="w-100 rounded-2 border">
                        </RouterLink>
                        <RouterLink class="col-7 col-md-5 p-2" :to="'/article/' + articles[index][0].id"
                            style="display: flex; flex-direction: column; justify-content: space-between; text-decoration: none; color: black;">
                            <div>
                                <h5 class="newstitle" :class="{'newsdes': ismd, 'h6': ismd}"><span class="badge text-bg-danger"
                                        v-if="articles[index][0].arttype == 'breaking'">속보</span><span
                                        class="badge text-bg-primary"
                                        v-if="articles[index][0].arttype == 'deep'">심층</span><span
                                        class="badge text-bg-success"
                                        v-if="articles[index][0].arttype == 'real'">현장</span> {{
                                    articles[index][0].arttitle }}
                                </h5>
                                <small class="text-muted newsdes mt-1" v-show="!(islg || ismd || issm)" style="font-size: small;">{{
                                    articles[index][0].artbody }}</small>
                            </div>
                            <small class="text-muted" :class="{'mdsmall': (ismd || issm)}">{{ articles[index][0].editdate }}</small>
                        </RouterLink>
                        <div class="col-md-4" :class="{'border-start': !(ismd || issm)}">
                            <RouterLink v-for="(article, aindex) in articles[index].slice(1, 3)" :class="{'thirty': !(ismd || issm), 'border-bottom': !(aindex == 2), 'border-top': ((ismd || issm) && !(aindex == 2)), 'py-2': (ismd || issm)}" :to="'/article/' + article.id" class="row" style="display: flex; align-items: center; justify-content: center; text-decoration: none; color: black;">
                                    <p class="m-0" style="width: fit-content;" :class="{'mdsmall': islg, 'small': (ismd || issm)}">
                                        <span class="badge text-bg-danger"
                                            v-if="article.arttype == 'breaking'">속보</span><span
                                            class="badge text-bg-primary"
                                            v-if="article.arttype == 'deep'">심층</span><span
                                            class="badge text-bg-success" v-if="article.arttype == 'real'">현장</span> {{
                                        article.arttitle }}
                                    </p>
                            </RouterLink>
                            <RouterLink :to="'/category/' + category" class="row bg-danger-subtle" :class="{'thirty': !(ismd || issm), 'border-bottom': (articles[index].slice(1, 3).length != 2 && !(ismd || issm)), 'py-2': (ismd || issm)}" style="text-decoration: none; color: #000; justify-content: center; align-items: center;">
                                <p class="m-0" style="width: fit-content;" :class="{'mdsmall': islg, 'small': (ismd || issm)}">
                                더보기
                                </p>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mdsmall {
    font-size: small;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.lgxmall {
    font-size: x-small;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
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

.thirty {
    height: 33.3% !important;
}
</style>

<script>
export default {
    data() {
        return {
            categories: [],
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

            this.categories = res.reverse()
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
        async checkarticle() {
            let response = await fetch('https://www.wpnews.kro.kr/api/article/list')
            let res = await response.json()

            let pubarticle = res.filter(e => e.ifpublic == true)
            let finalarticle = []
            this.categories.forEach(element => {
                let newar = pubarticle.filter(e => e.artcategory == element).reverse().slice(0, 3)
                newar.forEach(e => {
                    e.artbody = e.artbody.replaceAll('\n', '')
                    let editdate = new Date(e.editdate)
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
                    e.editdate = editdate.getFullYear() + '-' + editmonth + '-' + editday + ' ' + edithour + ':' + editminute + ':' + editsecond
                });
                // console.log(newar)
                finalarticle.push(newar)
            });
            this.articles = finalarticle
        }
    },
    async mounted() {
        await this.checkcategory()
        await this.checkarticle()
        this.checkwidth()
        window.addEventListener('resize', () => this.checkwidth())
        // console.log(this.iffetched)
        // console.log(this.categories)
        // console.log(this.articles)
    }
}
</script>