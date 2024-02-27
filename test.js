const opiekunowie = [
    {
        "name": "Ania",
        "surname": "Kowalska",
        "login": "akowalska",
    },
    {
        "name": "Jacek",
        "surname": "Roman",
        "login": "jroman",
    },
    {
        "name": "Ania",
        "surname": "Kowalska",
        "login": "akowalska",
    }
];



const opiekunowieUnique =  [...new Set(opiekunowie.map((o) => JSON.stringify(o)))].map((s) =>
JSON.parse(s)
)

const tab='landraszyk,akowalska'
const tabsplice=tab.split(',')

console.log(tabsplice);