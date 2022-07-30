import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
const _ = require('lodash');


const AddTask = () => {
    /**
     * form validation schema
     * created_at:- 29/07/2022 22:34:14
     */
    const schema = yup.object({
        title: yup.string().required(),
        desc: yup.string(),
        assign_to: yup.string(),
    }).required();

    /**
     * Init useForm
     * created_at:- 29/07/2022 22:34:51
     */
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const members = useSelector((store) => store?.memberReducer?.members);
    const [searchParams] = useSearchParams();


    /**
     * useSelector - for getting isEditMode  
     * created_at:- 30/07/2022 09:23:38
     */
    const isEditMode = useSelector((store) => {
        if (!_.isNil(searchParams.get('id'))) {
            let id = searchParams.get('id');
            let mode = store.taskReducer.tasks.some((task) => {
                if (task.id === id) {
                    setValue('title', task.title);
                    setValue('desc', task.desc);
                    setValue('assign_to', task.assign_to);
                }
                return task.id === id
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
     * created_at:- 30/07/2022 10:22:41
     * description :- A method is simply a “chunk” of code.
     */
    const onSubmit = data => {
        data &&
            dispatch({
                type: `${isEditMode ? 'EDIT' : 'ADD'}_TASK`,
                payload: {
                    id: isEditMode ? searchParams.get('id') : uuidv4(),
                    date : new Date().toISOString().slice(0, 10),
                    ...data
                }
            });
        reset();
        toast.success(`Successfully task ${isEditMode ? 'updated' : 'added'}`, {
            position: 'bottom-right',
            theme: 'colored',
        });
        setTimeout(() => navigate('/tasks'), 1500);
    };


    /**
     * useEffect :- componentWillUnmount
     * created_at:- 30/07/2022 07:23:47
     */
    useEffect(() => {
        return () => toast.dismiss();
    }, []);


    return (
        <div className='add-task py-4'>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className='mb-4'>{isEditMode ? 'Update' : 'Add New'} Task</h3>
                    <div className="row">
                        <div className="col-xl-7">
                            <div className="form-group mb-3">
                                <label className='form-labels' htmlFor="title">Title</label>
                                <input id='title' {...register("title")} className='form-control' type="text" placeholder='Title' />
                                <p className='text-danger mb-0'>{errors.title?.message}</p>
                            </div>
                        </div>
                        <div className="col-xl-7">
                            <div className="form-group mb-3">
                                <label className='form-label' htmlFor="desc">Description</label>
                                <textarea {...register("desc")} className='form-control' name="desc" id="description" rows="4"></textarea>
                                <p className='text-danger mb-0'>{errors.desc?.message}</p>
                            </div>
                        </div>
                        <div className="col-xl-7">
                            <div className="form-group mb-3">
                                <label className='form-label' htmlFor="assign_to">Assign To</label>
                                <select name="assign_to" defaultValue="-- Assign To --" {...register("assign_to")} className='form-select' id="assign_to">
                                    <option defaultValue="-- Assign To --" disabled>-- Assign To --</option>
                                    {
                                        members.map((member) => {
                                            return <option key={member.id} value={member?.id}>{member?.name}</option>
                                        })
                                    }
                                </select>
                                <p className='text-danger mb-0'>{errors.assign_to?.message}</p>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="form-group mb-3">
                                <button type='submit' className={`text-light btn px-3 btn-${isEditMode ? 'warning' : 'primary'}`}>{isEditMode ? 'Update' : 'Add'} Task</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTask