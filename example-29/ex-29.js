// Richieste della classe:
// Nome della classe: Spaceship
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Proprietà private:
// _name (una stringa con il nome della nave).
// _fuel (un numero che rappresenta la percentuale di carburante rimasta, parte da 100).
// _speed (un numero che rappresenta la velocità attuale, parte da 0).
// Il Costruttore:
// Deve ricevere solo il nome dell'astronave quando viene creata (es: new Spaceship("Apollo")) e assegnarlo alla proprietà privata.
// I Getter:
// Crea un getter per leggere il nome (name).
// Crea un getter per leggere il carburante (fuel) che restituisca una stringa formattata (es: "80%").
// Crea un getter per leggere la velocità (speed).
// Il Setter:
// Crea un setter chiamato speed.
// Controllo di sicurezza (Validazione): Non si può impostare una velocità negativa! Se l'utente prova a inserire un numero minore di 0, stampa un errore in console e non modificare la velocità attuale.
// I Metodi normali:
// Crea un metodo chiamato travel. Questo metodo non riceve parametri, ma ogni volta che viene chiamato deve ridurre il carburante di 10 e aumentare la velocità attuale di 50.
// Crea un metodo chiamato refuel. Questo metodo deve ricevere un oggetto come parametro: { amount: number }. Questo metodo deve aumentare il carburante della quantità ricevuta (ma ricorda che il carburante massimo non può superare 100!).
var Spaceship = /** @class */ (function () {
    function Spaceship(initName) {
        this._fuel = 100;
        this._speed = 0;
        this._name = initName;
    }
    Object.defineProperty(Spaceship.prototype, "name", {
        //   GETTER
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Spaceship.prototype, "currentFuel", {
        get: function () {
            return "".concat(this._fuel, "%");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Spaceship.prototype, "currentSpeed", {
        get: function () {
            return this._speed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Spaceship.prototype, "speed", {
        //   SETTER
        set: function (newSpeed) {
            if (newSpeed < 0) {
                console.log("The speed number must be a positive number");
            }
            else {
                this._speed = newSpeed;
            }
        },
        enumerable: false,
        configurable: true
    });
    // METHODS
    Spaceship.prototype.travel = function () {
        if (this._fuel < 10) {
            console.log("Not enough fuel to travel!");
            return;
        }
        this._fuel = this._fuel - 10;
        this._speed = this._speed + 50;
    };
    Spaceship.prototype.refuel = function (payload) {
        if (payload.amount < 0) {
            return;
        }
        var newRefuel = payload.amount + this._fuel;
        this._fuel = newRefuel > 100 ? 100 : newRefuel;
    };
    return Spaceship;
}());
console.log("#------------------------");
// ***************
// L'Esercizio: Il Processore di Pagamenti E-Commerce
// Devi progettare l'architettura per un sistema che accetta diversi metodi di pagamento (Carta di Credito e PayPal) e che applica una tassa di conversione fissa per i pagamenti internazionali.
// Parte 1: La Classe Statica (CurrencyConverter)
// Crea una classe normale chiamata CurrencyConverter che funga da scatola degli attrezzi.
// Deve avere una proprietà statica e pubblica chiamata USD_TO_EUR impostata sul valore fisso di 0.92.
// Deve avere un metodo statico e pubblico chiamato convertToEur. Questo metodo deve ricevere un importo in dollari (amountInUsd: number) e restituire il valore convertito in Euro (moltiplicando l'importo per il tasso USD_TO_EUR).
// Parte 2: La Classe Astratta (PaymentMethod)
// Crea una classe astratta chiamata PaymentMethod. Questa classe è il modello base per tutti i tipi di pagamento.
// Proprietà del Costruttore: Deve ricevere e inizializzare una proprietà pubblica amount (l'importo in Euro).
// Metodo normale: Crea un metodo pubblico chiamato printReceipt. Questo metodo deve stampare in console un messaggio generico: "Receipt printed for the amount of €[amount]".
// Metodo Astratto: Crea un metodo astratto e pubblico chiamato processPayment. Questo metodo non deve avere il corpo {} e non deve restituire nulla (void).
// Parte 3: Le Sottoclassi Reali (CreditCard e PayPal)
// Crea due classi che estendono la classe astratta PaymentMethod:
// CreditCardPayment:
// Deve implementare il metodo astratto processPayment().
// Il metodo deve stampare in console: "Processing Credit Card payment of €[amount]...".
// PayPalPayment:
// Deve implementare il metodo astratto processPayment().
// Il metodo deve stampare in console: "Redirecting to PayPal for the amount of €[amount]...".
var CurrencyConverter = /** @class */ (function () {
    function CurrencyConverter() {
    }
    CurrencyConverter.convertToEur = function (amountInUsd) {
        return amountInUsd * this.USD_TO_EUR;
    };
    CurrencyConverter.USD_TO_EUR = 0.92;
    return CurrencyConverter;
}());
//
// Abstract class is not possible to inizialize the class with 'new' Class
var PaymentMethod = /** @class */ (function () {
    function PaymentMethod(initAmount) {
        this.amount = initAmount;
    }
    PaymentMethod.prototype.printReceipt = function () {
        console.log("Receipt printed for the amount of \u20AC".concat(this.amount));
    };
    return PaymentMethod;
}());
//
var CreditCardPayment = /** @class */ (function (_super) {
    __extends(CreditCardPayment, _super);
    // In this case 'super' is redundant because there is not new parameters for 'constructor'
    function CreditCardPayment(amount) {
        return _super.call(this, amount) || this;
    }
    CreditCardPayment.prototype.processPayment = function () {
        console.log("Processing Credit Card payment of \u20AC".concat(this.amount, "..."));
    };
    return CreditCardPayment;
}(PaymentMethod));
//
var PayPalPayment = /** @class */ (function (_super) {
    __extends(PayPalPayment, _super);
    function PayPalPayment(amount) {
        return _super.call(this, amount) || this;
    }
    PayPalPayment.prototype.processPayment = function () {
        console.log("Redirecting to PayPal for the amount of \u20AC".concat(this.amount, "..."));
    };
    return PayPalPayment;
}(PaymentMethod));
// --
// 1. Testing the Static Class (No "new" constructor)
var usdAmount = 100;
var eurAmount = CurrencyConverter.convertToEur(usdAmount);
console.log(eurAmount); // Expected: 92
// 2. Testing the Abstract Class and Inheritance
// const test = new PaymentMethod(50); // ❌ This should throw an error if uncommented!
var card = new CreditCardPayment(eurAmount);
card.processPayment(); // Expected: "Processing Credit Card payment of €92..."
card.printReceipt(); // Expected: "Receipt printed for the amount of €92"
var paypal = new PayPalPayment(150);
paypal.processPayment(); // Expected: "Redirecting to PayPal for the amount of €150..."
