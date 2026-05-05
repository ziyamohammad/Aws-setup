class Apierror extends Error{
    constructor(
        statuscode,
        message="Something went wrong",
        error="",
        stack=[],
    ){
        super(message)
        this.statuscode=statuscode
        this.data=null
        this.success=false
        this.message=message
        this.error=error
        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this.constructor,constructor)
        }

    }
}
export {Apierror}