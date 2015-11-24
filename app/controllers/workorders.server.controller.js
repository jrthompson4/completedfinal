var mongoose = require('mongoose'),
    WorkOrder = mongoose.model('WorkOrder');

// ERROR HANDLING
var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    }
    else {
        return 'Unknown server error';
    }
};

// CHECK AUTHORIZATION
exports.hasAuthorization = function(req, res, next) {
    if (req.workorder.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};

// CREATE
exports.create = function(req, res) {
    var workorder = new WorkOrder(req.body);

    //this is the authenticated Passport user
    workorder.creator = req.user;

    workorder.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.json(workorder);
        }
    });
};

//LIST/READ
exports.list = function(req, res) {
    WorkOrder.find().sort('-created').populate('creator', 'Building AptNumber ProblemDescription PhoneNumber completed').exec(function(err, workorders) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.json(workorders);
        }
    });
};

//FIND BY ID
exports.workorderByID = function(req, res, next, id) {
    WorkOrder.findById(id).populate('creator', 'Building AptNumber ProblemDescription PhoneNumber completed').exec(function(err, workorder) {
        if (err) return next(err);
        if (!workorder) return next(new Error('Failed to load work order ' + id));

        req.workorder = workorder;
        next();
    });
};

//READ
exports.read = function(req, res) {
    res.json(req.workorder);
};

//UPDATE
exports.update = function(req, res) {
    var workorder = req.workorder;

    //makeupdates to title and content
    workorder.Building = req.body.Building;
    workorder.AptNumber = req.body.AptNumber;
    workorder.ProblemDescription = req.body.ProblemDescription;
    workorder.PhoneNumber = req.body.PhoneNumber;

    //call save on the Mongoose model
    workorder.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.json(workorder);
        }
    });
};

//DELETE
exports.delete = function(req, res) {
    var workorder = req.workorder;

    workorder.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.json(workorder);
        }
    });
};
