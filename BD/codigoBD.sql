create database Blog;
use Blog;
create table usuario (
                      idUsuario int primary key auto_increment,
					 nome varchar (45),
                     email varchar(45) unique,
                      cpf char(11),
                      cep char(8),
                      senha varchar(45)
					  );
create table escalacaoUsuario (
							   idEscalacaoUsuario int auto_increment,
                               fkUsuario int,
                               ata varchar (45),
                               PE varchar (45),
                               PD varchar (45),
                               MEIe varchar (45),
                               MEId varchar (45),
                               VOL varchar (45),
                               latEsquerda varchar (45),
                               latDireita varchar (45),
                               zagEsquerda varchar (45),
                               zagDireita varchar (45),
                               gol varchar (45),
                               foreign key (fkUsuario) references usuario (idUsuario),
                               primary key (idEscalacaoUsuario,fkUsuario)
							  );
create table avaliacao (
idAvaliacao int auto_increment,
fkUsuario int,
valorAvalicaoGosto int,
valorAvalicaoNaoGosto int,
foreign key (fkUsuario) references usuario (idUsuario),
primary key (idAvaliacao, fkUsuario)
);
select * from usuario;
select * from escalacaoUsuario;
select * from avaliacao;
select sum(valorAvalicaoGosto) 'Votos em gostei', sum(valorAvalicaoNaoGosto) 'Votos em não gostei' from avaliacao;