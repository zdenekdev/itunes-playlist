import { useEffect, useRef, useState } from "react";
import "./AudioPlayer.scss";
import { Song } from "../types";
import {
  ArrowPathIcon as ReplayIcon,
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";

import Slider from "@mui/material/Slider";

function AudioPlayer(props: { song: Song }) {
  const { song } = props;

  const audioEl = useRef<HTMLAudioElement>(null);
  const playerEl = useRef<HTMLInputElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [replay, setReplay] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);

  const [volumeOn, setVolumeOn] = useState(true);
  const [volumeBeforeOf, setVolumeBeforeOf] = useState(50);
  const [volumeVal, setVolumeVal] = useState<number | number[]>(50);
  const handlePlayToggle = () => {
    if (isPlaying) {
      audioEl.current!.pause();
    } else {
      audioEl.current!.play();
    }

    setIsPlaying((prev) => !prev);
  };

  const handleVolumeToggle = () => {
    if (volumeOn) {
      setVolumeBeforeOf(audioEl.current!.volume);
      setVolumeVal(0);
    } else {
      setVolumeVal(volumeBeforeOf * 100);
    }
    setVolumeOn((prev) => !prev);
  };

  const handleVolumeChange = (_: Event, vol: number | number[]) => {
    setVolumeOn(true);
    setVolumeVal(vol);
  };

  useEffect(() => {
    if (audioEl.current) {
      const newVol = +volumeVal / 100;
      audioEl.current.volume = newVol;
    }

    let intervalId: NodeJS.Timeout | null = null;
    setDuration(Math.floor(audioEl.current!.duration || 29));

    if (isPlaying) {
      intervalId = setInterval(() => {
        const currentAudio = audioEl.current;
        if (currentAudio) {
          // const _duration = Math.floor(currentAudio.duration || 29);
          const _elapsed = Math.floor(currentAudio.currentTime || 0);
          // setDuration(_duration);
          setElapsed(_elapsed);
          setElapsedMs(currentAudio.currentTime || 0);
          if (currentAudio.duration === currentAudio.currentTime) {
            setIsPlaying(false);
            setReplay(true);
            console.log("konec");
          }
        }
      }, 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [volumeVal, isPlaying]);

  useEffect(() => {
    if (audioEl.current!.duration! === audioEl.current!.currentTime) {
      setReplay((prev) => !prev);
    }
  }, [elapsed]);

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const fastForward = () => {
    audioEl.current!.currentTime += 5;
    ElapseFn();
  };

  const rewind = () => {
    audioEl.current!.currentTime -= 5;
    ElapseFn();
  };

  const handleReplay = () => {
    audioEl.current!.currentTime = 0;
    setIsPlaying(true);
    audioEl.current!.play();
    setReplay(false);
  };

  const handleElapsedChange = (_: Event, value: number | number[]) => {
    audioEl.current!.currentTime = +value;
    ElapseFn();
  };

  const ElapseFn = () => {
    setElapsedMs(audioEl.current!.currentTime);
    const _elapsed = Math.floor(audioEl.current?.currentTime || 0);
    setElapsed(_elapsed);
  };

  return (
    <div className="audio-player-wrapper">
      <audio className="tunes-player" src={song.previewUrl} ref={audioEl} />

      <Slider
        ref={playerEl}
        className="tunes-player"
        aria-label="tunes player"
        value={elapsedMs}
        min={0}
        max={duration}
        color="secondary"
        //   ref={volEl}
        onChange={handleElapsedChange}
        sx={{
          color: "#fff",
          height: 4,
          "& .MuiSlider-thumb": {
            width: 8,
            height: 8,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            display: "none",
            "&:before": {
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
            },
            "&.Mui-active": {
              width: 15,
              height: 15,
            },
          },
          "& .MuiSlider-rail": {
            opacity: 0.28,
          },
        }}
      />

      <div className="controls">
        <div className="control-btns">
          <div className="time-data">
            <p>
              {formatTime(elapsed)} / {formatTime(duration)}
            </p>
          </div>
          <div className="play-rewind-fastf">
            {isPlaying ? (
              <PauseCircleIcon
                className="icon pause-icon"
                onClick={handlePlayToggle}
              />
            ) : replay ? (
              <ReplayIcon className="icon replay-icon" onClick={handleReplay} />
            ) : (
              <PlayCircleIcon
                className="icon play-icon"
                onClick={handlePlayToggle}
              />
            )}
            <BackwardIcon className="icon rewind-icon" onClick={rewind} />

            <ForwardIcon
              className="icon fast-forward-icon"
              onClick={fastForward}
            />
          </div>
        </div>
      </div>

      <div className="volume-wrapper">
        <div className="volume-control">
          {volumeOn ? (
            <SpeakerWaveIcon
              className="speaker-icon"
              onClick={handleVolumeToggle}
            />
          ) : (
            <SpeakerXMarkIcon
              className="speaker-off-icon"
              onClick={handleVolumeToggle}
            />
          )}
          <Slider
            className="volume-bar"
            aria-label="Volume"
            value={volumeVal}
            min={0}
            max={100}
            color="secondary"
            //   ref={volEl}
            onChange={handleVolumeChange}
            sx={{
              color: "#fff",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 8,
                height: 8,
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                "&:before": {
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
                },
                "&.Mui-active": {
                  width: 15,
                  height: 15,
                },
              },
              "& .MuiSlider-rail": {
                opacity: 0.28,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
