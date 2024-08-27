const ChangePassword = () => {

    return (<>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Change Password</h1>

        </div>
        <form className="row g-3">
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="inputEmail4" className="form-label">Current Password</label>
                    <input type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="inputPassword4" className="form-label">New Password</label>
                    <input type="text" className="form-control" />

                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress" className="form-label">Confirm New Password</label>
                    <input type="text" className="form-control" />
                </div>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
        </form>

    </>
    )
}

export default ChangePassword;