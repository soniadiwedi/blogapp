const express=require('express')
const { EmployeeModel } = require('../model/employeeModel')
const { authenticateToken } = require('../middleware/authmiddleware')

const employeeRoute=express.Router()

employeeRoute.post("/employees",async(req,res)=>{
    const payload=req.body
    try{
        const emp=new EmployeeModel(payload)
        await emp.save()
        res.status(200).json({msg:"New Employee details has been created",emp})
    }catch(err){
        res.status(400).json({msg:err.message})
    }
})
// localhost:3100/employees?page=1&limit=2&department=Operations
employeeRoute.get('/employees',authenticateToken ,async (req, res) => {
    try {
      const { page = 1, limit = 5, department, sortBy = 'firstName' } = req.query;
      const filter = {};
      if (department) {
        filter.department = department;
      }
      const totalCount = await EmployeeModel.countDocuments(filter);

      const sortOptions = { [sortBy]: 1 };
      const employees = await EmployeeModel.find(filter)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      res.status(200).json({
        page: parseInt(page),
        limit: parseInt(limit),
        totalCount,
        employees,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


//updating
employeeRoute.patch("/employee/:id",authenticateToken,async(req,res)=>{
    const {id}=req.params
    const data=req.body
    try{
        await EmployeeModel.findByIdAndUpdate({_id:id},data)
        res.status(200).send({"msg":"blog has been updated"})
    }catch(err){
        res.status(400).send({"msg":err.msg})
    }
})


employeeRoute.delete('/employees/:id', async (req, res) => {
    try {
      const employeeId = req.params.id;
      const deletedEmployee = await EmployeeModel.findByIdAndDelete(employeeId);
  
      if (!deletedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  });
module.exports=employeeRoute

// "firstName":"chunnu",
// "lastName":"bhattacharya",
// "email":"chunnu@gmail.com",
// "department":"Operations",
// "salary":8000