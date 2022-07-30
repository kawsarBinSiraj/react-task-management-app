import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import AuthLibrary from "../libraries/AuthLibrary";
import { useDispatch } from 'react-redux'
import _ from 'lodash';
import Cookies from "cookies-js";

const Login = () => {
    /**
    * form validation schema
    * created_at:- 29/07/2022 22:34:14
   */
    const schema = yup.object({
        user_name: yup.string().required(),
        password: yup.string().required(),
    }).required();


    /**
     * dispatch & navigate
     * created_at:- 30/07/2022 17:33:14
     */
    const dispatch = useDispatch();


    /**
     * Init useForm
     * created_at:- 29/07/2022 22:34:51
     */
    const { register, handleSubmit, reset,  formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = data => {
        data &&
            dispatch({
                type: `USER_LOGIN`,
                payload: {
                    ...data
                }
            });
        reset();
        toast.success(`Successfully login`, {
            position: 'bottom-right',
            theme: 'colored',
        });
        AuthLibrary.login(() => {
            setTimeout(() =>  {
                AuthLibrary.setTokenToCookie(true, 7000);
                window.location.href = '/'
            }, 1000);
        });
    };


    /**
    * useEffect :- componentWillUnmount
    * created_at:- 30/07/2022 07:23:47
    */
    useEffect(() => {
        return () => toast.dismiss();
    }, []);


    /**
	 * @check {Redirect}
	 * desc {}
	 */
	if (!_.isNil(Cookies.get('access_token'))) {
		return window.location.href = '/'
	}

    return (
        <>
            <div className="login position-fixed top-0 start-0 w-100 d-flex pt-5 justify-content-center bg-white">
                <form onSubmit={handleSubmit(onSubmit)} className='form-signIn m-auto w-100 pt-5' style={{ maxWidth: '300px' }}>
                    <h1 className="fs-3 mb-4 text-center fw-normal">Please log in</h1>
                    <div className="form-floating mb-1">
                        <input type="text" {...register("user_name")} className="form-control rounded-pill ps-4" id="floatingInput" placeholder="Username" />
                        <label className='ps-4' htmlFor="floatingInput">User name</label>
                        <p className='text-danger mb-0'>{errors.user_name?.message}</p>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="password" {...register("password")} className="form-control rounded-pill ps-4" id="floatingPassword" placeholder="Password" />
                        <label className='ps-4' htmlFor="floatingPassword">Password</label>
                        <p className='text-danger mb-0'>{errors.password?.message}</p>
                    </div>
                    <div className="form-group">
                        <button type='submit' className='btn btn-lg text-light w-100 bg-primary rounded-pill'>Log in</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login