import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause"
import {CircularProgress} from "@material-ui/core";

SimpleAudio.propTypes = {
    src: PropTypes.string.isRequired
};

SimpleAudio.defaultProps = {
    autoPlay: false,
    loop: true
};

export default function SimpleAudio(props) {

    const [isPlay, setIsPlay] = useState(props.autoPlay);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let audio = document.getElementById("play-audio");
        if (isPlay) {
            if (audio.readyState === 4) {
                audio.play();
                return;
            }
            audio.oncanplay = (e) => {
                audio.play();
                setIsLoading(false)
            };
        } else {
            audio.pause();
        }
    }, [isPlay]);

    return (
        <IconButton onClick={() => {if (!isLoading) setIsPlay(!isPlay) }}>
            <audio id="play-audio" style={{display: "none"}}
                   loop={props.loop} src={props.src}>
            </audio>
            {isLoading ? <CircularProgress color="inherit" size={24}/> : isPlay ? <PauseIcon/> : <PlayArrowIcon/>}
        </IconButton>
    );
}