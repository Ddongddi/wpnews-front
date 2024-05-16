<template>
    <div id="loginbg">
            <h2 id="closebut"><i class="bi bi-x-lg" @click="goback()"></i></h2>
        <div id="logincontainer" class="border">
            <div id="logintitle" class="pt-4 ps-4">
                <img src="/logo.png" id="lglogo" class="me-4">
                <h1 id="loginword" class="fw-bold">LOGOUT</h1>
            </div>
            <form class="row mt-3 mb-4">
                <div class="col-8 ps-5">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="sloganid" name="sloganid" placeholder="" required disabled :value="belong">
                        <label for="sloganid">소속</label>
                    </div>
                    <div class="form-floating mt-3">
                        <input type="text" class="form-control" id="sloganbody" name="sloganbody" placeholder=""
                            required disabled :value="name">
                        <label for="sloganbody">이름</label>
                    </div>
                </div>
                <div class="col-4 ps-0 pe-5">
                    <button type="submit" class="btn w-100 h-100 btn-danger" @click="logout()">
                        <h3 class="fw-bold m-0">LOGOUT</h3>
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
            belong: '',
            name: ''
        }
    },
    async mounted() {
        const logo = document.getElementById('lglogo')
        const word = document.getElementById('loginword')
        const wordstyle = window.getComputedStyle(word, true)
        logo.style.height = wordstyle.height

        await this.getuserdata()

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

        async getuserdata() {
            let reportid = this.$cookies.get('reportid')
            let response = await fetch('https://www.wpnews.kro.kr/api/user?reportid=' + reportid)
            response = await response.json()
            let userdata = response.userdata
            this.belong = userdata.belong
            this.name = userdata.name
        },

        async logout() {
            let sessid = this.$cookies.get('ssesid')
            let response = await fetch('https://www.wpnews.kro.kr/api/session/delete/' + sessid)
            if (response.status != 200) {
                alert('오류 발생!')
                return location.reload()
            } else {
                response = await response.json()
                if (response.message == 'Delete Success') {
                    alert('로그아웃 성공!')
                    this.$cookies.remove('ssesid')
                    this.$cookies.remove('reportid')
                    return
                }
                return
            }
        }
    }
}
</script>