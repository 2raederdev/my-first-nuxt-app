export default function (context) {
  console.log('check-auth middleware')
  context.store.dispatch('initAuth', context.req)
}
