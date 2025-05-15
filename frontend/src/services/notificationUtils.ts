import Swal, { SweetAlertIcon } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AuthSwal = withReactContent(Swal);

export const showNotification = (title: string, icon: SweetAlertIcon | undefined) => {
    AuthSwal.fire({
        title,
        icon,
        toast: true,
        timer: 6000,
        position: 'top',
        timerProgressBar: true,
        showConfirmButton: false,
    });
};
