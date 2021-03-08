<template>
  <transition name="flash">
    <div v-if="$store.state.flash.status" class="flash" :class="$store.state.flash.status">
      <p>{{$store.state.flash.message}}</p>
    </div>
  </transition>
</template>

<style scoped>
.flash{
  position: absolute;
  top: 80px;
  height: 30px;
  width: 100%;
}

p{
  color: white;
  text-align: center;
}

.success {
  background-color: rgb(248, 189, 79);
}

.comeout {
  background-color: rgb(125, 97, 247);
}
</style>