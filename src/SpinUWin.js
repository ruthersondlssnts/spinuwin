import { useEffect, useRef, useState } from "react";
import bg from "./spinbg.png";
import logo from "./logo.png";
import Winwheel from "./Winwheel";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

export default function SpinUWin(props) {
  let theWheel = useRef();
  let tickInterval = useRef();
  let audioTick = new Audio("./tick.mp3");
  let audioWin = new Audio("./small-win.mp3");

  useEffect(() => {
    gsap.registerPlugin(Draggable);

    theWheel.current = new Winwheel({
      canvasId: "myCanvas",
      numSegments: props.data.length,
      textFontSize: 35,
      innerRadius: 70,
      lineWidth: 3,
      strokeStyle: "white",
      textOrientation: "horizontal",
      textAligment: "center",
      pointerAngle: 90,
      segments: props.data,
      animation: {
        type: "spinToStop",
        duration: 5,
        spins: 8,
        callbackFinished: alertPrize,
        callbackSound: playTickSound,
        soundTrigger: "pin"
      },
      pins: {
        number:
          props.data.length >= 20 ? props.data.length : props.data.length * 2,
        outerRadius: 5,
        fillStyle: "#7734c3",
        strokeStyle: "#ffffff"
      }
    });

    Draggable.create("#myCanvas", {
      type: "rotation",
      inertia: true,
      onDragEnd: function () {
        gsap
          .fromTo(
            "#myCanvas",
            {
              rotation: 0
            },
            {
              rotation: 360,
              duration: 0.3,
              repeat: -1,
              ease: "linear"
            },
            0
          )
          .timeScale(1);
        tickInterval.current = setInterval(playTickSound, 10);
        spin();
      }
    });
  }, []);

  function spin() {
    setTimeout(function () {
      clearInterval(tickInterval.current);
      gsap.killTweensOf("#myCanvas");
      gsap.to("#myCanvas", 1, {
        rotation: 0,
        duration: 0.1
      });
      let stopAt = theWheel.current.getRandomForSegment(1);
      theWheel.current.animation.stopAngle = stopAt;
      playTickSound();
      theWheel.current.startAnimation();
    }, 5000);
  }

  function alertPrize() {
    let winningSegment = theWheel.current.getIndicatedSegment();
    audioWin.play();
    alert("You have won " + winningSegment.text + "!");
  }

  function playTickSound() {
    audioTick.pause();
    audioTick.currentTime = 0;
    audioTick.play();
  }

  return (
    <div
      style={{
        width: 660 + 70,
        maxWidth: "100%",
        position: "relative"
      }}
    >
      <canvas id="myCanvas" width="660" height="660">
        Canvas not supported, please user another browser.
      </canvas>
      <img src={bg} id="bg" />
      <img src={logo} id="logo" />
    </div>
  );
}
