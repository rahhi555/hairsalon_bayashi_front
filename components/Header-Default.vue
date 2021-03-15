<template>
  <div class="w-full h-5/6 flex justify-end items-center">
    <nav>
      <NuxtLink to="/signup" :class="{ selectBar: $route.name == 'signup' }"
        >ユーザー登録</NuxtLink
      >
      <NuxtLink to="/login" :class="{ selectBar: $route.name == 'login' }"
        >ログイン</NuxtLink
      >
    </nav>
  </div>
</template>
