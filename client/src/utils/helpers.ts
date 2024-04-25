import Swal, {SweetAlertIcon} from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const fireModal = (text: string, icon: SweetAlertIcon = "success", confirmButtonColor = "#002c1e" , timer = 1500) => {
    withReactContent(Swal).fire({
        text: text,
        icon: icon,
        confirmButtonColor: confirmButtonColor,
        timer: timer
    })
}
