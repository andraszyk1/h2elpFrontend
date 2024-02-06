import { Toast } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setShowToast } from "../store/slices/toastSlice";

const ToastCustom = ({ showToast, variant, message }) => {
  const dispatch = useDispatch()
  const handleCloseToast = () => {
    dispatch(setShowToast({ showToast: false }))
  }
  return (
    < Toast style={{ zIndex: 1,position:'absolute',right:'50px' }} onClose={handleCloseToast} show={showToast} delay={3000} autohide bg={variant ?? ''}>
      <Toast.Header>
    
        <strong className="me-auto">{message}</strong>
      </Toast.Header>

    </Toast >
  )
}



export default ToastCustom