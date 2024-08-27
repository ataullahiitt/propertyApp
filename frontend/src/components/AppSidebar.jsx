import axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertyContext from "../store/property-context";
import { APIURL } from "../constants/apiConstants";

const AppSidebar = () => {

    const propertyCtx = useContext(PropertyContext);

    useEffect(() => {

        axios.get(APIURL.PROPERTY)
            .then((response) => {

                propertyCtx.getProperties(response.data.properties);
                //console.log("response", response.data);
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);


    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <h4>My Properties
                    <Link className="text-decoration-none" to='/addNewProperty'> (+)</Link>

                </h4>
                <ul className="nav flex-column">
                    {propertyCtx.properties.map((property) => <li key={property.uuid} className="nav-item">
                        <Link to={`/payRent/${property.uuid}`} className="nav-link" aria-current="page">
                            <span data-feather="home"></span>
                            {property?.name}
                        </Link>
                    </li>)}
                </ul>
            </div>
        </nav>
    )
}

export default AppSidebar;