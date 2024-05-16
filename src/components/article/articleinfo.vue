<template>
    <div class="container-md mt-3">
        <div class="row" style="display: flex; align-items: center; justify-content: center;">
            <div class="col-md-7">
                <h2 class="mb-5 fw-bold"><span class="badge text-bg-danger"
                        v-if="article.arttype == 'breaking'">속보</span><span class="badge text-bg-primary"
                        v-if="article.arttype == 'deep'">심층</span><span class="badge text-bg-success"
                        v-if="article.arttype == 'real'">현장</span> {{ article.arttitle }}
                </h2>
                <div id="artinfo" class="border-bottom pb-3">
                    <div id="artdate">
                        <h6>개시: {{ article.writedate }}</h6>
                        <h6 class="m-0">수정: {{ article.editdate }}</h6>
                    </div>
                    <div>
                        <div id="admininfo">
                            <img id="profile" :src="author.pfimg" style="height: 100%;" class="me-2 rounded-circle border">
                            <h6>{{ author.name }}</h6>
                        </div>
                    </div>
                </div>
                <img class="mt-3 rounded-3 border" :src="article.thumbnail" style="width: 100%;">
                <div class="mt-3 h6" id="artbody" style="white-space: pre-wrap;">
                    {{ article.artbody }}
                </div>
            </div>
        </div>
        <a href="https://play.google.com/store/apps/details?id=com.nexon.bluearchiveteen&pcampaignid=web_share" v-show="!ismd">
            <img src="/banner.jpg" id="banner">
        </a>
    </div>
</template>

<style>
.container-md {
    position: relative;
}

#banner {
    position: absolute;
    top: 0;
    max-height: 500px;
    height: fit-content;
    /* height: 100%; */
}

#admininfo>h6 {
    margin: 0 !important;
}

#artinfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#admininfo {
    display: flex;
    align-items: center;
}

#artbody {
    line-height: 1.56;
}
</style>

<script>
export default {
    data() {
        return {
            article: {},
            author: {},
            ismd: false
        }
    },
    metaInfo: {
        title: 'WP NEWS'
    },
    methods: {
        async getarticle() {
            let response = await fetch('https://www.wpnews.kro.kr/api/article/find?id=' + this.$route.params.id)
            if (response.status == 404) {
                alert('등록된 기사가 없습니다.')
                this.$router.push('/')
                return
            }
            response = await response.json()
            let writedate = new Date(response.writedate)
            let editdate = new Date(response.editdate)

            writedate = writedate.getFullYear() + '-' + (writedate.getMonth() + 1 < 10 ? "0" + (writedate.getMonth() + 1) : writedate.getMonth()) + '-' + (writedate.getDate() + 1 < 10 ? "0" + writedate.getDate() : writedate.getDate()) + ' ' + (writedate.getHours() < 10 ? "0" + writedate.getHours() : writedate.getHours()) + ':' + (writedate.getMinutes() < 10 ? "0" + writedate.getMinutes() : writedate.getMinutes()) + ':' + (writedate.getSeconds() < 10 ? "0" + writedate.getSeconds() : writedate.getSeconds())
            editdate = editdate.getFullYear() + '-' + (editdate.getMonth() + 1 < 10 ? "0" + (editdate.getMonth() + 1) : editdate.getMonth()) + '-' + (editdate.getDate() + 1 < 10 ? "0" + editdate.getDate() : editdate.getDate()) + ' ' + (editdate.getHours() < 10 ? "0" + editdate.getHours() : editdate.getHours()) + ':' + (editdate.getMinutes() < 10 ? "0" + editdate.getMinutes() : editdate.getMinutes()) + ':' + (editdate.getSeconds() < 10 ? "0" + editdate.getSeconds() : editdate.getSeconds())
            // response.writedate = new Date(response.writedate)
            // response.editdate = new Date(response.editdate)
            // response.writedate = new Date(response.writedate)
            response.writedate = writedate
            response.editdate = editdate
            this.article = response
            console.log(response)

            this.getauthor(response.reportid)
        },
        async getauthor(author) {
            let response = await fetch('https://www.wpnews.kro.kr/api/user?reportid=' + author)
            response = await response.json()
            this.author = response.userdata
        },
        checkwidth() {
            if (window.innerWidth < 768) {
                this.ismd = true
            } else {
                this.ismd = false
            }
            this.imgsizechange()
            console.log(this.ismd)
    },
        imgsizechange() {
            let img = document.getElementById('profile')
            let artdate = document.getElementById('artdate')
            let artdateheight = window.getComputedStyle(artdate).height

            img.style.height = artdateheight
        }
    },
    async mounted() {
        this.checkwidth()
        window.addEventListener('resize', () => {
            this.checkwidth()
        })
        await this.getarticle()
    }
}
</script>