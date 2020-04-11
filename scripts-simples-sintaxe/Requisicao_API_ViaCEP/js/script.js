$(document).ready(function() {
    $("#txtCep").focusout(function() {
        let cep = $("#txtCep").val();
        //Caso a entrada do CEP for digitada com "-", o CEP receberá ele mesmo e trocará o "-" por vazio.
        cep = cep.replace("-", "");
        let urlStr = "https://viacep.com.br/ws/"+ cep +"/json/";
        
        $.ajax({
            url : urlStr,
            type : "get",
            dataType : "json",
            success : function(data){
                //console.log(data);

                $("#txtCidade").val(data.localidade);
                $("#txtEstado").val(data.uf);
                $("#txtBairro").val(data.bairro);
                $("#txtRua").val(data.logradouro);
                $("#txtComplemento").val(data.complemento);
            },
            //Melhorar o tratamento de erro depois.
            error : function(erro){
                console.log(erro);
            }
        });
    });
});