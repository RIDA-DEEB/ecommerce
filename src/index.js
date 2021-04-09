import "./css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min";
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch';


$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('.add-to-cart-btn').click(function () {
        alert('the product is added to the shoppping cart')
    }
    );
    $('.product-option input[type="radio"]').change(function () {
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    }
    );
    $('#add-icon').click(function () {
        alert('the product is added to the shoppping cart')
    }
    );


    //product change price
    $('[data-product-quantity]').on('change', function () {
        var newQuantity = $(this).val();
        var parent = $(this).parents('[data-product-info]');
        var pricePerUnit = parent.attr('data-product-price');
        var totalPriceForProduct = newQuantity * pricePerUnit;
        parent.find('.total-price-for-product').text(totalPriceForProduct + '$');
        calculateTotalPrice();
    });
    $('[data-remove-from-cart]').on('click', function () {
        $(this).parents('[data-product-info]').remove();
        calculateTotalPrice();
    });




    function calculateTotalPrice() {
        var totalPriceForAllProduct = 0;
        $('[data-product-info]').each(function () {
            var pricePerUnit = $(this).attr('data-product-price');
            var quantity = $(this).find('[data-product-quantity]').val();
            var totalPriceForProduct = pricePerUnit * quantity;
            totalPriceForAllProduct = totalPriceForAllProduct + totalPriceForProduct;
        }
        );
        $('#total-price-for-all-product').text(totalPriceForAllProduct + '$');

    }
    var citiesByCountries = {
        lb: ['zahleh', 'beirut', 'tripoli', 'sour', 'saida', 'jbiel', 'bekaa'],
        eg: ['alexanderia', 'cairo', 'giza', 'suez', 'sharqia'],
        jd: ['aman', 'zarqa', 'balqa', 'karak'],
        sy: ['damascus', 'aleppo', 'latakia', 'homos', 'hama']
    };
    $('#form-checkout select[name="country"]').on('change', function () {
        var country = $(this).val();
        var cities = citiesByCountries[country];
        $('#form-checkout select[name="city"]').empty();
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">your country</option>'
        );
        cities.forEach(function (city) {
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        });


    });
    $('#form-checkout input[name="payment_method"]').on('change', function () {
        var paymentMethod = $(this).val();
        if (paymentMethod === 'on-delivery') {
            $('#credit-card-info input').prop('disabled', true);
        }
        else {
            $('#credit-card-info input').prop('disabled', false);
        }
        $('#credit-card-info input').toggle();
    });
    $(function () {
        $("#price-range").slider({
            range: true,
            min: 30,
            max: 500,
            step: 5,
            values: [75, 300],
            slide: function (event, ui) {
                $('#price-min').text(ui.values[0]);
                $('#price-max').text(ui.values[1]);
            }
        });
    });

});