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

export function initChart() {

    //Lectura de datos
    d3.csv('https://raw.githubusercontent.com/EnvejecimientoEnRed/informe_perfil_mayores_2022_salud_2_3/main/data/edv_65_europa_2019.csv', function(error,data) {
        if (error) throw error;

        //Desarrollo del gráfico
        let currentType = 'viz';

        //Nos quedamos con los datos de 2019 > Están todos los países representados
        let dataUE = data.filter(function(item) { if(item.is_EU == 'YES') { return item; }});

        dataUE.sort(function(x, y){
            return d3.descending(+x.Mujeres, +y.Mujeres);
        });
        
        let margin = {top: 12.5, right: 10, bottom: 25, left: 90},
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
            .attr('class','yaxis')
            .call(yAxis);

        let ySubgroup = d3.scaleBand()
            .domain(tipos)
            .range([0, y.bandwidth()])
            .padding(0);

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
                    return 'grupo grupo_' + d.NAME_PAIS;
                })
                .selectAll("rect")
                .data(function(d) { return tipos.map(function(key) { return {key: key, value: d[key]}; }); })
                .enter()
                .append("rect")
                .attr('class', function(d) {
                    return 'rect rect_' + d.key;
                })
                .attr("fill", function(d) { return color(d.key); })
                .attr('x', x(0))
                .attr('width', function(d) { return x(0); })
                .attr('height', ySubgroup.bandwidth())
                .attr('y', function(d) { return ySubgroup(d.key); })
                .on('mouseover', function(d,i,e) {
                    //Opacidad en barras
                    let css = e[i].getAttribute('class').split(' ')[1];
                    let bars = svg.selectAll('.rect');                    
            
                    bars.each(function() {
                        this.style.opacity = '0.4';
                        let split = this.getAttribute('class').split(" ")[1];
                        if(split == `${css}`) {
                            this.style.opacity = '1';
                        }
                    });

                    //Tooltip > Recuperamos el año de referencia
                    let currentCountry = this.parentNode.classList.value;
                    let sex = d.key == 'Mujeres' ? 'mujeres' : 'hombres';

                    let html = '';
                    if(d.NAME_PAIS == 'UE-27') {
                        html = '<p class="chart__tooltip--title">' + currentCountry.split('_')[1] + '</p>' + 
                            '<p class="chart__tooltip--text">La esperanza de vida a los 65 años para <b>' + sex  + '</b> son <b>' + numberWithCommas3(parseFloat(d.value)) + '</b> años en la Unión Europea</p>';
                    } else {
                        html = '<p class="chart__tooltip--title">' + currentCountry.split('_')[1] + '</p>' + 
                            '<p class="chart__tooltip--text">La esperanza de vida a los 65 años para <b>' + sex  + '</b> son <b>' + numberWithCommas3(parseFloat(d.value)) + '</b> años en este país</p>';
                    }                    
                    
                    tooltip.html(html);

                    //Tooltip
                    positionTooltip(window.event, tooltip);
                    getInTooltip(tooltip);                    
                })  
                .on('mouseout', function(d,i,e) {
                    //Quitamos los estilos de la línea
                    let bars = svg.selectAll('.rect');
                    bars.each(function() {
                        this.style.opacity = '1';
                    });
                
                    //Quitamos el tooltip
                    getOutTooltip(tooltip);
                })
                .transition()
                .duration(2000)
                .attr('width', function(d) { return x(d.value); });              
        }

        function animateChart() {
            svg.selectAll(".rect")
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

        ///// CAMBIO GRÁFICO-MAPA
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

        ///// CAMBIO ORDENACIÓN
        document.getElementById('order-male').addEventListener('click', function(e) {
            setViz('Hombres');

            setTimeout(() => {
                setChartCanvas();
            }, 3000);
        });

        document.getElementById('order-female').addEventListener('click', function(e) {
            setViz('Mujeres');

            setTimeout(() => {
                setChartCanvas();
            }, 3000);
        });

        function setViz(tipo) {
            // sort data
            dataUE.sort(function(b, a) { return +a[tipo] - +b[tipo]; });

            //Reordenación de eje Y y de columnas
            paises = d3.map(dataUE, function(d){return(d.NAME_PAIS)}).keys();
            y.domain(paises);
            svg.select('.yaxis').call(yAxis);

            svg.selectAll('.grupo')
                .data(dataUE)
                .attr("transform", function(d) { return "translate(0," + y(d.NAME_PAIS) + ")"; })
                .attr('class', function(d) {
                    return 'grupo grupo_' + d.NAME_PAIS;
                })
                .selectAll(".rect")
                .data(function(d) { return tipos.map(function(key) { return {key: key, value: d[key]}; }); })
                .attr("x", x(0) )
                .attr("y", function(d) { return ySubgroup(d.key); })
                .attr("height", ySubgroup.bandwidth())
                .attr("width", function(d) { return x(d.value); });
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

            setTimeout(() => {
                setChartCanvas();
            }, 4000);
        });

        document.getElementById('data_map').addEventListener('click', function() {
            //Cambiamos gráfico
            setChart('map');
            //Cambiamos valor actual
            currentType = 'map';

            setTimeout(() => {
                setChartCanvas();
            }, 4000);
        });        

        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();

            setTimeout(() => {
                setChartCanvas();
            }, 4000);
        });

        //////
        ///// Resto
        //////
        //Iframe
        setFixedIframeUrl('informe_perfil_mayores_2022_salud_2_3','esperanza_vida_65_europa');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('esperanza_vida_65_europa');

        //Captura de pantalla de la visualización
        setTimeout(() => {
            setChartCanvas();
        }, 4000);

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('esperanza_vida_65_europa');
        });

        //Altura del frame
        setChartHeight();
    
    });    
}