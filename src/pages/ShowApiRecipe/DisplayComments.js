
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


const DisplayComment = ({commentList}) => {

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
            }}
        >
            <ListItem>
                <ListItemText primary={commentList.length} secondary="Comments" />
            </ListItem>


            {commentList.map((comment) => (<>
                <Divider component="li" />
                <li>
                    <Typography
                        sx={{ mt: 0.5, ml: 2 }}
                        color="text.secondary"
                        display="block"
                        variant="caption"
                    >
                    </Typography>
                </li>

                <li>   <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ModeCommentIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={comment.msg} secondary={comment.date} />
                </ListItem>

                </li>
                <Divider component="li" variant="inset" />
            </>))}



        </List>
    );
}
export default DisplayComment;