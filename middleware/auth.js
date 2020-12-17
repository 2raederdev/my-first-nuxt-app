export default function (context) {
  console.log('auth middleware')
  if (!context.store.getters.isAuth) {
    context.redirect({ name: 'admin-auth' })
  }
}
