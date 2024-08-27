import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    return (<>
        <AppHeader />
        <div className="container-fluid">
            <div className="row">
                <AppSidebar />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <Outlet />
                </main>
            </div>
        </div>
    </>
    )
}
export default DefaultLayout
