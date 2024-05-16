<script setup></script>

<template>
    <div class="container-md mt-3">
        <table class="table table-responsive-lg">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">제목</th>
                    <th scope="col">구분</th>
                    <th scope="col">분야</th>
                    <th scope="col">메뉴</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(article, index) in articlelist">
                    <td class="text-truncate">{{ article.id }}</td>
                    <td class="text-truncate">{{ article.arttitle }}</td>
                    <td>{{ article.arttype }}</td>
                    <td>{{ article.artcategory }}</td>
                    <td>
                        <button type="button" class="btn btn-sm btn-primary me-2" v-if="article.ifpublic" disabled>개시</button>
                        <button type="button" class="btn btn-sm btn-outline-primary me-2" v-else-if="(!article.ifpublic && (reportid == article.reportid || reportid == 'jhyou'))" @click="gopublic(index)">개시</button>
                        <button type="button" class="btn btn-sm btn-outline-primary me-2" v-else disabled>개시</button>

                        <RouterLink :to="'/admin/edit/' + article.id" v-if="(reportid == 'jhyou' || reportid == article.reportid)">
                            <button type="button" class="btn btn-sm btn-outline-secondary me-2">수정</button>
                        </RouterLink>
                        <button type="button" class="btn btn-sm btn-outline-secondary me-2" v-else disabled>수정</button>
                        
                        <button type="button" class="btn btn-sm btn-outline-danger me-2" @click="artdelete(index)" v-if="(reportid == 'jhyou' || reportid == article.reportid)">삭제</button>
                        <button type="button" class="btn btn-sm btn-outline-danger me-2" v-else disabled>삭제</button>
                    </td>
                </tr>
                <tr v-if="articlelist.length == 0">
                    <td colspan="5" style="text-align: center;">없음</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.table {
    table-layout: fixed 
}

/* .titles {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    -webkit-box-orient: vertical;
} */
</style>

<script>
export default {
    data() {
        return {
            articlelist: [],
            reportid: ''
        }
    },
    methods: {
        async getarticle() {
            let res = await fetch('https://www.wpnews.kro.kr/api/article/list')
            let response = await res.json()

            response.forEach(element => {
                switch (element.arttype) {
                    case 'normal':
                        element.arttype = '일반'
                        break
                    case 'breaking':
                        element.arttype = '속보'
                        break
                    case 'deep':
                        element.arttype = '심층'
                        break
                    case 'real':
                        element.arttype = '현장'
                }
            });

            this.articlelist = response
        },

        async gopublic(i) {
            console.log(this.articlelist[i].id)
            let body = {
                id: this.articlelist[i].id
            }
            let response = await fetch('https://www.wpnews.kro.kr/api/article/public', {
                method: 'post',
                headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            if (response.status === 200) {
                alert('정상 처리되었습니다.')
                location.reload()
            }
        },
        async artdelete(i) {
            let article = this.articlelist[i]
            let response = await fetch('https://www.wpnews.kro.kr/api/article/delete/' + article.id)
            if (response.status == 200) {
                alert('정상 처리되었습니다.')
                location.reload()
            }
        },
    },
    async mounted() {
        await this.getarticle()
        this.reportid = this.$cookies.get('reportid')
    }
}
</script>