import { ReactComponent as ErrorSvg } from "../../assets/icons/error.svg"

const Error = ({ text }) => {
    return <div className='error-wrapper'>
        <div className='error'>
            <ErrorSvg />
            <p>{text}</p>
        </div>
    </div>
}

export default Error