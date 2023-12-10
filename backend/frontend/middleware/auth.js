export default function auth ({ $axios,next, store }){

    // console.log($axios)
    if(!store.getters.isAuthenticated){
        return next({
           name: 'login'
        })
    }

    $axios.onError((error) => {
        const code = parseInt(error.response && error.response.status)
        if (code === 403) {
            return next({
                name: 'login'
             })
        }
        if (code === 401) {
          // store.$auth.logOut()
          return next({
            name: 'index'
         })
        }
      })

    return next()
}
