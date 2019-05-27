var express = require('express');
var moment = require('moment');
const shortid = require('shortid');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const fs = require('fs');
  let rawdata = fs.readFileSync('employees.json');  
  let employees = JSON.parse(rawdata);  
  res.status(200).send(employees);
});
router.post('/new', function(req, res, next) {
  const fs = require('fs');
  let rawdata = fs.readFileSync('employees.json');
  let employees = JSON.parse(rawdata); 



  let obj = {
    id:shortid.generate(),
    empname:req.body.empname,
    mng:req.body.mng,
    dpt:req.body.dpt,
    phone:req.body.phone,
    dob:moment(req.body.dob).format('MM/DD/YYYY'),
    doj:moment(req.body.doj).format('MM/DD/YYYY'),
    salary:req.body.salary
  }
  
  employees.push(obj);
  fs.writeFileSync('employees.json', JSON.stringify(employees));
  res.status(200).send({insert:true});
});

router.patch('/edit', function(req, res, next) {
 
  const fs = require('fs');
  let rawdata = fs.readFileSync('employees.json');
  let employees = JSON.parse(rawdata); 
  let row =req.body;
 
    var index = employees.findIndex(function(o){
      return o.id === row.id;
    });
    
    
    if (index !== -1) {
      employees[index]={
        id:row.id,
        empname: row.empname,
        mng: row.mng,
        dpt: row.dpt,
        phone: row.phone,
        dob:moment(req.body.dob).format('MM/DD/YYYY'),
        doj:moment(req.body.doj).format('MM/DD/YYYY'),
        salary: row.salary
     };
  }
 
  fs.writeFileSync('employees.json', JSON.stringify(employees));
  res.status(200).send({edit:true});
});

router.delete('/delete', function(req, res, next) {
  
  const fs = require('fs');
  let rawdata = fs.readFileSync('employees.json');
  let employees = JSON.parse(rawdata); 
  let rows =req.body;
  rows.forEach(function(element) {
    console.log(element);
    var index = employees.findIndex(function(o){
      return o.id === element.id;
    })
    if (index !== -1) employees.splice(index, 1);
  });
  fs.writeFileSync('employees.json', JSON.stringify(employees));
  
  res.status(200).send({delete:true});
});

module.exports = router;
