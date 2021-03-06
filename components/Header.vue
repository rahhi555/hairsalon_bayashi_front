<template>
  <header>
    <NuxtLink to="/" class="logo">
      <Logo />
    </NuxtLink>
    <nav>
      <NuxtLink to="/customers"     :class="{selectBar: $route.name=='customers'}">お客様一覧</NuxtLink>
      <NuxtLink to="/appointments"  :class="{selectBar: $route.name=='appointments'}">ご予約一覧</NuxtLink>
      <NuxtLink to="/stylists"      :class="{selectBar: $route.name=='stylists'}">スタイリスト一覧</NuxtLink>
      <NuxtLink to="/ranks"         :class="{selectBar: $route.name=='ranks'}">ランク設定</NuxtLink>
      <NuxtLink to="/menus"         :class="{selectBar: $route.name=='menus'}">メニュー設定</NuxtLink>
      <NuxtLink to="/prices"        :class="{selectBar: $route.name=='prices'}">料金設定</NuxtLink>
    </nav>
    <span class="bg-mypink rounded-xl p-2 m-2 text-white">管理者でログイン中</span>
  </header>
</template>

<style scoped>
header {
  display: flex;
  position: sticky;
  top: 0px;
  justify-content: flex-end;
  align-items: center;
  background-color: #81DAEA;
  height: 80px;
  z-index:999;
}

.logo {
  margin-top: 10px;
  width: 80px;
  height: 80px;
  position: absolute;
  left: 20px;
}

a {
  display: inline-block;
  margin: auto 8px;
}
a:hover {
  color: gray;
}

.selectBar::after{
  display: block;
  background-color: #00b8d8;
  border-radius: 12px;
  content: ""; 
  height: 5px;
  animation: slidein 0.5s  
}

@keyframes slidein {
  from {
    margin: 0 50%;
  }

  to {
    margin: 0 0%;
  }
}
</style>