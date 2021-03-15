<template>
  <header>
    <NuxtLink to="/" class="logo">
      <Logo />
    </NuxtLink>

    <div
      v-if="
        $store.getters['modules/user/isAuthenticated'] &&
        $store.getters['modules/user/isAdminAuthenticated']
      "
    >
      <Header-AdminAuthenticated />
    </div>

    <div v-else-if="$store.getters['modules/user/isAuthenticated']">
      <Header-Authenticated />
    </div>

    <div v-else>
      <Header-Default />
    </div>

    <Header-LoginLogoutBtn />
  </header>
</template>

<style scoped>
header {
  display: flex;
  position: sticky;
  top: 0px;
  justify-content: flex-end;
  align-items: center;
  background-color: #81daea;
  height: 80px;
  z-index: 100;
}

.logo {
  margin-top: 10px;
  width: 80px;
  height: 80px;
  position: absolute;
  left: 20px;
}

::v-deep a {
  display: inline-block;
  margin: auto 8px;
}
::v-deep a:hover {
  color: gray;
}

::v-deep .selectBar::after {
  display: block;
  background-color: #00b8d8;
  border-radius: 12px;
  content: '';
  height: 5px;
  animation: appearance 0.5s;
}

@keyframes appearance {
  from {
    margin: 0 50%;
  }

  to {
    margin: 0 0%;
  }
}
</style>
