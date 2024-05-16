<script setup>
</script>

<template>
    <div class="container mt-3">
        <form>
            <div class="row mb-2" style="justify-content: center;">
                <div class="col-8">
                    <div class="input-group">
                        <span class="input-group-text" id="arttitle">제목</span>
                        <input type="text" class="form-control" placeholder="WP NEWS 작동 안해... 회사 &quot;조치중&quot;"
                            aria-label="arttitlebox" id="arttitlebox" aria-describedby="arttitle" required
                            :value="articleinfo.arttitle">
                    </div>
                </div>
            </div>
            <div class="row mb-5" style="justify-content: center;">
                <div class="col-8">
                    <input type="radio" class="btn-check checktype" name="options-outlined" id="ifnormal"
                        autocomplete="off" :checked="articleinfo.arttype == 'normal'">
                    <label class="btn btn-outline-secondary btn-sm me-1" for="ifnormal">일반</label>
                    <input type="radio" class="btn-check checktype" name="options-outlined" id="ifbreaking"
                        autocomplete="off" :checked="articleinfo.arttype == 'breaking'">
                    <label class="btn btn-outline-danger btn-sm me-1" for="ifbreaking">속보</label>
                    <input type="radio" class="btn-check checktype" name="options-outlined" id="ifdeep"
                        autocomplete="off" :checked="articleinfo.arttype == 'deep'">
                    <label class="btn btn-outline-primary btn-sm me-1" for="ifdeep">심층</label>
                    <input type="radio" class="btn-check checktype" name="options-outlined" id="ifreal"
                        autocomplete="off" :checked="articleinfo.arttype == 'real'">
                    <label class="btn btn-outline-success btn-sm" for="ifreal">현장</label>
                </div>
            </div>
            <div class="row mb-2" style="justify-content: center;">
                <div class="col-8">
                    <div class="input-group">
                        <span class="input-group-text" id="artbody">내용</span>
                        <textarea class="form-control" aria-label="artbody" rows="11" placeholder="서버가 고장나... 답이 없다."
                            required id="artbodybox" :value="articleinfo.artbody"></textarea>
                    </div>
                </div>
            </div>
            <div class="row mb-2" style="justify-content: center;">
                <div class="col-8" style="display: flex; justify-content: flex-end;">
                    <button type="button" class="btn btn-outline-success" id="tempsave" @click="tempsave()"><i
                            class="bi bi-floppy2-fill"></i>
                        저장</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ifsave: false,
            articleinfo: { arttitle: '', artbody: '', arttype: '' }
        }
    },
    methods: {
        // imgtobase() {
        // },
        tempsave() {
            let arttitlebox = document.getElementById('arttitlebox')
            let checktype = document.querySelector('.checktype:checked')
            let artbodybox = document.getElementById('artbodybox')
            let editdate = new Date().getTime()
            let data = {
                id: this.articleinfo.id,
                arttitle: arttitlebox.value,
                arttype: checktype.id.replace('if', ''),
                artbody: artbodybox.value,
                editdate: editdate,
                thumbnail: this.articleinfo.thumbnail
            }

            console.log(data)

            fetch('https://www.wpnews.kro.kr/api/article/save', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.status == 200) {
                    alert('정상 처리되었습니다.')
                    this.$router.push('/admin/manage')
                }
            })
            // console.log(arttitlebox.value, checktype.id, artbodybox.value, e)
            // let baseimg = await myPromise()
            // console.log(arttitlebox.value, checktype.id, artbodybox.value, baseimg)
        },
        async getarticle() {
            let res = await fetch('https://www.wpnews.kro.kr/api/article/list')
            let response = await res.json()
            let article = response.filter(e => e.id == this.$route.params.id)
            console.log(article)

            if (article.length == 0) {
                alert('등록된 기사가 없습니다.')
                this.$router.push('/admin')
            }

            this.articleinfo = article[0]
        }
    },
    async mounted() {
        await this.getarticle()
    }
}
</script>