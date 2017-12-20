require('./styles.scss');

document.write("<h1>hello BILLLY!<br>S.S.S.S. Pecan!</h1>");

const dress = () => {
    document.write("<h1>MEMPHIS 3000!</h1>");
}

dress();


class Car {
    manufacturer(car) {
        document.write(`I have a ${car}`);
    }
}

const bmw = new Car;

bmw.manufacturer('bmw');