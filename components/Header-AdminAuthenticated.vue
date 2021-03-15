<template>
  <div>
    <nav>
      <NuxtLink
        v-if="$store.getters['modules/user/isAdminAuthenticated']"
        to=""
        :class="{ selectBar: $route.name == '' }"
        >Admin</NuxtLink
      >
      <NuxtLink
        to="/admin/customers"
        :class="{ selectBar: $route.name == 'admin-customers' }"
        >お客様一覧</NuxtLink
      >
      <NuxtLink
        to="/admin/appointments"
        :class="{ selectBar: $route.name == 'admin-appointments' }"
        >ご予約一覧</NuxtLink
      >
      <NuxtLink
        to="/admin/stylists"
        :class="{ selectBar: $route.name == 'admin-stylists' }"
        >スタイリスト一覧</NuxtLink
      >
      <NuxtLink
        to="/admin/ranks"
        :class="{ selectBar: $route.name == 'admin-ranks' }"
        >ランク設定</NuxtLink
      >
      <NuxtLink
        to="/admin/menus"
        :class="{ selectBar: $route.name == 'admin-menus' }"
        >メニュー設定</NuxtLink
      >
      <NuxtLink
        to="/admin/prices"
        :class="{ selectBar: $route.name == 'admin-prices' }"
        >料金設定</NuxtLink
      >
    </nav>
  </div>
</template>
