import { login, register, isCheckTokenService } from './../services/authService';

export const LoginWithEmailPassword = async (email, password) => {
	return await login(email, password)
	//  try {

	//     const resp = await login(email,password)
			
	//     console.log(resp)

		//    return { 
		//     ok: true,
		//     uid, photoURL,email, displayName
		//    }
		
			
	//  } catch (error) {
	//      return { ok: false, errorMessage:'Usuario o Contraseña invalido' }
	//  }
}


export const registerUser = (name, lastname, email, password) => {
	return register(name, lastname, email, password).then(res => res);
}


export const isCheckToken = async (token, ) => {
	return await isCheckTokenService(token);
}


// export const registerUserWithEmailPassword = async({email,password, displayName}) => {

//     try {


//        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
//        const {uid, photoURL} = resp.user

//        //TODO: actualizar el nombre del usuario en firebase
//        await updateProfile(FirebaseAuth.currentUser,{
//             displayName
//        })

//        return { 
//         ok: true,
//         uid, photoURL,email, displayName
//        }
      
        
//     } catch (error) {
//         return { ok: false, errorMessage:error.message }
//     }
// }


// export const logoutFirebase = async () => { 
//     return await FirebaseAuth.signOut();
// }