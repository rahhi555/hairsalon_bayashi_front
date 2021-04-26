<template>
  <div class="hairsalonImage">
    <img src="~/assets/image/hairsalon_image.jpeg" />
    <div class="logoBack">
      <Logo class="logo" />
    </div>
  </div>
</template>
<style scoped>
.hairsalonImage {
  display: flex;
  position: relative;
  justify-content: center;
}
.hairsalonImage img {
  height: 600px;
}
.logoBack {
  position: absolute;
  top: 40%;
  background-color: blanchedalmond;
  opacity: 0.8;
  padding: 0 60px;
  animation: slideIn 1s;
}
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 0.8;
    transform: translateY(0);
  }
}

.logo {
  height: 150px;
  width: 600px;
}
</style>
