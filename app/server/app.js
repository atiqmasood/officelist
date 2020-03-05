const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
let officeList = [
    {
        id: 1,
        officeName: 'test1',
        officeType: 'agent',
        creditLimit: 1,
        email: 'atiq@gmail.com',
        contact: '0505670302',
        created: 'mar 2019'
    },
    {
        id: 2,
        officeName: 'test2',
        officeType: 'agent',
        creditLimit: 22,
        email: 'atiq2@gmail.com',
        contact: '0505670302',
        created: 'mar 2019'
    },{
        id: 3,
        officeName: 'test3',
        officeType: 'agent',
        creditLimit: 1,
        email: 'atiq33@gmail.com',
        contact: '0505670302',
        created: 'mar 2019'
    },{
        id: 4,
        officeName: 'test4',
        officeType: 'agent',
        creditLimit: 14,
        email: 'atiq4@gmail.com',
        contact: '0505670302',
        created: 'mar 2019'
    }
];

// get office list
router.get('/list', function(req, res) {
    res.json(officeList);
});

// create office
router.post('/create', function(req, res) {
    const { office } = req.body;
    officeList.push({...office, id: officeList.length + 1});
    res.json(officeList);
});

// update office
router.put('/edit/:id', function(req, res) {
    const { office } = req.body;
    const foundIndex = (officeList || []).findIndex(x => x.id === office.id);
    officeList[foundIndex] = office;
    res.json(officeList);
});

// delete office
router.delete('/delete/:id', function(req, res) {
    const { id } = req.params;
    officeList = (officeList || []).filter(x => x.id !== Number(id));
    res.json(officeList);
});

// filter office
router.post('/filter', function(req, res) {
    const { filterData } = req.body;
    const filterArr = (officeList || []).filter(item => {
        return item.officeName.toLowerCase().indexOf(filterData) > -1 || String(item.id).indexOf(filterData) > -1;
    });
    res.json(filterArr);
});

app.use('/api', router);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));