import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const AppHeader = () => {

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const logoutHandler = () => {

        authCtx.logout();
        navigate('/login');
    }

    return (<header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">Property App</a>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <Dropdown>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                {authCtx.userData?.name}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
                <Dropdown.Item as={Link} to="/profile">
                    My Account
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/changePassword">
                    Change password
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logoutHandler} >
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </header>)
}


export default AppHeader;