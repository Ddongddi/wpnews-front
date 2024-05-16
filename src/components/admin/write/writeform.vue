<script setup>
</script>

<template>
    <div class="container mt-3">
        <form @submit.prevent="gopublic()">
            <div class="row mb-2" style="justify-content: center;">
                <div class="col-8">
                    <div class="input-group">
                        <span class="input-group-text" id="arttitle">제목</span>
                        <input type="text" class="form-control" placeholder="WP NEWS 작동 안해... 회사 &quot;조치중&quot;"
                            aria-label="arttitlebox" id="arttitlebox" aria-describedby="arttitle" required>
                    </div>
                </div>
            </div>
            <div class="row mb-2" style="justify-content: center;">
                <div class="col-8">
                    <div class="input-group">
                        <label class="input-group-text" for="artcategory">구분</label>
                        <select class="form-select" id="artcategory" required v-on:click="checkcategory()">
                            <option value="notavailable">선택</option>
                            <option v-for="(element, index) in category" :value="index">{{ element }}</option>
                            <option value="add">추가</option>
                        </select>
                        <input type="text" aria-label="categoryadd" class="form-control" :disabled="!ifadd"
                            placeholder="추가할 구분을 입력해주세요!" id="addcategory">
                    </div>
                </div>
            </div>
            <div class="row mb-5" style="justify-content: center;">
                <div class="col-8">
                    <input type="radio" class="btn-check checktype" name="options-outlined" id="ifnormal"
                        autocomplete="off" checked>
                    <label class="btn btn-outline-secondary btn-sm me-1" for="ifnormal">일반</label>
                    <input type="radio" class="btn-check checktype" name="options-outlined" id="ifbreaking"
                        autocomplete="off">
                    <label class="btn btn-outline-danger btn-sm me-1" for="ifbreaking">속보</label>
                    <input type="radio" class="btn-check checktype" name="options-outlined" id="ifdeep"
                        autocomplete="off">
                    <label class="btn btn-outline-primary btn-sm me-1" for="ifdeep">심층</label>
                    <input type="radio" class="btn-check checktype" name="options-outlined" id="ifreal"
                        autocomplete="off">
                    <label class="btn btn-outline-success btn-sm" for="ifreal">현장</label>
                </div>
            </div>
            <div class="row mb-2" style="justify-content: center;">
                <div class="col-8">
                    <div class="input-group">
                        <span class="input-group-text" id="artbody">내용</span>
                        <textarea class="form-control" aria-label="artbody" rows="11" placeholder="서버가 고장나... 답이 없다."
                            required id="artbodybox"></textarea>
                    </div>
                </div>
            </div>
            <div class="row mb-4" style="justify-content: center;">
                <div class="col-8">
                    <div class="input-group">
                        <label class="input-group-text" for="thumbnail">이미지</label>
                        <input type="file" class="form-control" id="thumbnail" accept="image/png, image/jpeg" required>
                    </div>
                </div>
            </div>
            <div class="row mb-2" style="justify-content: center;">
                <div class="col-8" style="display: flex; justify-content: flex-end;">
                    <button type="button" class="btn btn-outline-success me-2" id="tempsave" @click="tempsave()"><i
                            class="bi bi-floppy2-fill"></i>
                        임시저장</button>
                    <button type="submit" class="btn btn-outline-primary" id="deploy"><i class="bi bi-check-lg"></i>
                        개시</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            category: [],
            ifadd: false
        }
    },
    methods: {
        // imgtobase() {
        // },
        tempsave() {
            let arttitlebox = document.getElementById('arttitlebox')
            let checktype = document.querySelector('.checktype:checked')
            let artbodybox = document.getElementById('artbodybox')
            let artcategory = document.getElementById('artcategory')
            let addcategory = document.getElementById('addcategory')
            let thumbnail = document.getElementById('thumbnail')
            let sessid = this.$cookies.get('ssesid')
            let category = ''
            if (artcategory.value == 'notavailable') return alert('기사 구분을 선택해주세요')
            if (artcategory.value == 'add' && addcategory.value == '') return alert('추가할 구분을 입력해주세요')
            if (thumbnail.files.length == 0) return alert('이미지 파일을 선택해주세요')

            const myPromise = new Promise((resolve, reject) => {
                var reader = new FileReader()
                reader.readAsDataURL(thumbnail.files[0])
                reader.onload = (e) => {
                    // console.log(e.target.result)
                    resolve(e.target.result)
                }
            });

            if (artcategory.value == 'add') {
                this.categoryadd()
                category = addcategory.value
            } else category = this.category[artcategory.value]

            myPromise.then((baseimg) => {
                let data = {
                    arttitle: arttitlebox.value,
                    arttype: checktype.id.replace('if', ''),
                    artbody: artbodybox.value,
                    artcategory: category,
                    thumbnail: baseimg,
                    sessid: sessid
                }

                fetch('https://www.wpnews.kro.kr/api/article/save', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                }).then(response => {
                    if (response.status == 200) {
                        alert('정상 처리되었습니다.')
                        this.$router.push('/admin')
                    }
                })
                // console.log(arttitlebox.value, checktype.id, artbodybox.value, e)
            })
            // let baseimg = await myPromise()
            // console.log(arttitlebox.value, checktype.id, artbodybox.value, baseimg)
        },
        gopublic() {
            let arttitlebox = document.getElementById('arttitlebox')
            let checktype = document.querySelector('.checktype:checked')
            let artbodybox = document.getElementById('artbodybox')
            let artcategory = document.getElementById('artcategory')
            let addcategory = document.getElementById('addcategory')
            let thumbnail = document.getElementById('thumbnail')
            let sessid = this.$cookies.get('ssesid')
            let category = ''
            if (artcategory.value == 'notavailable') return alert('기사 구분을 선택해주세요')
            if (artcategory.value == 'add' && addcategory.value == '') return alert('추가할 구분을 입력해주세요')
            if (thumbnail.files.length == 0) return alert('이미지 파일을 선택해주세요')

            const myPromise = new Promise((resolve, reject) => {
                var reader = new FileReader()
                reader.readAsDataURL(thumbnail.files[0])
                reader.onload = (e) => {
                    // console.log(e.target.result)
                    resolve(e.target.result)
                }
            });

            if (artcategory.value == 'add') {
                this.categoryadd()
                category = addcategory.value
            } else category = this.category[artcategory.value]

            myPromise.then((baseimg) => {
                let data = {
                    arttitle: arttitlebox.value,
                    arttype: checktype.id.replace('if', ''),
                    artbody: artbodybox.value,
                    artcategory: category,
                    thumbnail: baseimg,
                    sessid: sessid
                }

                fetch('https://www.wpnews.kro.kr/api/article/public', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                }).then(response => {
                    if (response.status == 200) {
                        alert('정상 처리되었습니다.')
                        this.$router.push('/admin')
                    }
                })
                // console.log(arttitlebox.value, checktype.id, artbodybox.value, e)
            })
        },
        async getcategory() {
            let res = await fetch('https://www.wpnews.kro.kr/api/article/category')
            let response = await res.json()
            this.category = response
        },
        checkcategory() {
            let value = document.getElementById('artcategory').value
            if (value == 'add') this.ifadd = true
            else this.ifadd = false
        },
        async categoryadd() {
            let categoryword = document.getElementById('addcategory').value

            let data = {
                category: categoryword
            }

            let res = await fetch('https://www.wpnews.kro.kr/api/category/add', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
        }
    },
    async mounted() {
        await this.getcategory()
    }
}
</script>