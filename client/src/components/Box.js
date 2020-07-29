import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     '& > *': {
//       margin: theme.spacing(1),
//       width: theme.spacing(16),
//       height: theme.spacing(16),
//     },
//   },
// }));
export const Box = ({value, index}) => {
    // const classes = useStyles()
    return (
        // <div className={classes.root}>
            <Paper style={{width:"100%", height:"100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div>
                {index}
                </div>
            </Paper>
        // </div>
    )
}
