import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const handleError = (error: any) => {
    const navigate = useNavigate();

    if (axios.isAxiosError(error)) {
        var err = error.response;
        if (Array.isArray(err?.data.errors)) {
            for (let val of err.data.errors) {
                toast.warning(val.description);
            }
        } else if (typeof err?.data.errors === 'object') {
            for (let e in err?.data.errors) {
                toast.warning(err.data.errors[e][0]);
            }
        } else if (err?.data) {
            toast.warning(err.data);
        } else if (err?.status == 401) {
            toast.warning("Пожалуйста войдите в систему!"); 
            navigate('/');
        } else if (err) {
            toast.warning(err?.data);
        }
    }
}
