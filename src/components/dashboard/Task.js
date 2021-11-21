import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {User} from "../common/User";


export const Task = ({task}) => {
    return (
        <CardContent>
            <Typography color='textPrimary' gutterBottom style={{fontSize: 18}}>
                {task?.title}
            </Typography>
            <Typography color='textSecondary' gutterBottom>
                {task?.description}
            </Typography>
            <User user={task.assignee}/>
        </CardContent>
    )
}