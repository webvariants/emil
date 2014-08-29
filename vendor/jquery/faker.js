$(document).ready(function(){

    $('.nav-table-cell #configuration').click(function() {
        $('.nav-table-cell.configuration').toggleClass('open');
        $('.nav-table-cell #configuration .icon').toggleClass('icon-64-interface-arrow-bottom');
        $('.nav-table-cell #configuration .icon').toggleClass('icon-62-interface-arrow-top');
    });


    $('.header #info-button').click(function() {
        $('.view #info-panel').toggleClass('shown');
    });

    $('.switch').click(function(){

        $('#ntp').toggleClass('shown');
        $('#timezone').toggleClass('shown');
        $('#time').toggleClass('shown');
        $('#date').toggleClass('shown');
    });

}); // End ready()