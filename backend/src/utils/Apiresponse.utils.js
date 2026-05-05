class Apiresponse{
    constructor(
    statuscode,
    message="Success",
    
    data,
    ){
      this.message=message
      this.statuscode=statuscode
      this.data=data
      this.success=this.statuscode<400
    }
}
export{Apiresponse}