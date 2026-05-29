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
// tsc <name file>.ts -w
//
// 1. Classe Genitore (Base)
var Persona = /** @class */ (function () {
    // Il Costruttore: riceve i dati quando fai "new"
    function Persona(nome, eta) {
        this.nome = nome;
        this.eta = eta;
    }
    // Un metodo pubblico (va nel prototipo)
    Persona.prototype.descrivi = function () {
        return "".concat(this.nome, " ha ").concat(this.eta, " anni.");
    };
    return Persona;
}());
// 2. Sottoclasse che EREDITA da Persona
var Dipendente = /** @class */ (function (_super) {
    __extends(Dipendente, _super);
    function Dipendente(nome, eta, ruolo, stipendioIniziale) {
        // super() chiama il costruttore di Persona per impostare nome ed eta
        var _this = _super.call(this, nome, eta) || this;
        _this.ruolo = ruolo;
        _this._stipendio = stipendioIniziale;
        return _this;
    }
    Object.defineProperty(Dipendente.prototype, "stipendio", {
        // Getter: permette di leggere lo stipendio dall'esterno in modo controllato
        get: function () {
            return "\u20AC".concat(this._stipendio);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dipendente.prototype, "aumentaStipendio", {
        // Setter: permette di modificare lo stipendio, ma facendo un controllo di sicurezza!
        set: function (importo) {
            if (importo > 0) {
                this._stipendio += importo;
            }
            else {
                console.log("Errore: L'aumento deve essere positivo!");
            }
        },
        enumerable: false,
        configurable: true
    });
    // Polimorfismo: Sovrascriviamo il metodo descrivi() del genitore
    Dipendente.prototype.descrivi = function () {
        // Usiamo super.descrivi() per prendere il vecchio testo e aggiungerne altro
        return "".concat(_super.prototype.descrivi.call(this), " Lavora come ").concat(this.ruolo, ".");
    };
    return Dipendente;
}(Persona));
// --- UTILIZZO DEL CODICE ---
// Creiamo un'istanza (un oggetto reale nell'Heap)
var impiegato1 = new Dipendente("Marco", 30, "Developer", 2000);
console.log(impiegato1.descrivi());
// Output: "Marco ha 30 anni. Lavora come Developer."
// Proviamo ad accedere a una proprietà privata
// console.log(impiegato1._stipendio); // ❌ ERRORE DI COMPILAZIONE TS: è privato!
// Usiamo il Getter e il Setter (si usano come proprietà normali, senza parentesi)
console.log(impiegato1.stipendio); // Output: €2000 (Usa il getter)
impiegato1.aumentaStipendio = 500; // Usa il setter per fare il calcolo internamente
console.log(impiegato1.stipendio); // Output: €2500
// --------------------------
var Employee = /** @class */ (function () {
    function Employee(initialSalary) {
        this._salary = initialSalary;
    }
    Object.defineProperty(Employee.prototype, "salary", {
        // The public "window" to read the data safely
        get: function () {
            return this._salary; // No conflict, no infinite loop!
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var emp = new Employee(2000);
console.log("emp", emp.salary); // Under the hood, this calls the getter, which returns _salary
