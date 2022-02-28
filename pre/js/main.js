import 'url-search-params-polyfill';
import './modules/tabs';
import * as charts from './charts/charts';

//Necesario para importar los estilos de forma automática en la etiqueta 'style' del html final
import '../css/main.scss';

/////////////
//////// RECOGIDA DE PARÁMETROS DE LA URL
/////////////
getUrlParams();

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);

    //Visualización y tipo de iframe
    const viz = params.get('chart');
    const iframe = params.get('iframe');

    setChart(viz, iframe);
}

function setChart(viz, iframe) {
    pymChild.onMessage('viewport-iframe-position', onScroll);    

    function onScroll(parentInfo) {
        let steps = parentInfo.split(" ");

        if(steps[2] != 0 && !isChartActive) {
            switch(viz){
                //Salud
                case '2_1':
                    charts.initChart2_1(iframe, steps[2]);
                    break;
                case '2_2':
                    charts.initChart2_2(iframe, steps[2]);
                    break;
                case '2_3':
                    charts.initChart2_3(iframe, steps[2]);
                    break;
                case '2_4':
                    charts.initChart2_4(iframe, steps[2]);
                    break;
                case '2_5':
                    charts.initChart2_5(iframe, steps[2]);
                    break;
                case '2_6':
                    charts.initChart2_6(iframe, steps[2]);
                    break;
                case '2_7':
                    charts.initChart2_7(iframe, steps[2]);
                    break;
                case '2_8':
                    charts.initChart2_8(iframe, steps[2]);
                    break;
                case '2_9':
                    charts.initChart2_9(iframe, steps[2]);
                    break;
                case '2_10':
                    charts.initChart2_10(iframe, steps[2]);
                    break;
                case '2_11':
                    charts.initChart2_11(iframe, steps[2]);
                    break;
                case '2_12':
                    charts.initChart2_12(iframe, steps[2]);
                    break;
                default: //Si no hay parámetros en la URL
                    charts.initChart2_1('responsive', steps[2]);
                        break;                
            }
            isChartActive = true;
        }
    }    
}