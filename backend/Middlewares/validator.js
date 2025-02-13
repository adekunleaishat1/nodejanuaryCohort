
const validator = (schema) => async (req,res,next)=>{
  try {
    const body = req.body
    const validate = await schema.validate(body)
    if (validate) {
       next() 
    }
  } catch (error) {
    console.log(error.message); 
   return  res.status(404).send({message:error.message, status:false})
  }
}

module.exports =  validator