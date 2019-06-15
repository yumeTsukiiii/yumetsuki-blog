import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause"

SimpleAudio.propTypes = {
    src: PropTypes.string.isRequired
};

SimpleAudio.defaultProps = {
    autoPlay: false,
    loop: true
};

export default function SimpleAudio(props) {

    const [isPlay, setIsPlay] = useState(props.autoPlay);

    useEffect(() => {
        let audio = document.getElementById("play-audio");
        if (isPlay) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [isPlay]);

    return (
        <IconButton onClick={() => {setIsPlay(!isPlay)}}>
            <audio id="play-audio" style={{display: "none"}}
                   loop={props.loop} src={props.src}>
            </audio>
            {isPlay ? <PauseIcon/> : <PlayArrowIcon/>}
        </IconButton>
    );
}