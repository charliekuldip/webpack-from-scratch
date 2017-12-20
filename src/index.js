require('./assets/stylesheets/styles.scss');

var container = document.getElementById('container');
var h1 = document.createElement('h1');
var h2 = document.createElement('h1');
h1.innerHTML = 'hello BILLLY!<br>S.S.Seeee.S.D.S. Pecan';
container.append(h1);

h2.innerHTML = 'MEMPHIS 3000';
const dress = () => {
    container.append(h2);
}

dress();


class Car {
    manufacturer(car) {
        let h3 = document.createElement('h3');
        h3.innerHTML = `I have a ${car}`;
        container.append(h3);
    }
}

const bmw = new Car;

bmw.manufacturer('bmw');