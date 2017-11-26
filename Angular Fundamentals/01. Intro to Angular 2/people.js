"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
function people() {
    var Employee = /** @class */ (function () {
        function Employee(name, age) {
            var _newTarget = this.constructor;
            this.name = name;
            this.age = age;
            this.tasks = [];
            this.salary = 0;
            this.dividend = 0;
            if (_newTarget === Employee) {
                throw new Error('Cannot instantiate Employee');
            }
        }
        Employee.prototype.work = function () {
            var currentTask = this.tasks.shift() || '';
            console.log(this.name + " " + currentTask);
            this.tasks.push(currentTask);
        };
        Employee.prototype.collectSalary = function () {
            var bonuses = this.dividend !== 0 ? this.dividend : 0;
            console.log(this.name + " received " + (this.salary + bonuses));
        };
        return Employee;
    }());
    var Junior = /** @class */ (function (_super) {
        __extends(Junior, _super);
        function Junior(name, age) {
            var _this = _super.call(this, name, age) || this;
            _this.tasks.push('is working on a simple task.');
            return _this;
        }
        return Junior;
    }(Employee));
    var Senior = /** @class */ (function (_super) {
        __extends(Senior, _super);
        function Senior(name, age) {
            var _this = _super.call(this, name, age) || this;
            _this.tasks.push('is working on a complicated task.');
            _this.tasks.push('is taking time off work.');
            _this.tasks.push('is supervising junior workers.');
            return _this;
        }
        return Senior;
    }(Employee));
    var Manager = /** @class */ (function (_super) {
        __extends(Manager, _super);
        function Manager(name, age) {
            var _this = _super.call(this, name, age) || this;
            _this.tasks.push('scheduled a meeting.');
            _this.tasks.push('is preparing a quarterly report.');
            return _this;
        }
        return Manager;
    }(Employee));
    return {
        Junior: Junior,
        Senior: Senior,
        Manager: Manager
    };
}
var instance = people();
var juniorDev = new instance.Junior('Pesho', 25);
var seniorDev = new instance.Senior('Gosho', 30);
var manager = new instance.Manager('Stamat', 40);
console.log(juniorDev, seniorDev, manager);
