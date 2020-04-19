export class UserProfile{
    public email:string;
    public displayname:string;
    public role:string;
    public department:string;
    public location:string;
    public phoneNo:string;
    public initials:string;
    public imageSrc:string;

    constructor(){
      this.email="";
      this.displayname="";
      this.role="";
      this.department="";
      this.location="";
      this.phoneNo="";
      this.initials="";
      this.imageSrc=""
    }   
}