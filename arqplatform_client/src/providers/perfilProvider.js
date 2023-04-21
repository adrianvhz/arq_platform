
import { getShowPlanUserByIdService, updatePersonalDataService 
} from './../services';


export const getShowPlanUserById = async (id) => {
	
    const resp = await getShowPlanUserByIdService(id)

    try {
        return resp
    } catch (error) {
        console.log(error)
    }

   
}


export const updatePersonalData = async ({uid,name,lastname,email,password,flag}) => {

    const resp = await updatePersonalDataService({uid,name,lastname,email,password,flag})

    try {
        return resp
    } catch (error) {
        console.log(error)
    }

   
}