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
function elemelons() {
    var Melon = /** @class */ (function () {
        function Melon(weight, melonSort) {
            var _newTarget = this.constructor;
            this.weight = weight;
            this.melonSort = melonSort;
            this.element = '';
            if (_newTarget === Melon) {
                throw new Error('Cannot instantiate Melon');
            }
        }
        Object.defineProperty(Melon.prototype, "elementIndex", {
            get: function () {
                return this.weight * this.melonSort.length;
            },
            enumerable: true,
            configurable: true
        });
        Melon.prototype.toString = function () {
            console.log("Element: " + this.element);
            console.log("Sort: " + this.melonSort);
            console.log("Element Index: " + this.elementIndex);
        };
        return Melon;
    }());
    var Watermelon = /** @class */ (function (_super) {
        __extends(Watermelon, _super);
        function Watermelon(weight, melonSort) {
            var _this = _super.call(this, weight, melonSort) || this;
            _this.element = 'Water';
            return _this;
        }
        return Watermelon;
    }(Melon));
    var Firemelon = /** @class */ (function (_super) {
        __extends(Firemelon, _super);
        function Firemelon(weight, melonSort) {
            var _this = _super.call(this, weight, melonSort) || this;
            _this.element = 'Fire';
            return _this;
        }
        return Firemelon;
    }(Melon));
    var Earthmelon = /** @class */ (function (_super) {
        __extends(Earthmelon, _super);
        function Earthmelon(weight, melonSort) {
            var _this = _super.call(this, weight, melonSort) || this;
            _this.element = 'Earth';
            return _this;
        }
        return Earthmelon;
    }(Melon));
    var Airmelon = /** @class */ (function (_super) {
        __extends(Airmelon, _super);
        function Airmelon(weight, melonSort) {
            var _this = _super.call(this, weight, melonSort) || this;
            _this.element = 'Air';
            return _this;
        }
        return Airmelon;
    }(Melon));
    var Melolemonmelon = /** @class */ (function (_super) {
        __extends(Melolemonmelon, _super);
        function Melolemonmelon(weight, melonSort) {
            var _this = _super.call(this, weight, melonSort) || this;
            _this.elements = ['Fire', 'Earth', 'Air'];
            _this.element = 'Water';
            return _this;
        }
        Melolemonmelon.prototype.morph = function () {
            var currentElemet = this.element;
            this.elements.push(currentElemet);
            var nextElement = this.elements[0];
            this.element = nextElement;
            var indexOfNextElement = this.elements.lastIndexOf(nextElement);
            this.elements.splice(indexOfNextElement, 1);
        };
        return Melolemonmelon;
    }(Watermelon));
    return {
        Watermelon: Watermelon,
        Firemelon: Firemelon,
        Earthmelon: Earthmelon,
        Airmelon: Airmelon,
        Melolemonmelon: Melolemonmelon
    };
}
var melons = elemelons();
// let watermelon = new melons.Watermelon(12.5, 'Kingsize');
// let firemelon = new melons.Firemelon(8, 'Huge');
// let earthmelon = new melons.Earthmelon(3, 'Medium');
// let airmelon = new melons.Airmelon(1, 'Small');
// console.log(watermelon.toString());
// console.log(firemelon.toString());
// console.log(earthmelon.toString());
// console.log(airmelon.toString());
var melolemonmelon = new melons.Melolemonmelon(5, 'Kingsize');
console.log(melolemonmelon.toString());
