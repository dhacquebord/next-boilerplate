import axios from 'axios'
import useSWR from 'swr'
import styles from './index.module.scss'
import { NativeSelect, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import StarsIcon from '@material-ui/icons/Stars'
import ClockIcon from '@material-ui/icons/QueryBuilder'
import { useState } from 'react'
import { TaskCard } from 'components'


const Index = ({ lists }) => {
    const [selectedListId, setSelectedListId] = useState(lists.find(list => new Date(Number(list.due_date)) >= new Date()).id)
    const { data } = useSWR(`/api/tasks/${selectedListId}`, (url) =>
        axios.get(url).then(res => res.data)
    )

    const handleListChange = (event) => {
        setSelectedListId(event.target.value)
    }

    const mappedTasks = data?.tasks?.reduce((_mappedTasks, task) => {
        if (_mappedTasks[task.status.status]) {
            _mappedTasks[task.status.status].tasks.push(task)
        } else {
            _mappedTasks[task.status.status] = {
                ...task.status,
                tasks: [task]
            }
        }
        return _mappedTasks
    }, {}) || []

    console.log(mappedTasks)

    const mappedTasksHtml = Object.keys(mappedTasks)
        .sort((a, b) => mappedTasks[a]?.orderindex - mappedTasks[b]?.orderindex)
        .map(status => {
            const totalPoints = mappedTasks[status].tasks.reduce(
                (points, task) => points += task.points,
            0)
            const totalTimebox = mappedTasks[status].tasks.reduce(
                (time_estimate, task) => time_estimate += task.time_estimate,
            0)
            const statusColor = mappedTasks[status].color

            return (
                <Accordion key={status}>
                    <AccordionSummary className={styles.accordionSummary}>
                        <div className={styles.statusName}>
                            <span
                                style={{ backgroundColor: statusColor }}
                                className={styles.statusColor}
                            />
                            <b className={styles.statusTitle}>{status}</b>
                        </div>
                        <div className={styles.statusSummary}>
                            {!!totalPoints && (
                                <>
                                    <StarsIcon />
                                    <span className={styles.points}>
                                        {totalPoints} pts
                                    </span>
                                </>
                            )}
                            {!!totalTimebox && (
                                <>
                                    <ClockIcon />
                                    <span className={styles.points}>
                                        {totalTimebox  / 60 / 60 / 100} h
                                    </span>
                                </>
                            )}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className={styles.taskList}>
                        {mappedTasks[status].tasks.map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </AccordionDetails>
                </Accordion>
            )
        })

    return (
        <div>
            <div className={styles.topBar}>
                <NativeSelect
                    className={styles.listSelector}
                    value={selectedListId}
                    onChange={handleListChange}
                    inputProps={{
                        name: 'List'
                    }}
                >
                    {lists.map(list => (
                        <option key={list.id} value={list.id}>{list.name}</option>
                    ))}
                </NativeSelect>
            </div>

            <h2>Tasks</h2>
            {mappedTasksHtml || <p>Laden...</p>}
        </div>
    )
}

export const getServerSideProps = async () => {
    const { data } = await axios.get("https://api.clickup.com/api/v2/folder/13190454/list", {
        headers: {
            Authorization: process.env.token
        }
    })

    return { 
        props: {
            lists: data.lists
        }
    }
}

export default Index
