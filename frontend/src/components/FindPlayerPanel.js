import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel"
import TextField from "@material-ui/core/TextField"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from '@material-ui/core/Typography';

const FindPlayerPanel = ({ values, handleSubmit }) => {
    const useStyles = makeStyles({
        root: {
            padding: '1rem',
            margin: '0rem 0rem 3rem 0rem',
            display: "flex",
            flexDirection: "row"
        },
        form: {
            display: "flex",
            flexDirection: "row"
        },
        input: {
            width: 200,
            marginRight: 8
        },
        title: {
            "font-family": 'supersmash',
            "text-align": "center"
        },
        subtitle: {
            "font-family": 'supersmash',
            "text-align": "left"
        },
    });
    
    const classes = useStyles();

    const onFormChange = (field, value) => {
        handleSubmit({ ...values, [field]: value });
    }

    return (
        <>
        <Typography className={classes.subtitle} variant="h5">Find Players</Typography>
        <Paper className={classes.root}>
        <FormControl className={classes.form} variant="outlined">
                <InputLabel>Countries</InputLabel>
                <Select
                    id="select-country"
                    label="Country"
                    className={classes.input}
                    value={values.rank}
                    onChange={(e) => onFormChange("country", e.target.value)}
                >
                    <MenuItem value="All">All Countries</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="Mexico">Mexico</MenuItem>
                    <MenuItem value="UK">UK</MenuItem>
                    <MenuItem value="China">China</MenuItem>
                    <MenuItem value="Korea">Korea</MenuItem>
                    <MenuItem value="Japan">Japan</MenuItem>
                    <MenuItem value="Italy">Italy</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Min Wins"
                type="number"
                variant="outlined"
                className={classes.input}
                value={values.wins}
                onChange={(e) => onFormChange("wins", e.target.value)}
            />
            <TextField
                label="Min Losses"
                type="number"
                variant="outlined"
                className={classes.input}
                value={values.losses}
                onChange={(e) => onFormChange("losses", e.target.value)}
            />
        </Paper>
        </>
    );
}

export default FindPlayerPanel;