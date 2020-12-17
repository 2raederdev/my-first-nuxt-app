// A middleware is a function that is executed before a route / a page is loaded.
// This function recevies a parameter, the context object (the same one as asyncData or nuxtServerInit)

// If you ran asynchronous code, you need to return the axios... or whatever (the code).
// If not, you don't need to return anything within the function

// You need to export the funcion

// Then, you need to attach this middle to a page to execute it. --> middleware: 'log'
// It only works in page components, layouts or all routes (nuxt.config.js -->

// router: {
//    middleware: 'log'
//  }).

export default function (context) {
  console.log('[Middlevare] The LOF Middleware is running')
}
