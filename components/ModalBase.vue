<template>
  <transition appear>
    <div class="modal-base">
      <div class="edit-header">メニュー編集</div>

      <slot />

      <button class="close-button" @click="$emit('closeModal')">
        <span class="material-icons clear-icons"> clear </span>
      </button>
    </div>
  </transition>
</template>

<style scoped>
.edit-header {
  background-color: #7ed6e660;
  border-radius: 10px 10px 0 0;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: x-large;
}

.modal-base {
  z-index: 10;
  height: 500px;
  width: 400px;
  background-color: rgb(238, 252, 253);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 3px 3px black;
}

.close-button {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  background-color: #e2e8f0;
}

.clear-icons {
  font-size: 50px;
  color: gray;
}

.v-leave-active,
.v-enter-active {
  transition: opacity 0.2s ease-out;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-to,
.v-leave {
  opacity: 1;
}
</style>
