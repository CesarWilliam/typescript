// ======= Classe ======= //
// classe no es6 é um detalhe de sintaxe, é uma forma diferente de escrever uma função voltada a orientação a objeto
// Ex:

class Data {
    dia: number;
    mes: number;
    ano: number;

    constructor(dia: number = 1, mes: number = 1, ano: number = 1970) {
        this.dia = dia;
        this.mes = mes; 
        this.ano = ano;
    }
}

const aniversario = new Data(3, 11, 1991);
console.log(aniversario);

const dataCasamento = new Data // caso não passe nenhum parâmetro é possível omitir o "()"
console.log(dataCasamento); 

// Exemplo anterior, mas de forma simplificada utilizando o "public", assim não precisa repetir o mesmo código dentro do construtor:
class Data2 {
    constructor(
        public dia: number = 1, 
        public mes: number = 1, 
        public ano: number = 1970
    ) { }
}

const aniversario2 = new Data2(1, 4, 1997);
console.log(aniversario2);


// ======= Classes e métodos ======= //
// é possível criar uma classe com um método dentro da mesma, assim chamando esse método quando quiser
// Ex:
class Produto {
    constructor(
        public nome: string,
        public preco: number,
        public desconto: number = 0
    ) {}

    public resumo(): string {
        return `${this.nome} custa R$${this.precoComDesconto()} (${this.desconto * 100}% off)`;
    }

    // também é public mesmo não declarando o "public"
    precoComDesconto(): number {
        return this.preco * (1 - this.desconto);
    }
}

const prod1 = new Produto('Caneta Bic Preta', 4.20);
prod1.desconto = 0.06;
console.log(prod1.resumo());


// ======= Modificadores de acesso ======= //
// tipos: 
// - public: visivel para todos e transmitido por herança
// - protected: visivel para classe e transmitido por herança (igual o private + transmitido por herança)
// - private: visivel apenas dentro da classe e NÃO transmitido por herança
// Ex:
class Carro {
    private velocidadeAtual: number = 0; // apenas a classe "Carro" tem o controle dessa variável, pois a mesma é privada

    constructor(
        public marca: string,
        public modelo: string,
        private velocidadeMaxima: number = 200  
    ) { }

    // private alterarVelocidade(delta: number): string {
    protected alterarVelocidade(delta: number): string {
        const novaVelocidade: number = this.velocidadeAtual + delta;
        const velocidadeValida: boolean = novaVelocidade >= 0
            && novaVelocidade <= this.velocidadeMaxima

        if (velocidadeValida) {
            this.velocidadeAtual = novaVelocidade;
        }
        else {
            this.velocidadeAtual = delta > 0 ? this.velocidadeMaxima : 0;
        }

        return `Velocidade atual do ${this.modelo}: ${this.velocidadeAtual}`;
    }

    public acelerar(): string {
        return this.alterarVelocidade(5);
    }

    public frear(): string {
        return this.alterarVelocidade(-5);
    }
}

const carro1 = new Carro('Ford', 'Ka', 185);
console.log(carro1.acelerar());
console.log(carro1.acelerar());
console.log(carro1.acelerar());

// ======= Herança ======= //
// reeutiliza os códigos de uma classe em outra
// utiliza a propriedade 'extends'
// por padrão métodos e variáveis 'private' não podem ser acessados diretamente por herança
// o "protected" permite esse acessso direto por herança, e funciona da mesma forma que um 'private'
// transmitido por herança é quando outra classe consegue além de ler, passar valores para métodos 
// Ex:
class Ferrari extends Carro {
    constructor( // quando é criado um novo construtor em uma classe que contém herança, é necessário o uso do "Super" e passar os parametros para que o construtor da classe pai seja executado
        modelo: string,
        velocidadeMaxima: number
    ) { 
        super('Ferrari', modelo, velocidadeMaxima);
    }
    public acelerar(): string {
        return this.alterarVelocidade(20);
    }

    public frear(): string {
        return this.alterarVelocidade(-15);
    }
}

const f40 = new Ferrari('F40', 324);
console.log(`${f40.marca} ${f40.modelo}`);
console.log(f40.acelerar());


// ======= Getters & Setters ======= //
// propriedade de 'get' e 'set' de atributos
// não é ncessário criar um nome para o método, ele executa a função get ou set a partir do que foi configurado 
// são métodos, mas não são acessados como atributos
// Ex:
/*
class Pessoa {
    private _idade: number = 0;

    get idade(): number {
        return this._idade;
    }

    set idade(valor: number) {
        if (valor >= 0 && valor <=  120) {
            this._idade = valor;
        }
    }
}

const pessoa1 = new Pessoa;
console.log(pessoa1);
pessoa1.idade = 10;
console.log(pessoa1);
console.log(pessoa1.idade); */


// ======= Membros estáticos ======= //
// quando um atributo é estático, quer dizer que o seu valor é associado a classe e não a cada instância
// com o static é possível acessar o método dentro da classe sem criar uma instância
// quando o atributo e o método estão 'static', quer dizer que ambos estão no nível de acesso da classe e não de cada instância
// Ex:
class Matematica {
    static PI: number = 3.1416;

    static areaCirc(raio: number): number {
        return this.PI * raio * raio;
    }
}

console.log(Matematica.areaCirc(4));


// ======= Classe abstrata ======= //
// não pode ser instanciada
// uma classe abstrata é feita para ser herdada
// Ex:
abstract class Calculo {
    protected resultado: number = 0;

    abstract executar (...numeros: number[]): void // método abstrato

    getResultado(): number {
        return this.resultado;
    }
}

class Soma extends Calculo {
    executar (...numeros: number[]): void {
        this.resultado = numeros.reduce((total, valorAtual) => total + valorAtual);
    }
}

class Multiplicacao extends Calculo {
    executar (...numeros: number[]): void {
        this.resultado = numeros.reduce((total, valorAtual) => total * valorAtual);
    }
}

let c1 = new Soma;
c1.executar(2, 3, 4, 5);
console.log(c1.getResultado());


// ======= Construtor privado & Singleton ======= //
// Singleton é quando você quer trabalhar apenas um uma instância
// Ex:
class Unico {
    private static instance: Unico = new Unico;
    private constructor() {}

    static getInstance(): Unico {
        return Unico.instance;
    }

    agora() {
        return new Date;
    }
}

console.log(Unico.getInstance().agora());


// ======= Somente Leitura ======= //
// readonly - utilizado para propriedades de somente leitura
// Ex:
class Aviao {
    public readonly modelo: string

    constructor(
        modelo: string,
        public readonly prefixo: string
    ) {
        this.modelo = modelo;
    }
}

const turboHelice = new Aviao('Tu-114', 'PT-ABC');
// turboHelice.modelo = 'DC-8'; gera erro pois modelo é apenas para leitura




// Exercício 1 - Classe
// function Moto(nome) {
//     this.nome = nome
//     this.velocidade = 0
 
//     this.buzinar = function() {
//         console.log('Toooooooooot!')
//     }
 
//     this.acelerar= function(delta) {
//         this.velocidade = this.velocidade + delta
//     }
// }

// var moto = new Moto('Ducati')
// moto.buzinar()
// console.log(moto.velocidade)
// moto.acelerar(30)
// console.log(moto.velocidade)

class Moto {
    public velocidade: number = 0;

    // constructor (nome: string) {}
    
    buzinar(): void {
        console.log('Toooooooooot!')
    }

    acelerar(delta: number): void {
        this.velocidade = this.velocidade + delta
    }
}
 
// Exercício 2 - Herança
// var objeto2D = {
//     base: 0,
//     altura: 0
// }
 
// var retangulo = Object.create(objeto2D)
// retangulo.base = 5
// retangulo.altura = 7
// retangulo.area = function() {
//     return this.base * this.altura
// }
// console.log(retangulo.area())

abstract class Objeto2D {
    public base: number = 0;
    public altura: number = 0;

    abstract area(): number
}

class Retangulo extends Objeto2D {
    area(): number {
        return this.base * this.altura;
    }
}
 
// Exercício 3 - Getters & Setters
// var estagiario = {
//     _primeiroNome: ''
// }
 
// Object.defineProperty(estagiario, 'primeiroNome', {
//     get: function () {
//         return this._primeiroNome
//     },
//     set: function (valor) {
//         if (valor.length >= 3) {
//             this._primeiroNome = valor
//         } else {
//             this._primeiroNome = ''
//         }
//     },
//     enumerable: true,
//     configurable: true
// })
 
// console.log(estagiario.primeiroNome)
// estagiario.primeiroNome = 'Le'
// console.log(estagiario.primeiroNome)
// estagiario.primeiroNome = 'Leonardo'
// console.log(estagiario.primeiroNome)

class Estagiario {
    private _primeiroNome: string = '';

    get primeiroNome() {
        return this._primeiroNome;
    }

    set primeiroNome(valor) {
        if (valor.length >= 3) {
            this._primeiroNome = valor;
        } else {
            this._primeiroNome = '';
        }
    }
}