<template>
<div class="container">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="邮箱:" prop="email" class="form">
              <el-input type="text" v-model="ruleForm.email" autocomplete="off" class="input"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password" class="form">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" class="input"></el-input>
          </el-form-item>
        
        <el-form-item class="form">
            <el-button type="primary" @click="submitForm('ruleForm')" class="button">登录</el-button>
            <el-button @click="resetForm('ruleForm')" class="button">重置</el-button>
        </el-form-item>
        </el-form>
</div>
</template>
<script>
import axios from 'axios';
  export default {
    data() {
     var checkemail= (rule, value, callback) => {
            const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
            if (value=="") {
            return callback(new Error('邮箱不能为空'))
            }else{
                callback();
            }
            setTimeout(() => {
            if (mailReg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的邮箱格式'))
            }
            }, 100)
        }
      var password = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
        password: '',
         email:''
        },
        user:{
         userName:"",
         emailOrGithub:"",
         userCode:"",
         userType:""
        },
        rules: {
        password: [
            { validator:password, trigger: 'blur' }
          ],
         email: [
            { validator:checkemail, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      check(){
           var admin=JSON.parse(localStorage.getItem("admin"));
           if(admin!=null){
              this.$router.push("/manageIndex/postAritcle");
           }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             axios.post("http://www.qz-hotpot.xyz:8081/blog/users/login/admin",{
                      email:this.ruleForm.email,
                     password:this.ruleForm.password,
             }).then((res)=>{
                if(res.status==200){
                    this.user.userName=res.data.userName;
                    this.user.emailOrGithub=res.data.emailOrGithub;
                    this.user.userCode=res.data.userCode;
                    this.user.userType=res.data.userType;
                  localStorage.setItem("admin",JSON.stringify(this.user));
                     this.$router.push("/manageIndex/postAritcle");
                     this.$refs[formName].resetFields();
                }else if(res.status==404){
                    alert("404 NOT FOUND!!!")
                }
             }).catch((err)=>{
                 alert(err.response.data);
                 return
             })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
      this.check();
    }
  }
</script>

<style scoped>
.container{
    width:50%;
    height:50%;
    position: absolute;
    top:25%;
    left:50%;
   margin-left:-25%;
   padding:20px;
    border:2px solid rgb(247,247,247);
}
 
 @media (max-width:767px){
     .form{
  padding:0px;
  margin-top:18%;
}
   .button{
    margin-left:-1%;
}
 .input{
    width:90%;
}
 }
 @media (min-width:767px){
    .form{
  padding:0px;
  margin-top:8%;
}
 .input{
    width:70%;
}
.button{
    margin-left:15%;
}
 }
</style>