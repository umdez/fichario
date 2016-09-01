Já que não é uma boa opção mantermos esse tipo de informação nos tokens (JWT), então tive que adicionar este projeto. Com ele, todos usuários possuirão uma ficha com informações sensiveis de escopos e todo o resto necessário.

## Como funciona
Abaixo informo os métodos básicos necessários para a criação de uma ficha.

```javascript
var fichario = require('fichario');

// Logo após, nós precisaremos informar um horário (em minutos) para expirar os dados.
// Este é um valor global e opcional e só é necessário informar uma vez.
fichario.setaHoraDeExpiracao(15); 

// Criamos uma ficha para o usuário onde ele será identificado pelo token.
var ficha = fichario.adicUsuario({
    'token': token
  , 'uuid': uuid
  , 'jid': 'usuario@localhost'
  , 'estatos': 0x00000001  // Verificado? Bloqueado?
  , 'funcao': {
      'nome': 'Gerente',
      'escopos': [] 
  }
});

// Podemos adicionar cada um dos escopos que este usuário tem.
// Cada escopo possui informações como a bandeira de acesso.
ficha.adicEscopo({
  'id': 1
, 'nome': 'USUARIOS'      // Um nome de uma tabela qualquer.
, 'bandeira': 0x00000001  // (Criar|Deletar|Acessar|Atualizar)
});
```

## Proteção de Escopos
Após adicionar a ficha do usuario, nós podemos realizar a verificação de escopos para protegermos rotas do [Restificando](https://github.com/umdez/restificando/).

```javascript
// Agora podemos verificar as credenciais de acessos a escopos protegidos.
var sePermitido = (ficha.sePossuiEscopo(token, modelo, permissao) != 0);
```

## Estatos de determinada conta de usuario
Caso seja necessário realizar a verificação do estatos atual do usuario nós podemos utilizar um verificador de estatos. Abaixo temos
um exemplo:
```javascript
var seTiverUmEstatos = (ficha.sePossuiEstatos(token, estatos) != 0);
```

## Créditos
- Todos os contribuidores do projeto [api-token](https://github.com/laardee/api-token), pois ele foi uma fonte de inspiração.
- Todos os contribuidores da [Devowly Sistemas](https://github.com/orgs/devowly/people).
