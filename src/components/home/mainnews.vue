<template>
  <div class="container-md mt-3 pb-3" :class="{ 'border-bottom': (!islg && !ismd) }">
    <div class="row" style="justify-content: center;">
      <div class="col-md-10">
        <div class="row">
          <RouterLink :to="'/article/' + main.id" class="col-lg-5">
          <img :src="main.thumbnail ? main.thumbnail : ''" id="mainimg" class="rounded-2 border">
        </RouterLink>
        <div class="col-lg-7" id="newsdes">
          <RouterLink :to="'/article/' + main.id" id="mainnews">
            <h2 id="maintitle" :class="{ 'h3': islg, 'h4': (ismd || issm), 'my-2': (islg || ismd || issm) }"><span class="badge text-bg-danger"
                v-if="main.arttype == 'breaking'">속보</span><span class="badge text-bg-primary"
                v-if="main.arttype == 'deep'">심층</span><span class="badge text-bg-success"
                v-if="main.arttype == 'real'">현장</span> {{ main.arttitle }}</h2>
            <small class="text-muted" id="maindes">{{ main.artbody }}</small>
          </RouterLink>
          <div id="similarnews" v-if="!(sub.length == 0)">
            <RouterLink v-for="(article, index) in sub" :to="'/article/' + article.id" class="suba">
              <h5 class="subnews" :style="{ display: ifdisplay }"
                :class="{ 'h5': ismd, 'h6': issm, 'm-0': (islg || ismd || issm), 'py-2': (islg || ismd || issm), 'border-top': (islg || ismd || issm), 'border-bottom': ((islg || ismd || issm) && index == (sub.length - 1)) }">
                <i class="bi bi-arrow-return-right"></i> <span class="badge text-bg-danger"
                  v-if="article.arttype == 'breaking'">속보</span><span class="badge text-bg-primary"
                  v-if="article.arttype == 'deep'">심층</span><span class="badge text-bg-success"
                  v-if="article.arttype == 'real'">현장</span> {{ article.arttitle }}</h5>
            </RouterLink>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#mainnews,
.suba {
  color: #000000;
  text-decoration: none !important;
}

#mainimg {
  width: 100%;
  max-width: 100%;
  max-height: 100%;
}

#maintitle {
  word-break: keep-all;
  font-family: NanumGothicBold;
  font-weight: bold;
  margin: 0;
}

#newsdes {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#maindes {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
}

@media (max-width: 1199.98px) {
  #maindes {
    display: none;
  }
}

.subnews {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 150%;
  /* word-break: keep-all; */
}
</style>

<script>
export default {
  props: ['article'],
  data() {
    return {
      islg: false,
      ismd: false,
      issm: false,
      ifdisplay: 'block',
      main: {},
      sub: []
    }
  },
  methods: {
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
    async getarticle() {
      this.article.forEach(async (element, index) => {
        if (!element.artid) return
        let res = await fetch('https://www.wpnews.kro.kr/api/article/find?id=' + element.artid)
        res = await res.json()

        if (index == 0) {
          this.main = res
        } else {
          this.sub.push(res)
        }
      });
    }
  },
  async mounted() {
    await this.getarticle()
    this.checkwidth(window)
    window.addEventListener("resize", () => {
      this.checkwidth()
    })
  }
}
</script>