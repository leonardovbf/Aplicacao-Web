var bodyParser = require('body-parser')
const { Employee, Location, sequelize } = require('../models')
const { Op } = require('sequelize')

var urlencodedParser = bodyParser.urlencoded({extended: false})

const asyncHandler = () => (req, res, next) => Promise.resolve((req, res, next)).catch(next);

module.exports = (app) => {

    app.get('/', async (req, res) => {

        const locationsCount = await Location.count();
        const totalEmployeesInLocations = await Location.sum('num_employees');
        const employeesCount = await Employee.count();

        res.render('index', { locationsCount, totalEmployeesInLocations, employeesCount });
    })

    app.get('/test', (req, res) => {

        res.render('test')
    })

    app.get('/locations', async (req, res, next) => {

        console.log('[GET /locations] hit');

        try {
            const locations = await Location.findAll({
            raw: true,
            order: [['createdAt', 'DESC']],
            });

            return res.render('locations', { locations });
        } catch (err) {

            console.error('[GET /locations] error:', err);

            return next(err);
        }


    });

    app.get('/employees', async (req, res, next) => {

        console.log('[GET /employees] hit');

        try {
            const employees = await Employee.findAll({
                raw: true,
                order: [['createdAt', 'DESC']],
            });

            return res.render('employees', { employees });
        } catch (err) {

            console.error('[GET /employees] error:', err);

            return next(err);
        }

    })

    app.post('/locations', async (req, res, next) => {
        console.log('[POST /locations] hit');

        const nome = (req.body.nome || '').trim();
        const endereco = (req.body.endereco || '').trim();
        const num_employees = Number.parseInt(req.body.num_employees, 10);
        const data_de_compra = req.body.data_de_compra || null;

        console.log({ nome, endereco, num_employees, data_de_compra });

        if (!nome || !endereco || Number.isNaN(num_employees) || !data_de_compra) {

            console.error('[POST /locations] validation error:', { nome, endereco, num_employees, data_de_compra });

            return res.status(400).render('locations', {
                locations: [],
                error: 'Preencha todos os campos corretamente.'
            });
            }
        

        try {
            const location = await Location.create({
                nome,
                endereco,
                num_employees,
                data_de_compra, 
            })

            console.log('[POST /locations] created:', location);

            return res.redirect('/locations?created=1&id=' + location.id);
        }
        catch (error){
            console.error('[POST /locations] error:', error);
            return next(error);
        }

    })

    app.post('/employees', async (req, res, next) => {
        console.log('[POST /employees] hit');

        const nome = (req.body.nome || '').trim();
        const sobrenome = (req.body.sobrenome || '').trim();
        const idade = Number.parseInt(req.body.idade, 10);
        const cargo = (req.body.cargo || '').trim();
        const endereco = (req.body.endereco || '').trim();

        console.log({ nome, sobrenome, idade, cargo, endereco });

        if (!nome || !sobrenome || Number.isNaN(idade) || !cargo) {

            console.error('[POST /employees] validation error:', { nome, sobrenome, idade, cargo, endereco });

            return res.status(400).render('employees', {
                employees: [],
                error: 'Preencha todos os campos corretamente.'
            });
            }
        

        try {
            const employee = await Employee.create({
                nome,
                sobrenome,
                idade,
                cargo,
                endereco,
            })

            console.log('[POST /employees] created:', employee);

            return res.redirect('/employees?created=1&id=' + employee.id);
        }
        catch (error){
            console.error('[POST /employees] error:', error);
            return next(error);
        }

    })
}