"use strict";
// Richieste della classe:
// Nome della classe: Spaceship
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spaceship = void 0;
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
exports.Spaceship = Spaceship;
