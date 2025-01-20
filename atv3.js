$(document).ready(function () {

    // Esconde as divs de pagamento inicialmente
    $('#divPix').hide();  // lembrar de esconder
    $('#cartaoCredito').hide();


    let formAberto = false; // boolean para formulario
    let valorOriginal = 0; // Armazena o valor inicial digitado sem desconto >> evitando o acumulo de descontos


    // Ação ao clicar no botão Informar Dados
    $('#abrirForm').click(function () {
        if ($('#valorDigitado').val().trim() !== '') {

            formAberto = true; // boolean para validar informarDados

            valorOriginal = parseFloat($('#valorDigitado').val()) || 0; // Define o valor original ao abrir
            atualizarFormularioPagamento(); // Exibe a opção de pagamento selecionada
        } else {

            alert('Por favor, preencha o campo "Valor" antes de selecionar uma forma de pagamento.');
        }
    });

    // ajustando o  campo (blur) e redefine o valor original
    $('#valorDigitado').on('blur', function () {

        if (formAberto) {
            valorOriginal = parseFloat($(this).val()) || 0;
            $(this).val(valorOriginal.toFixed(2));
            atualizarValorTotal($('input[name="opcoes-pagamento"]:checked').val());

        }
    });

    // exibindo a div selecionado
    function atualizarFormularioPagamento() {
        const opcaoSelecionada = $('input[name="opcoes-pagamento"]:checked').val();

        if (formAberto) {
            if (opcaoSelecionada === 'pix') {
                $('#divPix').fadeIn();
                $('#cartaoCredito').hide();

                //  desconto no pix
                atualizarValorTotal('pix');



            } else if (opcaoSelecionada === 'cartao') {
                $('#divPix').hide();

                $('#cartaoCredito').fadeIn();

                atualizarValorTotal('cartao');
            }
        }
    }

    function atualizarValorTotal(opcaoSelecionada) {
        const parcelas = $('#selecionarParcelas').val();
        let valorComJuros = valorOriginal;

        if (opcaoSelecionada === 'pix') {

            //  Pix desconto de 10%
            let valorComDesconto = valorOriginal - (valorOriginal * 0.10);
            $('#TotalCalculoPix').text("Total R$: " + valorComDesconto.toFixed(2));
        } else if (opcaoSelecionada === 'cartao') {

            if (parcelas === '1x' || parcelas === '2x' || parcelas === '3x') {
                valorComJuros = valorOriginal; // Sem juros

            } else if (parcelas === '4x') {
                valorComJuros = valorOriginal * 1.05; // 5% de juros

            } else if (parcelas === '5x') {
                valorComJuros = valorOriginal * 1.10; // 10% de juros

            }
            $('#TotalCalculoCartao').text("Total R$: " + valorComJuros.toFixed(2));
        }
    }

    function validandoCamposCpf() {
        const cpf = $('#cpf').val().trim(); // Obtém o valor do campo CPF
        if (cpf === '') {
            alert('Por favor, preencha o campo CPF.');
            return false; // Impede a execução de ações posteriores
        }

        return true;
    }

    function validandoCamposCartao() {
        const numero = $('#numeroCartao').val().trim();
        const nome = $('#titularCartao').val().trim();
        const csv = $('#csv').val().trim();
        const vencimento = $('#vencimento').val().trim();


        if (numero === '') {
            alert('Por favor, preencha o número do cartão');
            return false; // Impede a execução de ações posteriores
        }

        if (nome === '') {
            alert('Por favor, preencha o nome.');
            return false;
        }

        if (csv === '') {
            alert('Por favor, preencha o codigo de segurança.');
            return false;
        }

        if (vencimento === '') {
            alert('Por favor, preencha a data de vencimento.');
            return false;
        }

        return true;
    }




    // Detecta mudança na opção de pagamento
    $('input[name="opcoes-pagamento"]').change(function () {
        if (formAberto) {
            atualizarFormularioPagamento();
        }
    });

    // Detecta mudança nas parcelas
    $('#selecionarParcelas').change(function () {
        if (formAberto) {
            atualizarValorTotal('cartao');
        }
    });

    //  botão Pagar
    $('#PagarPix').click(function () {
        if (validandoCamposCpf()) { // Só prossegue se a validação retornar true
            alert("Pagamento realizado com sucesso via PIX!");

            // Reseta os valores
            $('#valorDigitado').val('');
            $('#TotalCalculoPix').text('Total R$:0.00');
            location.reload();
        }
    });

    $('#PagarCartao').click(function () {
        if (validandoCamposCartao()) {

            alert("Pagamento realizado com sucesso via Cartão de Crédito!");

            // logicazinha para resetar valores
            $('#valorDigitado').val('');
            $('#TotalCalculoCartao').text('Total R$:0.00');

            location.reload();
        }

    });

});
$(document).ready(function () {
    $('#card1').hide(); // Esconde o ícone inicialmente
    $('#card2').hide(); // Esconde o ícone inicialmente
    $('#cartaoInvalido').hide(); // Esconde a mensagem de erro inicialmente

    $('#numeroCartao').on('input', function () {
        const cardNumber = $(this).val();
        const cardIcon1 = $('#card1');
        const cardIcon2 = $('#card2');
        const cardMessage = $('#cartaoInvalido');

        // Limpa os ícones e a mensagem de erro ao começar a digitar
        cardIcon1.hide();
        cardIcon2.hide();
        cardMessage.hide();

        if (cardNumber.startsWith("1234")) {
            cardIcon1.show(); // Mostra o ícone para "1234"
        } else if (cardNumber.startsWith("4321")) {
            cardIcon2.show(); // Mostra o ícone para "4321"
        } else if (cardNumber.length >= 4) {
            //  mensagem de erro se o número não começar com "1234" nem "4321" e tiver ao menos 4 caracteres
            cardMessage.show(); // Número inválido
        }
    });
});



