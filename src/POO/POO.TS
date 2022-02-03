// Classes
// Forma longa de ser escrita
export class Empresa {
    public readonly nome: string;
    protected readonly colaboradores: Colaborador[] = [];
    private readonly cnpj: string;

    constructor(nome: string, cnpj: string) {
        this.nome = nome;
        this.cnpj = cnpj;
    }
    // Metodo
    adicionaColaborador(colaborador: Colaborador): void {
        this.colaboradores.push(colaborador);
    }

    mostrarColaboradores(): void{
        for(const colaborador of this.colaboradores){
            console.log(colaborador);
        }
    }
}
// Forma curta de ser escrita
export class Colaborador {
    constructor(public readonly nome: string, public readonly sobrenome: string) {

    }
}

const empresa1 = new Empresa("Udemy","11.11.11.11./0001-11");// Cria um objeto
const colaborador1 = new Colaborador("Marx", "Borges")
const colaborador2 = new Colaborador("João", "Felipe")
const colaborador3 = new Colaborador("Luan", "Silva")
empresa1.adicionaColaborador(colaborador1);
empresa1.adicionaColaborador(colaborador2);
empresa1.adicionaColaborador(colaborador3);

// Modificadores de acesso public e private
class Mod {
    public readonly nome:string; //Pode ser acessado de qualquer lugar que foi instanciado a classe
    private readonly sobrenome: string; //So pode ser acessado dentro da classe
}

// Herança
export class Pessoa {
    constructor(public nome: string, public sobrenome: string, private idade: number, protected cpf: string) {}

    getIdade(): number {
        return this.idade;
    }

    getCpf(): string {
        return this.cpf;
    }

    getNomeCompleto(): string {
        return this.nome + ' ' + this.sobrenome;
    }
}

export class Aluno extends Pessoa {}

const aluno = new Aluno("Marx", "Borges", 23, "00-00-00-00");

// Super -> Usado para acessar algo da super classe na subclasse
export class Pessoa1 {
    constructor(public nome: string){}

    getNome(): string {
        return this.nome;
    }
}

export class Cliente extends Pessoa1{
    getNome(): string {
        return super.getNome();
    }
}

const cliente = new Cliente("Marx");

// Modificador de protected -> Uma variavel do tipo protected ela pode ser acessada dentro da classe e em uma classe que erda
export class Udemy extends Empresa{
    constructor(){
        super("Udemy", "00-00-00-00");
    }

    popColaborador(): Colaborador | null{
        const colaborador = this.colaboradores.pop();
        if (colaborador) return colaborador;
        return null;
    }
}

// Getter e setters
export class Pessoa2 {
    constructor(public nome: string, public sobrenome: string, private idade: number, protected _cpf: string) {}

    set cpf(valor: string) {
        this._cpf = valor;
    }

    get cpf(): string {
        return this._cpf.replace(/\D/g, "");
    }
}

const pessoa2 = new Pessoa2("Marx", "Borges", 23, "021.025.365-85");
pessoa2.cpf = "123.456.789-88" // Usando o set
console.log(pessoa2.cpf) // Usando o get

// Atributos e métodos estáticos
export class Pessoa3 {
    static idadePadrao = 0;
    static cpfPadrao = "000.000.000-00";

    constructor(public nome: string, public sobrenome: string, private idade: number, protected _cpf: string) {}

    static falaOi(): void {
        console.log("Oi");
    }
}

const pessoa3 = new Pessoa3("Marx", "Borges", 23, "021.025.365-85");
Pessoa3.falaOi(); // Para utilizar um metodo static é dessa forma, voce não chama pela variavel pessoa3 e sim pelo nome da classe mesmo
Pessoa3.idadePadrao;
Pessoa3.cpfPadrao;

// Construtor privado e singleton -> Uma classe que so pode ser instanciada uma vez
export class Database {
    private static database: Database;

    private constructor(private host: string, private user: string, private password: string) {}

    connect(): void {
        console.log(`Conectado: ${this.host}, ${this.user}, ${this.password}`);
    }
    
    static getDatabase(host: string, user: string, password: string): Database{
        if(Database.database) return Database.database;
        Database.database = new Database(host, user, password);
        return Database.database;
    }
}


const db1 = Database.getDatabase("localhost", "root", "123456");

// Classes, métodos e atributos abstratos
// Abstract -> Uma classe sendo abstrata signifca meio que um contrato, ela não pode ser instanciada e pode ser herdada, e um metod ou atributo
// abstrato não precisa de corpo, mas é obrigado que ele seja criado em uma subclasse
export abstract class Personagem {
    protected abstract emoji: string;

    constructor(protected nome: string, protected ataque: number, protected vida: number) {}

    atacar(personagem: Personagem): void {
        this.bordao();
        personagem.perderVida(this.ataque);
    }

    perderVida(forcaAtaque: number): void {
        this.vida -= forcaAtaque;
        console.log(`${this.nome} agora tem ${this.vida} de vida...`)
    }

    abstract bordao();
}

class Guerreira extends Personagem {
    protected emoji = "Guerreira";

    bordao(): void {
        console.log("GUERREIRAAAA AOOOO ATAAQUEEE!!!");
    }
}
class Monstro extends Personagem {
    protected emoji = "Monstrooo";

    bordao(): void {
        console.log("MONSTROOOO AOOOO ATAAQUEEE!!!");
    }
}

const guerreira = new Guerreira("Guerreira", 100, 1000);
const monstro = new Monstro("Monstro", 87, 1000);

guerreira.atacar(monstro);
guerreira.atacar(monstro);
guerreira.atacar(monstro);
monstro.atacar(guerreira);
monstro.atacar(guerreira);
monstro.atacar(guerreira);

// Associação entre classes
export class Escritor {
    private _ferramenta: Ferramenta | null = null;
    
    constructor( private _nome: string){}

    set ferramenta(ferramenta: Ferramenta | null){
        this._ferramenta = ferramenta;
    }

    get ferramenta(): Ferramenta | null{
        return this._ferramenta;
    }

    get nome(): string{
        return this._nome;
    }

    escrever(): void {
        if (this.ferramenta === null){
            console.log("Não posso escrever sem ferramenta...");
            return;
        }
        this.ferramenta.escrever();
    }
}

export abstract class Ferramenta {
    constructor(private _nome: string) {}
    abstract escrever(): void;

    get nome(): string {
        return this._nome;
    }
}

export class Caneta extends Ferramenta {
    escrever(): void {
        console.log(`${this.nome} está escrevendo...`);
    }
}

export class MaquinaEscrever extends Ferramenta {
    escrever(): void {
        console.log(`${this.nome} esta digitando...`);
    }
}

const escritor = new Escritor("Marx");
const caneta = new Caneta("Bic");
const maquinaEscrever = new MaquinaEscrever("Maquina");

// Agregação entre classes
export class CarrinhoDeCompras {
    private readonly produtos: Produto[] = [];

    inserirProdutos(...produtos: Produto[]): void {
        for( const produto of produtos){
            this.produtos.push(produto);
        }
    }

    quantidadeProdutos(): number {
        return this.produtos.length;
    }

    valorTotal(): number {
        return this.produtos.reduce((soma,produto1) => soma + produto1.preco, 0);
    }
}

export class Produto {
    constructor(public nome: string, public preco: number) {}
}

const produto1 = new Produto("Camiseta", 49.9);

const carrinhoDeCompras = new CarrinhoDeCompras();
carrinhoDeCompras.inserirProdutos(produto1);

// Composição entre classes -> Estou chamando metodos de uma classe dentro de outra classe
export class Carro {
    private readonly motor = new Motor();

    ligar(): void {
        this.motor.ligar;
    }

    acelerar(): void {
        this.motor.acelerar;
    }

    parar(): void {
        this.motor.parar;
    }

    desligar(): void {
        this.motor.desligar
    }
}

export class Motor {
    ligar(): void {
        console.log("Motor esta ligado..");
    }

    acelerar(): void {
        console.log("Motor esta acelerando..");
    }

    parar(): void {
        console.log("Motor esta parado..");
    }

    desligar(): void {
        console.log("Motor esta desigado..");
    }
}

const carro = new Carro();

// Implementando type alias em classes
type TipoNome = {
    nome: string;
}

type TipoSobrenome = {
    sobrenome: string;
}

type TipoNomeCompleto = {
    nomeCompleto(): string;
}

export class Pessoa4 implements TipoNome, TipoSobrenome, TipoSobrenome{

    constructor(public nome: string, public sobrenome: string) {}

    nomeCompleto(): string {
        return this.nome + ' ' + this.sobrenome;
    }
}

const pessoa = new Pessoa4("Marx", "Borges");

// Interfaces
interface TipoNome1 {
    nome: string;
}

interface TipoSobrenome1 {
    sobrenome: string;
}

interface TipoNomeCompleto1 {
    nomeCompleto(): string;
}

type TipoPessoa = TipoNome1 & TipoSobrenome1 & TipoNomeCompleto1; // Não funcionar quando os campos da direito é uma interface
interface TipoPessoa1 extends TipoNome1, TipoSobrenome1, TipoNomeCompleto1 {}

export class Pessoa5 implements TipoPessoa1 {

    constructor(public nome: string, public sobrenome: string) {}

    nomeCompleto(): string {
        return this.nome + ' ' + this.sobrenome;
    }
}