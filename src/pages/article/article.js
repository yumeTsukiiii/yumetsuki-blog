import React, {Fragment, useEffect, useState} from 'react';
import StyledSimpleCard from "../../lib/components/styled-simple-card/StyledSimpleCard";
import {withAxios} from 'react-axios';
import ArticleDialog from "./components/ArticleDialog";
import Chip from "@material-ui/core/Chip";
import {Grid} from "@material-ui/core";

function Article(props) {

    const [articles, setAriticles] = useState([]);

    const axios = props.axios;

    useEffect(() => {
        axios(`${process.env.PUBLIC_URL}/articles.json`).then(res => {
            setAriticles(res.data)
        }).catch(error => {
            console.log(error);
        })
    }, [axios]);

    return (
        <Fragment>
            {
                articles.length !== 0 ? articles.map((item, index) => (
                    <ArticleDialog key={index}
                                   file={item.file}
                                   title={item.title} articles={articles}>
                        <StyledSimpleCard title={item.title} content={item.brief}>
                            <Grid container direction="row" justify="flex-end">
                                <Chip color="primary" label={item.time} />
                                <div style={{marginRight: '16px'}}/>
                            </Grid>
                        </StyledSimpleCard>
                    </ArticleDialog>
                )) : <StyledSimpleCard title="梦月暂时没有任何文章" content="梦月很懒没有写任何东西"/>
            }
            <div style={{marginBottom: '48px'}}/>
        </Fragment>
    );
}

export default withAxios(Article)