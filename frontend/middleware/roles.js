export default function auth ({ app,next, store,redirect }){
    if(store.getters.isAuthenticated){
       if(store.getters.loggedInUser.role_name === 'Staff'){
            app.router.push('/Staff/product');
        }else if(store.getters.loggedInUser.role_name === 'Superuser'){
            app.router.push('/Superuser/product');
        }
    }else{
        app.router.push('/login');
    }
}