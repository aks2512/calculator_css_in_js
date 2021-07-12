class Calculator {

  constructor() {

    this._lastOperation = '';
    this._lastNumber = '';

    this._operation = [];
    this._displayCalcElement = document.getElementById('display');

    this.initButtonsEvents();
  }

  initButtonsEvents() {
    var buttons = document.querySelectorAll('.btn');

    buttons.forEach((button) => {

      button.addEventListener('click', () => {

        var value = button.textContent;
        this.execButton(value);

      });

    });

  }

  execButton(value) {
    switch (value) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.addNumber(value);
        break;

      case ',':
        this.addDot();
        break;

      case '±':
        this.addSymbolInNumber();
        break;

      case '+':
      case '-':
        this.addOperator(value);
        break;

      case '÷':
        this.addOperator('/');
        break;
      case 'X':
        this.addOperator('*');
        break;

      case '¹/x':
        this.decimal(value);
        break;

      case 'x²':
        this.power(value);
        break;

      case '√':
        this.sqrt(value);
        break;

      case '%':
        this.percentage(value);
        break;

      case '=':
        this.calc(value);
        break;

      case 'C':
        this.clear();
        break;

      case 'CE':
        this.clearEntry();
        break;

      case '←':
        this.backspace();
        break;

    }

    this.displayOperation();

  }

  backspace() {

    if (this.operation) {

      if (this.operation[this.operation.length - 1] > 1) {

        var item = this.operation[this.operation.length - 1].split("");
        item.pop();
        this.operation[this.operation.length - 1] = item.join("");

      } else {

        this.operation.pop();

      }

    }

  }

  percentage(value) {

    if (this.operation != null) {

      if (this.operation.length == 3 &&
        !this.isOperator(this.operation[0] &&
          this.operation[1] == '*' &&
          !this.isOperator(this.operation[2]))) {

        this.operation[2] = [eval(this.operation[this.operation.length - 1] + '/ 100')];
        this.calc(value);

      }

    }

  }

  sqrt(value) {

    if (this.operation != null) {

      if (this.operation.length == 1 &&
        !this.isOperator(this.operation[this.operation.length - 1])) {

        var x = this.operation.pop();
        this.operation = ['Math.sqrt(' + x + ')'];
        this.calc(value);

      }

    }

  }

  power(value) {

    if (this.operation != null) {

      if (this.operation.length == 1 &&
        !this.isOperator(this.operation[this.operation.length - 1])) {

        var x = this.operation.pop();
        this.operation = ['Math.pow(' + x + ',2)'];
        this.calc(value);

      }

    }

  }

  decimal(value) {
    if (this.operation != null) {

      if (this.operation.length == 1) {

        var x = this.operation.pop();
        this.operation.push('1');
        this.operation.push('/');
        this.operation.push(x);
        this.calc(value);

      }

    }
  }

  clear() {
    this.operation = [];
    this.lastOperation = '';
  }

  clearEntry() {
    if (this.operation.length > 1)
      this.operation.pop();
    else
      this.operation = [];
    this.lastOperation = '';
  };

  error() {

    setTimeout(() => {

      this.displayCalcElement = document.getElementById('display');
      this.displayCalcElement.textContent = 'ERROR';

    }, 1);

    this.operation = [];
    this.lastOperation = '';

  }

  displayOperation() {

    this.displayCalcElement = document.getElementById('display');

    if (this.operation != null) {

      if (this.operation.length == 0 || this.operation[this.operation.length - 1] == "") {

        this.operation = [''];
        this.displayCalcElement.textContent = 0;

      } else {

        if (this.operation[this.operation.length - 1].length > 11) {

          this.error();

        } else {

          this.displayCalcElement.textContent = this.operation[this.operation.length - 1].toString();

        }

      }

    }

  }

  addSymbolInNumber() {

    if (this.operation != null) {

      if (!this.isOperator(this.operation[this.operation.length - 1])) {

        if (this.operation[this.operation.length - 1].indexOf('-') != -1) {

          this.operation[this.operation.length - 1] = this.operation[this.operation.length - 1].replace('-', '');

        } else {

          var item = this.operation[this.operation.length - 1].split();
          item.unshift('-');
          item = item.join("");
          this.operation[this.operation.length - 1] = item;

        }

      }

    }

  }

  addDot() {

    if (this.operation != null) {

      if (!this.isOperator(this.operation[this.operation.length - 1])) {

        this.operation[this.operation.length - 1] = this.operation[this.operation.length - 1].replace(".", "");
        this.operation[this.operation.length - 1] += '.';

      }

    }

  }

  addNumber(value) {

    if (this.operation == null || this.operation == undefined) {

      this.operation = [];
      this.operation.push(value);

    } else {

      if (this.isOperator(this.operation[this.operation.length - 1])) {

        this.operation.push(value);

      } else {

        if (this.operation[this.operation.length - 1] != undefined &&
          this.operation[this.operation.length - 1].length > 11) {

          this.error();

        } else {

          this.operation[this.operation.length - 1] += value;

        }

      }
    }

  }

  addOperator(value) {

    if (this.operation != null) {

      if (this.operation.length == 3) {

        this.calc();

      }

      else if (this.operation.length >= 1 && this.operation[this.operation.length - 1] != "") {

        if (this.isOperator(this.operation[this.operation.length - 1])) {


          this.operation[this.operation.length - 1] = value;

        } else {

          this.operation.push(value);

        }

      }

    }


  }

  isOperator(value) {
    return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
  }

  calc(value) {

    if (this.operation != null) {

      if (this.operation[this.operation.length - 1] != "" || this.operation[0] != "") {

        if (this.operation.length >= 3) {
          if (value != '=') {

            this.operation = [eval(this.operation.join("")).toString()];
            if (this.operation[0].indexOf('.') != -1) {

              this.operation[0] = parseFloat(this.operation[0]).toFixed(2).toString();

            }

          } else {

            this.operation[0] = [eval(this.operation.join("")).toString()];
            if (this.operation[0].indexOf('.') != -1) {

              this.operation[0] = parseFloat(this.operation[0]).toFixed(2).toString();

            }
            this.lastOperation = this.operation;
            this.operation = [this.lastOperation.shift()];

          }
        } else if (this.operation.length == 2) {

          if (value == '=') {

            this.operation = (this.isOperator(this.operation[0]))
              ? this.operation = [this.operation[1]]
              : this.operation = [this.operation[0]];

          }

        } else if (this.operation.length == 1) {

          if (this.lastOperation != null) {

            var operation = this.operation.toString() + this.lastOperation.toString().replaceAll(",", "");
            this.operation = [eval(operation).toString()];
            if (this.operation[0].indexOf('.') != -1) {

              this.operation[0] = parseFloat(this.operation[0]).toFixed(2).toString();

            }

          }

          else if (value == '√' || value == 'x²') {

            this.operation = [eval(this.operation.join("")).toString()];
            if (this.operation[0].indexOf('.') != -1) {

              this.operation[0] = parseFloat(this.operation[0]).toFixed(2).toString();

            }

          }

        }

      }

    }

  }

}
