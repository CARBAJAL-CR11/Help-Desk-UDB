import Swal from "sweetalert2";

export function alertas() {
    // Alerta de exito
    const exitoToast = (title, html) => Swal.fire({
        title: title,
        html: html,
        icon: 'success',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
        timerProgressBar: true,
        position: 'top-end',
        buttonsStyling: false,
        customClass: {
            popup: 'bg-brand-500 text-brand-50 rounded-xl shadow-lg border border-brand-400 p-4',
            title: 'text-base font-semibold text-brand-800',
            htmlContainer: 'text-sm text-brand-600',
            timerProgressBar: 'bg-brand-300'
        },
        didOpen: () => {
            const container = Swal.getContainer();
            if (container) container.style.zIndex = '10600';
        }
    });

    const confirmar = async (title, html = '', confirmButtonText = 'Sí, continuar') => {
        const result = await Swal.fire({
            title,
            html,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText,
            cancelButtonText: 'Cancelar',
            buttonsStyling: false,
            customClass: {
                popup: 'bg-brand-50 border border-brand-100 rounded-2xl p-6 shadow-xl max-w-md font-sans',
                title: 'text-xl font-bold text-brand-800',
                htmlContainer: 'text-brand-600 text-sm mt-2',
                actions: 'flex gap-3 justify-end mt-6 w-full',
                confirmButton: 'bg-brand-500 hover:bg-brand-400 active:bg-brand-600 text-brand-50 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-brand-500/20 focus:ring-2 focus:ring-brand-300 focus:outline-none',
                cancelButton: 'bg-brand-700 hover:bg-brand-900 text-brand-800 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all focus:ring-2 focus:ring-brand-200 focus:outline-none'
            }
        });

        return result.isConfirmed; 
    };

    const infoToast = (title, html) => Swal.fire({
        title: title,
        html: html,
        icon: 'info',
        showConfirmButton: false,
        timer: 3500,
        toast: true,
        timerProgressBar: true,
        position: 'top-end',
        buttonsStyling: false,
        customClass: {
            popup: 'bg-brand-600 text-brand-50 rounded-xl shadow-lg border border-brand-400 p-4',
            title: 'text-base font-semibold text-brand-800',
            htmlContainer: 'text-sm text-brand-600',
            timerProgressBar: 'bg-brand-300',
            icon: 'text-brand-300'
        },
        didOpen: () => {
            const container = Swal.getContainer();
            if (container) container.style.zIndex = '10600';
        }
    });

    return {
        exitoToast,
        confirmar,
        infoToast
    };
}
