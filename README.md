## Cadastro de Carro

**RF**

- Deve ser possível cadastrar um novo carro
- Deve possível listar todas as categorias

**RN**

- Não deve ser possível cadastrar um carro com uma placa já existente.
- Não deve ser possível alterar a placa de um carro já cadastrado.
- O carro deve ser cadastrado, por padão, com disponibilidade.
- Somente usuário administrador pode realizar o cadastro do carro

## Listagem de carros

**RF**

- Deve ser possível listar todos carros os carros disponíveis.
- Deve ser possível fazer a listagem de carro pelo nome da categoria
- Deve ser possível fazer a listagem de carro pelo nome da marca
- Deve ser possível fazer a listagem de carro pelo nome do carro

**RN**

- Não é necessário autenticação para visualizar a listagem de carros

## Cadastro de Especificação no Carro

**RF**

- Deve ser possível cadastrar uma especificação para um carro
- Deve ser possível listar todas as especificações
- Deve ser possível listar todos os carros

**RN**

- Não deve ser possível cadastrar uma especificação para um carro
- Não deve ser possível cadastrar uma especificação para um mesmo carro
- Somente usuário administrador pode realizar o cadastro da especificação

## Cadastro de imagem do Carro

**RF**

- Deve ser possível cadastrar a imagem do carro
- Deve ser possível listar todos os carros

**RNF**

- Utilizar o multer para upload dos arquivos

**RN**

- O Usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- Somente usuário administrador pode realizar o cadastro da imagem

## Aluguel de carros

**RF**

- Deve ser possível cadastrar um aluguel

**RNF**

**RN**

- O aluguel deve ter duração minima de 24 hora
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
