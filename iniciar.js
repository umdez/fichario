(function() {

  var usuarios = [];
  var expirationTime = 1;

  function Usuario(token, uuid, nome){
    this.token = token;
    this.uuid = uuid;
    this.refreshed = null;
    //this.expires = null;
    this.nome = nome;
    this.funcao = {"nome": null};
    this.funcao.escopos = null;
    this.refresh();
  };

}());