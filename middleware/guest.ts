export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, initUser } = useAuth();
  await initUser();
  if (user.value) {
    if (to.path === '/login' || to.path === '/register') {
      return navigateTo('/');
    }
  }
});
