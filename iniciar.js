(function() {

  var usuarios = [];
  var horaDeExpiracao = 1;

  function Usuario(opcoes) {
    this.token = opcoes.token;
    this.uuid = opcoes.uuid;
    this.expirar = new Date();
    this.jid = opcoes.jid;
    this.estatos = opcoes.estatos;
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

  module.exports.adicEscopo = function(token, escopo) {
    var usuario = buscarUsuarioPeloToken(token);
    if(usuario != undefined){
      usuario.funcao.escopos[escopo.nome] = escopo;
    }
  };

  module.exports.limparEscopos = function(token) {
    var usuario = buscarUsuarioPeloToken(token);
    if(usuario != undefined){
      usuario.funcao.escopos = [];
    }
  };

  module.exports.sePossuiEscopo = function(token, modelo, permissao) {
    var usuario = buscarUsuarioPeloToken(token);
    if(usuario != undefined){
      if (usuario.funcao && usuario.funcao.escopos && usuario.funcao.escopos[modelo]) {
        var bandeira = usuario.funcao.escopos[modelo].bandeira;
        return (bandeira & permissao);
      }
    }
    return false;
  };

  module.exports.sePossuiEstatos = function(token, estatos) {
    var usuario = buscarUsuarioPeloToken(token);
    if(usuario != undefined){
      var bandeira = usuario.estatos;
      return (bandeira & estatos);
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

  module.exports.removerFicha = function(token) {
    usuarios = usuarios.filter(function(ficha){
      return (ficha.token != token);
    });
  };

  module.exports.setaHoraDeExpiracao = function(minutos) {
    horaDeExpiracao = minutos;
  };

}());