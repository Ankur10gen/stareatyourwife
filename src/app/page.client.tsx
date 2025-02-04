'use client'
import Home2 from "stare/home/Home2";

const PageClient = () => {
    return (
        <Home2/>
        // <AuthProvider>
        //     <AuthContext.Consumer>
        //         {(value) =>
        //             value?.isLoggedIn == true
        //                 ? <Home2/> : <SignInSignUp/>
        //         }
        //     </AuthContext.Consumer>
        // </AuthProvider>
    );
}
export default PageClient
