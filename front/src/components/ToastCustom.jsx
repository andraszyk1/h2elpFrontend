import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setShowToast } from "../store/slices/toastSlice";

const ToastCustom = ({ showToast, variant, message }) => {
  const dispatch = useDispatch()
  const handleCloseToast = () => {
    dispatch(setShowToast({ showToast: false }))
  }
  return (
    <ToastContainer className="p-3" position='top-end' style={{ zIndex: 1 }}>
      < Toast className="mw-80 w-80" onClose={handleCloseToast} show={showToast} animation={true}  delay={3000} autohide bg={variant ?? ''}>
        <Toast.Header>
          <strong className="me-auto">{message}</strong>
        </Toast.Header>
      </Toast >
    </ToastContainer>

  )
}



export default ToastCustom