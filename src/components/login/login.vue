<template>
    <div id="loginbg">
            <h2 id="closebut"><i class="bi bi-x-lg" @click="goback()"></i></h2>
        <div id="logincontainer" class="border">
            <div id="logintitle" class="pt-4 ps-4">
                <img src="/logo.png" id="lglogo" class="me-4">
                <h1 id="loginword" class="fw-bold">LOGIN</h1>
            </div>
            <form v-on:submit.prevent="test" class="row mt-3 mb-4">
                <div class="col-8 ps-5">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="sloganid" name="sloganid" placeholder="" required
                            v-model="sloganid">
                        <label for="sloganid">아이디</label>
                    </div>
                    <div class="form-floating mt-3">
                        <input type="password" class="form-control" id="sloganbody" name="sloganbody" placeholder=""
                            required v-model="sloganpw">
                        <label for="sloganbody">비밀번호</label>
                    </div>
                </div>
                <div class="col-4 ps-0 pe-5">
                    <button type="submit" class="btn w-100 h-100 btn-danger">
                        <h3 class="fw-bold m-0">LOGIN</h3>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
#loginbg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

#closebut {
    position: absolute;
    right: 10px;
    top: 10px;
    color: black;
}

#logincontainer {
    width: 700px;
    height: fit-content;
}

#logintitle {
    display: flex;
}

#loginword {
    height: fit-content;
}

.btn {
    background-color: rgba(221, 27, 118, .8);
    color: white;
}

.btn:hover {
    background-color: rgba(184, 15, 94, .8);
}
</style>

<script>
export default {
    data() {
        return {
            sloganid: '',
            sloganpw: ''
        }
    },
    async mounted() {
        const logo = document.getElementById('lglogo')
        const word = document.getElementById('loginword')
        const wordstyle = window.getComputedStyle(word, true)
        logo.style.height = wordstyle.height

        await this.logincheck()

        window.addEventListener('resize', () => {
            const logo = document.getElementById('lglogo')
            const word = document.getElementById('loginword')
            const wordstyle = window.getComputedStyle(word, true)
            logo.style.height = wordstyle.height
        })
    },
    methods: {
        goback() {
            this.$router.push('/')
        },

        async basehash(text) {
            const original = new TextEncoder().encode(text)
            const hashbytes = await crypto.subtle.digest('SHA-256', original)
            const hashbase = await btoa(String.fromCharCode.apply(null, new Uint8Array(hashbytes)));
            return hashbase
        },

        async test() {
            const data = { id: await this.basehash(this.sloganid), pw: await this.basehash(this.sloganpw) }
            const lgdata = await fetch('https://www.wpnews.kro.kr/api/login', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            const lgdatajson = await lgdata.json()
            if (lgdata.status === 401) {
                alert('ID나 PW가 틀렸습니다.')
                this.sloganid = ''
                this.sloganpw = ''  
            } else if (lgdata.status === 400) {
                if (lgdatajson.message.includes('id')) alert('ID를 입력해주십시오.')
                else if (lgdatajson.message.includes('pw')) alert('PW을 입력해주십시오.')
            } else if (lgdata.status === 500) {
                alert('서버 내 오류가 발생했습니다.\n잠시 후 다시 이용해주세요')
            } else if (lgdata.status === 200) {
                if (lgdatajson.message === 'Login Success') {
                    this.$cookies.set('ssesid', lgdatajson.sessid)
                    this.$cookies.set('reportid', lgdatajson.reportid)
                    this.$router.push('/admin')
                } else {
                    alert('서버 내 오류가 발생했습니다.\n잠시 후 다시 이용해주세요.')
                }
            } else {
                alert('서버 내 오류가 발생했습니다.\n잠시 후 다시 이용해주세요.')
            }
        },

        async logincheck() {
            let sessid = this.$cookies.get('ssesid')
            if (!sessid) return
            let response = await fetch('https://www.wpnews.kro.kr/api/session?id=' + sessid)
            if (response.status == 404) return
            response = await response.json()
            if (response.message == 'Session Found!') return this.$router.push('/admin')
        }
    }
}
</script>