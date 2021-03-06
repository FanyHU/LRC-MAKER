/**
 * Created by akari on 19/02/2017.
 */
import React, { Component } from "react";
import LRC from "../lrc";

const Creator = props => {
  const {
    showTimestamp,
    elapsedTime,
    lyric,
    highlightIndex,
    showSyncButton,
    selectedIndex,
    onChangeSelectedIndex,
    onSyncLrcLRC,
    onOutput,
    onDeleteTimestamp,
    onClearAlleTimestamp
  } = props;

  return (
    <div>
      <div className="tool-bar">
        <button
          className="tool-bar-button outputButton"
          onClick={() => onOutput()}
        >
          导出/编辑 LRC
        </button>
        <button
          className="tool-bar-button"
          onClick={() => {
            if (confirm("我没有手滑，清空了时间轴不后悔")) {
              onClearAlleTimestamp();
            }
          }}
        >
          清空时间标签
        </button>
      </div>
      <button
        className={`sync-lyric ${showSyncButton ? "is-visible" : null}`}
        onClick={() => onSyncLrcLRC()}
      >
        <svg
          fill="#ffffff"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M10 8H8v4H4v2h4v4h2v-4h4v-2h-4zm4.5-1.92V7.9l2.5-.5V18h2V5z"
          />
        </svg>
      </button>
      <ul className={`lyric-list ${showTimestamp ? "showtimestamp" : null}`}>
        {lyric.map((lyricLine, index) => {
          let className = ["lyric"];
          let timeTag = "";
          if (lyricLine.time !== undefined) {
            timeTag = LRC.timeToTag(lyricLine.time);
            className.push("timed");
          }
          if (index === selectedIndex) {
            className.push("select");
          }
          if (index === highlightIndex) {
            className.push("highlight");
          }
          let pre_index = Math.max(index - 1, 0);
          let pre_time = lyric[pre_index].time;
          if (pre_time && pre_time > lyricLine.time) {
            className.push("error");
          }
          return (
            <li
              key={lyricLine.key}
              className={className.join(" ")}
              onClick={() => onChangeSelectedIndex(index)}
              data-elapsedTime={
                showTimestamp && index === selectedIndex
                  ? LRC.timeToTag(elapsedTime)
                  : null
              }
            >
              <p>{showTimestamp ? timeTag : ""}{" "}{lyricLine.text}</p>
            </li>
          );
        })}
      </ul>

    </div>
  );
};

export default Creator;
