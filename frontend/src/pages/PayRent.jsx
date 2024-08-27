import axios from 'axios';
import { useContext, useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import { APIURL } from "../constants/apiConstants";
import { ButtonSpinner } from "../components/UI/Loader";
import PropertyContext from "../store/property-context";


const PayRent = () => {

    const params = useParams();
    const propertyUUID = params.id;

    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);
    const [isNotEditing, setIsNotEditing] = useState(true);

    const navigate = useNavigate();
    const propertyCtx = useContext(PropertyContext);

    const { register, handleSubmit, setValue, formState: { isDirty, isValid, errors } } = useForm({
        mode: 'onChange'
    });

    const onSave = (frmData) => {

        if (isNotEditing)
            return;
        setIsSaving(true);
        setError(null);

        axios.put(`${APIURL.PROPERTY + '/' + propertyUUID}`, frmData)
            .then((response) => {
                setIsSaving(false);
                setIsNotEditing(true);
                navigate('/transaction');
                propertyCtx.onUpdate(propertyUUID, response.data.property);
                //console.log("response", response.data);
            })
            .catch((error) => {
                setIsSaving(false);
                setError('Somthing went wrong , please try again');
                console.log(error);
            })
    }

    const enableEditHandler = () => {
        setIsNotEditing(prevState => !prevState);
    }

    const onDeleteHandler = () => {

        if (window.confirm('Do you really want to delete this property?')) {

            setIsDeleting(true);

            axios.delete(`${APIURL.PROPERTY + '/' + propertyUUID}`)
                .then((response) => {
                    setIsDeleting(false);
                    propertyCtx.onDelete(propertyUUID);
                    // console.log(response.data);
                    navigate('/transaction');
                }).catch((error) => {
                    console.log(error);
                    setIsDeleting(false);
                })
        }
        //navigate('/transaction');
    }

    useEffect(() => {

        const selectedProperty = propertyCtx.getProperty(propertyUUID);

        if (selectedProperty) {
            setValue("bankAccountNumber", selectedProperty.bankAccountNumber);
            setValue("IFSCcode", selectedProperty.IFSCcode);
            setValue("address", selectedProperty.address);
            setValue("bankAddress", selectedProperty.bankAddress);
            setValue("bankName", selectedProperty.bankName);
            setValue("landLoadFullName", selectedProperty.landLoadFullName);
            setValue("mobileNumber", selectedProperty.mobileNumber);
            setValue("name", selectedProperty.name);
            setValue("paymentSchedule", selectedProperty.paymentSchedule);
            setValue("rentAgreementDate", selectedProperty.rentAgreementDate);
            setValue("rentAmount", selectedProperty.rentAmount);
            setValue("type", selectedProperty.type);
        }
    }, [propertyUUID, propertyCtx.properties]);

    return (<>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <button type="button" className="btn btn-success">Pay the Rent for the Month jan 2022</button>
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
                        <input type="text" disabled={isNotEditing} {...register('bankAccountNumber', { required: true })} className="form-control" />

                        {errors.bankAccountNumber && errors.bankAccountNumber.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Bank Name</label>
                        <input type="text" disabled={isNotEditing} {...register('bankName', { required: true })} className="form-control" />

                        {errors.bankName && errors.bankName.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">IFSC Code</label>
                        <input type="text" disabled={isNotEditing} {...register('IFSCcode', { required: true })} className="form-control" />
                        {errors.IFSCcode && errors.IFSCcode.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Bank Address</label>
                        <textarea disabled={isNotEditing} {...register('bankAddress', { required: true })} className="form-control" rows="2"></textarea>

                        {errors.bankAddress && errors.bankAddress.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Payment Schedule</label>
                        <input type="text" disabled={isNotEditing} {...register('paymentSchedule', { required: true })} className="form-control" />

                        {errors.paymentSchedule && errors.paymentSchedule.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Rent Amount</label>
                        <input type="text" disabled={isNotEditing} {...register('rentAmount', { required: true })} className="form-control" />

                        {errors.rentAmount && errors.rentAmount.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4>Property Details</h4>
                    <div className="mb-3">

                        <label className="form-label">Name(Label)</label>
                        <input type="text" disabled={isNotEditing} {...register('name', { required: true })} className="form-control" />

                        {errors.name && errors.name.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Rent Agreement Date</label>
                        <input type="date" disabled={isNotEditing} {...register('rentAgreementDate', { required: true })} className="form-control" />

                        {errors.rentAgreementDate && errors.rentAgreementDate.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">State</label>
                        <select disabled={isNotEditing} className="form-select" {...register('type', { required: true })}>
                            <option>Choose...</option>
                            <option>Flat</option>
                        </select>
                        {errors.type && errors.type.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Land Load Full name</label>
                        <input type="text" disabled={isNotEditing} {...register('landLoadFullName', { required: true })} className="form-control" />

                        {errors.landLoadFullName && errors.landLoadFullName.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <textarea className="form-control" disabled={isNotEditing} {...register('address', { required: true })} rows="2"></textarea>
                        {errors.address && errors.address.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mobile Number</label>
                        <input type="text" disabled={isNotEditing} {...register('mobileNumber', { required: true })} className="form-control" />
                        {errors.name && errors.name.type === "required" && (
                            <span className="error-msg">This is required</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <div className="d-grid gap-2 d-md-flex">
                            <button onClick={enableEditHandler} type="button" className="btn btn-secondary">Edit</button>
                            <button className="btn btn-primary me-md-2" type="submit" disabled={isSaving}>
                                {!isSaving && 'Save'}
                                {isSaving && <ButtonSpinner>Saving...</ButtonSpinner>}
                            </button>
                            <button disabled={isDeleting} type="button" onClick={onDeleteHandler} className="btn btn-outline-danger">
                                {!isDeleting && 'Delete'}

                                {isDeleting && <ButtonSpinner>Deleting...</ButtonSpinner>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </>
    )
}

export default PayRent;