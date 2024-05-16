<template>
    <div class="container my-3">
        <div class="row" style="justify-content: center;">
            <div class="col-2">
                <div class="border rounded-2 shadow-sm text-center p-3">
                    <!-- <h6>현재 프로필</h6> -->
                    <img :src="pfimg" class="w-100 rounded-circle border">
                </div>
            </div>
            <div class="col-6">
                <div class="border rounded-2 py-2 px-5 shadow-sm h-100" style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                    <label for="pfimgi" class="form-label">프로필 파일 선택</label>
                    <input type="file" class="form-control" id="pfimgi" accept="image/png, image/jpeg" @change="sendimg()">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

<script>
export default {
    data() {
        return {
            pfimg: ''
        }
    },
    methods: {
        async sendimg() {
            let pfimgi = document.getElementById('pfimgi')
            let reportid = this.$cookies.get('reportid')

            const myPromise = new Promise((resolve, reject) => {
                var reader = new FileReader()
                reader.readAsDataURL(pfimgi.files[0])
                reader.onload = (e) => {
                    // console.log(e.target.result)
                    resolve(e.target.result)
                }
            });

            myPromise.then(async baseimg => {
                let data = {
                    reportid: reportid,
                    pfimg: baseimg
                }

                let response = await fetch('https://www.wpnews.kro.kr/api/pfimg', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })

                if (response.status == 500) return alert('오류 발생')
                
                response = await response.json()
                if (response.message == 'Successfully done') {
                    alert('정상 처리되었습니다.')
                    await this.getimg()
                }
            })
        },

        async getimg() {
            let reportid = this.$cookies.get('reportid')
            let response = await fetch('https://www.wpnews.kro.kr/api/user?reportid=' + reportid)
            if (response.status == 404) {
                alert('확인된 사람이 없습니다.')
            }
            response = await response.json()
            this.pfimg = response.userdata.pfimg
        }
    },
    async mounted() {
        await this.getimg()
    }
}
</script>