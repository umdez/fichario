(function() {

  var usuarios = [];
  var expirationTime = 1;

  function Usuario(opcoes){
    this.token = opcoes.token;
    this.uuid = opcoes.uuid;
    this.refreshed = null;
    //this.expires = null;
    this.nome = opcoes.nome;
    this.funcao = {"nome": null};
    this.funcao.escopos = null;
    //this.refresh();
  };

  module.exports.adicUsuario = function(opcoes) {
    //removeUserByUsername(username);
    var usuario = new Usuario(opcoes);
    usuarios.push(usuario);
    return usuario;
  };

}());