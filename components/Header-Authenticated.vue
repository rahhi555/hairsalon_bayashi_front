<template>
  <div class="w-full h-5/6 flex justify-end items-center">
    <nav>
      <NuxtLink
        to="/user/appointments"
        :class="{ selectBar: $route.name == 'user-appointments' }"
        class="appointments"
        >予約</NuxtLink
      >
    </nav>
  </div>
</template>

<style scoped>
.appointments {
  width: 80px;
  /* 中央揃えの時にletter-spacingを使うと最後にスペースが追加されてしまい中央に揃わなくなる。
  そこでletter-spacingと同値をtext-indentに設定することで逆側にもスペースができ、中央揃えになる */
  text-align: center;
  letter-spacing: 0.8em;
  text-indent: 0.8em;
}
</style>
