import React, { Component } from 'react'
import anime from 'animejs';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';

class Animation extends Component {
    handleClick = () =>{
        const moonPath = "M5.5 13C5.5 20.1797 13 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C13 0 5.5 5.8203 5.5 13Z";
        const sunPath = "M26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13Z";

        const darkMode = document.querySelector("#darkMode");
        let toggle = false;

        darkMode.addEventListener('click', () => {
            const timeline = anime.timeline({
                duration : 750,
                easing : "easeOutExpo"
            });
            timeline.add({
                targets: ".sun",
                d: [{value: toggle ? sunPath : moonPath}]
            })
            .add({
                targets: "#darkMode",
                rotate: 320
            }, "-= 350")
            .add({
                targets: "section",
                backgroundColor: toggle ? "rgb(255,255,255)" : "rgb(22,22,22)",
                color: toggle ? "rgb(22,22,22)" : "rgb(255,255)"
            }, "-=700")
        });
    }
    render(){
        return(
            <section>
                <IconButton
                    onClick={this.handleClick}
                >
                    <Tooltip title="Profile">
                        <svg
                            id='darkMode'
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                className="sun"
                                d="M26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13Z"
                                fill="#E7EA78"/>
                        </svg>
                    </Tooltip>
                </IconButton>
            </section>
        )
    }
}
export default Animation