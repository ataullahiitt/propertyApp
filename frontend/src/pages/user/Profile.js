const Profile = () => {

    return (<>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Profile</h1>

        </div>
        <form className="row g-3">
            <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Full Name</label>
                <input type="text" className="form-control" />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Mobile Number</label>
                <input type="text" className="form-control" />
            </div>
            <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">Address</label>
                <textarea className="form-control" rows="2"></textarea>
            </div>

            <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">State</label>
                <input type="text" class="form-control" />
            </div>
            <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">Pincode</label>
                <input type="text" className="form-control" />
            </div>
            <div className="col-md-2">
                <label htmlFor="inputZip" className="form-label">Amount</label>
                <input type="text" class="form-control" />
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
        </form>
    </>
    )
}

export default Profile;