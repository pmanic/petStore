import { ReactComponent as LoaderSvg } from "../../assets/icons/loader.svg"

const Loader = ({ text }) => {
    return <div className='loader'>
        <h4>{text}</h4>
        <LoaderSvg />
    </div>
}

export default Loader