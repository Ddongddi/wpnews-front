<script setup>
import 'bootstrap'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="container-fluid py-4" id="logocontainer">
        <RouterLink to="/"><img src="/logo.png" id="logo"></RouterLink>
    </div>
    <nav class="navbar navbar-expand bg-body-white border-top border-bottom">
        <div class="container-fluid" id="navitemcontainer">
            <ul class="navbar-nav">
                <li class="nav-item mx-2 h5 my-0" :class="{ activated: homeac }">
                    <RouterLink to="/" class="nav-link" :class="{ active: homeac }">Home</RouterLink>
                </li>
                <li class="nav-item mx-2 h5 my-0" :class="{ activated: downac }">
                    <RouterLink to="/category" class="nav-link" :class="{ active: downac }">분야별 뉴스</RouterLink>
                </li>
                <li class="nav-item mx-2 h5 my-0" :class="{ activated: adminac }" v-if="isadmin">
                    <RouterLink to="/admin" class="nav-link" :class="{ active: adminac }">관리자</RouterLink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
#logocontainer {
    display: flex;
    justify-content: center;
    align-items: center;
}

#logo {
    width: 300px;
}

@media (max-width: 1199.98px) {
    #logo {
        width: 230px;
    }

    .nav-item {
        font-size: medium;
    }
}

#navitemcontainer {
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav-item {
    --bs-navbar-active-color: rgba(221, 27, 118, .8);
    --bs-nav-link-hover-color: rgba(221, 27, 118, .8);
    --bs-nav-link-color: rgba(221, 27, 118, .2);
    --bs-nav-link-disabled-color: rgba(221, 27, 118, .2);
}

.nav-item::after {
    display: flex;
    content: '';
    width: 100%;
    height: 3px;
    background-color: #DD1B76;
    border-radius: 5px;
    transform: scaleX(0);
    transition: transform .2s ease-in-out;
}

.nav-item:hover::after {
    transform: scaleX(1);
}

.activated::after {
    transform: scaleX(1);
}

.nav-link {
    padding: 0 !important;
}

/* .nav-link:hover + .dropdown-menu {} */
</style>

<script>
export default {
    data() {
        return {
            homeac: false,
            downac: false,
            isadmin: false,
            adminac: false
        }
    },
    methods: {
        async checkadmin() {
            let sessid = this.$cookies.get('ssesid')
        if (!sessid) {
            this.isadmin = false
            return
        }
        let response = await fetch('https://www.wpnews.kro.kr/api/session?id=' + sessid)
        if (response.status != 200) {
            this.isadmin = false
            return
        }
        response = await response.json()
        this.$cookies.set('reportid', response.session[0].reportid)
        this.isadmin = true
        }
    },
    async mounted() {
    },
    watch: {
        async $route(to, from) {
            await this.checkadmin()
            // console.log(to.path)
            console.log(to.matched[0].path)
            switch (to.matched[0].path) {
                case '/':
                    this.homeac = true
                    this.downac = false
                    this.adminac = false
                    break
                case '/category':
                case '/category/:name':
                case '/article/:id':
                    this.homeac = false
                    this.downac = true
                    this.adminac = false
                    break
                case '/admin':
                case '/admin/write':
                case '/admin/manage':
                case '/admin/profile':
                case '/admin/position':
                    let sessid = this.$cookies.get('ssesid')
                    if (!sessid) {
                        this.$router.push('/login')
                        break
                    }
                    let response = await fetch('https://www.wpnews.kro.kr/api/session?id=' + sessid)
                    if (response.status != 200) {
                        this.$router.push('/login')
                        break
                    }

                    this.homeac = false
                    this.downac = false
                    this.adminac = true
                    break
            }
        }
    }

}
</script>