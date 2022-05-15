<template>
  <div class="section-offer">
    <div data-aos="flip-left" class="container-img">
      <img src="@/assets/gambar/undraw-home2.png" alt="Home-2" />
    </div>
    <div data-aos="zoom-in-up" class="container-details">
      <h1 class="text-cherry mb-4 text-4xl font-bold">
        Why Host Your <span class="text-indigo">Event</span> Here!
      </h1>
      <p class="text-cherry mb-5 font-semibold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo nobis
        consequuntur provident assumenda vero.
      </p>
      <div class="container-offer">
        <div
          class="offer"
          v-for="(offer, idx) in offers"
          :key="idx"
          @click="offerClicked"
          :class="[idx == 0 ? 'selected' : '']"
        >
          <div class="header">
            <h1>{{ offer.title }}</h1>
            <i class="fas fa-chevron-right"></i>
          </div>
          <p class="font-bold text-cherry">{{ offer.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "section-offer",
  data() {
    return {
      offers: [
        {
          title: "Simpel",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo nobis consequuntur provident assumenda vero.",
        },
        {
          title: "Faster",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo nobis consequuntur provident assumenda vero.",
        },
        {
          title: "Every Where",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo nobis consequuntur provident assumenda vero.",
        },
      ],
    };
  },
  methods: {
    offerClicked(e) {
      e.target.classList.toggle("selected");
    },
  },
};
</script>

<style scoped>
.section-offer {
  background: #f2f5f7;
  background-image: url("https://cherryticket.com/background-home3.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left;
  padding: 64px 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 180px;
}

.container-img {
  position: relative;
}

.container-img::before {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
}

img {
  width: 400px;
  height: 400px;
  object-fit: cover;
  position: relative;
  z-index: 2;
  margin: 0 auto;
}

.container-details {
  width: 500px;
}

.container-offer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.offer {
  border-bottom: 1px solid #790604;
  padding: 24px 16px;
  transition: 0.4s linear;
  border-left: 0px solid #790604;
}

.offer > * {
  pointer-events: none;
}

.offer:hover,
.offer.selected {
  border-left: 5px solid #790604;
  cursor: pointer;
  background: #ebcbcb;
  border-radius: 2px;
  border-bottom: 0px;
}

.offer .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}

.offer .header h1 {
  font-size: 18px;
  color: #790604;
}

.offer.selected h1 {
  font-size: 18px;
  color: #790604;
}

.offer p {
  height: 0;
  overflow: hidden;
  margin-top: 0px;
  transition: 0.4s linear;
}

.offer.selected p {
  height: 80px;
  margin-top: 8px;
  font-size: 14px;
  color: #790604;
}

.offer i {
  color: #790604;
}

.offer.selected i {
  color: #790604;
}
</style>
