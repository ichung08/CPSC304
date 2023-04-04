import React, { useState, useEffect, useCallback }  from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

import PlayersTable from '../components/PlayersTable';
import FindPlayerPanel from '../components/FindPlayerPanel';
import FilterPlayerColumnsPanel from "../components/FilterPlayerColumnsPanel";
import SmashTable from '../components/SmashTable';

const Player = () => {
    const [data, setData] = useState({ results: [], columns: [] });
    const [fetchParams, setFetchParams] = useState({
        projection: { country: true, wins: true, losses: true },
        selection: { country: "All", wins: "", losses: "" }
    });

    const useStyles = makeStyles({
        table: {
            minWidth: 650
        },
        container: {
            "padding": '2rem'
        }
    });

    const classes = useStyles();
    const getWhereClauseString = useCallback(() => {
        const whereClauses = [];
        const { country, wins, losses } = fetchParams.selection;
        if (country === "Canada") {
            whereClauses.push("p_country = 'Canada'")
        }
        if (country !== "All" && country !== "Canada") {
            whereClauses.push(`(p_country = "${country} 1" OR p_country = "${country} 2" OR p_country = "${country} 3")`)
        }
        if (wins !== "") {
            whereClauses.push(`wins > ${wins}`)
        }
        if (losses !== "") {
            whereClauses.push(`losses > ${losses}`)
        }

        return whereClauses.length === 0 ? "" : ` WHERE ${whereClauses.join(" AND ")}`;
    }, [fetchParams.selection]);

    const getSelectString = useCallback(() => {
        const { rank, kills, assists, deaths, headshotPercentage, AverageCombatScore } = fetchParams.projection;
        let selectClause = "SELECT player_id";
        if (rank) {
            selectClause += ", p_rank"
        }
        if (kills) {
            selectClause += ", kills"
        }
        if (assists) {
            selectClause += ", assists"
        }
        if (deaths) {
            selectClause += ", deaths"
        }
        if (headshotPercentage) {
            selectClause += ", headshot_percentage"
        }
        if (AverageCombatScore) {
            selectClause += ", average_combat_score"
        }
        return selectClause;
    }, [fetchParams.projection]);

    const fetchData = useCallback (() => {
        const where = getWhereClauseString();
        const select = getSelectString();
        const sqlQuery = `${select} FROM Player${where}`;
        console.log(sqlQuery);
        fetch('/sql', {
            method: "POST",
            body: JSON.stringify({ sql: sqlQuery }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(players => {
                setData({
                    results: players['results'],
                    columns: players['columns'].map((c) => ({ key: c, displayName: c }))
                })
            });
    }, [getSelectString, getWhereClauseString]);


    const handleDelete = (player) => {
        const sqlQuery = `DELETE FROM Player WHERE player_id = "${player.player_id}"`;
        console.log(sqlQuery);
        fetch('/sql', {
            method: "POST",
            body: JSON.stringify({ sql: sqlQuery }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            fetchData();
        })
    }

    useEffect(() => {
        fetchData();
    }, [fetchParams, fetchData])

    const handleFetchParamsChange = (paramType, params) => {
        setFetchParams((prevState) => ({ ...prevState, [paramType]: params }));
    }

    return (
        <Container className={classes.container} maxWidth="lg">
            <FindPlayerPanel values={fetchParams.selection} handleSubmit={(params) => handleFetchParamsChange("selection", params)}/>
            <FilterPlayerColumnsPanel values={fetchParams.projection} handleSubmit={(params) => handleFetchParamsChange("projection", params)}/>
            <PlayersTable tableName="Players" results={data.results} columns={data.columns} onRowDelete={handleDelete}></PlayersTable>
            <br></br>
        </Container>
    );
}

export default Player;