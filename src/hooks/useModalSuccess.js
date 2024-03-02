import ModalSuccess from "@components/Alert"


export const useModalSuccess = () => {

    const toast = (isVisible, title, subTitle, handleClose) => (
        <ModalSuccess
            // type={type}
            isVisible={true}
            title={title}
            subTitle={subTitle}
            onToggle={handleClose}
        />
    )

    return {
        toast
    }
}