//Desarrollo de las visualizaciones
import * as d3 from 'd3';
import { numberWithCommas3 } from '../helpers';
import { getInTooltip, getOutTooltip, positionTooltip } from '../modules/tooltip';
import { setChartHeight } from '../modules/height';
import { setChartCanvas, setChartCanvasImage } from '../modules/canvas-image';
import { setRRSSLinks } from '../modules/rrss';
import { setFixedIframeUrl } from './chart_helpers';

//Colores fijos
const COLOR_PRIMARY_1 = '#F8B05C',
COLOR_COMP_1 = '#528FAD';
let tooltip = d3.select('#tooltip');

export function initChart(iframe) {

    //Lectura de datos
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe_perfil_mayores_2022_salud_2_3/main/data/edv_65_europa_2019.csv', function(error,data) {
        if (error) throw error;

        //Desarrollo del gráfico
        let currentType = 'viz';

        //Nos quedamos con los datos de 2019 > Están todos los países representados
        let dataUE = data.filter(function(item) { if(item.is_EU == 'YES') { return item; }});

        dataUE.sort(function(x, y){
            return d3.descending(+x.Mujeres, +y.Mujeres);
        });
        
        let margin = {top: 5, right: 10, bottom: 20, left: 90},
            width = document.getElementById('chart').clientWidth - margin.left - margin.right,
            height = document.getElementById('chart').clientHeight - margin.top - margin.bottom;

        let svg = d3.select("#chart")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let paises = d3.map(dataUE, function(d){return(d.NAME_PAIS)}).keys();
        let tipos = ['Hombres', 'Mujeres'];
        
        let x = d3.scaleLinear()
            .domain([0, 25])
            .range([ 0, width]);

        let xAxis = function(svg) {
            svg.call(d3.axisBottom(x).ticks(5));
            svg.call(function(g){
                g.selectAll('.tick line')
                    .attr('class', function(d,i) {
                        if (d == 0) {
                            return 'line-special';
                        }
                    })
                    .attr('y1', '0')
                    .attr('y2', `-${height}`)
            });
        }

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        let y = d3.scaleBand()
            .range([0, height])
            .domain(paises)
            .padding(0.1)
            .paddingInner(0.35)

        let yAxis = function(svg) {
            svg.call(d3.axisLeft(y));
            svg.call(function(g){g.selectAll('.tick line').remove()});
            svg.call(function(g){g.selectAll('.domain').remove()});
            svg.call(function(svg) {
                svg.selectAll("text").style("font-weight", function(d) { if(d == 'España' || d == 'UE-27') { return '700'} else { return '400'; }})
            });
        }

        svg.append("g")
            .call(yAxis);

        let ySubgroup = d3.scaleBand()
            .domain(tipos)
            .range([0, y.bandwidth()])
            .padding([0]);

        let color = d3.scaleOrdinal()
            .domain(tipos)
            .range([COLOR_PRIMARY_1, COLOR_COMP_1]);

        function initViz() {
            //Barras
            svg.append("g")
                .selectAll("g")
                .data(dataUE)
                .enter()
                .append("g")
                .attr("transform", function(d) { return "translate(0, " + y(d.NAME_PAIS) + ")"; })
                .attr('class', function(d) {
                    return 'rect_' + d.NAME_PAIS;
                })
                .selectAll("rect")
                .data(function(d) { return tipos.map(function(key) { return {key: key, value: d[key]}; }); })
                .enter()
                .append("rect")
                .attr('class', function(d) {
                    return 'rect ' + d.key;
                })
                .attr("fill", function(d) { return color(d.key); })
                .attr('x', x(0))
                .attr('width', function(d) { return x(0); })
                .attr('height', ySubgroup.bandwidth())
                .attr('y', function(d) { return ySubgroup(d.key); })
                .on('mouseover', function(d,i,e) {
                    //Comprobamos cuál es el sexo para la opacidad en sexo
                    let currentSex = this.classList[1];

                    let bars = svg.selectAll('.rect');  
                    bars.each(function() {
                        this.style.opacity = '0.4';
                        if(this.classList[1] == currentSex) {
                            this.style.opacity = '1';
                        }
                    });

                    //Comprobamos cuál es el padre para poner el texto
                    let currentCountry = this.parentNode.classList[0];
                    let currentText = document.getElementsByClassName('text_'+currentCountry.split('_')[1])[0];
                    let currentTextSex = currentText.getElementsByClassName('text_'+currentSex)[0];
                    currentTextSex.style.display = 'block';
                })  
                .on('mouseout', function(d,i,e) {
                    //Quitamos los estilos de la línea
                    let bars = svg.selectAll('.rect');
                    bars.each(function() {
                        this.style.opacity = '1';
                    });

                    //Comprobamos cuál es el padre para quitar el texto
                    let texts = svg.selectAll('.text');
                    texts.each(function() {
                        this.style.display = 'none';
                    });
                })
                .transition()
                .duration(2000)
                .attr('width', function(d) { return x(d.value); });
            
            //Texto
            svg.append("g")
                .selectAll("g")
                .data(dataUE)
                .enter()
                .append("g")
                .attr("transform", function(d) { return "translate(0," + y(d.NAME_PAIS) + ")"; })
                .attr('class', function(d) {
                    return 'text_' + d.NAME_PAIS;
                })
                .selectAll("rect")
                .data(function(d) { return tipos.map(function(key) { return {key: key, value: d[key]}; }); })
                .enter()
                .append('text')
                .attr('class', function(d) {
                    return 'text text_' + d.key;
                })
                .attr("y", function(d) { return ySubgroup(d.key) + 2.5; })
                .attr("x", function(d) { return x(d.value) + 7.5; })
                .attr("dy", ".35em")
                .style('display','none')
                .text(function(d) { return numberWithCommas3(d.value); })
                

            svg.selectAll('texto')
                .append()
                
        }

        function animateChart() {
            svg.selectAll(".prueba")
                .attr("x", function(d) { return xSubgroup(d.key); })
                .attr("width", xSubgroup.bandwidth())
                .attr("fill", function(d) { return color(d.key); })
                .attr("y", function(d) { return y(0); })                
                .attr("height", function(d) { return height - y(0); })
                .transition()
                .duration(2000)
                .attr("y", function(d) { return y(d.value); })                
                .attr("height", function(d) { return height - y(d.value); });
        }

        ///// CAMBIO
        function setChart(type) {
            if(type != currentType) {
                if(type == 'viz') {
                    //Cambiamos color botón
                    document.getElementById('data_map').classList.remove('active');
                    document.getElementById('data_viz').classList.add('active');
                    //Cambiamos gráfico
                    document.getElementById('map').classList.remove('active');
                    document.getElementById('viz').classList.add('active');
                } else {
                    //Cambiamos color botón
                    document.getElementById('data_map').classList.add('active');
                    document.getElementById('data_viz').classList.remove('active');
                    //Cambiamos gráfico
                    document.getElementById('viz').classList.remove('active');
                    document.getElementById('map').classList.add('active');
                }
            }            
        }

        /////
        /////
        // Resto - Chart
        /////
        /////
        initViz();

        document.getElementById('data_viz').addEventListener('click', function() {            
            //Cambiamos gráfico
            setChart('viz');
            //Cambiamos valor actual
            currentType = 'viz';
        });

        document.getElementById('data_map').addEventListener('click', function() {
            //Cambiamos gráfico
            setChart('map');
            //Cambiamos valor actual
            currentType = 'map';
        });

        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();
        });

        //////
        ///// Resto
        //////
        //Iframe
        setFixedIframeUrl('informe_perfil_mayores_2022_salud_2_3','esperanza_vida_65_europa');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('esperanza_vida_65_europa');

        //Captura de pantalla de la visualización
        setChartCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('esperanza_vida_65_europa');
        });

        //Altura del frame
        setChartHeight(iframe);
    
    });    
}