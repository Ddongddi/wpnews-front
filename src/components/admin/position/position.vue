<template>
    <div class="container-md mt-3">
        <table class="table table-responsive-lg">
            <thead>
                <tr>
                    <th scope="col">부분</th>
                    <th scope="col">제목</th>
                    <th scope="col">#</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(part, index) in parts">
                    <td>{{ part.name }}</td>
                    <td class="text-truncate">{{ part.arttitle }}</td>
                    <td class="text-truncate">
                        <select class="form-select" :id="index" @change="changeposition(part.name, index)">
                            <option :selected="part.artid == ''">없음</option>
                            <option v-for="(article, index) in articles" :selected="part.artid == article.id" :value="index">{{ article.id }}</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.table {
    table-layout: fixed
}
</style>

<script>
export default {
    data() {
        return {
            parts: [],
            articles: []
        }
    },
    methods: {
        async getparts() {
            let response = await fetch('https://www.wpnews.kro.kr/api/parts/list')
            response = await response.json()
            response.forEach((element, index) => {
                element.forEach(e => {
                    e.indexes = index
                    this.parts.push(e)
                });
            });

            this.parts.forEach(async element => {
                if (element.artid == '') return element.arttitle = '없음'
                let artdata = await fetch('https://www.wpnews.kro.kr/api/article/find?id=' + element.artid)
                if (artdata.status == 404) {
                    element.artid = ''
                    element.arttitle = ''
                } else {
                    artdata = await artdata.json()
                    element.arttitle = artdata.arttitle
                }
            });
        },

        async getarticles() {
            let response = await fetch('https://www.wpnews.kro.kr/api/article/list')
            response = await response.json()
            response = response.filter(e => e.ifpublic == true)

            this.articles = response
        },
        
        async changeposition(name, index) {
            let idvalue = document.getElementById(index).value
            let artid = ''
            if (!this.articles[idvalue]) artid == ''
            else artid = this.articles[idvalue].id
            let data = {
                name: name,
                artid: artid,
                indexes: this.parts[index].indexes
            }

            let response = await fetch('https://www.wpnews.kro.kr/api/parts/change', {
                method: 'post', 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            if (response.status == 200) {
                alert('정상 처리되었습니다.')
                location.reload()
            }
        }
    },
    async mounted() {
        await this.getarticles()
        await this.getparts()
    }
}
</script>