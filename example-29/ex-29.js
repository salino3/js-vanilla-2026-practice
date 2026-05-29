// Richieste della classe:
// Nome della classe: Spaceship
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
var converter01 = CurrencyConverter.convertToEur(90);
console.log(converter01);
