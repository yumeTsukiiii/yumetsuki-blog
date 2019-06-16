import React, {Fragment, useEffect, useState} from 'react';
import StyledSimpleCard from "../../lib/components/styled-simple-card/StyledSimpleCard";
import {withAxios} from 'react-axios';
import {Grid} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import LoadingSnack from "../../lib/components/loading-snack/LoadingSnack";

function News(props) {

    const [news, setNews] = useState([]);
    const [snackOpen, setSnackOpen] = useState(false);

    const axios = props.axios;

    useEffect(() => {
        setSnackOpen(true);
        axios(`${process.env.PUBLIC_URL}/news.json`).then(res => {
            setSnackOpen(false);
            setNews(res.data)
        }).catch(error => {
            setSnackOpen(false);
            console.log(error);
        })
    }, [axios]);

    return (
        <Fragment>
            {
                 news.length !== 0 ? news.map((item, index) => (
                    <StyledSimpleCard key={index}
                                      title={item.title}
                                      content={item.content}>
                        <Grid container direction="row" justify="flex-end">
                            <Chip color="primary" label={item.time} />
                            <div style={{marginRight: '16px'}}/>
                        </Grid>
                    </StyledSimpleCard>
                )) : <StyledSimpleCard title="梦月暂时没有任何动态" content="梦月很懒没有写任何东西"/>
            }
            <div style={{marginBottom: '48px'}}/>
            <LoadingSnack open={snackOpen}/>
        </Fragment>
    );
}

export default withAxios(News)