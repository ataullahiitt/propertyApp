import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { APIURL } from '../constants/apiConstants';
import { ButtonSpinner } from '../components/UI/Loader';
import AuthContext from '../store/auth-context';

const Login = () => {

    const [isSending, setIssending] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const { register, handleSubmit, formState: { isDirty, isValid } } = useForm({
        mode: 'onChange',
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = (data) => {
        setIssending(true);
        axios.post(APIURL.LOGIN, data)
            .then((response) => {
                setIssending(false);
                authCtx.login(response.data);
                navigate('/transaction');
            }).catch((error) => {
                if (error.response.status === 401) {
                    setError('Invalid Credentials');
                } else {
                    setError('Something went wrong');
                }
                setIssending(false);
            });
    }

    return (

        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card-body p-5 text-center">

                                <h3 className="mb-5">Sign in</h3>
                                {error &&
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                }
                                <div className="form-outline mb-4">
                                    <input placeholder="Email"
                                        {...register("username", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}

                                        type="email"
                                        id="typeEmailX-2"
                                        className="form-control form-control-lg" />

                                </div>

                                <div className="form-outline mb-4">
                                    <input placeholder="Password"
                                        {...register("password", { required: true, minLength: 5 })}
                                        type="password"
                                        id="typePasswordX-2"
                                        className="form-control form-control-lg" />
                                </div>
                                <div className="form-check d-flex justify-content-start mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="form1Example3"
                                    />
                                    <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    disabled={!isDirty || !isValid || isSending}
                                    type="submit">
                                    {!isSending && <>Login</>}
                                    {isSending && <ButtonSpinner>Logging...</ButtonSpinner>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;