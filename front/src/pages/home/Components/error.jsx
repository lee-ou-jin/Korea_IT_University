import './error.css';

function ErrorMessage(props) {
    return <div className="bar error" style={{fontSize:"15px", margin:"0 auto", display:"block", width:"360px"}}>{props.error}</div>;
}

export default ErrorMessage;
