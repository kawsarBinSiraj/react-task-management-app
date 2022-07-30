import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


const Members = () => {

    /**
     * dispatch from redux
     * created_at:- 30/07/2022 07:11:48
     */
    const dispatch = useDispatch();


    /**
     * navigate from redux
     * created_at:- 30/07/2022 07:11:48
     */
    const navigate = useNavigate();


    /**
     * get members & task form redux store
     * created_at:- 30/07/2022 07:15:21
     */
    const members = useSelector((store) => store?.memberReducer?.members);
    const tasks = useSelector((store) => store?.taskReducer?.tasks);

    /**
     * gettingTaskForSingleMember
     * created_at:- 30/07/2022 12:04:17
     */
    const gettingTaskForSingleMember = (id) => {
        let gettingTasksLength = tasks.filter(task => task.assign_to === id);
        return gettingTasksLength.length
    }


    return (
        <div className='members py-4'>
            <div className="container">
                <h3 className='mb-4'>
                    All Members
                    <Link to={'/add-member'} className="btn btn-sm btn-info ms-2 text-light">Create New Member</Link>
                </h3>
                <div className="table-responsive">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>No. Of Task</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(members) && members.length > 0 ?
                                    members.map((member) => {
                                        return <tr key={member.id}>
                                            <td>{member?.name}</td>
                                            <td>{gettingTaskForSingleMember(member.id)}</td>
                                            <td>
                                                <button type='button' onClick={() => navigate(`/add-member?id=${member.id}`)} className='btn btn-sm btn-warning me-1'>Edit</button>
                                                <button type='button' onClick={() => dispatch({ type: 'DELETE_MEMBER', payload: member?.id })} className='btn btn-sm btn-danger'>Delete</button>
                                            </td>
                                        </tr>
                                    })
                                    : <tr>
                                        <td colSpan={3} className="text-danger text-center fw-bold">There is no member created yet !</td>
                                    </tr>
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Members