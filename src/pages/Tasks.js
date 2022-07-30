import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


const Tasks = () => {
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
     * get tasks & members form redux store
     * created_at:- 30/07/2022 07:15:21
     */
    const tasks = useSelector((store) => store?.taskReducer?.tasks);
    const members = useSelector((store) => store?.memberReducer?.members);

    /**
     * gettingTaskForSingleMember
     * created_at:- 30/07/2022 12:04:17
     */
    const gettingMemberForSingleTask = (id) => {
        let memberName = '';
        let isGetMember = members.some(member => {
            if (member.id === id) memberName = member?.name;
            return member.id === id
        });
        if (isGetMember === true) return memberName
    }

    return (
        <div className='task py-4'>
            <div className="container">
                <h3 className='mb-4'>
                    All Tasks
                    <Link to={'/add-task'} className="btn btn-sm btn-info ms-2 text-light">Create New Task</Link>
                </h3>
                <div className="table-responsive">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Creation Date</th>
                                <th>Assign to</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(tasks) && tasks.length > 0 ?
                                    tasks.map((task) => {
                                        return <tr key={task.id}>
                                            <td>{task?.title}</td>
                                            <td>{task?.date}</td>
                                            <td>{task?.assign_to !== '-- Assign To --' && gettingMemberForSingleTask(task?.assign_to)}</td>
                                            <td>
                                                <button type='button' onClick={() => navigate(`/add-task?id=${task.id}`)} className='btn btn-sm btn-warning me-1'>Edit</button>
                                                <button type='button' onClick={() => dispatch({ type: 'DELETE_TASK', payload: task?.id })} className='btn btn-sm btn-danger'>Delete</button>
                                            </td>
                                        </tr>
                                    })
                                    : <tr>
                                        <td colSpan={3} className="text-danger text-center fw-bold">There is no task created yet !</td>
                                    </tr>
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Tasks