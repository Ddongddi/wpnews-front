<template>
    <div class="container-fluid bg-warning-subtle rounded-2 py-3" id="timer">
        <h5 class="m-0" :class="{h6: ismd}">5월 국정지지율 발표까지 {{ timerword[0] }}:{{ timerword[1] }}:{{ timerword[2] }}</h5>
    </div>
</template>

<style scoped>
#timer {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<script>
export default {
  data() {
    return {
      ismd: false,
      timerword: ['00', '00', '00'],
    }
  },
  methods: {
    checkwidth(target) {
      if (target.innerWidth < 992 && 768 <= target.innerWidth) {
        this.ismd = false
      }
      else if (target.innerWidth < 768) {
        this.ismd = true
      } else {
        this.ismd = false
      }
    }
  },
  async mounted() {
    this.checkwidth(window)
    window.addEventListener("resize", (event) => this.checkwidth(event.target))
    var countDownDate = new Date(2024, 4, 14, 21, 0, 0).getTime();
    var x = setInterval(() => {
      var now = new Date().getTime();
      var distance = countDownDate - now;

      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (hours < 10) hours = '0' + hours;
      if (minutes < 10) minutes = '0' + minutes;
      if (seconds < 10) seconds = '0' + seconds;

      if (distance < 0) {
        clearInterval(x);
        this.timerword[0] = '00'
        this.timerword[1] = '00'
        this.timerword[2] = '00'
        // window.location.reload()
        return;
      }

      this.timerword[0] = hours
      this.timerword[1] = minutes
      this.timerword[2] = seconds
    }, 1000);
  }
}
</script>