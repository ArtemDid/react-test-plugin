import React, { useRef, useEffect, useState } from 'react';
import css from './Slide.module.scss';

const Slide = ({ children, translate, transition, color }) => {
    const container = useRef(null);
    const [offsetLeft, updateOffsetLeft] = useState(0);
    const [width, updateWidth] = useState(1);
    const [masString, updateMasString] = useState("");
    const [result, updateResult] = useState("");

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

    function componentDidMount(e) {
        console.log(container.current.value);
        // enterLength(container.current.value);
    }

    function ShowResult() {
        var length = container.current.value;
        var matrix = [[]];
        var results = [];
        var checkingMatrix = [];
        var arrayString = "";
        var tmp2 = 0;

        //удаляет первый столбец из матрицы
        function ShiftMatrixArr() {
            for (let i = 0; i < matrix.length; i++) {
                matrix[i].shift();
            }
        }

        //определяет макс.длину строки в матрице
        function GetMaxLengthMatrixArr() {
            var max = matrix[0].length;
            for (let i = 0; i < matrix.length; i++) {
                if (matrix[i].length > max) {
                    max = matrix[i].length;
                }
            }
            return max;
        }

        //поиск чисел, если нет нужной цифры - false
        function findNumbers() {
            var result = true;
            if (!checkingMatrix.find(item => item == 1)) { result = false; }
            if (!checkingMatrix.find(item => item == 2)) { result = false; }
            if (!checkingMatrix.find(item => item == 3)) { result = false; }
            if (!checkingMatrix.find(item => item == 4)) { result = false; }
            if (!checkingMatrix.find(item => item == 5)) { result = false; }
            if (!checkingMatrix.find(item => item == 6)) { result = false; }
            if (!checkingMatrix.find(item => item == 7)) { result = false; }
            if (!checkingMatrix.find(item => item == 8)) { result = false; }
            if (!checkingMatrix.find(item => item == 9)) { result = false; }

            return result;
        }

        //присваиваем элементы для нешей матрицы
        for (let i = 0; i < 3; i++) {
            let tmp = [];
            for (let j = 0; j < length; j++) {
                tmp2 = Math.floor(Math.random() * (9)) + 1;
                tmp.push(tmp2);
                console.log(tmp)
                arrayString += tmp2;
            }
            matrix.push(tmp)
            arrayString += '\n';
        }

        for (; GetMaxLengthMatrixArr() >= 3; ShiftMatrixArr()) {
            for (let i = 0; i < matrix.length; i++) {
                checkingMatrix.push(matrix[i][0], matrix[i][1], matrix[i][2]);
            }
            console.log(checkingMatrix)
            results.push(findNumbers());
            checkingMatrix = [];
        }
        console.log(results);

        updateMasString(arrayString);
        updateResult(results.toString());
    }

    return (

        <div style={style} className={css.container}>
            <div className={css.content} style={{ background: color }}>
                <label htmlFor="tentacles">Enter the number of columns in the array (3-50):</label>

                <input ref={container} type="number" name="tentacles" min="3" max="50" defaultValue="3" onChange={(e) => componentDidMount(e)} />
                <button onClick={() => ShowResult()}>Расчитать</button> <br />
                <label> {masString} </label> <br />
                <label> {result} </label>
            </div>
            <footer className={css.footer}>
                {children}
            </footer>
        </div>
    );
};

export default Slide;