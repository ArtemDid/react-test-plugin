import React, { useRef, useEffect, useState } from 'react';
import css from './Slide.module.scss';

const Slide = ({ children, translate, transition, color }) => {
    const lines = useRef(null);
    const limit = useRef(null);

    const [offsetLeft, updateOffsetLeft] = useState(0);
    const [width, updateWidth] = useState(1);
    const [masString, updateMasString] = useState("");
    const [result, updateResult] = useState("");
    var matrix = [];
    var matrixArray = [];
    var format = [];
    var arrResult = [];

    useEffect(() => {
        setTimeout(() => {
            const parent = lines.current.parentElement;
            updateOffsetLeft(parent.offsetLeft);
            updateWidth(parent.offsetWidth);
        }, 0);
    }, []);

    const x = -translate - offsetLeft;
    const k = 1 - x / width; // [0 : 1]

    const style = x >= -1 ? {
        transform: `translateX(${x}px) scale(${k * 0.2 + 0.8})`, // [0.8 : 1]
        opacity: k < 0 ? 0 : k * 0.5 + 0.5, // [0.5 : 1]
        transition: `${transition}ms`,
    } : {};

    function createArray(length) {
        for (let i = 0; i < length; i++) {
            matrix.push(prompt(`Enter line ${i + 1} through ' ':`));
            if (Math.floor(Math.random() * (2)) + 1 === 1) {
                format.push("LEFT");
            }
            else {
                format.push("RIGHT");
            }
        }

        for (let i = 0; i < matrix.length; i++) {

            let temp = matrix[i].split(' ');
            matrixArray.push(temp);
        }
    }

    function ShowResult() {
        var lengthLines = lines.current.value;
        var lengthLimit = limit.current.value;

        createArray(lengthLines);

        for (let i = 0; i < matrix.length; i++) {
            let length = matrix[i].length;

            if (length <= lengthLimit) {
                let temp = "";

                for (let j = 0; j < lengthLimit - length; j++) {
                    temp += "\u00A0";
                }
                if (format[i] === "LEFT") {
                    arrResult.push("*" + matrix[i] + temp + "*");
                }
                else {
                    arrResult.push("*" + temp + matrix[i] + "*");
                }
            }
            else {
                let temp = "";

                temp = matrix[i].substr(matrix[i].length - lengthLimit);
                matrix[i] = matrix[i].substr(0, matrix[i].length - lengthLimit);
                matrix.splice(i, 0, temp);

                if (Math.floor(Math.random() * (2)) + 1 === 1) {
                    format.push("LEFT");
                }
                else {
                    format.push("RIGHT");
                }

                temp = "";
                
                for (let j = 0; j < lengthLimit - length; j++) {
                    temp += "\u00A0";
                }
                if (format[i] === "LEFT") {
                    arrResult.push("*" + matrix[i] + temp + "*");
                }
                else {
                    arrResult.push("*" + temp + matrix[i] + "*");
                }
            }

        }

        updateMasString(matrix.toString());
        updateResult(arrResult.toString());
    }

    return (

        <div style={style} className={css.container}>
            <div className={css.content} style={{ background: color }}>
                <label htmlFor="lines">Enter the number of lines (1-50):</label>
                <input ref={lines} type="number" name="lines" min="1" max="50" defaultValue="1" />
                <br />
                <label htmlFor="limit">Enter the character limit per line (1-50):</label>
                <input ref={limit} type="number" name="limit" min="1" max="50" defaultValue="10" />


                <button onClick={() => ShowResult()}>Сalculate</button> <br />
                <label> {masString} </label> <br />
                <label> [{result}] </label>
            </div>
            <footer className={css.footer}>
                {children}
            </footer>
        </div>
    );
};

export default Slide;