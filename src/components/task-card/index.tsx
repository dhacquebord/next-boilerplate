import { useState } from 'react'
import { Card, CardContent } from '@material-ui/core'
import Image from 'next/image'
import StarsIcon from '@material-ui/icons/Stars'
import ClockIcon from '@material-ui/icons/QueryBuilder'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import styles from './task-card.module.scss'

const TaskCard = ({ task }) => {
    const [hover, setHover] = useState(false)
    const [copyText, setCopyText] = useState<string>()

    const copyToClipboard = (e) => {
        e.stopPropagation()
        navigator.clipboard.writeText(task.id)
        setCopyText("Copied!")
        setTimeout(() => setCopyText(null), 1000)
    }

    return (
        <Card
            onClick={()=> window.open(task.url, "_blank")}
            className={styles.task}
            key={task.id}
            elevation={hover ? 5 : 1}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <CardContent className={styles.cardContent}>
                <div>
                    <div className={styles.taskId}>
                        <b onClick={copyToClipboard}>{copyText ?? task.id}</b>
                        <FileCopyIcon />
                    </div>
                    <div>{task.name}</div>
                    <div className={styles.bottom}>
                        {!!task.points && (
                            <>
                                <StarsIcon />
                                <span className={styles.points}>
                                    {task.points} pts
                                </span>
                            </>
                        )}
                        {!!task.time_estimate && (
                            <>
                                <ClockIcon />
                                <span className={styles.time}>
                                    {task.time_estimate / 60 / 60 / 100} h
                                </span>
                            </>
                        )}
                    </div>
                    <div>
                        {task.sub_tasks.map(subTask => (
                            <div className={styles.subTask} key={subTask.id} style={{ backgroundColor: subTask.status.color }} />
                        ))}
                    </div>
                </div>
                <div className={styles.avatar}>
                    {task.assignees[0]?.profilePicture ? (
                        <Image
                            height={40}
                            width={40}
                            src={task.assignees[0].profilePicture as string}
                            layout="fixed"
                            objectFit="cover"
                        />
                    ) : (
                        <span style={{ backgroundColor: task.assignees[0]?.color }}>
                            {task.assignees[0]?.initials}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default TaskCard
