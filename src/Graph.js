import * as d3 from 'd3';
import { autoType } from 'd3';
import React, {useEffect, useState} from "react";

function SelectYear({handleChange}){ // 表示する年を選択
    return (
        <div className="container">
            <select name="year" onChange={handleChange} defaultValue="2018">
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
            </select>
        </div>
    );
}

function MonthAxis({scale}){ // 月を表す軸
    const array = new Array(12);
    for(let i=0; i<array.length; i++){
        array[i]=i+1;
    }
    return (
        <g>
            {array.map((y, i) => {
                return (
                    <g key={i} transform={`translate(0, ${scale(y)})`}>
                        <text x={-8}
                            y={15}
                            textAnchor="end"
                            dominantBaseline="central"
                            fontSize="20"
                        >
                            {y}
                        </text>
                    </g>
                )
            })}
            <text x="-23"
                y="41%"
                textAnchor="end"
                dominantBaseline="central"
                fontSize="20"
            >
                月
            </text>
        </g>
    )
}

function DayAxis({scale, contentHeight}){ // 日を表す軸
    const y = contentHeight;
    const array = new Array(31);
    for(let i=0; i<array.length; i++){
        array[i]=i+1;
    }
    return (
        <g>
            {array.map((x, i) => {
                return (
                    <g key={i} transform={`translate(${scale(x)} , 0)`}>
                        <text x={15}
                            y={y-65}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize="20"
                        >
                            {x}
                        </text>
                    </g>
                )
            })}
            <text x="46%"
                y={y-45}
                textAnchor="end"
                dominantBaseline="central"
                fontSize="20"
            >
                日
            </text>
        </g>
    )
}

function Graph(){

    const [matrix, setMatrix] = useState([]);

    useEffect(() => {
        fetch("temp.json")
            .then(data => data.json())
            .then(data => {
                setMatrix(data)
            });
    }, []);

    // データの準備
    const width = 1200; // グラフの幅
    const height = 500; // グラフの高さ
    const margin = {
        top: 10,
        bottom: 50,
        left: 50,
        right: 150,
    }

    // 選択した年を反映する
    const [years, setYears] = useState({ year: "2018" })
    function handleChangeYaer(event){
        setYears(() => {
            return {
                year: event.target.value
            }
        })
    }

    const matdata = matrix.filter((item) => {
        return item.year === years.year;
    });

    // クリックした際の月、日、平均気温を取得
    const [textMonth, setTextMonth] = useState();
    const [textDay, setTextDay] = useState();
    const [textTemp, setTextTemp] = useState();
    function handleChangeMonth(event){
        setTextMonth(event);
    }
    function handleChangeDay(event){
        setTextDay(event);
    }
    function handleChangeTemp(event){
        setTextTemp(event);
    }

    // スケールの設定
    const xScale = d3
        .scaleLinear()
        .domain(d3.extent(matdata, (item) => item.day)) // スケールの表示数を設定
        .range([0, 280]); // domainの値がサイトの大きさと一致するように設定

    const yScale = d3
        .scaleLinear()
        .domain(d3.extent(matdata, (item) => item.month))
        .range([0, 280]); 

    const color = d3
        .scaleLinear()
        .domain([0, 35])
        // .domain(d3.extent(matdata, (item) => item.averageTemp))
        .range(["blue", "red"]);
    
    return (
        <div>
            <SelectYear handleChange={handleChangeYaer}/>
            <svg viewBox={`${-margin.left} ${-margin.top} ${width} ${height}`}>
                <g>
                    <MonthAxis scale={xScale} />
                    <DayAxis scale={xScale} contentHeight={height}/>
                    {matdata.map((item, i) => {
                        return (
                                <rect
                                key={i}
                                x={xScale(item.day)}
                                y={yScale(item.month)}
                                width="33"
                                height="33"
                                fill={color(item.averageTemp)}
                                onClick={() => {
                                    handleChangeMonth(item.month);
                                    handleChangeDay(item.day);
                                    handleChangeTemp(item.averageTemp);
                                }}
                                style={{transition: "all 0.5s"}}
                                />
                            )
                        })
                    }
                    <text 
                        x="45%"
                        y={height-20}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="15"
                    >
                        {textMonth}月{textDay}日の平均気温: {textTemp}℃
                    </text>
                </g>
            </svg>
        </div>
    );
}

export default Graph;