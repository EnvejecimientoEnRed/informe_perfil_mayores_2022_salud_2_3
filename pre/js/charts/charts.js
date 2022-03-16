//Desarrollo de las visualizaciones
import * as d3 from 'd3';
//import { numberWithCommas2 } from './helpers';
//import { getInTooltip, getOutTooltip, positionTooltip } from './modules/tooltip';
import { setChartHeight } from '../modules/height';
import { setChartCanvas, setChartCanvasImage, setCustomCanvas, setChartCustomCanvasImage } from '../modules/canvas-image';
import { setRRSSLinks } from '../modules/rrss';
import { setFixedIframeUrl } from './chart_helpers';

export function initChart(iframe) {

    //Lectura de datos
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe_perfil_mayores_2022_salud_2_3/main/data/edv_65_europa_2019.csv', function(error,data) {
        if (error) throw error;

        //Desarrollo del gráfico
        //Nos quedamos con los datos de 2019 > Están todos los países representados
        let dataUE = data.filter(function(item) { if(item.is_EU == 'YES') { return item; }});
        console.log(data2019);

        function init() {

        }

        function animateChart() {

        }

        //////
        ///// Resto - Chart
        //////
        init();

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
        setCustomCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('esperanza_vida_65_europa');
            setChartCustomCanvasImage('esperanza_vida_65_europa');
        });

        //Altura del frame
        setChartHeight(iframe);
    
    });    
}