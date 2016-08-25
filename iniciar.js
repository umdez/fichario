(function() {

  var usuarios = [];
  var horaDeExpiracao = 1;

  function Usuario(opcoes) {
    this.token = opcoes.token;
    this.uuid = opcoes.uuid;
    this.expirar = new Date();
    this.jid = opcoes.jid;
    this.funcao = {
      'nome': opcoes.funcao
    , 'escopos': []
    };
  };

  Usuario.prototype.seValido = function() {
    if(this.token == undefined){
      return false;
    } else{
      var exp = new Date(this.expirar.getTime());

      exp.setMinutes(exp.getMinutes() + horaDeExpiracao);

      return (exp.getTime() >= (new Date()).getTime());
    }
  };

  Usuario.prototype.adicEscopo = function(escopo) {
    this.funcao.escopos[escopo.nome] = escopo;
  };

  setInterval(function(){
    usuarios = usuarios.filter(function(item){
      return item.seValido();
    });
  }, 10*60*1000);

  var buscarUsuarioPeloToken = function (token){
    var resultado = usuarios.slice(0);
    resultado = resultado.filter(function(item){
      return (item.token == token);
    });
    return resultado[0];
  };

  module.exports.sePossuiPermissao = function(token, modelo, permissao) {
    var usuario = buscarUsuarioPeloToken(token);
    if(usuario != undefined){
      if (usuario.funcao && usuario.funcao.escopos && usuario.funcao.escopos[modelo]) {
        var bandeira = usuario.funcao.escopos[modelo].bandeira;
        return (bandeira & permissao);
      }
    }
    return false;
  };

  module.exports.seTokenForValido = function(token) {
    var usuario = buscarUsuarioPeloToken(token);
    if(usuario != undefined){
      return usuario.seValido();
    }
    return false;
  }

  module.exports.adicUsuario = function(opcoes) {
    var usuario = new Usuario(opcoes);
    usuarios.push(usuario);
    return usuario;
  };

  module.exports.setaHoraDeExpiracao = function(minutos) {
    horaDeExpiracao = minutos;
  };

}());