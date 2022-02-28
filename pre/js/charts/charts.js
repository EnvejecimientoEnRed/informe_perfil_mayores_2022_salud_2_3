//Desarrollo de las visualizaciones
//import * as d3 from 'd3';
//import { numberWithCommas2 } from './helpers';
//import { getInTooltip, getOutTooltip, positionTooltip } from './modules/tooltip';
import { setChartHeight } from '../modules/height';
import { setChartCanvas, setChartCanvasImage } from '../modules/canvas-image';
import { setRRSSLinks } from '../modules/rrss';
import { setFixedIframeUrl } from './chart_helpers';

export function initChart2_1(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Evolución de la esperanza de vida al nacimiento por sexo, 1908-20XX';
    document.getElementById('subtitle').textContent = 'Figura 2.1. Evolución en años.';
    document.getElementById('data-source').textContent = 'Human Mortality Database, INE (Tablas de mortalidad)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('evolucion_esperanza_vida_nacimiento');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('evolucion_esperanza_vida_nacimiento');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('evolucion_esperanza_vida_nacimiento');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart2_2(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Evolución de la esperanza de vida a los 65 años por sexo en España, 1908-20XX';
    document.getElementById('subtitle').textContent = 'Figura 2.2. Evolución en años.';
    document.getElementById('data-source').textContent = 'Human Mortality Database, INE (Tablas de mortalidad)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('evolucion_esperanza_vida_65');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('evolucion_esperanza_vida_65');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('evolucion_esperanza_vida_65');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart2_3(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Comparativa de la esperanza de vida a los 65 años por edad en la Unión Europea, 20XX';
    document.getElementById('subtitle').textContent = 'Figura 2.3. En años';
    document.getElementById('data-source').textContent = 'Eurostat';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('esperanza_vida_65_europa');

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
}

export function initChart2_4(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Evolución de la esperanza de vida saludable a los 65 años respecto al total de esperanza de vida en España por sexo, 2004-20XX';
    document.getElementById('subtitle').textContent = 'Figura 2.4. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'Eurostat (Encuesta de Condiciones de Vida, SILC)';
    document.getElementById('data-note').textContent = 'En 2008 hay ruptura metodológica.';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('evolucion_edv_saludable');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('evolucion_edv_saludable');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('evolucion_edv_saludable');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart2_5(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Tasas de morbilidad hospitalaria por sexo y grupo de edad en España, 20XX';
    document.getElementById('subtitle').textContent = 'Figura 2.5. Tasas por cada 100.000 habitantes.';
    document.getElementById('data-source').textContent = 'INE (Encuesta de morbilidad hospitalaria)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('morbilidad_hospitalaria_espana');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('morbilidad_hospitalaria_espana');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('morbilidad_hospitalaria_espana');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart2_6(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Personas con enfermedades crónicas por sexo y grupo de edad en España, 20XX';
    document.getElementById('subtitle').textContent = 'Figura 2.6. Datos en porcentajes. Por tipo de enfermedad.';
    document.getElementById('data-source').textContent = 'INE (Encuesta Nacional de Salud; Problemas o enfermedades crónicas o de larga evolución padecidas en los últimos 12 meses y diagnosticados por un médico)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('enfermedades_cronicas_espana');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('enfermedades_cronicas_espana');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('enfermedades_cronicas_espana');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart2_7(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Adultos con obesidad por sexo y grupo de edad en España, 20XX';
    document.getElementById('subtitle').textContent = 'Figura 2.7. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'INE (Encuesta Nacional de Salud)';
    document.getElementById('data-note').textContent = 'El índice de masa corporal para obesidad es de >= 30 kg/m2.';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('obesidad_espana');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('obesidad_espana');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('obesidad_espana');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart2_8(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Tasas de mortalidad por sexo y grupo de edad en España, 20XX';
    document.getElementById('subtitle').textContent = 'Figura 2.8. Tasas por cada 100.000 habitantes.';
    document.getElementById('data-source').textContent = 'INE (Defunciones según la causa de muerte)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('mortalidad_sexo_edad_espana');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('mortalidad_sexo_edad_espana');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('mortalidad_sexo_edad_espana');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart2_9(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Tasas de mortalidad de la población de 65 y más años por tipo de causa en España. Comparativa 2006-2018';
    document.getElementById('subtitle').textContent = 'Figura 2.9. Tasas por cada 100.000 habitantes.';
    document.getElementById('data-source').textContent = 'INE (Defunciones según la causa de muerte)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('comparativa_mortalidad_65');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('comparativa_mortalidad_65');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('comparativa_mortalidad_65');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart2_10(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Distribución porcentual de las defunciones por tipo de causa y grupo de edad en España, 20XX. Comparativa por sexo';
    document.getElementById('subtitle').textContent = 'Figura 2.10. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'INE (Defunciones según la causa de muerte)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('distribucion_porc_muertes_sexo');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('distribucion_porc_muertes_sexo');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('distribucion_porc_muertes_sexo');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart2_11(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Distribución porcentual del estado de salud percibido por sexo y grupo de edad en España, 2017';
    document.getElementById('subtitle').textContent = 'Figura 2.11. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'INE (Encuesta Nacional de Salud)';
    document.getElementById('data-note').textContent = 'Indicar aquí cómo es la pregunta concreta que se realiza.';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('distribucion_estado_salud_percibida');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('distribucion_estado_salud_percibida');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('distribucion_estado_salud_percibida');
    });

    //Altura del frame
    setChartHeight(iframe);
}