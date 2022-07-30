import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
const _ = require('lodash');


const AddMember = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    /**
     * form validation schema
     * created_at:- 29/07/2022 22:34:14
    */
    const schema = yup.object({
        name: yup.string().required(),
        email: yup.string().email('Must be a valid email'),
    }).required();

    /**
     * Init useForm
     * created_at:- 29/07/2022 22:34:51
     */
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    /**
     * useSelector - for getting isEditMode  
     * created_at:- 30/07/2022 09:23:38
     */
    const isEditMode = useSelector((store) => {
        if (!_.isNil(searchParams.get('id'))) {
            let id = searchParams.get('id');
            let mode = store.memberReducer.members.some((member) => {
                if (member.id === id) {
                    setValue('name', member.name);
                    setValue('email', member.email);
                }
                return member.id === id
            })

            return mode
        }
    });


    /**
     * @method_name :- onSubmit
     * 
     * @argument  :-  {data}
     * ?return :-  {{}|any}
     * author :-  {{}|null}
     * created_by:- Kawsar Bin Siraj
     * created_at:- 29/07/2022 22:35:11
     * description :- A method is simply a “chunk” of code.
     */
    const onSubmit = data => {
        data &&
            dispatch({
                type: `${isEditMode ? 'EDIT' : 'ADD'}_MEMBER`,
                payload: {
                    id: isEditMode ? searchParams.get('id') : uuidv4(),
                    ...data
                }
            });
        reset();
        toast.success(`Successfully member ${isEditMode ? 'updated' : 'added'}`, {
            position: 'bottom-right',
            theme: 'colored',
        });
        setTimeout(() => navigate('/members'), 1500);
    };


    /**
     * useEffect :- componentWillUnmount
     * created_at:- 30/07/2022 07:23:47
     */
    useEffect(() => {
        return () => toast.dismiss();
    }, []);



    return (
        <>
            <div className='AddMember py-4'>
                <div className="container">
                    <h3 className='mb-4'>{isEditMode ? 'Update' : 'Add New'} Member</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-xl-4">
                                <div className="form-group mb-3">
                                    <label htmlFor="name" className='form-label'>Name</label>
                                    <input type="text" {...register("name")} id='name' className='form-control' placeholder='Name' />
                                    <p className='text-danger mb-0'>{errors.name?.message}</p>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className='form-label'>Email</label>
                                    <input type="email" {...register("email")} id='email' className='form-control' placeholder='Email' />
                                    <p className='text-danger mb-0'>{errors.email?.message}</p>
                                </div>
                            </div>
                            <div className="col-xl-12">
                                <div className="form-group mb-3">
                                    <button type='submit' className={`text-light btn px-3 btn-${isEditMode ? 'warning' : 'primary'}`}>{isEditMode ? 'Update' : 'Add'} Member</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddMember