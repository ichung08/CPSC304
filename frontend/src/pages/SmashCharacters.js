import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import SmashTable from '../components/SmashTable';

const SmashCharacters = () => {
    const [data, setData] = useState({ results: [], columns: [] });

    const useStyles = makeStyles({
        table: {
            minWidth: 650
        },
        title: {
            "font-family": 'supersmash',
            "text-align": "center"
        },
        container: {
            "padding": '2rem'
        }
    });

    const classes = useStyles();

    useEffect(() => {
        const sqlQuery = "SELECT * FROM Smash_Character";
        console.log(sqlQuery);
        fetch('/sql', {
            method: "POST",
            body: JSON.stringify({ sql: sqlQuery  }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(agents => {
                setData({
                    results: agents['results'],
                    columns: agents['columns'].map((c) => ({ key: c, displayName: c }))
                })
            });
    }, [])


    return (
        <Container className={classes.container} maxWidth="lg">
            <SmashTable tableName="Agents" results={data.results} columns={data.columns}></SmashTable>
        </Container>);
}

export default SmashCharacters;