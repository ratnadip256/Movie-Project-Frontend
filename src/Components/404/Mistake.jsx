import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  background: radial-gradient(circle, #240015 0%, #12000b 100%);
  overflow: hidden;

  svg {
    position: absolute;
    width: 600px;
    max-width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 150px;
    transform: translate(-50%, -50%);
    font-family: 'Audiowide', sans-serif;
    font-size: 32px;
    font-weight: 300;
    text-transform: uppercase;
    color: #ff0033;
    text-shadow: 0 0 6px #ff0033, 0 0 12px #ff0033;
    animation: flickerRed 4s infinite;
  }

  /* FRONT RED STROKES */
  #id1_1, #id2_1, #id3_1 {
    stroke: #ff0033;
    stroke-width: 3;
    fill: transparent;
    filter: drop-shadow(0 0 6px #ff0033)
            drop-shadow(0 0 12px #ff0033);
  }

  /* BACK DARK RED STROKES */
  #id1_2, #id2_2, #id3_2 {
    stroke: #3a000f;
    stroke-width: 3;
    fill: transparent;
  }

  #id3_1 {
    stroke-dasharray: 940;
    stroke-dashoffset: -940;
    animation: draw3 2.5s ease forwards;
  }

  #id2_1 {
    stroke-dasharray: 735;
    stroke-dashoffset: -735;
    animation: draw2 2.5s ease 0.5s forwards;
  }

  #id1_1 {
    stroke-dasharray: 940;
    stroke-dashoffset: -940;
    animation: draw1 2.5s ease 1s forwards;
  }

  @keyframes draw1 { to { stroke-dashoffset: 0; } }
  @keyframes draw2 { to { stroke-dashoffset: 0; } }
  @keyframes draw3 { to { stroke-dashoffset: 0; } }

  @keyframes flickerRed {
    0%, 100% { opacity: 1; }
    45% { opacity: 0.4; }
    50% { opacity: 1; }
    55% { opacity: 0.3; }
  }
`;

const Mistake = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>

        {/* FRONT SVG */}
        <svg viewBox="0 0 700 250">
          <g>
            <path
              id="id3_1"
              d="M195.7 232.67h-37.1V149.7H27.76c-2.64 0-5.1-.5-7.36-1.49-2.27-.99-4.23-2.31-5.88-3.96-1.65-1.65-2.95-3.61-3.89-5.88s-1.42-4.67-1.42-7.22V29.62h36.82v82.98H158.6V29.62h37.1v203.05z"
            />
            <path
              id="id2_1"
              d="M470.69 147.71c0 8.31-1.06 16.17-3.19 23.58-2.12 7.41-5.12 14.28-8.99 20.6-3.87 6.33-8.45 11.99-13.74 16.99-5.29 5-11.07 9.28-17.35 12.81a85.146 85.146 0 0 1-20.04 8.14 83.637 83.637 0 0 1-21.67 2.83H319.3c-7.46 0-14.73-.94-21.81-2.83-7.08-1.89-13.76-4.6-20.04-8.14a88.292 88.292 0 0 1-17.35-12.81c-5.29-5-9.84-10.67-13.66-16.99-3.82-6.32-6.8-13.19-8.92-20.6-2.12-7.41-3.19-15.27-3.19-23.58v-33.13c0-12.46 2.34-23.88 7.01-34.27 4.67-10.38 10.92-19.33 18.76-26.83 7.83-7.5 16.87-13.36 27.12-17.56 10.24-4.2 20.93-6.3 32.07-6.3h66.41c7.36 0 14.58.94 21.67 2.83 7.08 1.89 13.76 4.6 20.04 8.14a88.292 88.292 0 0 1 17.35 12.81c5.29 5 9.86 10.67 13.74 16.99 3.87 6.33 6.87 13.19 8.99 20.6 2.13 7.41 3.19 15.27 3.19 23.58v33.14z"
            />
            <path
              id="id1_1"
              d="M688.33 232.67h-37.1V149.7H520.39c-2.64 0-5.1-.5-7.36-1.49-2.27-.99-4.23-2.31-5.88-3.96-1.65-1.65-2.95-3.61-3.89-5.88s-1.42-4.67-1.42-7.22V29.62h36.82v82.98h112.57V29.62h37.1v203.05z"
            />
          </g>
        </svg>

        {/* BACK SVG */}
        <svg viewBox="0 0 700 250">
          <g>
            <path id="id3_2" d="M195.7 232.67h-37.1V149.7H27.76c-2.64 0-5.1-.5-7.36-1.49-2.27-.99-4.23-2.31-5.88-3.96-1.65-1.65-2.95-3.61-3.89-5.88s-1.42-4.67-1.42-7.22V29.62h36.82v82.98H158.6V29.62h37.1v203.05z" />
            <path id="id2_2" d="M470.69 147.71c0 8.31-1.06 16.17-3.19 23.58-2.12 7.41-5.12 14.28-8.99 20.6-3.87 6.33-8.45 11.99-13.74 16.99-5.29 5-11.07 9.28-17.35 12.81a85.146 85.146 0 0 1-20.04 8.14 83.637 83.637 0 0 1-21.67 2.83H319.3c-7.46 0-14.73-.94-21.81-2.83-7.08-1.89-13.76-4.6-20.04-8.14a88.292 88.292 0 0 1-17.35-12.81c-5.29-5-9.84-10.67-13.66-16.99-3.82-6.32-6.8-13.19-8.92-20.6-2.12-7.41-3.19-15.27-3.19-23.58v-33.13z" />
            <path id="id1_2" d="M688.33 232.67h-37.1V149.7H520.39c-2.64 0-5.1-.5-7.36-1.49-2.27-.99-4.23-2.31-5.88-3.96-1.65-1.65-2.95-3.61-3.89-5.88s-1.42-4.67-1.42-7.22V29.62h36.82v82.98h112.57V29.62h37.1v203.05z" />
          </g>
        </svg>

        <h2>Page Not Found</h2>
      </Wrapper>
    </>
  );
};

export default Mistake;
