import * as d3 from 'd3';
import React, {useEffect, useState} from "react";

function Graph(){
    // データの準備
    const width = 800; // グラフの幅
    const height = 1200; // グラフの高さ
    const n = 12;
    const m　= 31;
    const matrix = new Array(n);
    for(let i=0; i<n; i++){
        matrix[i] = new Array(m);
        for(let j=0; j<m; j++){
            matrix[i][j] = Math.random();
        }
    }
    

    // SVG領域の設定
    const svg = d3
        .select("#heatmap") // body要素を選択
        .append("svg") // svg領域（座標空間）を生成
        .attr("width", width)　// widthを指定したグラフの幅に変更
        .attr("height", height); // heightを指定したグラフの高さに変更
    const g = svg
        .append("g") // g要素を生成
        .attr("transform", "translate(" + 0 + "," + 0 + ")");　// 横に0、縦に0グラフを移動する
    

    // スケールの設定
    const Scale = d3
        .scaleLinear()
        .domain(d3.extent(matrix, (item) => item.month)) // extent→最小値と最大値を（配列で）返す
        .range([height, 0]);
        

    
    
    const color = d3.scaleSequential(
        function(t) { return d3.interpolate("white", "steelblue")(t);}
        )
        .domain([0, d3.max(matrix, function(row) {return d3.max(row) })]);
    

    // ヒートマップ作成
    g.selectAll(".row")
        .data(matrix)
        .enter()
        .append("g")
        .attr("class", "row")
        .attr("transform", function(d, i) {return "translate(0," + scale(i) + ")";})
        .selectAll(".cell")
        .data(function(d){return d})
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr("x", function(d, i){return scale(i); })
        .attr("width", scale.bandwidth())
        .attr("height", scale.bandwidth())
        .attr("opacity", 0.9)
        .attr("fill", function(d) {return color(d);});
    
    
    return [];
    
    
}

export default Graph;