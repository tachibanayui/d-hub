import {
    AiFillFacebook,
    AiFillLinkedin,
    AiOutlineGithub,
} from "react-icons/ai";

const Footer = () => {

    return (
        <div className="p-3" style={{ background: "black" }} data-bs-theme="dark">
            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <a
                            href="/"
                            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
                        >
                            <svg className="bi" width="30" height="24">
                                <use href="#bootstrap"></use>
                            </svg>
                        </a>
                        <span className="mb-3 mb-md-0 text-muted">
                            Created by DHub Team
                        </span>
                    </div>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3">
                            <a
                                className="text-muted"
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/tachibanayui"
                                title="github (tachibana-yui)"
                            >
                                <AiOutlineGithub />
                            </a>
                        </li>
                        <li className="ms-3">
                            <a
                                className="text-muted"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.facebook.com/TachibanaYui.desu/"
                                title="Facebook"
                            >
                                <AiFillFacebook />
                            </a>
                        </li>

                        <li className="ms-3">
                            <a
                                className="text-muted"
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/tachibanayui"
                                title="linkedin"
                            >
                                <AiFillLinkedin />
                            </a>
                        </li>
                    </ul>
                </footer>
            </div>
        </div>
    );
};

export default Footer;
