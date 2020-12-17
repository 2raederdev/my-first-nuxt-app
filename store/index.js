import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    getters: {
      loadedPosts (state) {
        return state.loadedPosts
      },
      isAuth (state) {
        return state.token != null
      }
    },
    mutations: {
      SET_POSTS (state, posts) {
        state.loadedPosts = posts
      },
      ADD_POST (state, post) {
        state.loadedPosts.push(post)
      },
      EDIT_POST (state, post) {
        const postIndex = state.loadedPosts.findIndex(p => p.id === post.id)
        state.loadedPosts[postIndex] = post
      },
      SET_TOKEN (state, token) {
        state.token = token
      },
      CLEAR_TOKEN (state) {
        state.token = null
      }
    },
    actions: {
      nuxtServerInit (vuexContext, context) {
        // To check that the method executes on the server
        // if(!process.client){
        // }
        return context.app.$axios.$get('posts.json')
          .then((data) => {
            const postsArray = []
            for (const key in data) {
              postsArray.push({ ...data[key], id: key })
            }
            vuexContext.commit('SET_POSTS', postsArray)
          })
          .catch(error => console.log(error))
      },
      setPosts (vuexContext, data) {
        vuexContext.commit('SET_POSTS', data)
      },
      addPost (vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        }
        return this.$axios.$post('posts.json', createdPost)
          .then(data => vuexContext.commit('ADD_POST', { ...createdPost, id: data.name }))
          .catch(error => console.log(error))
      },
      editPost (vuexContext, editedPost) {
        return this.$axios.$put(`posts/${editedPost.id}.json?auth=${vuexContext.state.token}`, editedPost)
          .then(() => vuexContext.commit('EDIT_POST', editedPost))
          .catch(error => console.log(error.response.data.error))
      },
      authenticateUser (vuexContext, authData) {
        const authURL = authData.isLogin
          ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`
          : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`
        const data = {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
        return this.$axios.$post(authURL, data)
          .then((result) => {
            vuexContext.commit('SET_TOKEN', result.idToken)
            localStorage.setItem('token', result.idToken)
            localStorage.setItem('tokenExpiration', new Date().getTime() + +result.expiresIn * 1000)
            Cookie.set('jwt', result.idToken)
            Cookie.set('expirationDate', new Date().getTime() + +result.expiresIn * 1000)
            return this.$axios.$post('http://localhost:3000/api/track-data', { data: 'Authenticated!' })
          })
          .catch(error => console.log(error.response.data.error.message))
      },
      initAuth (vuexContext, req) {
        let token
        let expirationDate
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(key => key.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find(key => key.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }
        if (new Date().getTime() > +expirationDate || !token) {
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.commit('SET_TOKEN', token)
      },
      logout (vuexContext) {
        vuexContext.commit('CLEAR_TOKEN')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      }
    }
  })
}
export default createStore
