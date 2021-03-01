import React, { useRef, useEffect, useState } from 'react';
import css from './Slide.module.scss';

const Slide = ({ children, translate, transition, color }) => {
    const container = useRef(null);
    const [offsetLeft, updateOffsetLeft] = useState(0);
    const [width, updateWidth] = useState(1);
    const [masString, updateMasString] = useState("");
    const [result, updateResult] = useState("");
    var temp = 0;
    var matrix = [];
    var arrResult = [];

    useEffect(() => {
        setTimeout(() => {
            const parent = container.current.parentElement;
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

    function ShowResult() {
        var length = container.current.value;

        for (let i = 0; i < length; i++) {
            temp = Math.floor(Math.random() * (9)) + 1;
            matrix.push(temp);
        }

        for (let i = 1; i < length-1; i++) {

            if((matrix[i]>matrix[i-1] && matrix[i]>matrix[i+1]) || (matrix[i]<matrix[i-1] && matrix[i]<matrix[i+1]))
            {
                arrResult.push(1);
            }
            else
            {
                arrResult.push(0);
            }
        }

        updateMasString(matrix.toString());
        updateResult(arrResult.toString());
    }

    return (

        <div style={style} className={css.container}>
            <div className={css.content} style={{ background: color }}>
                <label htmlFor="tentacles">Enter the number of columns in the array (3-50):</label>

                <input ref={container} type="number" name="tentacles" min="3" max="50" defaultValue="3" />
                <button onClick={() => ShowResult()}>Расчитать</button> <br />
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