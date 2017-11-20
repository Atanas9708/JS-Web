const authCheck = require('../middleware/auth-check');
const authRoutes = require('./auth');
const plan = require('./plan');
const expense = require('./expense');
const yearly = require('./yearly');
const monthly = require('./monthly');

module.exports = (app) => {
    app.use('/auth', authRoutes);

    app.get('/plan/:year', authCheck, yearly.getYear);
    app.get('/plan/:year/:month', authCheck, monthly.getMonth);

    app.post('/plan/:year/:month', authCheck, plan.postPlan);
    app.post('/plan/:year/:month/expense', authCheck, expense.postExpense);
    app.delete('/plan/expense/:id', authCheck, expense.deleteExpense);

    // Alternative routing
    app.get('/yearly/current', authCheck, yearly.getCurrent);
    app.get('/yearly/:year', authCheck, yearly.getYear);

    app.get('/monthly/current', authCheck, monthly.getCurrent);
    app.get('/monthly/:year/:month', authCheck, monthly.getMonth);

    app.post('/plan', authCheck, plan.postPlan);
    app.post('/plan/expense', authCheck, expense.postExpense);
};

/*
module.exports = (app) => {
    app.use('/auth', authRoutes);

    app.get('/yearly/current', authCheck, yearly.getCurrent);
    app.get('/yearly/:year', authCheck, yearly.getYear);

    app.get('/monthly/current', authCheck, monthly.getCurrent);
    app.get('/monthly/:year/:month', authCheck, monthly.getMonth);

    app.post('/plan', authCheck, plan.postPlan);
    app.post('/plan/expense', authCheck, expense.postExpense);
    app.delete('/plan/expense/:id', authCheck, expense.deleteExpense);
};
*/