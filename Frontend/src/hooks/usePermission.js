import { useSelector } from "react-redux";

const usePermission=()=>{
    const permissions=useSelector((state)=>state.auth.permissions);
    
    const hasPermission=(permission)=>{
        return permissions.includes(permission);
    }

    return {hasPermission}
}

export default usePermission;