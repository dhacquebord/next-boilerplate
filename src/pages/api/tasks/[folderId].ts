
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { folderId } = req.query
    const { data } = await axios.get(`https://api.clickup.com/api/v2/list/${folderId}/task?subtasks=true`, {
        headers: {
            Authorization: process.env.token
        }
    })

    const tasks = data.tasks.reduce((tasks, task) => {
        if (task.parent) {
            const parentTask = tasks.find(_task => _task.id === task.parent)
            parentTask.points += task.points
            parentTask.sub_tasks.push(task)
        }
        return tasks
    }, data.tasks.filter(_task => !_task.parent).map(_task => ({ ..._task, sub_tasks: [] })))

    console.log(tasks)

    res.json({
        tasks
    })
}
