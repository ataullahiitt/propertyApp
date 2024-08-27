import axios from 'axios';
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { APIURL } from '../../constants/apiConstants';
import { ButtonSpinner } from '../../components/UI/Loader';
import PropertyContext from '../../store/property-context';

const AddProperty = () => {

    const [isSaving, setIsSaving] = useState(false);

    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const propertyCtx = useContext(PropertyContext);

    const { register, handleSubmit, formState: { isDirty, isValid, errors } } = useForm({
        mode: 'onChange'
    });

    const onSave = (frmData) => {

        setIsSaving(true);
        setError(null);

        axios.post(APIURL.PROPERTY, frmData)
            .then((response) => {
                setIsSaving(false);
                navigate('/transaction');
                propertyCtx.addNewProperty(response.data.property);
                console.log("response", response.data);

            })
            .catch((error) => {
                setIsSaving(false);
                setError('Somthing went wrong , please try again');
                console.log(error);
            })
    }

    const onCancel = () => {

        if (window.confirm('Do you really want to cancel?'))
            navigate('/transaction');
    }

    return (<>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Add new property</h1>
        </div>

        {error && <div className="alert alert-danger" role="alert">
            {error}
        </div>}

        <form onSubmit={handleSubmit(onSave)}>

            <div className="row">

                <div className="col-md-4">
                    <h5>Bank Details</h5>
                    <div className="mb-3">
                        <label className="form-label">Bank Account Number</label>
                        <input type="text" {...register('bankAccountNumber', { required: true })} className="form-control" />

                        {errors.bankAccountNumber && errors.bankAccountNumber.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Bank Name</label>
                        <input type="text" {...register('bankName', { required: true })} className="form-control" />

                        {errors.bankName && errors.bankName.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">IFSC Code</label>
                        <input type="text" {...register('IFSCcode', { required: true })} className="form-control" />
                        {errors.IFSCcode && errors.IFSCcode.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Bank Address</label>
                        <textarea  {...register('bankAddress', { required: true })} className="form-control" rows="2"></textarea>

                        {errors.bankAddress && errors.bankAddress.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Payment Schedule</label>
                        <input type="text" {...register('paymentSchedule', { required: true })} className="form-control" />

                        {errors.paymentSchedule && errors.paymentSchedule.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Rent Amount</label>
                        <input type="text" {...register('rentAmount', { required: true })} className="form-control" />

                        {errors.rentAmount && errors.rentAmount.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4>Property Details</h4>
                    <div className="mb-3">

                        <label className="form-label">Name(Label)</label>
                        <input type="text" {...register('name', { required: true })} className="form-control" />

                        {errors.name && errors.name.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Rent Agreement Date</label>
                        <input type="date" {...register('rentAgreementDate', { required: true })} className="form-control" />

                        {errors.rentAgreementDate && errors.rentAgreementDate.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">State</label>
                        <select className="form-select" {...register('type', { required: true })}>
                            <option>Choose...</option>
                            <option>Flat</option>
                        </select>
                        {errors.type && errors.type.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Land Load Full name</label>
                        <input type="text" {...register('landLoadFullName', { required: true })} className="form-control" />

                        {errors.landLoadFullName && errors.landLoadFullName.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <textarea className="form-control" {...register('address', { required: true })} rows="2"></textarea>
                        {errors.address && errors.address.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mobile Number</label>
                        <input type="text" {...register('mobileNumber', { required: true })} className="form-control" />
                        {errors.name && errors.name.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <div className="d-grid gap-2 d-md-flex">
                            <button disabled={isSaving} className="btn btn-primary me-md-2" type="submit">
                                {!isSaving && 'Save'}
                                {isSaving && <ButtonSpinner>Saving...</ButtonSpinner>}
                            </button>
                            <button className="btn btn-outline-danger" onClick={onCancel} type="button">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    </>
    )
}

export default AddProperty;
